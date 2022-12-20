import React from "react";

import GameLog from "./components/GameLog";
import Location from "./components/Location";
import LocationDetails from "./components/LocationDetails";
import Resources from "./components/Resources";
import { useRealTime } from "./context/real-time-context";

function App() {
  const realTime = useRealTime();
  //const [gameState, setGameState] = useState<GameState>({"players":[""], "current_player_name":"","game_phase":""})

  const [locationFocus, setLocationFocus] = React.useState<string>("market");
  // Would it be best practice to define a object like this?

  function onLocationSelect(locationName: string) {
    setLocationFocus(locationName);
  }

  React.useEffect(() => {
    realTime.startGame(); // To be tied to a start game button eventually
  }, []);

  return (
    <div id="overall-container">
      <Resources resource_amts={realTime.resources} />
      <h3>
        {realTime.currentPlayer.player_name} is currently choosing what location
        to visit this night
      </h3>
      <div id="gameplay-container">
        <GameLog logMessages={realTime.logMessages} />
        <div id="location-container">
          <Location name={"graveyard"} onSelect={onLocationSelect} />
          <Location name={"market"} onSelect={onLocationSelect} />
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
