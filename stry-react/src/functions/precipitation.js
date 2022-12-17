import {getTodayUrlRain} from "./dates";

export const getPrecipitationMap = (rainlists) => {
    const timesArray = Array.from(rainlists["time"])
    const rainArray = Array.from(rainlists["precipitation"])

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