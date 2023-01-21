import game_balance_config as config
from character import Character, Characters
from enum import Enum

# TODO - rename Enums to this standard to clarify they're Enums
class ResourceEnum(Enum):
    coins = "coins"
    armor = "armor"
    herbs = "herbs"
    scrolls = "scrolls"
    bones = "bones"


class PlayerConditionsEnum(Enum):
    scrying = "scrying"
    invisible = "invisible"
    reported = "reported"
    reporting = "reporting"


class Player(Character):

    def __init__(self, player_id: str, player_name: str, character: Characters) -> None:
        self.player_id = player_id
        self.player_name = player_name
        # TODO - is it possible to use the ResourceEnum to define the vars here in a non-messy way?
        self.coins = 0
        self.armor = 0
        self.herbs = 0
        self.scrolls = 0
        self.bones = 0
        # TODO - Review this. We inherit from Character, but also instantiate it here.
        self.character = Character(character)
        self.conditions = []
        self.queued_action = {}
        

    def add_remove_resource(self, resource, amount: int) -> None:
        """
        Takes a negative or positive resource amount as input and adds/removes it from the player
        """
        # TODO - insert check here that resources aren't going negative
        match resource:
            case ResourceEnum.coins.value:
                self.coins += amount
            case ResourceEnum.armor.value:
                self.armor += amount
            case ResourceEnum.herbs.value:
                self.herbs += amount
            case ResourceEnum.scrolls.value:
                self.scrolls += amount
            case ResourceEnum.bones.value:
                self.bones += amount
            case other:
                raise ValueError(f"Resource {resource} does not exist!")


    def add_condition(self, condition:PlayerConditionsEnum):
        """
        Adds a condition to the player (e.g. scrying, invisible)
        that grants special effects at round resolution
        """

        valid_conditions = [condition.value for condition in PlayerConditionsEnum]
        if condition not in valid_conditions:
            raise ValueError(f"Condition {condition} is not in list of valid conditions {valid_conditions}")
        self.conditions.append(condition)


    def clear_conditions(self):
        self.conditions = []


    def queue_action(self, queued_action_data:dict):
        self.queued_action = queued_action_data


    def execute_queued_action(self):
        action = self.queued_action["action"]
        action_details = self.queued_action["action_details"]

        match action:
            case "earn":
                self.add_remove_resource(ResourceEnum.coins.value, 2)
            case "getArmor":
                self.add_remove_resource(ResourceEnum.armor.value, 1)
            case "getBones":
                self.add_remove_resource(ResourceEnum.bones.value, 1)
            case "getHerbs":
                self.add_remove_resource(ResourceEnum.herbs.value, 1)
            case "getScroll":
                self.add_remove_resource(ResourceEnum.scrolls.value, 1)
            case "scry":
                self.add_remove_resource(ResourceEnum.coins.value, -2)            
                self.add_condition(PlayerConditionsEnum.scrying.value)
            case "trade":
                to_give = action_details["resourceToGive"]
                to_receive = action_details["resourceToReceive"] 
                self.add_remove_resource(to_give, -1)
                if to_receive == ResourceEnum.coins.value:
                    self.add_remove_resource(to_receive, config.COINS_FOR_RESOURCE)
                else:
                    self.add_remove_resource(to_receive, 1)
        

    def get_resources(self):
        data = {
            ResourceEnum.coins.value: self.coins,
            ResourceEnum.armor.value: self.armor,
            ResourceEnum.herbs.value: self.herbs,
            ResourceEnum.scrolls.value: self.scrolls,
            ResourceEnum.bones.value: self.bones
        }

        return data

