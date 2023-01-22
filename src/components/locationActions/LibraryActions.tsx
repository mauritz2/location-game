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
                <label htmlFor="getScroll"><strong> Study: </strong>Obtain a scroll</label>
            </div>
            <div>
                <input type="radio" id="scry" name="action" value="scry" onChange={event => setSelectedAction(event.target.value)} />
                <label htmlFor="scry"><strong> Scry: </strong>Pay 2 gold. Learn the location of all other players this round and whether they have reached their objective</label>
            </div>
            <input type="submit" className="btn bg-orange" disabled={showSubmit ? false : true} value="Confirm visit"/>
        </form>
        </>
    );
}

export default LibraryActions