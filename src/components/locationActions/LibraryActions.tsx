import React, {useState} from "react";
import {LocationActionsFormProps} from "../../types";

function LibraryActions({onSubmit, showSubmit}: LocationActionsFormProps){

    // General state for form
    const [selectedAction, setSelectedAction] = useState<string>("");
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        const data = {
            "action": selectedAction,
            "location": "library",
            "action_details": null 
        }
        onSubmit(data);
    }

    return(
        <>
        <form onSubmit={(e) => {handleSubmit(e); e.preventDefault();}}>
            <div>
                <input type="radio" id="getScroll" name="action" value="getScroll" onChange={event => setSelectedAction(event.target.value)}/>
                <label htmlFor="getScroll">Obtain a scroll</label>
            </div>
            <div>
                <input type="radio" id="scry" name="action" value="scry" onChange={event => setSelectedAction(event.target.value)} />
                <label htmlFor="scry">Pay 2 gold. Learn the location of all other players this round and whether they have reached their objective</label>
            </div>
            <input type="submit" className="btn bg-orange" disabled={showSubmit ? false : true} value="Confirm action"/>
        </form>
        <p>Location bonus (if 2+ visits): <i>Next round, the people that visited the sorcerer this turn will be invisible. Players in the same location as an invisible player won’t be informed that any other players are there. They therefore can’t be interrogated, arrested or engaged in combat.</i></p>
        </>
    );
}

export default LibraryActions