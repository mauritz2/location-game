import React, { useState, useEffect } from "react";
import Highwayman from "./../static/highwayman.png"; 
import Toxicologist from "./../static/toxicologist.png"; 
import { CharacterType } from "../types";

function CharacterDetails({character, objective, objectiveText, objectiveBonus}: CharacterType) {
    
    let image = "";
    switch(character){
        case "highwayman":
            image = Highwayman;
            break;
        case "toxicologist":
            image = Toxicologist;
            break;
    }

    // Create JSX element for resource icons for resources to reach objective
    let objective_jsx: Array<JSX.Element> = []
    objective.forEach(resource => {
        objective_jsx.push(<span className={"icon " + resource}></span>)
    });
    
    const bonuses = objectiveBonus.split("&&")

    return(
        <div id="character-details-grid">
            <img id="character-portrait" src={image}></img>
            <div id="character-details">
                <p id="character-title">{character}</p>
                <p><strong>Objective: </strong>{objectiveText}: {objective_jsx}</p>            
                <p><strong>Bonus: </strong></p>
                    <ul>
                        <li>{bonuses[0]}</li>            
                        <li>{bonuses[1]}</li>            
                    </ul>
            </div>
        </div>
    );
}

export default CharacterDetails;