import React from "react";

// TODO - look into how to use context 
// Context breaks the rule of having to pass state up to the parent
const player_context = React.createContext({});
const player_provider = function({children}){
    return <player_context.Provider>
        {children}
    </player_context.Provider>
}