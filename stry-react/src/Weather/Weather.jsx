import $ from "jquery";
import {useState} from "react";
import {getRandomX, getRandomY} from "../functions/random";
import {calculateSize, calculateTimeout} from "../functions/calculate";
import {getPrecipitationData} from "../functions/precipitation";
import {todayDate} from "../functions/dates";
import {useEffect} from "react";
import {getWeatherData} from "../functions/weather";
import {setBackground, setRainOpacity} from "../functions/helpers";
import React from "react";
import ripples from "jquery.ripples";

//stores Timeout id to ensure that there's only 1 timeout waiting for execution
let myTimeout = null;

export let debugRainInMm   = 0; //wertebereich: 0.1-50+      mapping: /functions/calculate.js:6
export let debugSnowInCm   = 0; //wertebereich: 0.1-3.3+     mapping: /Snow/Snow.jsx:44
export let debugTemperature= 0; //wertebereich: -10-45+      mapping: /functions/helpers.js:6
export let debugWindInKmh  = 0; //wertebereich:  6-118       mapping: /Wind/Wind.jsx:70

export const Weather = () => {

    //RIPPLE SETTINGS
    $("body").ripples({
        resolution: 1024,
        perturbance: 0,
        interactive: false,

    });

    const [weatherDataList, setWeatherDataList] = useState([]);
    const [precipitationDataList, setPrecipitationDataList] = useState({});

    //failsafe and reload, no real data
    const [resetList, setResetList] = useState(true);
    const [fetchTimestamp, setFetchTimestamp] = useState("");

    const date = todayDate(); //Date in format: yy-MM-DDThh:00 - string

    useEffect(() => {

            async function fetchData() {

                if (todayDate() !== fetchTimestamp) {

                    setPrecipitationDataList(await getPrecipitationData()); //awaits api data for precipitation
                    setWeatherDataList(await getWeatherData()); //awaits api data for temperature
                    setFetchTimestamp(todayDate())

                } else {
                    //reload useEffect in 250ms intervals
                    setTimeout(() =>{
                        resetList? setResetList(false):setResetList(true);
                    },250)
                }

                setBackground(weatherDataList); //calculated hue value and adds css rule

                //if there is no function waiting for its timeout already:
                if (!myTimeout) {
                    //create new timeout
                    myTimeout = window.setTimeout(() => {
                        //this block gets executed once the timer runs out:

                        //if there is precipitation, create ripples
                        //TODO: Check if multiple ripples are caused by use effect
                        if (precipitationDataList && debugRainInMm>0) {
                            //ripple spawning:
                            $('body').ripples("drop", getRandomX(), getRandomY(), safeCalcSize(precipitationDataList), 1);

                            if (!isNaN(precipitationDataList[todayDate()])) {
                                setRainOpacity(precipitationDataList); //sets background value according to rain intensity
                            }
                        }

                        //clears current timeout
                        myTimeout = null;
                    }, safeCalcTimeout(precipitationDataList)) //sets the time in ms the function inside waits
                }
            }

            fetchData();
        }, [precipitationDataList, resetList]
    )
}

//uses isNaN check to make sure the value calculated is valid
function safeCalcTimeout(precipitationDataList) {
    if (!isNaN(calculateTimeout(debugRainInMm))) {
        let timeout = calculateTimeout(debugRainInMm);

        return timeout * 0.25;
    } else {
        return 100;
    }
}

function safeCalcSize(precipitationDataList) {
    if (!isNaN(calculateSize(debugRainInMm))) {
        let size = calculateSize(debugRainInMm);

        return size;
    } else {
        return 25;
    }
}

export default Weather;
