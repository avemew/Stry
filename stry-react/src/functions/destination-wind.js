import {getTodayUrlWindDestination} from "./destination-dates";

//mapping timestamp and wind speed from the API

export const getWindMapDestination = (windLists) => {

    //reads the api array of timestamps and creates an array
    const timesArray = Array.from(windLists["time"])

    //reads the api array of apparent_temperature and creates an array
    const windArray = Array.from(windLists["windspeed_10m"])

    //constructs map
    return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: windArray.at(currentIndex)})
    }, {})
}

export const getWindDataDestination = () => {
    //fetches WeatherData from today's URL and stores it in weatherDataList
    return fetch(getTodayUrlWindDestination())
        .then(response => (response.json()))
        .then(apiData => (apiData["hourly"]))
        .then(apiDataHourly => getWindMapDestination(apiDataHourly))
        .then((WindMapData) => {
            // console.log(WindMapData)
            return WindMapData;
        })
}