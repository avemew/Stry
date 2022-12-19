import {getTodayUrlWind} from "./dates";

//returns map of timestamp and apparent_temperature
export const getWindMap = (windLists) => {

    const timesArray = Array.from(windLists["time"]) //reads the api array of timestamps and creates an array
    const windArray = Array.from(windLists["windspeed_10m"])  //reads the api array of apparent_temperature and creates an array

    //constructs map
    return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: windArray.at(currentIndex)})
    }, {})
}

export const getWindData = () => {
    //fetches WeatherData from today's URL and stores it in weatherDataList
    return fetch(getTodayUrlWind())
        .then(response => (response.json()))
        .then(apiData => (apiData["hourly"]))
        .then(apiDataHourly => getWindMap(apiDataHourly))
        .then((WindMapData) => {
            return WindMapData;
        })
}