import React from "react";
import {CurrentPlayerType} from "../types";

function PlayerOrderStatus({playerNames, currentPlayer}: PlayerOrderStatusType) {
    
    let chevrons = []
    for(let i=0; i<playerNames.length; i++){
        let playerName = playerNames[i];
        if( playerName == currentPlayer.player_name){
            chevrons.push(<div className="chevron active">{playerName}</div>)
        }
        else{
            chevrons.push(<div className="chevron">{playerName}</div>)
        }
    }
    
    return(
        <>
        {chevrons}
        </>
        
    );
}

export default PlayerOrderStatus;

type PlayerOrderStatusType = {
    playerNames: Array<string>;
    currentPlayer: CurrentPlayerType;
}