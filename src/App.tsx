import React, { useState, useEffect } from 'react';
import Location from "./components/Location";
import GameLog from "./components/GameLog";
import io from "socket.io-client";
import Cookies from "universal-cookie";

function App() {
  //const [gameState, setGameState] = useState<GameState>({"players":[""], "current_player_name":"","game_phase":""}) 
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [showChooseLoc, setChooseLoc] = useState<boolean>(true);
  const [logMessages, setLogMessages] = useState<Array<String>>([])

  const cookies = new Cookies();
  
  const socket = io("localhost:5000/", {
    transports: ["websocket"],
  });

  socket.on("UPDATE_GAME_STATE", (game_state) => {
    console.log("I am updating the game state");
    console.log(game_state);
    setCurrentPlayer(game_state["current_player_name"]);
    setCurrentPhase(game_state["game_phase"]);
    setLogMessages(game_state["log_messages"]);
  })

  const existing_player_id = cookies.get("player_id");
  if(!existing_player_id){
    // TODO - replace with uuid. For some reason importing "uuid" doesn't work
    // TODO - check if cookie already exists and also set new UID if not
    const player_id = Math.floor(Math.random() * 1000000000);
    cookies.set("player_id", player_id);
    console.log(cookies.get("player_id"));
    }

  function startGame() {
    // TODO - re-make to send player_id for all players, then start game
    // Start game should take all player_ids sent and add them to a new game
    socket.emit("START_GAME_CLICK")
  }

  function announceLocation(player_id: string, location: string){
    // TODO - replace dummy player ID
    console.log("I'm announcing a location");
    const data = {
        "player_id": player_id,
        "location": location
      }
    socket.emit("ANNOUNCE_LOCATION", data);
    }

  function setButtonVisibility(curPhase: string){
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
    startGame(); // To be tied to a start game button eventually
    setButtonVisibility(currentPhase);
  }, []);
  
  return (
    <div id="overall-container">
        <h3>{currentPlayer} is currently {currentPhase}</h3>
        <div id="gameplay-container">
          <GameLog 
            logMessages={logMessages}/>
          <div id="location-container">
            <Location
              type={"graveyard"}
              chooseLoc={showChooseLoc}
              announceLocation={announceLocation}/>
            <Location
              type={"market"}
              chooseLoc={showChooseLoc}
              announceLocation={announceLocation}/>
          </div>
        </div>
    </div>
  );
}

export default App;

