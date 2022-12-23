import React from "react";

import GameLog from "./components/GameLog";
import Location from "./components/Location";
import LocationDetails from "./components/LocationDetails";
import Resources from "./components/Resources";
import { useRealTime } from "./context/real-time-context";
import CharacterDetails from "./components/CharacterDetails";

// Project TODO
// Build report player functionality
// Build in trading
// Create all classes
// Replace market with mage tower
// 

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
      <CharacterDetails
        character={realTime.character} />
      <Resources resource_amts={realTime.resources} />
      <h3>
        {realTime.currentPlayer.player_name} is currently choosing what location
        to visit this night
      </h3>
      <div id="gameplay-container">
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
