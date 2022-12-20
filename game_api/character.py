from enum import Enum, auto


class Characters(Enum):
    highwayman = "highwayman"

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
                self.objective = "Obtain a full set of armor"
