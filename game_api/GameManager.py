from random import choice
from enum import Enum, auto
from dataclasses import dataclass
from player import Player

class GameManager():
    """
    Handles all incoming user actions from the front-end. Evaluates
    their impact on the game. Returns updated game state.
    This is the only code that should be exposed in the Game API routes.
    """

    def __init__(self, players: list[Player]):
        self.players = self.create_player_dict(players) # TODO change to player class instances instead
        # With a random choice here React gets stuck in an infinite loop :-) 
        #self.current_player_name = choice(list(self.players.keys()))
        self.current_player = self.players[choice(list(self.players.keys()))]
        self.players_waiting_for_turn = list(self.players.keys())
        self.game_phase = GamePhases.ChooseLocation
        self.game_log = GameLog(messages=[])

    @staticmethod
    def create_player_dict(players: list[Player]) -> dict[str, Player]:
        player_dict = {player.player_id:player for player in players}
        return player_dict

    def end_player_turn(self) -> None:
        self.players_waiting_for_turn.remove(self.current_player.player_id)
        self.current_player = self.players[self.players_waiting_for_turn[0]]

    def get_game_state(self) -> dict:
        """
        Return a serializable game state object for the front-end to render
        """
        game_state = {
            "players": list(self.players.keys()),
            "current_player_name": self.current_player.player_name,
            "game_phase": self.game_phase.value,
            "log_messages": self.game_log.messages
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