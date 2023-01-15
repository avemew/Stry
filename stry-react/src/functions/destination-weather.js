import {getTodaysUrlDestination} from "./destination-dates";


//mapping timestamp with apparent temperature from the API

export const getWeatherDataDestination = () => {
    //fetches WeatherData from today's URL and stores it in weatherDataList
    return fetch(getTodaysUrlDestination())
        .then(response => (response.json()))
        .then(apiData => (apiData["hourly"]))
        .then(apiDataHourly => getWeatherMapDestination(apiDataHourly))
        .then((TempMapData) => {
            return TempMapData;
        })
}

//returns map of timestamp and apparent_temperature
export const getWeatherMapDestination = (timeWeatherLists) => {
    const timesArray = Array.from(timeWeatherLists["time"]) //reads the api array of timestamps and creates an array
    const tempArray = Array.from(timeWeatherLists["apparent_temperature"])  //reads the api array of apparent_temperature and creates an array

    //constructs map
    return timesArray.reduce((previousValue, currentValue, currentIndex) => {
      return Object.assign(previousValue, {[currentValue]: tempArray.at(currentIndex)})
    }, {})
}