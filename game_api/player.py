from character import Character, Characters
from enum import Enum

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


    def get_resources(self):
        data = {
            ResourceEnum.coins.value: self.coins,
            ResourceEnum.armor.value: self.armor,
            ResourceEnum.herbs.value: self.herbs,
            ResourceEnum.scrolls.value: self.scrolls,
            ResourceEnum.bones.value: self.bones
        }

        return data

# TODO - rename Enums to this standard to clarify they're Enums
class ResourceEnum(Enum):
    coins = "coins"
    armor = "armor"
    herbs = "herbs"
    scrolls = "scrolls"
    bones = "bones"