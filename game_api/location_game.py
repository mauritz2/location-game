from flask import Flask, jsonify
from create_game import create_game
from flask_socketio import SocketIO, emit 
from flask_cors import CORS

app = Flask(__name__)
socketio = SocketIO(app, logger=True)
CORS(app,resources={r"/*":{"origins":"*"}})
socketio.init_app(app, cors_allowed_origins="*")
#socketio.init_app(app, cors_allowed_origins="*")

global game_manager

@socketio.on("START_GAME_CLICK")
def start_game():
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
    emit("UPDATE_GAME_STATE", game_state)


@socketio.on("ANNOUNCE_LOCATION")
def announce_location(data):
    global game_manager

    msg = f"{data['player_id']} is announcing that they will visit the {data['location']} this turn."    
    game_manager.game_log.messages.append(msg)

    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state)
    

if __name__ == "__main__":
    socketio.run(app, debug=True)



