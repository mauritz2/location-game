from random import choice
from enum import Enum, auto
from dataclasses import dataclass

class GameManager():
    """
    Handles all incoming user actions from the front-end. Evaluates
    their impact on the game. Returns updated game state.
    This is the only code that should be exposed in the Game API routes.
    """

    def __init__(self, players: dict[str:str]):
        self.players = players
        # With a random choice here React gets stuck in an infinite loop :-) 
        #self.current_player_name = choice(list(self.players.keys()))
        self.current_player_name = (list(self.players.keys()))[0] 
        self.current_player_id = self.players[self.current_player_name] 
        self.game_phase = GamePhases.ChooseLocation
        self.game_log = GameLog(messages=[])

    def get_game_state(self):
        """
        Return a serializable game state object for the front-end to render
        """
        game_state = {
            "players": self.players,
            "current_player_name": self.current_player_name,
            "game_phase": self.game_phase.value
        }

        return game_state


class GamePhases(Enum):
    """
    Enum for potential game phases. Game phases are states where the game
    awaits user input.
    Enum values are written in format: "{player} is currently {text_value}"
    """
    ChooseLocation = "choosing location"
    ChooseAction = "choosing action"

@dataclass
class GameLog:
    messages: list[str]