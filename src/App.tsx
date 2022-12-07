import React, { useState, useEffect } from 'react';
import Location from "./components/Location";
import GameLog from "./components/GameLog";

// Next steps
// Set a cookie with a username

function App() {
  //const [gameState, setGameState] = useState<GameState>({"players":[""], "current_player_name":"","game_phase":""}) 
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [showChooseLoc, setChooseLoc] = useState<boolean>(true);

  function startGame() {
    fetch("/start-game")
    .then((response => response.json()))
    .then((data) => {
      //setGameState(data);
      setCurrentPlayer(data["current_player_name"])
      setCurrentPhase(data["game_phase"])
    })
  }

  function setButtonVisibility(curPhase: string){
    console.log("Current phase:" + curPhase);
    switch(curPhase){
      case "choosing location":
        setChooseLoc(true);
        break;
      default:
        setChooseLoc(true);
        break;
    }
  }

  useEffect(() =>  {
    // Is there a way to call a function once? It keeps calling this func forever.
    startGame();
    setButtonVisibility(currentPhase);
  }, []);
  
  console.log("The current phase is " + currentPhase);

  return (
    <div id="overall-container">
        <h3>{currentPlayer} is currently {currentPhase}</h3>
        <div id="gameplay-container">
          <GameLog />
          <div id="location-container">
            <Location
              type={"graveyard"}
              chooseLoc={showChooseLoc}/>
            <Location
              type={"market"}
              chooseLoc={showChooseLoc}/>
          </div>
        </div>
    </div>
  );
}

export default App;

