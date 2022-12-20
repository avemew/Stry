import moment from "moment";

//returns date in format: yy-MM-DDThh:00
export const todayDate = () => {
    const now = moment()

    return now.format("yy-MM-DDTHH:00")
}

export function getTimeStamp() {
    return moment().format("HH:mm");
}

//constructs URL from base string and todays date
export const getTodaysUrl = () => {
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/forecast?latitude=53.08&longitude=8.81&hourly=apparent_temperature&start_date=${truncatedDate}&end_date=${truncatedDate}`;
}

//precepetation rain api
export const getTodayUrlRain = () => {
    //const truncatedDateRain = todayDate().slice(0, 10); //cuts off the timestamp from todayDate
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/gfs?latitude=53.08&longitude=8.81&hourly=precipitation&forecast_days=1&start_date=${truncatedDate}&end_date=${truncatedDate}&timezone=Europe%2FBerlin`;
}

//wind data api
export const getTodayUrlWind = () => {
    //const truncatedDateRain = todayDate().slice(0, 10); //cuts off the timestamp from todayDate
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    //return `https://api.open-meteo.com/v1/gfs?latitude=53.08&longitude=8.81&hourly=windspeed_10m&forecast_days=1&start_date=${truncatedDate}&end_date=${truncatedDate}&timezone=Europe%2FBerlin`;

    return "https://open-meteo.com/en/docs/gfs-api#latitude=52.52&longitude=13.41&hourly=snowfall&forecast_days=1&start_date=2022-11-20&end_date=2022-11-20&timezone=Europe%2FBerlin"
}

//snow data api
export const getTodayUrlSnow = () => {
    //const truncatedDateRain = todayDate().slice(0, 10); //cuts off the timestamp from todayDate
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/gfs?latitude=53.08&longitude=8.81&hourly=snowfall&forecast_days=1&start_date=${truncatedDate}&end_date=${truncatedDate}&timezone=Europe%2FBerlin`;
}
