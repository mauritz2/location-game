import React from "react";

function LocationSelect({onSelect}: LocationSelectProps){

    // TODO - refactor this approach it's repetitive
/*     let market = document.getElementById("market")!
    let library = document.getElementById("library")
    let watchmensquarters = document.getElementById("watchmensquarters")
    let graveyard = document.getElementById("graveyard")

    if (market === null){
        console.log("I'm null!")
    }
    else {
        market.onclick() = hey(market.value)
    }

    function hey() {
        console.log("AA")
    } */
    
    return(
    <div className="location-select-grid">
        <div className="radio-button" onChange={(event:React.ChangeEvent<HTMLInputElement>) => onSelect(event.target.value)}>
            <input type="radio" id="market" value="market" name="location" />
            <label className="btn btn-default">The Market</label>
        </div>
        <div className="radio-button" onChange={(event:React.ChangeEvent<HTMLInputElement>) => onSelect(event.target.value)}>
            <input type="radio" id="library" value="library" name="location" />
            <label className="btn btn-default">The Library</label>
        </div>
        <div className="radio-button" onChange={(event:React.ChangeEvent<HTMLInputElement>) => onSelect(event.target.value)}>
            <input type="radio" id="watchmensquarters" value="watchmensquarters" name="location" />
            <label className="btn btn-default">Watchmen's quarter</label>
        </div>
        <div className="radio-button" onChange={(event:React.ChangeEvent<HTMLInputElement>) => onSelect(event.target.value)}>
            <input type="radio" id="graveyard" value="graveyard" name="location" />
            <label className="btn btn-default">Graveyard</label>
        </div>
    </div>
    );
}

export default LocationSelect;

type LocationSelectProps = {
    onSelect: (name: string) => void;
}
