
class Player:

    def __init__(self, player_id: str, player_name: str) -> None:
        self.player_id = player_id
        self.player_name = player_name
        self.coins = 0
        self.armor = 0
        self.herbs = 0
        self.scrolls = 0
        self.corpses = 0

    def add_remove_coins(self, amount: int) -> None:
        """
        Takes a negative or positive coin amount as input and adds/removes it from the player
        """
        self.coins += amount

    def get_resources(self):
        data = {
            "coins": self.coins,
            "armor": self.armor,
            "herbs": self.herbs,
            "scrolls": self.scrolls,
            "corpses": self.corpses
        }
        
        return data