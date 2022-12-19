import {currentWindSpeed} from "../Weather/Weather";
import React, {useEffect, useState} from "react";
import {getWindData} from "../functions/wind";
import {todayDate} from "../functions/dates";


export const Wind = () => {

    const [windDataList, setWindDataList] = useState({});

    useEffect(() => {
       async function fetchData(){
           setWindDataList(await getWindData());
       }
       fetchData();
    },[windDataList])

    return (

        <svg>

            <filter id="turbulence-1">
                <feTurbulence type="fractalNoise" baseFrequency="0.001" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={(windDataList[todayDate()])*0.25}/>
            </filter>

            <filter id="turbulence-2">
                <feTurbulence type="fractalNoise" baseFrequency="0.0015" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={(windDataList[todayDate()])*0.25}/>
            </filter>

            <filter id="turbulence-3">
                <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={(windDataList[todayDate()])*0.25}/>
            </filter>

            <filter id="turbulence-4">
                <feTurbulence type="fractalNoise" baseFrequency="0.0025" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={(windDataList[todayDate()])*0.25}/>
            </filter>

            <filter id="turbulence-5">
                <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={(windDataList[todayDate()])*0.25}/>
            </filter>

        </svg>
    );
}