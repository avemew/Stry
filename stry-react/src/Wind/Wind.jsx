import React, {useEffect, useState} from "react";
import {getWindData} from "../functions/bremen-wind";
import {arrivalDateRounded, todayDate} from "../functions/times";
import {getWindDataDestination} from "../functions/destination-wind";

let windTimeout = null;

export const Wind = () => {
    /**
     * Define state variables
     * @windDataList store snow Data from the api
     * @windDataDestinationList store snow Data from the api
     * @fetchTimestamp store data and time from this moment
     * @restList boolean to control the timeout
     */

    const [windDataList, setWindDataList] = useState({});
    const [windDataDestinationList, setWindDataDestinationList] = useState({});
    const [fetchTimestamp, setFetchTimestamp] = useState("");
    const [resetList, setResetList] = useState(true);

    // Define useEffect to handle data fetching and updating
    useEffect(() => {

        async function fetchData() {
            if(todayDate()!==fetchTimestamp) {

                // Update wind data list with new data
                setWindDataList(await getWindData());

                // Update wind data list with new data
                setWindDataDestinationList(await getWindDataDestination());

                // Update the fetch timestamp to today's date
                setFetchTimestamp(todayDate);

            } else {

                //reload useEffect in 250ms intervals
                setTimeout(() =>{
                    resetList? setResetList(false):setResetList(true);
                },250)

            }
        }

        fetchData();
    }, [windDataList, windDataDestinationList])

    //return an SVG element with turbulence filters applied based on the fetched wind data
    //string "right" or "left" to get the wind data for the corresponding side
    return (
        <div>

        <svg>
            {/*right*/}
            <filter id="turbulence-right-1">
                <feTurbulence type="fractalNoise" baseFrequency="0.001" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList, "right")}/>
            </filter>

            <filter id="turbulence-right-2">
                <feTurbulence type="fractalNoise" baseFrequency="0.0015" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList, "right")}/>
            </filter>

            <filter id="turbulence-right-3">
                <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList, "right")}/>
            </filter>

            <filter id="turbulence-right-4">
                <feTurbulence type="fractalNoise" baseFrequency="0.0025" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList, "right")}/>
            </filter>

            <filter id="turbulence-right-5">
                <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataList, "right")}/>
            </filter>

        {/*left*/}
            <filter id="turbulence-left-1">
                <feTurbulence type="fractalNoise" baseFrequency="0.001" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataDestinationList, "left")}/>
            </filter>

            <filter id="turbulence-left-2">
                <feTurbulence type="fractalNoise" baseFrequency="0.0015" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataDestinationList, "left")}/>
            </filter>

            <filter id="turbulence-left-3">
                <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataDestinationList, "left")}/>
            </filter>

            <filter id="turbulence-left-4">
                <feTurbulence type="fractalNoise" baseFrequency="0.0025" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataDestinationList, "left")}/>
            </filter>

            <filter id="turbulence-left-5">
                <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="1" data-filterid="3"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale={getCurrentWind(windDataDestinationList, "left")}/>
            </filter>

        </svg>
        </div>
    );
}



/**
 * Calculates the current wind speed based on the windDataList for each side
 *
 * @param {number[]} windDataList - An array of wind speed values
 * @param {string} side - Specifies which side's wind speed to use. Can be "left" or anything Right
 * @returns {number} - The calculated wind speed
 */
function getCurrentWind(windDataList, side) {
    let currentWindSpeed;

    if (side === "left") {
        currentWindSpeed = windDataList[arrivalDateRounded()]
    } else {
        currentWindSpeed = windDataList[todayDate()]
    }

    //TODO Debug wind here

    if (isNaN(currentWindSpeed)) {
        return 0;
    }    //NaN-Check

    // console.log("Windspeed:" + currentWindSpeed);
/**
 *  checks the current wind speed against a series of thresholds
 *  to determine the appropriate wind speed category
 * */
    if (currentWindSpeed <= 5) { return 0; }    //Windstille & leiser Zug
    if (currentWindSpeed <= 11) { return 6; }   //leichte Brise
    if (currentWindSpeed <= 19) { return 8; }   //schwache Brise
    if (currentWindSpeed <= 28) { return 10; }   //mäßige Brise
    if (currentWindSpeed <= 38) { return 14; }  //frische Brise
    if (currentWindSpeed <= 49) { return 24; }  //starker Wind
    if (currentWindSpeed <= 61) { return 32; }  //steifer Wind
    if (currentWindSpeed <= 74) { return 44; }  //stürmischer Wind
    if (currentWindSpeed <= 88) { return 63; }  //Sturm
    if (currentWindSpeed <= 102) { return 77; } //schwerer Sturm
    if (currentWindSpeed <= 117) { return 87; } //orkanartiger Sturm
    if (currentWindSpeed >= 118) { return 97; } //Orkan

    return 0;
}