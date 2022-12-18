export const getWeatherData = () => {
    //fetches WeatherData from today's URL and stores it in weatherDataList
    fetch(this.getTodaysUrl())
        .then(response => (response.json()))
        .then(data => (data["hourly"]))
        .then(data => this.getWeatherMap(data))
        .then(data => (this.weatherDataList = data));
}

export const getWeatherMap = (timeWeatherLists) => {
    const timesArray = Array.from(timeWeatherLists["time"])
    const tempArray = Array.from(timeWeatherLists["apparent_temperature"])

    return timesArray.reduce((previousValue, currentValue, currentIndex) => {
      return Object.assign(previousValue, {[currentValue]: tempArray.at(currentIndex)})
    }, {})
}

export const showWeatherByDate = (date) => {
    //used to display the weatherDataList on the Website
    return this.weatherDataList[date]
}