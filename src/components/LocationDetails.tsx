import React, { useState } from "react";
import Button from "./Button";
import MarketActionsForm from "./MarketActionsForm";
import ArmoryActions from "./locationActions/WatchmensQuarters";
import GraveyardActions from "./locationActions/GraveyardActions";

function LocationDetails({location, announceLocation, onSubmit, showSubmit}: LocationDetailsProps) {
    // TODO - consider re-naming components - e.g. to columns, locationCol.
    // TODO - displaySubmit is not being used - refactor
    const [displaySubmit, setDisplaySubmit] = useState<boolean>(false);
    const btn_msg = "Announce that you will visit the " + location

    return(
        <>
            <h3 id="location-context-header">The {location}</h3>
            <Button
                text={btn_msg} 
                btnClass={"btn bg-turquoise"}
                onClick={() => {announceLocation(location)}}/> 
            <h4>Actions</h4>
            {location == "market" ?
                <MarketActionsForm
                    onSubmit={onSubmit}
                    showSubmit={showSubmit}/> : ""}
            {location == "watchmens-quarters" ?
                <ArmoryActions
                    onSubmit={onSubmit}
                    showSubmit={showSubmit}/> : ""}
            {location == "graveyard" ?
                <GraveyardActions
                    onSubmit={onSubmit}
                    showSubmit={showSubmit}/> : ""}
        </>
    );
}

type LocationDetailsProps = {
    location: string;
    announceLocation: (location: string) => void;
    onSubmit: (data: ActionObject) => void;
    showSubmit: boolean;
}

type ActionObject = {
    action: string;
    location: string;
    action_details: string | null;
    
}

export default LocationDetails;