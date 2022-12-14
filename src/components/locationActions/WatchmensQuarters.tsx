import React, {useState} from "react";
import {LocationActionsFormProps} from "../../types"

function WatchmensQuarters({onSubmit, showSubmit}: LocationActionsFormProps){

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
                <input type="radio" id="getArmor" name="action" value="getArmor" onChange={event => setSelectedAction(event.target.value)}/>
                <label htmlFor="getArmor">Get 1 Armor</label>
            </div>
            <div>
                <input type="radio" id="report" name="action" value="report" onChange={event => setSelectedAction(event.target.value)} />
                <label htmlFor="report">Report a player</label>
            </div>

            <input type="submit" className="btn bg-orange" disabled={showSubmit ? false : true} value="Confirm action"/>
        </form>
        <p>Location bonus (if 2+ visits): <i>Each player obtains a resource of their choice, but they have to announce which one.</i></p>
        </>
    );
}

export default WatchmensQuarters;