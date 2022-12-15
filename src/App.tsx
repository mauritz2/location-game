import React, { useState, useEffect } from 'react';
import Location from "./components/Location";
import GameLog from "./components/GameLog";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import LocationDetails from './components/LocationDetails';
import Resources from "./components/Resources"

function App() {
  //const [gameState, setGameState] = useState<GameState>({"players":[""], "current_player_name":"","game_phase":""}) 
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>({"player_name":"", "player_id":""});
  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [logMessages, setLogMessages] = useState<Array<string>>([])
  const [locationFocus, setLocationFocus] = useState<string>("market")
  // Would it be best practice to define a object like this?
  const [resources, setResources] = useState<ResourceObjectAmts>({'coins': 0, 'armor': 0, 'herbs': 0, 'scrolls': 0, 'corpses': 0})

  const socket = io("localhost:5000/", {
    transports: ["websocket"],
  });

  /* COOKIE SETTING AND GETTING */ 
  const cookies = new Cookies();
  
  function setUUIDCookie(){
    // TODO - replace with uuid. For some reason importing "uuid" doesn't work
    // TODO - check if cookie already exists and also set new UID if not
    const player_id = Math.floor(Math.random() * 1000000000);
    cookies.set("player_id", player_id);
  }

  function getUUIDFromCookie(){
    const player_id = cookies.get("player_id");
    return player_id; 
  }
  /* COOKIE SETTING END  */ 

  /* SOCKET LISTENERS */
  socket.on("UPDATE_RESOURCES", (resources) => {
    setResources(resources);
  });

  socket.on("UPDATE_GAME_STATE", (game_state) => {
    console.log(game_state);

    const current_player = {
      "player_name": game_state["current_player_name"],
      "player_id": game_state["current_player_id"]
    }

    if(current_player.player_id == getUUIDFromCookie()){
      setShowSubmit(true)
    }
    else{
      setShowSubmit(false)
    }

    setCurrentPlayer(current_player);
    setCurrentPhase(game_state["game_phase"]);
    setLogMessages(game_state["log_messages"]);
  });

  socket.on("DAY_END", () => {
    const player_id = getUUIDFromCookie();
    socket.emit("CHECK_LOCATION", player_id);
  });

  socket.on("LOCATION_MSG", (msg) => {
    console.log(msg);
  })

  /* END OF SOCKET LISTENERS */

  function startGame() {
    // TODO - re-make to send player_id for all players, then start game
    // Start game should take all player_ids sent and add them to a new game
    socket.emit("START_GAME_CLICK")
  }

  function onLocationSelect(locationName: string) {
    setLocationFocus(locationName);
  }

  function onActionSubmit(data: ActionObject){
    data["player_id"] = getUUIDFromCookie();
    console.log(data);
    socket.emit("CHOOSE_DAY_ACTION", data);
  }

  function announceLocation(location: string){
    // TODO - replace dummy player ID
    const data = {
        "player_id": getUUIDFromCookie(),
        "location": location
      }
    socket.emit("ANNOUNCE_LOCATION", data);
    }


  useEffect(() =>  {
    startGame(); // To be tied to a start game button eventually

    // Set UUID coookie if it doesn't exist to identify player
    const existing_player_id = cookies.get("player_id");
    if(!existing_player_id){
        setUUIDCookie();
      }
  
  }, []);
  
  return (
    <div id="overall-container">
        <Resources
          resource_amts={resources}/>
        <h3>{currentPlayer.player_name} is currently choosing what location to visit this night</h3>
        <div id="gameplay-container">
          <GameLog 
            logMessages={logMessages}/>
          <div id="location-container">
            <Location
              name={"graveyard"}
              onSelect={onLocationSelect}/>
            <Location
              name={"market"}
              onSelect={onLocationSelect}/>
          </div>
          <div id="location-context-container">
            <LocationDetails
              location={locationFocus}
              announceLocation={announceLocation}
              onSubmit={onActionSubmit}
              showSubmit={showSubmit}/>
          </div>
        </div>
    </div>
  );
}

type ActionObject = {
  action: string
  location: string
  action_details: string | null
  player_id?: string
}

type ResourceObjectAmts = {
  coins: number;
  armor: number;
  herbs: number;
  scrolls: number;
  corpses: number;
}

type CurrentPlayer = {
  player_name: string;
  player_id: string;
}

export default App;

