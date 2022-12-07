from GameManager import GameManager

def create_game(players: dict[str: str]) -> GameManager:
    """
    Takes a dict of players as input in format {"player_name":"player_id}
    and returns a GameManager object that manages the game.
    """
    game_manager = GameManager(players=players)
    return game_manager
