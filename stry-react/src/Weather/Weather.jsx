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
import {RainOpacity, RainOpacityLeft, RainOpacityRight, setBackground, setBackgroundLeft, setRainOpacity} from "../functions/helpers";
import {getPrecipitationDataDestination} from "../functions/destination-precipitation";
import React from "react";
import ripples from "jquery.ripples";
import rightPage from "../RightPage";
import leftPage from "../LeftPage";
import {getWeatherDataDestination} from "../functions/destination-weather";
import {rainInMmLeft, rainInMmRight} from "../DebugVariables";

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
                    }, 250 )
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

                            $('div#right.right').ripples("drop", getRandomXRight(), getRandomYRight(), safeCalcSizeRight(rainInMmRight), 1);

                            if (!isNaN(rainInMmRight)) {

                                // setRainOpacity(precipitationDataListRight, "right"); //sets background value according to rain intensity
                                // console.log(precipitationDataListRight[todayDate()])
                                RainOpacityRight(rainInMmRight);
                                // console.log(precipitationDataListRight)

                            }
                        }

                        //clears current timeout
                        myTimeoutRight = null;
                    }, safeCalcTimeoutRight(rainInMmRight))//sets the time in ms the function inside waits
                }
            }

            fetchData();
        }, [precipitationDataListRight, reset]
    )

}

//uses isNaN check to make sure the value calculated is valid
function safeCalcTimeoutRight(rainInMmRight) {
    if (!isNaN(rainInMmRight)) {
        let timeout = calculateTimeout(rainInMmRight);
        console.log(timeout)
        return timeout * 0.5;
    } else {
        return 100;
    }
}

function safeCalcTimeoutLeft(rainInMmLeft) {
    if (!isNaN(rainInMmLeft)) {
        let timeout = calculateTimeout(rainInMmLeft);
        console.log(timeout)
        return timeout * 0.5;
    } else {
        return 100;
    }
}

function safeCalcSizeLeft(rainInMmLeft) {
    if (!isNaN(calculateSize(rainInMmLeft))) {
        return calculateSize(rainInMmLeft);
    } else {
        return 25;
    }
}

function safeCalcSizeRight(rainInMmRight) {
    if (!isNaN(rainInMmRight)) {
        return calculateSize(rainInMmRight);
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

    // left use effect
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
                            $('div#left.left').ripples("drop", getRandomXLeft(), getRandomYLeft(), safeCalcSizeLeft(rainInMmLeft), 1);

                            if (!isNaN(rainInMmLeft)) {
                                // setRainOpacity(precipitationDataListLeft, "left"); //sets background value according to rain intensity
                                // console.log("its not raining")
                                RainOpacityLeft(rainInMmLeft)
                            }
                        }

                        //clears current timeout
                        myTimeoutLeft = null;
                    }, safeCalcTimeoutLeft(rainInMmLeft))//sets the time in ms the function inside waits
                }
            }

            fetchData()

        }, [precipitationDataListLeft, reset]
    )
}

export default Weather
