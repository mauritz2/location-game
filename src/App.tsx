import React from "react";

import GameLog from "./components/GameLog";
import LocationSelect from "./components/LocationSelect";
import LocationDetails from "./components/LocationDetails";
import Resources from "./components/Resources";
import { useRealTime } from "./context/real-time-context";
import CharacterDetails from "./components/CharacterDetails";
import PlayerOrderStatus from "./components/PlayerOrderStatus";


// Project TODO
// Enable gamelog messages for specific people
// Build report player functionality
// Build in trading
// Create all classes
// Replace market with mage tower
// Make resource names more flexible - i.e. config once ideally
// TODO - make consistent camelCase
// TODO - fix bug where players get the wrong location messages (seems related to game setup)
// TODO - fix UI so that resources and actions are visible at the same time
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
