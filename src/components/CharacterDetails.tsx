import React from "react";
import highwayman from "./../static/highwayman.png"; 

function CharacterPortrait() {
    return(
        <div>
            <img id="character-portrait" src={highwayman}></img>
            <p id="character-title">Highwayman</p>
            <p><strong>Objective:</strong> Obtain a full set of armor (<span className="icon armor" /><span className="icon armor" /><span className="icon armor" />)</p>            
        </div>
    );
}

export default CharacterPortrait;