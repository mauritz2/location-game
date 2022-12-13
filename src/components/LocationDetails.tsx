import React from "react";
import Button from "./Button";
import MarketActionsForm from "./MarketActionsForm";

function LocationDetails({location, announceLocation, onSubmit}: LocationDetailsProps) {
    
    const btn_msg = "Announce that you will visit the " + location

    return(
        <>
            <h3 id="location-context-header">{location} details</h3>
            <Button
                text={btn_msg} 
                btnClass={"btn bg-turquoise"}
                onClick={() => {announceLocation("dummy-player-id", location)}}/> 
            <h4>Actions</h4>
            {location == "market" ? <MarketActionsForm onSubmit={onSubmit}/> : ""}
        </>
    );
}

type LocationDetailsProps = {
    location: string;
    announceLocation: (player_id: string, location: string) => void;
    onSubmit: (data: ActionObject) => void;
}

type ActionObject = {
    action: String
    data: String | null
}

export default LocationDetails;