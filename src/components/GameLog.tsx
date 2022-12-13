import React from 'react';

function GameLog({logMessages}: GameLogProps){
    // TODO - If new message - flash the latest message
    console.log("The current log messages are " + logMessages);

    const messages: Array<JSX.Element> = [];

    let msg_id = 0;

    logMessages.forEach((msg => {
        msg_id = msg_id + 1;

        if(msg_id === logMessages.length){
            messages.push(<li className="flash-message" key={msg_id}>{msg}</li>)
        }
        else {
            messages.push(<li key={msg_id}>{msg}</li>)
        }
    })) 

    return(
        <ul id="log">
        {messages}
        </ul>
    );
}

type GameLogProps = {
    logMessages: Array<String>;
}

export default GameLog;