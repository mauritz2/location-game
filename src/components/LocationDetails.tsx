import React, { useState } from "react";
import Button from "./Button";
import MarketActionsForm from "./MarketActionsForm";
import ArmoryActions from "./locationActions/WatchmensQuarters";

function LocationDetails({location, announceLocation, onSubmit, showSubmit}: LocationDetailsProps) {
    
    const [displaySubmit, setDisplaySubmit] = useState<boolean>(false);
    const btn_msg = "Announce that you will visit the " + location

    return(
        <>
            <h3 id="location-context-header">{location} details</h3>
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