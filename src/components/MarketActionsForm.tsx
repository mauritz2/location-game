import React, { useState } from "react";

function MarketActionsForm({onSubmit}:MarketActionsFormProps){

    const [selectedAction, setSelectedAction] = useState<string>("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        const data = {
            "action": selectedAction,
            "data": null 
        }
        
        onSubmit(data);

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
            {selectedAction == "trade" ? <p><i>TBD trade input controls</i></p>: ""}

            <input type="submit" className="btn bg-orange" value="Confirm action"></input>
        </form>
        <p>Location bonus (if 2+ visits): <i>Earn 2 additional coins</i></p>
        </>
    );
}

type MarketActionsFormProps = {
    onSubmit: (data: ActionObject) => void;
}

type ActionObject = {
    action: String
    data: String | null
}

export default MarketActionsForm;