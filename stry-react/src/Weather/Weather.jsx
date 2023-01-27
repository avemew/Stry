import $ from "jquery";
import {useState} from "react";
import {
    getRandomX,
    getRandomXLeft,
    getRandomXRight,
    getRandomY,
    getRandomYLeft,
    getRandomYRight
} from "../functions/random";
import {calculateSize, calculateTimeout} from "../functions/calculate";
import {getPrecipitationData} from "../functions/bremen-precipitation";
import {arrivalDateRounded, todayDate} from "../functions/times";
import {useEffect} from "react";
import {getWeatherData} from "../functions/bremen-weather";
import {setBackground, setBackgroundLeft, setRainOpacity} from "../functions/helpers";
import {getPrecipitationDataDestination} from "../functions/destination-precipitation";
import React from "react";
import ripples from "jquery.ripples";
import rightPage from "../RightPage";
import leftPage from "../LeftPage";
import {getWeatherDataDestination} from "../functions/destination-weather";

//stores Timeout id to ensure that there's only 1 timeout waiting for execution
let myTimeoutRight = null;
let myTimeoutLeft = null;

export const Weather = () => {

    //RIPPLE SETTINGS
    $('div#right.right').ripples({
        resolution: 1024,
        perturbance: 0,
        interactive: false,
    });

    const [weatherDataListRight, setWeatherDataListRight] = useState([]);
    const [weatherDataListLeft, setWeatherDataListLeft] = useState([]);

    const [precipitationDataListRight, setPrecipitationDataListRight] = useState({});

    //failsafe and reload, no real data
    const [reset, setReset] = useState(true);
    const [fetchTimestamp, setFetchTimestamp] = useState("");

    const date = todayDate(); //Date in format: yy-MM-DDThh:00 - string

    //right use effect
    useEffect(() => {

            async function fetchData() {

                if (todayDate() !== fetchTimestamp) {

                    setPrecipitationDataListRight(await getPrecipitationData()); //awaits api data for precipitation
                    setWeatherDataListRight(await getWeatherData()); //awaits api data for temperature
                    setWeatherDataListLeft(await getWeatherDataDestination()); //awaits api data for temperature
                    
                    setFetchTimestamp(todayDate())

                } else {
                    //reload useEffect in 250ms intervals
                    setTimeout(() => {
                        reset ? setReset(false) : setReset(true);
                    }, 250)
                }

                setBackground(weatherDataListRight, weatherDataListLeft); //calculated hue value and adds css rule

                //if there is no function waiting for its timeout already:
                if (!myTimeoutRight) {
                    //create new timeout
                    myTimeoutRight = window.setTimeout(() => {
                        //this block gets executed once the timer runs out:

                        //if there is precipitation, create ripples
                        //TODO: Check if multiple ripples are caused by use effect
                        if (precipitationDataListRight) {

                            $('div#right.right').ripples("drop", getRandomXRight(), getRandomYRight(), safeCalcSize(precipitationDataListRight), safeCalcTimeout(precipitationDataListRight));

                            if (!isNaN(precipitationDataListRight[todayDate()])) {
                                setRainOpacity(precipitationDataListRight, "right"); //sets background value according to rain intensity
                            }
                        }

                        //clears current timeout
                        myTimeoutRight = null;
                    }, safeCalcTimeout(precipitationDataListRight))//sets the time in ms the function inside waits
                }
            }

            fetchData();
        }, [precipitationDataListRight, reset]
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



export const WeatherCairo = () => {

    $('div#left.left').ripples({
        resolution: 1024,
        perturbance: 0,
        interactive: false,

    });
    const [precipitationDataListLeft, setPrecipitationDataListLeft] = useState({});

    const [reset, setReset] = useState(true);
    const [fetchTimestamp, setFetchTimestamp] = useState("");

    //left use effect
    useEffect(() => {
            async function fetchData() {

                if (todayDate() !== fetchTimestamp) {

                    setPrecipitationDataListLeft(await getPrecipitationDataDestination()); //awaits api data for precipitation
                    // console.log(weatherDataListLeft)
                    setFetchTimestamp(todayDate())

                } else {
                    //reload useEffect in 250ms intervals
                    setTimeout(() => {
                        reset ? setReset(false) : setReset(true);
                    }, 250)
                }

                //if there is no function waiting for its timeout already:
                if (!myTimeoutLeft) {
                    //create new timeout
                    myTimeoutLeft = window.setTimeout(() => {
                        //this block gets executed once the timer runs out:

                        //if there is precipitation, create ripples
                        //TODO: Check if multiple ripples are caused by use effect
                        if (precipitationDataListLeft) {
                            //ripple spawning:
                            // console.log("its raining")
                            $('div#left.left').ripples("drop", getRandomXLeft(), getRandomYLeft(), safeCalcSize(precipitationDataListLeft), safeCalcTimeout(precipitationDataListLeft));

                            if (!isNaN(precipitationDataListLeft[arrivalDateRounded()])) {
                                setRainOpacity(precipitationDataListLeft, "left"); //sets background value according to rain intensity
                                // console.log("its not raining")
                            }
                        }

                        //clears current timeout
                        myTimeoutLeft = null;
                    }, safeCalcTimeout(precipitationDataListLeft))//sets the time in ms the function inside waits
                }
            }

            fetchData()

        }, [precipitationDataListLeft, reset]
    )
}

export default Weather
