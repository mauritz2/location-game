import React, { useState } from "react";
import PropTypes from "prop-types";
import graveyard from "../static/graveyard.png"
import market from "../static/market.png";
import Button from './Button';

function Location({type, chooseLoc}: LocationProps) {

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
    
    function announceLocation(){
        // TODO - continue from here (CORS errors on POST)
        console.log("Announcing locaiton");
        let data = {
            "player_id": "a1a1a1",
            "location": type
        }

        fetch("http://localhost:5000/announce-location", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type":"application/json"}
        });
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
                onClick={announceLocation}/> 
            </> : ""}
        </div>
    );
}

export default Location;

type LocationProps = {
    type: string;
    chooseLoc: boolean;
}

