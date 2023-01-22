import React from "react";

function LocationSelect({onSelect}: LocationSelectProps){
    
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
