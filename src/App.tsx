import React, { useState, useEffect } from 'react';
import Location from "./components/Location";
import GameLog from "./components/GameLog";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import LocationDetails from './components/LocationDetails';
import Resources from "./components/Resources"

/* COOKIE SETTING AND GETTING */ 
// TODO - move only once instantiation outside of the React main function
const cookies = new Cookies();

const socket = io("localhost:5000/", {
  transports: ["websocket"],
});

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

function App() {
  //const [gameState, setGameState] = useState<GameState>({"players":[""], "current_player_name":"","game_phase":""}) 
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>({"player_name":"", "player_id":""});
  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [logMessages, setLogMessages] = useState<Array<string>>([])
  const [locationFocus, setLocationFocus] = useState<string>("market")
  // Would it be best practice to define a object like this?
  // For objects as state: https://immerjs.github.io/immer/
  // Reference: https://immerjs.github.io/immer/example-setstate
  const [resources, setResources] = useState<ResourceObjectAmts>({'coins': 0, 'armor': 0, 'herbs': 0, 'scrolls': 0, 'corpses': 0})

  function startGame() {
    // TODO - re-make to send player_id for all players, then start game
    // Start game should take all player_ids sent and add them to a new game
    debugger
    socket.emit("START_GAME_CLICK")
  }

  function onLocationSelect(locationName: string) {
    setLocationFocus(locationName);
  }

  function onActionSubmit(data: ActionObject){
    data["player_id"] = getUUIDFromCookie();
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

        /* SOCKET LISTENERS */
  // TODO - move to useEffect to avoid calling multiple times
  socket.on("UPDATE_RESOURCES", (resources) => {
    setResources(resources);
  });

  socket.on("UPDATE_GAME_STATE", (game_state) => {

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

  socket.on("DAY_OVER", () => {
    console.log("Emitting check location!")
    const player_id = getUUIDFromCookie();
    socket.emit("CHECK_LOCATION", player_id);
  });

  socket.on("LOCATION_MSG", (msg) => {
    console.log(msg);
  })

  /* END OF SOCKET LISTENERS */
  
  },
    // TODO - unsuscribe to what you suscribed to
    // Consider containing file to 100 lines - move logic to context etc.
   []);

  /*
   useEffect(() => {
     // subscribe to what you need
   
     return () => {
       // unsuscribe to what you suscribed to
     }
   }, []) */

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

// TODO - add in a types.tsx file for the types (all of them in the same folder) 
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
// TODO - add in undefined
// TODO - check if more types can have | undefined 

type CurrentPlayer = {
  player_name: string;
  player_id: string;
}

export default App;

