import React, { useState, useEffect } from "react";
import Highwayman from "./../static/highwayman.png"; 
import Toxicologist from "./../static/toxicologist.png"; 
import { CharacterType } from "../types";

function CharacterDetails({character, objective, objectiveText, objectiveBonus}: CharacterType) {
    
    const [showDetails, setShowDetails] = useState(false);

    function toggleShowDetails(){
        let currentToggle = showDetails;
        setShowDetails(!currentToggle);
    }

    // Define character image
    let image = "";
    switch(character){
        case "highwayman":
            image = Highwayman;
            break;
        case "toxicologist":
            image = Toxicologist;
            break;
    }

    // Define JSX element for resource icons for resources to reach objective
    let objective_jsx: Array<JSX.Element> = []
    objective.forEach(resource => {
        objective_jsx.push(<span className={"icon " + resource}></span>)
    });
    
    // Define array with text for character bonuses
    const bonuses = objectiveBonus.split("&&")

    return(
        <div className="tall-col">
            <div id="character-details-container">
                <img id="character-portrait" src={image}></img>
                <input id="char-details-toggle-btn" type="button" value="?" onClick={() => toggleShowDetails()} />
            </div>
            <div>
                <p id="character-title">{character}</p>
            </div> 
            <div className={"character-details " + (showDetails ? "visible": "")}>
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