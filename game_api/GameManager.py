import datetime
from enum import Enum
from dataclasses import dataclass
from player import Player

class LocationsEnum(Enum):
    market = "market"
    library = "library"
    watchmensquarter = "watchmen's quarter"
    graveyard = "graveyard"

class GamePhases(Enum):
    """
    Enum for potential game phases. Game phases are states where the game
    awaits user input.
    Enum values are written in format: "{player} is currently {text_value}"
    """
    Day = "choosing location"
    Night = "choosing whether to attack"

class GameManager():
    """
    Handles all incoming user actions from the front-end. Evaluates
    their impact on the game. Returns updated game state.
    This is the only code that should be exposed in the Game API routes.

    TODO - think about how to improve cohesion in this class - it's very low. Maybe one class to manage players, one to manage turns?
    TODO - break out a GameLog class from GameManager
    """

    def __init__(self, players: list[Player]):
        self.players = self.create_player_dict(players) # TODO change to player class instances instead
        # With a random choice here React gets stuck in an infinite loop :-) 
        #self.current_player_name = choice(list(self.players.keys()))
        self.current_player = list(self.players.values())[0] # TODO - reintroduce random but consistent player order
        self.players_waiting_for_turn = list(self.players.keys())
        self.game_phase = GamePhases.Day
        self.game_log = []
        self.selected_locations = {}
        self.blocked_locations = {}
        

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


    def is_new_round(self) -> None:
        """
        Checks if any players have taken their turn - if not it's considered a new round.
        """
        return True if len(self.players_waiting_for_turn) == len(list(self.players.keys())) else False


    def end_player_turn(self) -> None:
        self.players_waiting_for_turn.remove(self.current_player.player_id)        
        if len(self.players_waiting_for_turn) == 0:
            self.end_round()
        else:
            # If the round isn't over - select the next player
            self.current_player = self.players[self.players_waiting_for_turn[0]]


    def end_round(self) -> None:
        self.game_phase = GamePhases.Night
        self.players_waiting_for_turn = list(self.players.keys())
        self.current_player = self.players[self.players_waiting_for_turn[0]]
        
        # Execute queued action (unless at a blocked location)
        # TODO - refactor to reduce amount of loops here
        for player_id in self.players.keys():
            chosen_loc = self.get_chosen_location_by_id(player_id)      
            if chosen_loc not in self.blocked_locations.keys():
                self.players[player_id].execute_queued_action()
            else: 
                print("\n\nYou're visiting a location blocked by someone else \n\n")
                # TODO - update with gold loss logic here

        # Populate log messages showing amount of people at each location 
        for player_id in self.players.keys():
            # Resolve user locations - players should be notified 
            # in the game log if they are alone or someone else is at their location
            # TODO - this could be refactored so that each player instance holds the location they've chosen
            # for that round. That would remove the get_chosen_location_by_id() func. 
            chosen_loc = self.get_chosen_location_by_id(player_id)      
            msg = self.get_message_for_location(chosen_loc)
            self.add_msg_to_log(msg=msg, player_id=player_id)

        # Add extra scrying message, if player has visited the library
        for player_id in self.players.keys():
            if "scrying" in self.players[player_id].conditions:
                print(f"{player_id} is scrying!\n\n")
                scrying_msg = self.get_scrying_message()
                self.add_msg_to_log(msg=scrying_msg, player_id=player_id)

        # Reset ahead of next round
        self.selected_locations = {}
        self.blocked_locations = {}
        for player in self.players.values():
            player.clear_conditions()


    def get_scrying_message(self) -> str:
        """
        Gets the scrying message obtainable from the library which reveals the position
        of all players
        """
        msg = ["You use your scrying powers to see:"]
        for location, player_ids in self.selected_locations.items():
            player_names = [self.players[player_id].player_name for player_id in player_ids]
            loc_msg = f"{location.capitalize()}: {' '.join(player_names)}"
            msg.append(loc_msg)
        
        return " ".join(msg)


    def get_chosen_location_by_id(self, player_id: str) -> str:
        # TODO - create Enum for locations
        for location, player_ids in self.selected_locations.items():
            if player_id in player_ids:
                return location


    def get_message_for_location(self, location: str) -> str:
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
        }

        return game_state


    def get_available_msgs(self, player_id: int) -> list[str]:
        """
        Gets all the readable log messages for a specific player
        """
        msgs = [msg.message for msg in self.game_log if msg.player_id == player_id or msg.player_id == "ALL"]
        return msgs


    def add_msg_to_log(self, msg:str, player_id:int = "ALL") -> None:
        # TODO - continue here - need to think about how to fix the changing msg bug
        msg_entry = LogMessage(message=msg, player_id=player_id, timestamp=datetime.datetime.utcnow())
        self.game_log.append(msg_entry)

    def block_location(self, blocker_id:int, location:LocationsEnum):
        if blocker_id not in self.players.keys():
            raise ValueError(f"{blocker_id} is not a valid player ID")

        if location not in self.blocked_locations.keys(): 
            self.blocked_locations[location] = blocker_id  
        else:
            # Location already reported - adding new reporter ID 
            self.blocked_locations[location].append(blocker_id) 

        print(self.blocked_locations[location])


@dataclass
class LogMessage:
    player_id: str | int # Either a player_id int or "ALL" to indicate it's public 
    message: str
    timestamp: datetime
