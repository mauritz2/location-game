import React from 'react';

function GameLog({logMessages}: GameLogProps){
    // TODO - If new message - flash the latest message
    console.log("The current log messages are " + logMessages);

    const messages: Array<JSX.Element> = [];

    logMessages.forEach((msg => {
        messages.push(<li>{msg}</li>)
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