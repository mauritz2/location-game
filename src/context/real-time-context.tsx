import React, { useState } from "react";
import io from "socket.io-client";
import * as Cookies from "../lib/cookies";
import { ActionObject, CurrentPlayer, ResourceObjectAmts, Character } from "../types";

type RealTimeContextState = {
  setResources: (resources: ResourceObjectAmts) => void;
  resources: ResourceObjectAmts;
} | null;

const RealTimeContext = React.createContext<RealTimeContextState>(null);

const socket = io("localhost:5000/", {
  transports: ["websocket"],
});

export const RealTimeProvider = ({ children }: { children: JSX.Element }) => {
  const [resources, setResources] = React.useState<ResourceObjectAmts>({
    coins: 0,
    armor: 0,
    herbs: 0,
    scrolls: 0,
    corpses: 0,
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
  const [character, setCharacter] = useState<Character>({
    "character": "",
    "objective": [""],
    "objective_bonus": "",
    "objective_text": "",
  });

  const player_id = Cookies.getUUIDFromCookie();

  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>({
    player_name: "",
    player_id: "",
  });

  React.useEffect(() => {
    /* SOCKET LISTENERS */
    socket.on("DAY_OVER", () => {
      socket.emit("CHECK_LOCATION", player_id);
    });

    socket.on("LOCATION_MSG", (msg) => {
      console.log(msg);
    });

    socket.on("UPDATE_RESOURCES", (resources) => {
      context.setResources(resources);
    });
    
    socket.on("UPDATE_CHARACTER", (character_data) => {
      setCharacter(character_data);
    });

    socket.on("UPDATE_GAME_STATE", (game_state) => {
      const current_player = {
        player_name: game_state["current_player_name"],
        player_id: game_state["current_player_id"],
      };

      setCurrentPlayer(current_player);
      setCurrentPhase(game_state["game_phase"]);
      setLogMessages(game_state["log_messages"]);

      if (current_player.player_id == Cookies.getUUIDFromCookie()) {
        setShowSubmit(true);
      } else {
        setShowSubmit(false);
      }

    });

    socket.emit("GET_CHARACTER", player_id)

    // Below causes WebSocket failure - "WebSocket is closed before the connection is established"
    /* 
    return () => {
      socket.close();
    };
   */
  }, []);


  console.log(character)

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
