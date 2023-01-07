import React, { useState } from "react";
import { ResourceObjectAmts } from "../types";

function Resources({resource_amts}: ResourcesObject){

    const coins_amt = resource_amts["coins"]
    const armor_amt = resource_amts["armor"]
    const herbs_amt = resource_amts["herbs"]
    const scrolls_amt = resource_amts["scrolls"]
    const bones_amt = resource_amts["bones"]

    return(
        <div id="resource-grid">
            <div className="resource">Coins
                <div className="resource-num">{coins_amt}</div>
            </div>
            <div className="resource">
                Armor
                <div className="resource-icon armor"></div>
                <div className="resource-num">{armor_amt}</div>
            </div>
            <div className="resource">Herbs
                <div className="resource-num">{herbs_amt}</div>
            </div>
            
            <div className="resource">Scrolls<div className="resource-num">{scrolls_amt}</div></div>
            
            <div className="resource">Bones<div className="resource-num">{bones_amt}</div></div>
        </div>
    );
}

type ResourcesObject = {
    resource_amts: ResourceObjectAmts;
}

export default Resources;