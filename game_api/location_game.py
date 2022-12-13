from flask import Flask, request
from create_game import create_game
from flask_socketio import SocketIO, emit 

app = Flask(__name__)
socketio = SocketIO(app, logger=True)
socketio.init_app(app, cors_allowed_origins="*")

global game_manager

@socketio.on("START_GAME_CLICK")
def start_game():
    global game_manager
    # Placeholder IDs and names for simplicity during dev
    players = {"169910709":"Player 1", "462210324":"Player 2"}
    game_manager = create_game(players)
    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state, broadcast=True)

@socketio.on("TAKE_ACTION")
def take_action(data):
    global game_manager
    action = data["action"]
    action_data = data["data"]
    player_id = data["player_id"]

    player = game_manager.players[player_id]
    # insert check here that it's actually this players turn

    match action:
        # TODO - resolve actions at round end as opposed to immediately
        case "earn":
            player.add_remove_coins(2)


    resources = player.get_resources()
    emit("UPDATE_RESOURCES", resources, to=request.sid)

    game_manager.end_player_turn()

    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state, broadcast=True)
    

@socketio.on("ANNOUNCE_LOCATION")
def announce_location(data):
    global game_manager

    player_id = data["player_id"]
    player_name = game_manager.players[player_id].player_name
    location = data["location"]

    msg = f"{player_name} is announcing that they will visit the {location} this night."    
    game_manager.game_log.messages.append(msg)

    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state, broadcast=True)
    

if __name__ == "__main__":
    socketio.run(app, debug=True)

