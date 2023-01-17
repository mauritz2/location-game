from flask import Flask, request
from create_game import create_game
from flask_socketio import SocketIO, emit 
from player import ResourceEnum, PlayerConditionsEnum
#import game_balance_config as config

global game_manager

app = Flask(__name__)
socketio = SocketIO(app, logger=True)
socketio.init_app(app, cors_allowed_origins="*")

@socketio.on("START_GAME_CLICK")
def start_game():
    global game_manager
    # Placeholder IDs and names for simplicity during dev
    players = {"591585879":"Player 1", "455776297":"Player 2"}
    #players = {"280609844":"Player 1"}
    game_manager = create_game(players)
    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state, broadcast=True)
    

@socketio.on("GET_CHARACTER")
def get_character(player_id: str):
    """
    Send the player's assigned character and related data
    """
    global game_manager
    character = game_manager.players[player_id].character.get_character_data()
    emit("UPDATE_CHARACTER", character, to=request.sid)


@socketio.on("CHOOSE_DAY_ACTION")
def take_action(data):
    global game_manager
    action = data["action"]
    location = data["location"]
    action_details = data["action_details"]
    player_id = data["player_id"]

    player = game_manager.players[player_id]
    # insert check here that it's actually this players turn

    player.queue_action(data)

    """     
    match action:
        case "earn":
            player.add_remove_resource(ResourceEnum.coins.value, 2)
        case "getArmor":
            player.add_remove_resource(ResourceEnum.armor.value, 1)
        case "getBones":
            player.add_remove_resource(ResourceEnum.bones.value, 1)
        case "getHerbs":
            player.add_remove_resource(ResourceEnum.herbs.value, 1)
        case "getScroll":
            player.add_remove_resource(ResourceEnum.scrolls.value, 1)
        case "scry":
            player.add_remove_resource(ResourceEnum.coins.value, -2)            
            player.add_condition(PlayerConditionsEnum.scrying.value)
        case "blockLocation":
            blockedLocation = action_details["blockedLocation"]
            game_manager.block_location(blocker_id=player_id, location=blockedLocation)
        case "trade":
            to_give = action_details["resourceToGive"]
            to_receive = action_details["resourceToReceive"] 
            player.add_remove_resource(to_give, -1)
            if to_receive == ResourceEnum.coins.value:
                player.add_remove_resource(to_receive, config.COINS_FOR_RESOURCE)
            else:
                player.add_remove_resource(to_receive, 1)
     """
    # TODO - re-visit this - weird that we check action here and also in execute_queued_action()
    if action == "blockLocation":
        blockedLocation = action_details["blockedLocation"]
        game_manager.block_location(blocker_id=player_id, location=blockedLocation)

    game_manager.add_chosen_location(player_id, location)

    game_manager.end_player_turn()

    if game_manager.is_new_round():
        emit("DAY_OVER", broadcast=True)

    # TODO - continue here - there's an issue where only the last person would get updated resources
    # need to fix by putting in a REQUEST_UPDATE_RESOURCE emit on client side (?)
    resources = player.get_resources()
    emit("UPDATE_RESOURCES", resources, to=request.sid)

    game_state = game_manager.get_game_state()
    emit("UPDATE_GAME_STATE", game_state, broadcast=True)
    

@socketio.on("GET_LOG_MESSAGES")
def get_log_messages(player_id):
    global game_manager
    msgs = game_manager.get_available_msgs(player_id)
    emit("UPDATE_LOG_MSGS", msgs, to=request.sid)


@socketio.on("ANNOUNCE_LOCATION")
def announce_location(data):
    global game_manager

    player_id = data["player_id"]
    player_name = game_manager.players[player_id].player_name
    location = data["location"]

    msg = f"{player_name} is announcing that they will visit the {location} this night."            
    game_manager.add_msg_to_log(msg=msg, player_id="ALL")

    game_state = game_manager.get_game_state()

    emit("UPDATE_GAME_STATE", game_state, broadcast=True)
    

if __name__ == "__main__":
    socketio.run(app, debug=True)

