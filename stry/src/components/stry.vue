<script>
  import moment from "moment";

  //canvas settings
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d')
  const today = new Date();

  export default {
    name: "Weather",
    data() {
      return {
        weatherDataList: [],
        precipitationDataList: [],
      };
    },

    created() {
      this.setBackground()
      this.getPrecipitationData()
      this.getTempData()
    },

    mounted: function () {
      const date = this.todayDate();
      window.setInterval(() => {
        if(this.precipitationDataList[date] > 0){ // this.todayDate()
          $('body').ripples("drop", this.getRandomX(), this.getRandomY(), this.calculateSize(this.rainAverageValue()+5), 1);
        }
      }, this.calculateTimeout(1))
    },

    methods: {
      getRandomX() {
        return Math.floor(Math.random() * screen.width);
      },

      getRandomY() {
        return Math.floor(Math.random() * screen.height);
      },

      calculateSize(rainInMm) {
        return Math.round(2.49 * rainInMm + 0.1) * 2; //see https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0%2C0.1%7D%5C%2844%29%7B10%2C25%7D
      }, 

      //mapping for timeout
      calculateTimeout(rainInMm) {
        return Math.round((-6.68687 * Math.pow(rainInMm, 3) + 19.0424 * Math.pow(rainInMm, 2) + 488.163 * rainInMm + 1) / 3); //see https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0%2C1%7D%5C%2844%29%7B0.1%2C50%7D%5C%2844%29%7B2%2C1000%7D%5C%2844%29%7B10%2C100%7D
      },
      //Returns API Url for the current day


      //returns the current date+hour
      todayDate() {
        const now = moment()
        return now.format("yy-MM-DDThh:00")
      },

      //calculates average Value of the weatherDataList


      //maps given value to color in hue spectrum
      polynomialInterpolationRemap(value) {
        //calculated via https://www.wolframalpha.com/input?key=&i=interpolating+polynomial+%7B-10%2C240%7D%2C%7B15%2C100%7D%2C%7B30%2C20%7D%2C%7B40%2C0%7D
        /*Set Values are:
        -10°C - 240h  (deep blue)
        15°C - 100h  (green)
        30°C - 20 h  (orange)
        40°C - 0  h  (deep red)
        */

        //Out of range protection
        if (value <= -10) {
          return 240;
        }
        if (value >= 40) {
          return 0;
        }

        //polynomial Interpolation Function
        return (
            +(19 * Math.pow(value, 3) / 7500)
            - (41 * Math.pow(value, 2) / 500)
            - (169 * value / 30)
            + (972 / 5)
        )
      },

      setBackground() {
        //hue - color value; Color from Average Temp gets calculated via polynomialInterpolationRemap
        let hue = this.polynomialInterpolationRemap(this.weatherDataList[this.todayDate()]);
        //color the background square with the given hue
        context.fillStyle = 'hsl(' + [hue, '100%', '50%'] + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
      },

      //Temperature Data
      getTodaysUrlTemp() {
        //this URL provides data within a day of the current day already and thus does not require further formatting
        return `https://api.open-meteo.com/v1/gfs?latitude=53.08&longitude=8.81&hourly=temperature_2m&forecast_days=1&timezone=Europe%2FBerlin`;
      },
      getTempData() {
        //fetches WeatherData from today's URL and stores it in weatherDataList
        fetch(this.getTodaysUrlTemp())
            .then(response => response.json())
            .then(apiData => apiData["hourly"])
            .then(apiDataHourly => this.getTempMap(apiDataHourly))
            .then((temperatureMapData) => {
              console.log(temperatureMapData)
              this.weatherDataList = temperatureMapData
            })
      },
      getTempMap(timeWeatherLists) {
        const timesArray = Array.from(timeWeatherLists["time"])
        const tempArray = Array.from(timeWeatherLists["temperature_2m"])

        return timesArray.reduce((previousValue, currentValue, currentIndex) => {
          return Object.assign(previousValue, {[currentValue]: tempArray.at(currentIndex)})
        }, {})
      },
      //Rain Data
      getTodayUrlRain() {
        const date = this.todayDate().slice(0, 10);
        //builds URL-String with BaseURL and the truncatedDate
        return `https://api.open-meteo.com/v1/gfs?latitude=53.08&longitude=8.81&hourly=precipitation&forecast_days=1&start_date=${date}&end_date=${date}&timezone=Europe%2FBerlin`;
      },
      getPrecipitationMap(rainlists) {
        const timesArray = Array.from(rainlists["time"])
        const rainArray = Array.from(rainlists["precipitation"])

        return timesArray.reduce((previousValue, currentValue, currentIndex) => {
          return Object.assign(previousValue, {[currentValue]: rainArray.at(currentIndex)})
        }, {});
      },
      getPrecipitationData() {
        //fetches WeatherData from today's URL and stores it in weatherDataList
        fetch(this.getTodayUrlRain())
            .then(response => response.json())
            .then(apiData => apiData["hourly"])
            .then(apiDataHourly => this.getPrecipitationMap(apiDataHourly))
            .then((precipitationMapData) => {
              console.log(precipitationMapData)
              this.precipitationDataList = precipitationMapData
            })
      },
    },
  };
</script>
<template>
  <header>
    <h1>Average Value: {{}}</h1>
<!--    <h1>Average Value: {{ rainAverageValue() }}</h1>-->

  </header>
  <!--   DEBUGGING VALUES        -->
  <p>rain thing :{{this.precipitationDataList[33]}}</p>

</template>

<style scoped>
  h1 {
    padding: 400px;
    color: white;
  }

  img {
    width: 70px;
  }

  button {
    padding: 10px;
    background-color: #1aa832;
    color: white;
    margin: 5px;
    border: 1px solid #ccc;
  }
</style>