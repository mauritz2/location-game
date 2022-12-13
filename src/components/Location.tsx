import React from 'react';
import PropTypes from "prop-types";
import graveyard from "../static/graveyard.png"
import market from "../static/market.png";
import Button from './Button';

// import io from "socket.io-client";

function Location({name, onSelect}: LocationProps) {

    // Is it OK to have "loose" variables like these? Or should they be part of useEffect()?
    let image = "";
    switch(name){
        case "graveyard":
            image = graveyard;
            break;
        case "market":
            image = market;
            break;        
    }
    
    return(
        <div className="location">
            <p>{name}</p>
            <img src={image}></img>
            <Button
                text={"See details"} 
                btnClass={"btn location-btn"}
                onClick={() => {onSelect(name)}}/> 
        </div>
    );
}

export default Location;

type LocationProps = {
    name: string;
    onSelect: (name: string) => void;
}

