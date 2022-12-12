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
    setCurrentPhase(game_state["game_phase"]);
    setLogMessages(game_state["log_messages"]);
  })


  function startGame() {
    fetch("api/start-game")
    .then((response => response.json()))
    .then((data) => {
      //setGameState(data);
      setCurrentPlayer(data["current_player_name"])
      setCurrentPhase(data["game_phase"])
    })
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

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  useEffect(() =>  {
    // Is there a way to call a function once? It keeps calling this func forever.
    // TODO - bring this back
    // startGame();
    setButtonVisibility(currentPhase);
  
    
    // TODO - bring back. Cookie code makes page take a very long time to load
    /*   
    const existing_player_id = cookies.get("player_id");
    if(existing_player_id.length === 0){
      // TODO - replace with uuid. For some reason importing "uuid" doesn't work
      // TODO - check if cookie already exists and also set new UID if not
      const player_id = Math.floor(Math.random() * 1000000000);
      cookies.set("player_id", player_id);
      console.log(cookies.get("player_id"));
      }
      */
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

