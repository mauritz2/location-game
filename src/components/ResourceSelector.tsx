import React from "react"
import {useRealTime} from "../context/real-time-context"

function ResourceSelector({onValueSelect = () => {}, showGold, limitToAvailable} : ResourceSelectorProps) {
    // Refactor - each file that references realtime needs to instantiate it (?) 
    const  realTime = useRealTime()
    const resources = realTime.resources

    // TODO Refactor to remove line lengths here - a func can be used to assess true/false for disable
    // TODO - make sure people can't trade if they didn't select a resource to loose
    return(
        <div className="resource-selector">
        
        <form>
            {showGold ?
            <div>
                <input type="radio" id="coins" name="action" value="coins" onChange={event => onValueSelect(event.target.value)} disabled={resources.coins === 0 && limitToAvailable ? true : false}/>
                <label htmlFor="coins">Coins</label>
            </div>
            : ""}
            <div>
                <input type="radio" id="armor" name="action" value="armor" onChange={event => onValueSelect(event.target.value)} disabled={resources.armor === 0 && limitToAvailable ? true : false}/>
                <label htmlFor="armor">Armor</label>
            </div>
            <div>
                <input type="radio" id="herbs" name="action" value="herbs" onChange={event => onValueSelect(event.target.value)} disabled={resources.herbs === 0 && limitToAvailable ? true : false}/>
                <label htmlFor="herbs">Herbs</label>
            </div>
            <div>
                <input type="radio" id="scrolls" name="action" value="scrolls" onChange={event => onValueSelect(event.target.value)} disabled={resources.scrolls === 0 && limitToAvailable ? true : false}/>
                <label htmlFor="scrolls">Scrolls</label>
            </div>
            <div>
                <input type="radio" id="bones" name="action" value="bones" onChange={event => onValueSelect(event.target.value)} disabled={resources.bones === 0 && limitToAvailable ? true : false}/>
                <label htmlFor="bones">Bones</label>
            </div>
        </form>
        </div>

    );
}

type ResourceSelectorProps = {
    onValueSelect: (resource: string) => void;
    showGold: boolean;
    limitToAvailable: boolean;
}

export default ResourceSelector;