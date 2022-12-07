import React from "react";

function Button({text, btnClass, onClick}: ButtonProps){
    return(
        <button className={btnClass} onClick={onClick}>{text}</button>
    );
}

type ButtonProps = {
    text: string;
    btnClass: string;
    onClick: (params: any) => any;
}


export default Button;