import React from "react";
import highwayman from "./../static/highwayman.png"; 
import armorIcon from "./../static/armor-icon.png";

function CharacterPortrait() {
    return(
        <div>
            <img id="character-portrait" src={highwayman}></img>
            <p id="character-title">Highwayman</p>
            <p><strong>Objective:</strong> Obtain a full set of armor (<img className="icon" src={armorIcon}></img>, <img className="icon" src={armorIcon}></img>, <img className="icon" src={armorIcon}></img>)</p>            
        </div>
    );
}

export default CharacterPortrait;