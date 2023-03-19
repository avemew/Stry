import {getTodayUrlRainDestination, getTodayUrlSnowDestination} from "./destination-dates";

//returns map of timestamp and precipitation specifically rain
export const getPrecipitationMapDestination = (rainlists) => {

    //reads the api array of timestamps and creates an array
    const timesArray = Array.from(rainlists["time"])

    //reads the api array of precipitation in mms and creates an array
    const rainArray = Array.from(rainlists["precipitation"])

    //constructs map
    return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: rainArray.at(currentIndex)})
    }, {});
}

export const getPrecipitationDataDestination = async () => {
    //fetches WeatherData from today's URL and stores it in weatherDataList

    return fetch(getTodayUrlRainDestination())
        .then(response => response.json())
        .then(apiData => apiData["hourly"])
        .then(apiDataHourly => getPrecipitationMapDestination(apiDataHourly))
        .then((precipitationMapData) => {
            // console.log(precipitationMapData);
            return precipitationMapData;
        })
}



//returns map of timestamp and precipitation specifically Snow
export const getSnowMapDestination = (snowlists) => {

    //reads the api array of timestamps and creates an array
    const timesArray = Array.from(snowlists["time"])

    //reads the api array of precipitation in mms and creates an array
    const rainArray = Array.from(snowlists["snowfall"])

    //constructs map
    return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: rainArray.at(currentIndex)})
    }, {});
}

export const getSnowDataDestination = async () => {
    //fetches WeatherData from today's URL and stores it in weatherDataList
    return fetch(getTodayUrlSnowDestination())
        .then(response => response.json())
        .then(apiData => apiData["hourly"])
        .then(apiDataHourly => getSnowMapDestination(apiDataHourly))
        .then((precipitationSnowMapData) => {
            return precipitationSnowMapData;
        })
}

