from flask import Flask, request
from create_game import create_game
from flask_socketio import SocketIO, emit 

global game_manager

app = Flask(__name__)
socketio = SocketIO(app, logger=True)
socketio.init_app(app, cors_allowed_origins="*")

@socketio.on("START_GAME_CLICK")
def start_game():
    global game_manager
    # Placeholder IDs and names for simplicity during dev
    #players = {"787065803":"Player 1", "402386716":"Player 2"}
    players = {"372646307":"Player 1"}
    game_manager = create_game(players)
    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state, broadcast=True)

@socketio.on("CHECK_LOCATION")
def check_location(player_id: str):
    global game_manager

    location = game_manager.get_chosen_location_by_id(player_id)
    msg = game_manager.get_message_for_location(location)

    emit("LOCATION_MSG", msg, to=request.sid)


@socketio.on("CHOOSE_DAY_ACTION")
def take_action(data):
    global game_manager
    action = data["action"]
    location = data["location"]
    #action_data = data["data"]
    player_id = data["player_id"]

    player = game_manager.players[player_id]
    # insert check here that it's actually this players turn

    match action:
        # TODO - resolve actions at round end as opposed to immediately
        case "earn":
            player.add_remove_resource("coins", 2)
        case "getArmor":
            player.add_remove_resource("armor", 1)

    game_manager.add_chosen_location(player_id, location)

    resources = player.get_resources()
    emit("UPDATE_RESOURCES", resources, to=request.sid)

    game_manager.end_player_turn()

    if game_manager.is_new_round():
        emit("DAY_OVER", broadcast=True)

    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state, broadcast=True)
    

@socketio.on("ANNOUNCE_LOCATION")
def announce_location(data):
    global game_manager

    player_id = data["player_id"]
    player_name = game_manager.players[player_id].player_name
    location = data["location"]

    msg = f"{player_name} is announcing that they will visit the {location} this night."    
    # TODO - the game log can't be universal - it needs to be managed at the player level?
    game_manager.game_log.messages.append(msg)

    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state, broadcast=True)
    

if __name__ == "__main__":
    socketio.run(app, debug=True)

