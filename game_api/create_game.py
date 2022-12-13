from gamemanager import GameManager
from player import Player

def create_game(player_ids: dict[str: str]) -> GameManager:
    """
    Takes a dict of players as input in format {"player_name":"player_id}
    and returns a GameManager object that manages the game.
    """
    players = []
    for player_id in player_ids:
        new_player = Player(player_id=player_id, player_name=player_ids[player_id])
        players.append(new_player)

    game_manager = GameManager(players=players)
    return game_manager
