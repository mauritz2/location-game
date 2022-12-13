import React, { useState } from "react";

function Resources({resource_amts}: ResourcesObject){

    const coins_amt = resource_amts["coins"]
    const armor_amt = resource_amts["armor"]
    const herbs_amt = resource_amts["herbs"]
    const scrolls_amt = resource_amts["scrolls"]
    const corpses_amt = resource_amts["corpses"]

    return(
        <div id="resource-grid">
            <div className="resource">Coins<div className="resource-num">{coins_amt}</div></div>
            <div className="resource">Armor<div className="resource-num">{armor_amt}</div></div>
            <div className="resource">Herbs<div className="resource-num">{herbs_amt}</div></div>
            <div className="resource">Scrolls<div className="resource-num">{scrolls_amt}</div></div>
            <div className="resource">Corpses<div className="resource-num">{corpses_amt}</div></div>
        </div>
    );
}

type ResourcesObject = {
    resource_amts: ResourceObjectAmts;
}

type ResourceObjectAmts = {
    coins: number;
    armor: number;
    herbs: number;
    scrolls: number;
    corpses: number;
    }
      

export default Resources;