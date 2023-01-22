import React from "react";
import {CurrentPlayerType} from "../types";

function PlayerOrderStatus({playerNames, currentPlayer}: PlayerOrderStatusType) {
    
    let player_chevrons = []
    for(let i=0; i<playerNames.length; i++){
        let playerName = playerNames[i];
        if( playerName == currentPlayer.player_name){
            player_chevrons.push(<div className="chevron active">{playerName}</div>)
        }
        else{
            player_chevrons.push(<div className="chevron">{playerName}</div>)
        }
    }
    
    return(
        <div>
        {player_chevrons}
        </div>        
    );
}

export default PlayerOrderStatus;

type PlayerOrderStatusType = {
    playerNames: Array<string>;
    currentPlayer: CurrentPlayerType;
}