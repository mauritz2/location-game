import React, { useState, useEffect } from "react";
import Highwayman from "./../static/highwayman.png"; 
import Toxicologist from "./../static/toxicologist.png"; 
import { Character } from "../types";

function CharacterDetails({characterName, objective, objectiveText, objectiveBonus}: CharacterDetailsProps) {
    
    let image = "";
    switch(characterName){
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
        <div>
            <img id="character-portrait" src={image}></img>
            <p id="character-title">{characterName}</p>
            <p><strong>Objective: </strong>{objectiveText}: {objective_jsx}</p>            
            <p><strong>Bonus: </strong></p>
                <ul>
                    <li>{bonuses[0]}</li>            
                    <li>{bonuses[1]}</li>            
                </ul>
        </div>
    );
}

type CharacterDetailsProps = {
    characterName: string;
    objective: Array<string>;
    objectiveText: string;
    objectiveBonus: string;
}

export default CharacterDetails;