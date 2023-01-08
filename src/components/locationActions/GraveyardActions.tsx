import React, {useState} from "react";
import {LocationActionsFormProps} from "../../types"

function GraveyardActions({onSubmit, showSubmit}: LocationActionsFormProps){
    
    const [selectedAction, setSelectedAction] = useState<string>("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        const data = {
            "action": selectedAction,
            "location": "armory",
            "action_details": null 
        }
        onSubmit(data);
    }
    
    return(
        <>
        <form onSubmit={(e) => {handleSubmit(e); e.preventDefault();}}>
            <div>
                <input type="radio" id="getBones" name="action" value="getBones" onChange={event => setSelectedAction(event.target.value)}/>
                <label htmlFor="getBones">Get 1 Bone <span className="icon armor" /></label>
            </div>
            <div>
                <input type="radio" id="getHerbs" name="action" value="getHerbs" onChange={event => setSelectedAction(event.target.value)} />
                <label htmlFor="getHerbs">Get 1 Herb</label>
            </div>

            <input type="submit" className="btn bg-orange" disabled={showSubmit ? false : true} value="Confirm action"/>
        </form>
        <p>Location bonus (if 2+ visits): <i>Obtain both one bone AND one herb (the one you didn’t select)</i></p>
        </>
    );
}

export default GraveyardActions;