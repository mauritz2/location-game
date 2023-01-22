import React, { useState } from "react";
import Button from "./Button";
import MarketActionsForm from "./locationActions/MarketActions";
import WatchmensQuartersActions from "./locationActions/WatchmensQuartersActions";
import GraveyardActions from "./locationActions/GraveyardActions";
import LibraryActions from "./locationActions/LibraryActions";
import Market from "../static/market.png";
import Graveyard from "../static/graveyard.png";
import WatchmensQuarters from "../static/watchmens-quarters.png";
import Library from "../static/library.png";


function LocationDetails({location, announceLocation, onSubmit, showSubmit}: LocationDetailsProps) {

    let img = "";
    switch(location){
        case "market":
            img = Market;
            break;
        case "graveyard":
            img = Graveyard;
            break;
        case "watchmensquarters":
            img = WatchmensQuarters;
            break;
        case "library":
            img = Library;
            break;
    }


    return(
        <div id="location-details-grid">
            <div>
                <img className="location-img" src={img} />
            </div>
            <div>
                <h3 id="location-context-header">The {location}</h3>

                    <Button
                        text={"Announce visit"} 
                        btnClass={"btn bg-turquoise"}
                        onClick={() => {announceLocation(location)}}/>

                    <h4>Actions</h4>
                    {location == "market" ?
                        <MarketActionsForm
                            onSubmit={onSubmit}
                            showSubmit={showSubmit}/> : ""}
                    {location == "watchmensquarters" ?
                        <WatchmensQuartersActions
                            onSubmit={onSubmit}
                            showSubmit={showSubmit}/> : ""}
                    {location == "graveyard" ?
                        <GraveyardActions
                            onSubmit={onSubmit}
                            showSubmit={showSubmit}/> : ""}
                    {location == "library" ?
                        <LibraryActions
                            onSubmit={onSubmit}
                            showSubmit={showSubmit}/> : ""}
                </div>
        </div>
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