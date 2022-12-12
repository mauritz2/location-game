from flask import Flask, jsonify
from create_game import create_game
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
socketio = SocketIO(app, logger=True)
CORS(app,resources={r"/*":{"origins":"*"}})
socketio.init_app(app, cors_allowed_origins="*")
#socketio.init_app(app, cors_allowed_origins="*")

global game_manager

def update_game_state():
    game_state = jsonify(game_manager.get_game_state())
    print(game_state)
    print(type(game_state))
    socketio.emit("UPDATE_GAME_STATE", game_state)

@app.route("/api/start-game", methods=["GET"])
def start_game():
    """
    Creates the GameManager and returns the game state to the client
    """
    global game_manager
    ## Start game flow
    # User selects a name and clicks "Join Game"
    # 1. React sets a cookie through universal-cookie with a player_id
    # 2. The ID is passed to the backend (where? - prob just in a location_game.py var?)
    # On start game
    # Call create game with the names and IDs  
    
    # Placeholder
    players = {"Player 1":"1a1a1a", "Player 2":"2b2b2b"}

    game_manager = create_game(players)
    game_state = game_manager.get_game_state()

    return game_state

@socketio.on("ANNOUNCE_LOCATION")
def announce_location(data):
    global game_manager

    # TODO - remove this later - seems like I announce location before start game can run sometimes
    players = {"Player 1":"1a1a1a", "Player 2":"2b2b2b"}
    game_manager = create_game(players)

    msg = f"{data['player_id']} is announcing that they will visit the {data['location']} this turn."
    
    game_manager.game_log.messages.append(msg)

    game_state = game_manager.get_game_state()
    print(game_state)
    print(type(game_state))
    socketio.emit("UPDATE_GAME_STATE", game_state)
    


if __name__ == "__main__":
    #app.run(host="0.0.0.0", debug=True)
    socketio.run(app, debug=True)



