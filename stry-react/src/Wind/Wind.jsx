import {currentWindSpeed} from "../Weather/Weather";
import React, {useEffect, useState} from "react";
import {getWindData} from "../functions/bremen-wind";
import {todayDate} from "../functions/times";

let windTimeout = null;

export const Wind = () => {

    const [windDataList, setWindDataList] = useState({});
    const [fetchTimestamp, setFetchTimestamp] = useState("");

    const [resetList, setResetList] = useState(true);

    useEffect(() => {

        async function fetchData() {
            if(todayDate()!==fetchTimestamp) {

                setWindDataList(await getWindData());
                setFetchTimestamp(todayDate);

            } else {

                //reload useEffect in 250ms intervals
                setTimeout(() =>{
                    resetList? setResetList(false):setResetList(true);
                },250)

            }
        }

        fetchData();
    }, [windDataList])

    return (

        <svg>

            <filter id="turbulence-1">
                <feTurbulence type="fractalNoise" baseFrequency="0.001" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList)}/>
            </filter>

            <filter id="turbulence-2">
                <feTurbulence type="fractalNoise" baseFrequency="0.0015" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList)}/>
            </filter>

            <filter id="turbulence-3">
                <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList)}/>
            </filter>

            <filter id="turbulence-4">
                <feTurbulence type="fractalNoise" baseFrequency="0.0025" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList)}/>
            </filter>

            <filter id="turbulence-5">
                <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList)}/>
            </filter>

        </svg>
    );
}

/*
Klassifikationen, die für das Mapping herangezogen wurden
Quelle: https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv3=100390&lv2=100310

Windstille	        < 1km/h         -   0
leiser Zug	        1 - 5km/h       -   0
leichte Brise	    6 - 11km/h      -   4
schwache Brise      12 - 19km/h     -   6
mäßige Brise	    20 - 28km/h     -   8
frische Brise       29 - 38km/h     -   12
starker Wind	    39 - 49km/h     -   22
steifer Wind	    50 - 61km/h     -   30
stürmischer Wind    62 - 74km/h     -   42
Sturm	            75 - 88km/h     -   61
schwerer Sturm	    89 - 102km/h    -   75
orkanartiger Sturm	103 - 117km/h   -   85
Orkan	            ab 118km/h      -   95
 */
function getCurrentWind(windDataList) {
    let currentWindSpeed = windDataList[todayDate()]

    //TODO Debug wind here

    if(isNaN(currentWindSpeed)){ return 0; }    //NaN-Check

    if (currentWindSpeed <= 5) { return 0; }    //Windstille & leiser Zug
    if (currentWindSpeed <= 11) { return 4; }   //leichte Brise
    if (currentWindSpeed <= 19) { return 6; }   //schwache Brise
    if (currentWindSpeed <= 28) { return 8; }   //mäßige Brise
    if (currentWindSpeed <= 38) { return 12; }  //frische Brise
    if (currentWindSpeed <= 49) { return 22; }  //starker Wind
    if (currentWindSpeed <= 61) { return 30; }  //steifer Wind
    if (currentWindSpeed <= 74) { return 42; }  //stürmischer Wind
    if (currentWindSpeed <= 88) { return 61; }  //Sturm
    if (currentWindSpeed <= 102) { return 75; } //schwerer Sturm
    if (currentWindSpeed <= 117) { return 85; } //orkanartiger Sturm
    if (currentWindSpeed >= 118) { return 95; } //Orkan

    return 0;
}