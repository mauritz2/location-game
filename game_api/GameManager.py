from random import choice
from enum import Enum, auto
from dataclasses import dataclass
from player import Player

class GameManager():
    """
    Handles all incoming user actions from the front-end. Evaluates
    their impact on the game. Returns updated game state.
    This is the only code that should be exposed in the Game API routes.

    TODO - think about how to improve cohesion in this class - it's very low. Maybe one class to manage players, one to manage turns?
    """

    def __init__(self, players: list[Player]):
        self.players = self.create_player_dict(players) # TODO change to player class instances instead
        # With a random choice here React gets stuck in an infinite loop :-) 
        #self.current_player_name = choice(list(self.players.keys()))
        self.current_player = list(self.players.values())[0] # TODO - reintroduce random but consistent player order
        self.players_waiting_for_turn = list(self.players.keys())
        self.game_phase = GamePhases.Day
        self.game_log = GameLog(messages=[])
        self.selected_locations = {}

    @staticmethod
    def create_player_dict(players: list[Player]) -> dict[str, Player]:
        player_dict = {player.player_id:player for player in players}
        return player_dict


    def add_chosen_location(self, player_id: str, location: str) -> None:
        if location not in list(self.selected_locations.keys()):
            self.selected_locations[location] = [player_id] 
        else:
            self.selected_locations[location].append(player_id) 


    def is_round_over(self) -> None:
        """
        Checks if there are any more player turns in this round. If so, returns false. Otherwise returns true.
        """
        return True if len(self.players_waiting_for_turn) == 0 else False


    def end_player_turn(self) -> None:
        self.players_waiting_for_turn.remove(self.current_player.player_id)        
        self.current_player = self.players[self.players_waiting_for_turn[0]]


    def end_round(self) -> None:
        self.game_phase = GamePhases.Night
        self.players_waiting_for_turn = list(self.players.keys())

    def get_chosen_location_by_id(self, player_id: str) -> str:
        # TODO - create Enum for locations
        for location, player_ids in self.selected_locations.items():
            if player_id in player_ids:
                return location

    def get_location_message_for_locations(self, location: str) -> str:
        num_players = len(self.selected_locations[location])
        if num_players <= 0:
            raise ValueError("Location check requested, but no player was there")
        elif num_players == 1:
            msg = f"You do not spot anyone else at the {location}"
        elif num_players == 2:
            msg = f"In the shadows, you can spot the silhouette of one other player at the {location}"
        else:
            msg = f"In the shadows, you can spot the silhouettes of {num_players - 1} other players at the {location}"
        return msg

    def get_game_state(self) -> dict:
        """
        Return a serializable game state object for the front-end to render
        """
        game_state = {
            "players": list(self.players.keys()),
            "current_player_name": self.current_player.player_name,
            "current_player_id": self.current_player.player_id,
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
    Day = "choosing location"
    Night = "choosing whether to attack"


@dataclass
class GameLog:
    messages: list[str]