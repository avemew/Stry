import {todayDate} from "./times";
import {getTimeStamp} from "./times";

//constructs URL Bremen from base string and todays date
export const getTodaysUrlDestination = () => {
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/forecast?latitude=30.08&longitude=31.81&hourly=apparent_temperature&start_date=${truncatedDate}&end_date=${truncatedDate}`;
}

//precepetation rain api
export const getTodayUrlRainDestination = () => {
    //const truncatedDateRain = todayDate().slice(0, 10); //cuts off the timestamp from todayDate
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/gfs?latitude=30.08&longitude=31.81&hourly=precipitation&forecast_days=1&start_date=${truncatedDate}&end_date=${truncatedDate}&timezone=Europe%2FBerlin`;
}

//wind data api
export const getTodayUrlWindDestination = () => {
    //const truncatedDateRain = todayDate().slice(0, 10); //cuts off the timestamp from todayDate
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/gfs?latitude=30.08&longitude=31.81&hourly=windspeed_10m&forecast_days=1&start_date=${truncatedDate}&end_date=${truncatedDate}&timezone=Europe%2FBerlin`;
}

//snow data api
export const getTodayUrlSnowDestination = () => {
    //const truncatedDateRain = todayDate().slice(0, 10); //cuts off the timestamp from todayDate
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/gfs?latitude=30.08&longitude=31.81&hourly=snowfall&forecast_days=1&start_date=${truncatedDate}&end_date=${truncatedDate}&timezone=Europe%2FBerlin`;
}
