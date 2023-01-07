import React from "react"

function ResourceSelector({onValueSelect = () => {}, showGold}: ResourceSelectorProps) {
    // resources: <Array><string>
    // displayGold:bool
    // It has to check if you have it
    // {selectedAction == "armor" ? <p><i>TBD armor input controls</i></p>: ""}
    // Todo - create a prop here for this component to receive the resources to display - so it's not hard coded
    //<input type="submit" className="btn bg-orange" disabled={showSubmit ? false : true} value="Confirm action"/>

    return(
        <div className="resource-selector">
        <form>
            {showGold ?
            <div>
                <input type="radio" id="coins" name="action" value="coins" onChange={event => onValueSelect(event.target.value)}/>
                <label htmlFor="coins">Coins</label>
            </div>
            : ""}
            <div>
                <input type="radio" id="armor" name="action" value="armor" onChange={event => onValueSelect(event.target.value)}/>
                <label htmlFor="armor">Armor</label>
            </div>
            <div>
                <input type="radio" id="herbs" name="action" value="herbs" onChange={event => onValueSelect(event.target.value)} />
                <label htmlFor="herbs">Herbs</label>
            </div>
            <div>
                <input type="radio" id="scrolls" name="action" value="scrolls" onChange={event => onValueSelect(event.target.value)} />
                <label htmlFor="scrolls">Scrolls</label>
            </div>
            <div>
                <input type="radio" id="corpses" name="action" value="corpses" onChange={event => onValueSelect(event.target.value)} />
                <label htmlFor="corpses">Corpses</label>
            </div>
        </form>
        </div>

    );
}

type ResourceSelectorProps = {
    onValueSelect: (resource: string) => void;
    showGold: boolean;
}

export default ResourceSelector;