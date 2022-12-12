import React from 'react';
import PropTypes from "prop-types";
import graveyard from "../static/graveyard.png"
import market from "../static/market.png";
import Button from './Button';

// import io from "socket.io-client";

function Location({type, chooseLoc, announceLocation}: LocationProps) {

    // Is it OK to have loose variables like these? Or should they be part of useEffect()?
    let image = "";
    switch(type){
        case "graveyard":
            image = graveyard;
            break;
        case "market":
            image = market;
            break;        
    }
    

    return(
        <div className="location">
            <p>{type}</p>
            <img src={image}></img>
            {chooseLoc ? 
            <>
            <Button
                text={"Go to location"} 
                btnClass={"btn location-btn"}
                onClick={function(){}}/> 
            <Button
                text={"Announce intent"} 
                btnClass={"btn announce-btn"}
                onClick={() => {announceLocation("dummy-player-id", type)}}/> 
            </> : ""}
        </div>
    );
}

export default Location;

type LocationProps = {
    type: string;
    chooseLoc: boolean;
    announceLocation: (player_id: string, location: string) => void;
}

