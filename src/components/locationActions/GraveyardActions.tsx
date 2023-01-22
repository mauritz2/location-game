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
                <label htmlFor="getBones"><strong> Dig: </strong>Obtain 1 Bone</label>
            </div>
            <div>
                <input type="radio" id="getHerbs" name="action" value="getHerbs" onChange={event => setSelectedAction(event.target.value)} />
                <label htmlFor="getHerbs"><strong> Forage: </strong>Obtain 1 Herb</label>
            </div>

            <input type="submit" className="btn bg-orange" disabled={showSubmit ? false : true} value="Confirm visit"/>
        </form>
        </>
    );
}

export default GraveyardActions;