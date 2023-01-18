import $ from "jquery";
import {useState} from "react";
import {getRandomX, getRandomY} from "../functions/random";
import {calculateSize, calculateTimeout} from "../functions/calculate";
import {getPrecipitationData} from "../functions/bremen-precipitation";
import {todayDate} from "../functions/times";
import {useEffect} from "react";
import {getWeatherData} from "../functions/bremen-weather";
import {setBackground, setRainOpacity} from "../functions/helpers";
import React from "react";
import ripples from "jquery.ripples";
import rightPage from "../RightPage";
import leftPage from "../LeftPage";

//stores Timeout id to ensure that there's only 1 timeout waiting for execution
let myTimeout = null;

export const Weather = () => {


    //RIPPLE SETTINGS

    $('div').ripples({
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
                        if (precipitationDataList) {
                            //ripple spawning:
                            // console.log("its raining")
                            $('div').ripples("drop", getRandomX(), getRandomY(), safeCalcSize(precipitationDataList), 1);

                            if (!isNaN(precipitationDataList[todayDate()])) {
                                setRainOpacity(precipitationDataList); //sets background value according to rain intensity
                                // console.log("its not raining")
                            }
                        }

                        //clears current timeout
                        myTimeout = null;
                    }, 50)//sets the time in ms the function inside waits
                }
            }

            fetchData();
        }, [precipitationDataList, resetList]
    )
}

//uses isNaN check to make sure the value calculated is valid
function safeCalcTimeout(precipitationDataList) {
    if (!isNaN(calculateTimeout(precipitationDataList[todayDate()]))) {
        let timeout = calculateTimeout(precipitationDataList[todayDate()]);

        return timeout * 0.5;
    } else {
        return 100;
    }
}

function safeCalcSize(precipitationDataList) {
    if (!isNaN(calculateSize(precipitationDataList[todayDate()]))) {
        let size = calculateSize(precipitationDataList[todayDate()]);

        return size;
    } else {
        return 25;
    }
}

export default Weather;
