import React, { useState } from "react";
import ResourceSelector from "../ResourceSelector";
import {LocationActionsFormProps} from "../../types";
 
function MarketActions({onSubmit, showSubmit}: LocationActionsFormProps){

    // General state for form
    const [selectedAction, setSelectedAction] = useState<string>("");
    
    // Market-specific state
    // TODO - set the type here to be any resource name!
    const [resourceToGive, setResourceToGive] = useState<string>("");
    const [resourceToReceive, setResourceToReceive] = useState<string>("");

    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        let data = {
            "action": selectedAction,
            "location": "market",
            "action_details": {}
        }
        
        switch(selectedAction){
            case "trade": 
                let tradeData = {
                    "resourceToGive": resourceToGive,
                    "resourceToReceive": resourceToReceive
                } 
                data["action_details"] = tradeData
        }

        
        onSubmit(data);
    }

    function changeResourceToGive(resource: string){
        setResourceToGive(resource)
    }

    function changeResourceToReceive(resource: string){
        setResourceToReceive(resource)
    }

    return(
        <>
        <form onSubmit={(e) => {handleSubmit(e); e.preventDefault();}}>
            <div>
                <input type="radio" id="earn" name="action" value="earn" onChange={event => setSelectedAction(event.target.value)}/>
                <label htmlFor="earn">Earn 2 coins</label>
            </div>
            <div>
                <input type="radio" id="trade" name="action" value="trade" onChange={event => setSelectedAction(event.target.value)} />
                <label htmlFor="trade">Trade one resource for any other resource or 4 coins</label>
            </div>
            {selectedAction == "trade" ?
                <>
                <p><strong>Choose what to give</strong></p>
                <ResourceSelector onValueSelect={setResourceToGive} showGold={false} limitToAvailable={true}/>
                <p><strong>Choose what to receive</strong></p>
                <ResourceSelector onValueSelect={setResourceToReceive} showGold={true} limitToAvailable={false}/>
                </>
                : ""}

            <input type="submit" className="btn bg-orange" disabled={showSubmit ? false : true} value="Confirm action"/>
        </form>
        <p>Location bonus (if 2+ visits): <i>Earn 2 additional coins</i></p>
        </>
    );
}

export default MarketActions;