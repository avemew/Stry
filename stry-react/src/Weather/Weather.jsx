// import $ from "jquery";
import React, {useEffect, useRef, useState} from "react";
import {getRandomXLeft, getRandomXRight, getRandomYLeft, getRandomYRight} from "../functions/random";
import {calculateSize, calculateTimeout} from "../functions/calculate";
import {getPrecipitationData} from "../functions/bremen-precipitation";
import {arrivalDateRounded, todayDate} from "../functions/times";
import {getWeatherData} from "../functions/bremen-weather";
import {RainOpacity, setBackground} from "../functions/helpers";
import {getPrecipitationDataDestination} from "../functions/destination-precipitation";
import {getWeatherDataDestination} from "../functions/destination-weather";

//stores Timeout id to ensure that there's only 1 timeout waiting for execution
let myTimeoutRight = null;
let myTimeoutLeft = null;

const $ = require("jquery");
// window.$ = $;
// window.jQuery = $;
require("jquery.ripples");

//main component of ../RightPage.js or the departure country
export const Weather = () => {

    /**jQuery selector to apply the "ripples" effect to a specific HTML element
     * initialize the ripples effect with these options'
     *  resolution: 1024, // the resolution of the water ripple effect
     *     perturbance: 0, // the amount of turbulence applied to the water ripple effect
     *     interactive: false, // disables mouse interaction with the water ripple effect
    // */

        $('div#right.right').ripples({
            resolution: 1024, perturbance: 0, interactive: false, //disables mouse interaction, keep off
        });



    /**DATA LISTS - API pulls are stored here
     * both temperatures are stored and used here because setting the background color
     * only has to be executed once, not once for every side
     */

    //weatherDataList = temperature in departure country
    const [weatherDataListRight, setWeatherDataListRight] = useState([]);

    //weatherDataList = temperature in arrival country
    const [weatherDataListLeft, setWeatherDataListLeft] = useState([]);

    //precipitationDataList = rain in departure country
    const [precipitationDataListRight, setPrecipitationDataListRight] = useState({});

    //failsafe and reload, no real data
    const [reset, setReset] = useState(true);   //used to semi-manually reload the site

    //stores the timestamp of the last fetch, prevents continuous fetching
    const [fetchTimestamp, setFetchTimestamp] = useState("");

    //Date in format: yy-MM-DDThh:00 - string
    const date = todayDate();

    useEffect(() => {

            async function fetchData() {
                //checks if there has been a fetch this hour already
                if (todayDate() !== fetchTimestamp) {

                    //Storing API data in lists - awaits api data
                    setPrecipitationDataListRight(await getPrecipitationData());    //rain
                    setWeatherDataListRight(await getWeatherData());    //perceived temperature - departure country
                    setWeatherDataListLeft(await getWeatherDataDestination());  //perceived temperature - arrival country

                    setFetchTimestamp(todayDate())  //stores timestamp of this fetch

                } else {
                    //reload useEffect in 250ms intervals
                    setTimeout(() => {
                        //this value is "abused" to reload the useEffect
                        //changing the content of this value will reload the useEffect
                        reset ? setReset(false) : setReset(true);
                    }, 250)
                }

                //calculate hue value and add css rule to change background color for both sides
                setBackground(weatherDataListRight, weatherDataListLeft);

                //if there is no function waiting for its timeout already:
                if (!myTimeoutRight) {
                    //create new timeout
                    myTimeoutRight = window.setTimeout(() => {
                        //this block gets executed once the timer runs out:

                        //if there is data in the precipitationDataList, create ripples
                        if (precipitationDataListRight) {

                            /**creates ripples for the right div, called "drop"
                            //at the position: randomX, randomY (these functions return a random value on the right side of the screen)
                            //with the size of: safeCalcSize (a relative value)
                            //with the set strength of 1*/
                            $('div#right.right').ripples("drop", getRandomXRight(), getRandomYRight(), safeCalcSize(precipitationDataListRight), 1);

                            //if there is a valid value inside of the List
                            if (!isNaN(precipitationDataListRight[todayDate()])) {
                                RainOpacity(precipitationDataListRight[todayDate()]);  //set the opacity of the raindrops according to its intensity
                            }
                        }

                        //clears current timeout
                        myTimeoutRight = null;
                    }, safeCalcTimeout(precipitationDataListRight)) //sets the time in ms the function inside has to wait
                }
            }

            fetchData();
        }, [precipitationDataListRight, reset]  //useEffect gets called everytime one of these changes
    )
}

function safeCalcTimeout(precipitationDataList) {
    //uses isNaN check to make sure the value calculated is valid
    if (!isNaN(calculateTimeout(precipitationDataList[todayDate()]))) {
        //calculates time in ms to wait for the next drop to spawn according to the rain in mm at the current hour
        let timeout = calculateTimeout(precipitationDataList[todayDate()]);
        return timeout * 0.5;   //recent modification to shorten the timer
    } else {
        return 100; //if there is no valid value to calculate, set the timer to 100ms
    }
}

function safeCalcSize(precipitationDataList) {
    //uses isNaN check to make sure the value calculated is valid
    if (!isNaN(calculateSize(precipitationDataList[todayDate()]))) {
        //calculates size according to the rain in mm at the current hour
        return calculateSize(precipitationDataList[todayDate()]);
    } else {
        return 25;  //if there is no valid value to calculate, set the size to 25
    }
}

//main component of ../LeftPage.js or the arrival country
export const WeatherCairo = () => {



       $('div#left.left').ripples({
            resolution: 1024, perturbance: 0, interactive: false,

        });



    //DATA LIST - API pulls are stored here
    const [precipitationDataListLeft, setPrecipitationDataListLeft] = useState({}); //precipitationDataList = rain in arrival country

    const [reset, setReset] = useState(true);
    const [fetchTimestamp, setFetchTimestamp] = useState("");

    useEffect(() => {
            async function fetchData() {
                //checks if there has been a fetch this hour already
                if (todayDate() !== fetchTimestamp) {

                    //Storing API data in lists - awaits api data
                    setPrecipitationDataListLeft(await getPrecipitationDataDestination()); //rain

                    setFetchTimestamp(todayDate())  //stores timestamp of this fetch

                } else {
                    //reload useEffect in 250ms intervals
                    setTimeout(() => {
                        //this value is "abused" to reload the useEffect
                        //changing the content of this value will reload the useEffect
                        reset ? setReset(false) : setReset(true);
                    }, 250)
                }

                //if there is no function waiting for its timeout already:
                if (!myTimeoutLeft) {
                    //create new timeout
                    myTimeoutLeft = window.setTimeout(() => {
                        //this block gets executed once the timer runs out:

                        //if there is data in the precipitationDataList, create ripples
                        if (precipitationDataListLeft) {

                            /**creates ripples for the right div, called "drop"
                            //at the position: randomX, randomY (these functions return a random value on the right side of the screen)
                            //with the size of: safeCalcSize (a relative value)
                            //with the set strength of 1*/
                            $('div#left.left').ripples("drop", getRandomXLeft(), getRandomYLeft(), safeCalcSize(precipitationDataListLeft), 1);

                            //if there is a valid value inside of the List
                            if (!isNaN(precipitationDataListLeft[arrivalDateRounded()])) {
                                RainOpacity(precipitationDataListLeft[todayDate()])      //set the opacity of the raindrops according to its intensity
                            }
                        }

                        //clears current timeout
                        myTimeoutLeft = null;
                    }, 500)//sets the time in ms the function inside waits
                }
            }

            fetchData()
        }, [precipitationDataListLeft, reset]  //useEffect gets called everytime one of these changes
    )
}

export default Weather
