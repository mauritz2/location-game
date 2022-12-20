import React from 'react';
import graveyard from "../static/graveyard.png";
import market from "../static/market.png";
import Button from './Button';
import watchmensQuarters from "../static/watchmens-quarters.png";

function Location({name, onSelect}: LocationProps) {

    let image = "";
    switch(name){
        case "graveyard":
            image = graveyard;
            break;
        case "market":
            image = market;
            break;        
        case "watchmens-quarters":
            image = watchmensQuarters;
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

