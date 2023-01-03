from enum import Enum, auto


class Characters(Enum):
    highwayman = "highwayman"
    toxicologist = "toxicologist"

class Character():
    def __init__(self, character: Characters):
        self.character = character
        self.objective = None
        self.objective_text = None
        self.objective_fulfilled = False
        self._set_class_attributes(character=character)

    
    def _set_class_attributes(self, character: Characters):
        match character:
            case "highwayman":
                self.objective = ["armor", "armor", "armor"]
                self.objective_text = "Obtain a full set of armor"
                self.objective_bonus = "+1 from each additional armor beyond the objective && +1 battling in the watchmen's quarters"
            case "toxicologist":
                self.objective = ["herbs", "herbs", "herbs"]
                self.objective_text = "Brew a poison"
                self.objective_bonus = "+1 from each additional herbs beyond objective && +1 battling in the library"

    def get_character_data(self) -> dict[str]:
        character = {
            "character":self.character,
            "objective": self.objective,
            "objective_text": self.objective_text,
            "objective_bonus": self.objective_bonus,
            }
        return character
