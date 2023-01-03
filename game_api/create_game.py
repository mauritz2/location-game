import random
from gamemanager import GameManager
from player import Player
from character import Characters


def create_game(player_ids: dict[str: str]) -> GameManager:
    """
    Takes a dict of players as input in format {"player_name":"player_id}
    and returns a GameManager object that manages the game.
    """
    players = []
    available_classes = [char.value for char in Characters]
    for player_id in player_ids:
        character = available_classes.pop(random.randint(0, len(available_classes)-1))
        new_player = Player(player_id=player_id,
                            player_name=player_ids[player_id],
                            character=character)
        players.append(new_player)

    game_manager = GameManager(players=players)
    return game_manager
