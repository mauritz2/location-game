import React, { useState } from "react";
import io from "socket.io-client";
import * as Cookies from "../lib/cookies";
import { ActionObject, CurrentPlayer, ResourceObjectAmounts, CharacterType } from "../types";

type RealTimeContextState = {
  setResources: (resources: ResourceObjectAmounts) => void;
  resources: ResourceObjectAmounts;
} | null;

const RealTimeContext = React.createContext<RealTimeContextState>(null);

const socket = io("localhost:5000/", {
  transports: ["websocket"],
});

export const RealTimeProvider = ({ children }: { children: JSX.Element }) => {
  const [resources, setResources] = React.useState<ResourceObjectAmounts>({
    coins: 0,
    armor: 0,
    herbs: 0,
    scrolls: 0,
    bones: 0,
  });

  return (
    <RealTimeContext.Provider
      value={{
        setResources,
        resources,
      }}
    >
      {children}
    </RealTimeContext.Provider>
  );
};

export const useRealTime = () => {
  const context = React.useContext(RealTimeContext)!;
  const [logMessages, setLogMessages] = useState<Array<string>>([]);
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [character, setCharacter] = useState<CharacterType>({
    "character": "",
    "objective": [""],
    "objectiveText": "",
    "objectiveBonus": ""
  });

  const player_id = Cookies.getUUIDFromCookie();

  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>({
    player_name: "",
    player_id: "",
  });

  React.useEffect(() => {
    /* SOCKET LISTENERS */
    /*socket.on("DAY_OVER", () => {
      socket.emit("CHECK_LOCATION", player_id);
    }); */

/*     socket.on("LOCATION_MSG", (msg) => {
      // TODO - update so this goes to private chat
      // TODO - refactor to remove this and just emit UPDATE_LOG_MSGS intead
      console.log(msg);
    }); */

    socket.on("UPDATE_LOG_MSGS", (msgs) => {
      let oldLogMsgs = new Set<string>(logMessages)
      let allLogMsgs = new Set<string>(msgs);
      let newLogMsgs = new Set<string>([...allLogMsgs].filter(x => !oldLogMsgs.has(x)));
      let newLogMsgsArr = Array.from(newLogMsgs);
      //let newLogMessages = msgs.filter(x => !logMessages.includes(x));
      setLogMessages([...logMessages, ...newLogMsgsArr]);

    })

    socket.on("UPDATE_RESOURCES", (resources) => {
      context.setResources(resources);
    });
    
    socket.on("UPDATE_CHARACTER", (character_data) => {
      setCharacter(character_data);
    });

    socket.on("UPDATE_GAME_STATE", (gameState) => {
      const current_player = {
        player_name: gameState["current_player_name"],
        player_id: gameState["current_player_id"],
      };

      setCurrentPlayer(current_player);
      setCurrentPhase(gameState["game_phase"]);

      let player_id = Cookies.getUUIDFromCookie()

      if (current_player.player_id == player_id) {
        setShowSubmit(true);
      } else {
        setShowSubmit(false);
      }

      // Ask for your log messages and resources
      // TODO - standardize event naming (GET_EVENT vs GET EVENT)
      socket.emit("GET_LOG_MESSAGES", player_id);
      socket.emit("GET_LOG_MESSAGES", player_id);


    });

    socket.emit("GET_CHARACTER", player_id)

    // Below causes WebSocket failure - "WebSocket is closed before the connection is established"
    /* 
    return () => {
      socket.close();
    };
   */
  }, []);

  return {
    currentPhase,
    currentPlayer,
    showSubmit,
    logMessages,
    character,
    resources: context!.resources,
    announceLocation: (location: string) => {
      const data = {
        player_id: Cookies.getUUIDFromCookie(),
        location: location,
      };
      socket.emit("ANNOUNCE_LOCATION", data);
    },
    startGame: () => {
      socket.emit("START_GAME_CLICK");

      // Set UUID coookie if it doesn't exist to identify player
      const existing_player_id = Cookies.getUUIDFromCookie();

      if (!existing_player_id) {
        Cookies.setUUIDCookie();
      }
    },
    onActionSubmit: (data: ActionObject) => {
      data["player_id"] = Cookies.getUUIDFromCookie();
      socket.emit("CHOOSE_DAY_ACTION", data);
    },
  };
};
