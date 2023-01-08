import React from "react";

import GameLog from "./components/GameLog";
import Location from "./components/Location";
import LocationDetails from "./components/LocationDetails";
import Resources from "./components/Resources";
import { useRealTime } from "./context/real-time-context";
import CharacterDetails from "./components/CharacterDetails";

// Project TODO
// Enable gamelog messages for specific people
// Build report player functionality
// Build in trading
// Create all classes
// Replace market with mage tower
// Make resource names more flexible - i.e. config once ideally
// TODO - make consistent camelCase

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
        <h3>
          {realTime.currentPlayer.player_name} is currently choosing what location
          to visit this night
        </h3>
      </div>
      <div id="gameplay-grid">
        <GameLog logMessages={realTime.logMessages} />
        <div id="location-container">
          <Location name={"market"} onSelect={onLocationSelect} />
          <Location name={"library"} onSelect={onLocationSelect} />
          <Location name={"watchmens-quarters"} onSelect={onLocationSelect} />
          <Location name={"graveyard"} onSelect={onLocationSelect} />
        </div>
        <div id="location-context-container">
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
