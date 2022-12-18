import moment from "moment";

//returns date in format: yy-MM-DDThh:00
export const todayDate = () => {
    const now = moment()
    return now.format("yy-MM-DDThh:00")
}


//constructs URL from base string and todays date
export const getTodaysUrl = () => {
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/forecast?latitude=53.08&longitude=8.81&hourly=apparent_temperature&start_date=${truncatedDate}&end_date=${truncatedDate}`;
}

//precepetation api
export const getTodayUrlRain = () => {
    //const truncatedDateRain = todayDate().slice(0, 10); //cuts off the timestamp from todayDate
    let truncatedDate = todayDate().slice(0, 10); //cuts off the timestamp from todayDate

    //builds URL-String with BaseURL and the truncatedDate
    return `https://api.open-meteo.com/v1/gfs?latitude=53.08&longitude=8.81&hourly=precipitation&forecast_days=1&start_date=${truncatedDate}&end_date=${truncatedDate}&timezone=Europe%2FBerlin`;
}
