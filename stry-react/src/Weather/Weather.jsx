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

    const date = todayDate(); //Date in format: yy-MM-DDThh:00 - string

    useEffect(() => {

            async function fetchData() {

                setPrecipitationDataList(await getPrecipitationData()); //awaits api data for precipitation
                setWeatherDataList(await getWeatherData()); //awaits api data for temperature

                setBackground(weatherDataList); //calculated hue value and adds css rule

                //if there is no function waiting for its timeout already:
                if(!myTimeout) {
                    //create new timeout
                    myTimeout = window.setTimeout(() => {
                        //this block gets executed once the timer runs out:

                        //if there is precipitation, create ripples
                        if (precipitationDataList && precipitationDataList[todayDate()] > 0) {
                            $('body').ripples("drop", getRandomX(), getRandomY(), 25, 1);
                        }

                        //clears current timeout
                        myTimeout = null;
                    }, calcTimeout(precipitationDataList)) //sets the time in ms the function inside waits
                }
            }
            fetchData();
        }, [precipitationDataList]
    )
}

function calcTimeout(precipitationDataList) {
    if (!isNaN(calculateTimeout(precipitationDataList[todayDate()]))) {
        let timeout = calculateTimeout(precipitationDataList[todayDate()]);

        console.log("Timeout: "+ timeout);
        return timeout;
    } else {
        return 100;
    }
}

export default Weather;
