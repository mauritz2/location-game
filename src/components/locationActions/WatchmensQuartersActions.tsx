import React, {useState} from "react";
import {LocationActionsFormProps} from "../../types"

function WatchmensQuartersActions({onSubmit, showSubmit}: LocationActionsFormProps){

    const [selectedAction, setSelectedAction] = useState<string>("");
    const [blockedLocation, setBlockedLocation] = useState<string>("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        const data = {
            "action": selectedAction,
            "location": "watchmensquarter",
            "action_details": {} 
        }

        if(selectedAction === "blockLocation"){
            data["action_details"] = {"blockedLocation": blockedLocation};
        }

        onSubmit(data);
    }

    return(
        <>
        <form onSubmit={(e) => {handleSubmit(e); e.preventDefault();}}>
            <div>
                <input type="radio" id="market" name="action" value="market" onChange={event => setSelectedAction(event.target.value)}/>
                <label htmlFor="market"><strong> Smith: </strong>Obtain 1 Armor</label>
            </div>
            <div>
                <input type="radio" id="blockLocation" name="action" value="blockLocation" onChange={event => setSelectedAction(event.target.value)} />
                <label htmlFor="blockLocation"><strong> Report: </strong>Pay 2 gold to secretly name a location - 
                all players at that location this round will lose their turn without performing any location action. 
                You also get half their gold (rounded down).</label>
            </div>
            <div>
                { selectedAction === "blockLocation" ?
                    <>
                    <div>
                        <input type="radio" id="market" name="location" value="market" onChange={event => setBlockedLocation(event.target.value)}/>
                        <label htmlFor="market">Market</label>
                    </div>
                    <div>
                        <input type="radio" id="library" name="location" value="library" onChange={event => setBlockedLocation(event.target.value)}/>
                        <label htmlFor="library">Library</label>
                    </div>
                    <div>
                        <input type="radio" id="watchmen's quarter" name="location" value="watchmen's quarter" onChange={event => setBlockedLocation(event.target.value)}/>
                        <label htmlFor="watchmen's quarter">Watchmen's Quarter</label>
                    </div>
                    <div>
                        <input type="radio" id="graveyard" name="location" value="graveyard" onChange={event => setBlockedLocation(event.target.value)}/>
                        <label htmlFor="graveyard">Graveyard</label>
                    </div>
                    </>
                : ""}
            </div>
            <input type="submit" className="btn bg-orange" disabled={showSubmit ? false : true} value="Confirm visit"/>
        </form>
        </>
    );
}

export default WatchmensQuartersActions;