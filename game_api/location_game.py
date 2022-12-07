from flask import Flask
from create_game import create_game
from flask_cors import CORS, cross_origin

app = Flask(__name__)

global game_manager

@app.route("/")
def join_game():
    return ""

@app.route("/start-game", methods=["GET"])
@cross_origin()
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

@app.route("/announce-location", methods=["POST"])
@cross_origin()
def announce_location():
    """
    Announces which location the player wants to visit in the chat
    """
    global game_manager
    msg = f"Player X will go to the graveyard"
    game_manager.game_log.append(msg)
    print(msg)
    print("\n\n")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return "Test"




if __name__ == "__main__":
    CORS(app)
    app.run(host="0.0.0.0", debug=True)


