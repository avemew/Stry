import $ from "jquery";
import {useState} from "react";
import {getRandomX, getRandomY} from "../functions/random";
import {calculateSize, calculateTimeout} from "../functions/calculate";
import {getPrecipitationData} from "../functions/precipitation";
import {todayDate} from "../functions/dates";
import {useEffect} from "react";
import {getWeatherData} from "../functions/weather";
import {setBackground} from "../functions/helpers";
import React from "react";
import ripples from "jquery.ripples";

//stores Timeout id to ensure that there's only 1 timeout waiting for execution
let myTimeout = null;

export const Weather = () => {

    //RIPPLE SETTINGS
    $("body").ripples({
        resolution: 1024,
        perturbance: 0,
        interactive: false,

    });

    const [weatherDataList, setWeatherDataList] = useState([]);
    const [precipitationDataList, setPrecipitationDataList] = useState({});

    const [lock, setLock] = useState(false);

    const date = todayDate(); //Date in format: yy-MM-DDThh:00 - string

    useEffect(() => {

        setLock(true);

            async function fetchData() {

                setPrecipitationDataList(await getPrecipitationData()); //awaits api data for precipitation
                setWeatherDataList(await getWeatherData()); //awaits api data for temperature

                setBackground(weatherDataList); //calculated hue value and adds css rule

                //if there is no function waiting for its timeout already:
                if (!myTimeout) {
                    //create new timeout
                    myTimeout = window.setTimeout(() => {
                        //this block gets executed once the timer runs out:

                        //if there is precipitation, create ripples
                        //TODO: Check if multiple ripples are cause by use effect
                        if (precipitationDataList) {
                            $('body').ripples("drop", getRandomX(), getRandomY(), safeCalcSize(precipitationDataList), 1);
                            console.log("rain")
                            setLock(false);
                        }

                        //clears current timeout
                        myTimeout = null;
                    }, safeCalcTimeout(precipitationDataList)) //sets the time in ms the function inside waits
                }
            }

            fetchData();
        }, [precipitationDataList]
    )
}

//TODO: Test out rain intensities and change mapping
//TODO: replace this value in the methods below with precipitationDataList[todayDate()] again
let debugPrecipitation = 2.4;

//uses isNaN check to make sure the value calculated is valid
function safeCalcTimeout(precipitationDataList) {
    if (!isNaN(calculateTimeout(precipitationDataList[todayDate()]))) {
        let timeout = calculateTimeout(debugPrecipitation);

        //console.log("Timeout: "+ timeout);
        return timeout * 0.5;
    } else {
        return 100;
    }
}

function safeCalcSize(precipitationDataList) {
    if (!isNaN(calculateSize(precipitationDataList[todayDate()]))) {
        let size = calculateSize(debugPrecipitation);

        //console.log("Size: " + size);
        return size;
    } else {
        return 25;
    }
}

export default Weather;
