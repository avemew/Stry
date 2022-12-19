import {getTodayUrlRain} from "./dates";

//returns map of timestamp and precipitation
export const getPrecipitationMap = (rainlists) => {

    const timesArray = Array.from(rainlists["time"]) //reads the api array of timestamps and creates an array
    const rainArray = Array.from(rainlists["precipitation"]) //reads the api array of precipitation in mms and creates an array

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
            return precipitationMapData;
        })
}