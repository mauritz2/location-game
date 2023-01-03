import React from "react";
import Highwayman from "./../static/highwayman.png"; 
import Toxicologist from "./../static/toxicologist.png"; 
import { Character } from "../types";

function CharacterDetails({character_name, objective, objective_text, objective_bonus}: CharacterDetailsProps) {
    console.log(character_name);

    let image = "";
    switch(character_name){
        case "highwayman":
            image = Highwayman;
            break;
        case "toxicologist":
            image = Toxicologist;
            break;
    }

    return(
        <div>
            <img id="character-portrait" src={image}></img>
            <p id="character-title">{character_name}</p>
            <p><strong>Objective: </strong>{objective_text}(<span className="icon armor" /><span className="icon armor" /><span className="icon armor" />)</p>            
            <p><strong>Bonus: </strong></p>
                <ul>
                    <li>+1 Fighting in the watchmen’s quarters</li>            
                    <li>+1 From each additional armor beyond objective</li>            
                </ul>
        </div>
    );
}

type CharacterDetailsProps = {
    character_name: string;
    objective: Array<string>;
    objective_text: string;
    objective_bonus: string;
}

export default CharacterDetails;