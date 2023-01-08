import React, { useState } from "react";
import { ResourceObjectAmounts } from "../types";

function Resources({resourceAmounts}: ResourcesObject){

    const coins_amt = resourceAmounts["coins"]
    const armor_amt = resourceAmounts["armor"]
    const herbs_amt = resourceAmounts["herbs"]
    const scrolls_amt = resourceAmounts["scrolls"]
    const bones_amt = resourceAmounts["bones"]

    return(
        <div id="resource-grid">
            <div className="resource">
                <div className="resource-icon coins"></div>
                <div className="resource-title">Coins</div>
                <div className="resource-num">{coins_amt}</div>
            </div>
            <div className="resource">
                <div className="resource-icon armor"></div>
                <div className="resource-title">Armor</div>
                <div className="resource-num">{armor_amt}</div>
            </div>
            <div className="resource">
                <div className="resource-icon herbs"></div>
                <div className="resource-title">Herbs</div>
                <div className="resource-num">{herbs_amt}</div>
            </div>
            <div className="resource">
                <div className="resource-icon scrolls"></div>
                <div className="resource-title">Scrolls</div>
                <div className="resource-num">{scrolls_amt}</div>
            </div>
            <div className="resource">
                <div className="resource-icon bones"></div>
                <div className="resource-title">Bones</div>
                <div className="resource-num">{bones_amt}</div>
            </div>            
        </div>
    );
}

type ResourcesObject = {
    resourceAmounts: ResourceObjectAmounts;
}

export default Resources;