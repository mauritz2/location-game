import React from "react";
import highwayman from "./../static/highwayman.png"; 

function CharacterPortrait({character}) {
    return(
        <div>
            <img id="character-portrait" src={highwayman}></img>
            <p id="character-title">Highwayman</p>
            <p><strong>Objective:</strong> Obtain a full set of armor (<span className="icon armor" /><span className="icon armor" /><span className="icon armor" />)</p>            
            <p><strong>Bonus:</strong></p>
                <ul>
                    <li>+1 Fighting in the watchmen’s quarters</li>            
                    <li>+1 From each additional armor beyond objective</li>            
                </ul>
        </div>
    );
}

export default CharacterPortrait;