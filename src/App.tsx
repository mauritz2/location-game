import React from "react";
import GameLog from "./components/GameLog";
import LocationSelect from "./components/LocationSelect";
import LocationDetails from "./components/LocationDetails";
import Resources from "./components/Resources";
import { useRealTime } from "./context/real-time-context";
import CharacterDetails from "./components/CharacterDetails";
import PlayerOrderStatus from "./components/PlayerOrderStatus";

// Project TODO
// Create all classes
// Implement Objective Complete check on resource gain --> + Visual indicator
// Implement guessing at end --> Correct guesser wins?
// Implement something to make it tougher to guess... 

// Make sure you can't confirm action without selecting an action
// Make sure you can't trade without an action
// Make resource names more flexible - i.e. config once ideally
// TODO - make consistent camelCase
// TODO - should there be a location to "switch" your character? Or when you are reported - should you get a new char?

function App() {
  const realTime = useRealTime();
  const [locationFocus, setLocationFocus] = React.useState<string>("market");

  function onLocationSelect(locationName: string) {
    setLocationFocus(locationName);
  }

  React.useEffect(() => {
    realTime.startGame(); // To be tied to a start game button eventually
  }, []);

  return (
    <div id="overall-container">
      <div id="header-grid">
        <CharacterDetails
          character={realTime.character.character}
          objective={realTime.character.objective}
          objectiveText={realTime.character.objectiveText}
          objectiveBonus={realTime.character.objectiveBonus} />
        <Resources resourceAmounts={realTime.resources} />
        <PlayerOrderStatus playerNames={realTime.playerNames} currentPlayer={realTime.currentPlayer} />
      </div>
      <div id="gameplay-grid">
        <GameLog logMessages={realTime.logMessages} />
      <div id="location-container">
        <LocationSelect onSelect={onLocationSelect} />
        <LocationDetails
          location={locationFocus}
          announceLocation={realTime.announceLocation}
          onSubmit={realTime.onActionSubmit}
          showSubmit={realTime.showSubmit}
        />
      </div>
      </div>
    </div>
  );
}

export default App;
