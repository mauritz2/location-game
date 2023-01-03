from character import Character, Characters


class Player(Character):

    def __init__(self, player_id: str, player_name: str, character: Characters) -> None:
        self.player_id = player_id
        self.player_name = player_name
        self.coins = 0
        self.armor = 0
        self.herbs = 0
        self.scrolls = 0
        self.corpses = 0
        # TODO - Review this. We inherit from Character, but also instantiate it here.
        self.character = Character(character) 

    def add_remove_resource(self, resource, amount: int) -> None:
        """
        Takes a negative or positive resource amount as input and adds/removes it from the player
        """
        match resource:
            case "coins":
                self.coins += amount
            case "armor":
                self.armor += amount

    def get_resources(self):
        data = {
            "coins": self.coins,
            "armor": self.armor,
            "herbs": self.herbs,
            "scrolls": self.scrolls,
            "corpses": self.corpses
        }

        return data