import {getTodayUrlRain, getTodayUrlSnow} from "./bremen-dates";
import {todayDate} from "./times";

//returns map of timestamp and precipitation specifically rain
export const getPrecipitationMap = (rainlists) => {

    //reads the api array of timestamps and creates an array
    const timesArray = Array.from(rainlists["time"])

    //reads the api array of precipitation in mms and creates an array
    const rainArray = Array.from(rainlists["precipitation"])

    //constructs map
    return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: rainArray.at(currentIndex)})
    }, {});
}

export const getPrecipitationData = async () => {
    //fetches WeatherData from today's URL and stores it in weatherDataList 
    return fetch(getTodayUrlRain())
        .then(response => response.json())
        .then(apiData => apiData["hourly"])
        .then(apiDataHourly => getPrecipitationMap(apiDataHourly))
        .then((precipitationMapData) => {
            // console.log(precipitationMapData)
            return precipitationMapData;
        })
}



//returns map of timestamp and precipitation specifically Snow
export const getSnowMap = (snowlists) => {

    //reads the api array of timestamps and creates an array
    const timesArray = Array.from(snowlists["time"])

    //reads the api array of precipitation in mms and creates an array
    const rainArray = Array.from(snowlists["snowfall"])

    //constructs map
    return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: rainArray.at(currentIndex)})
    }, {});
}

export const getSnowData = async () => {
    //fetches WeatherData from today's URL and stores it in weatherDataList
    return fetch(getTodayUrlSnow())
        .then(response => response.json())
        .then(apiData => apiData["hourly"])
        .then(apiDataHourly => getSnowMap(apiDataHourly))
        .then((precipitationSnowMapData) => {
            return precipitationSnowMapData;
        })
}