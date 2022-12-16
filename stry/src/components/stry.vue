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
      rainDataList: [],
    };
  },

  created() {
    this.getWeatherData()
    this.setBackground()
    this.getRainData()
  },

  mounted: function () {
    window.setInterval(() => {
      //if(this.weatherDataList[today.getHours()]>0){
      $('body').ripples("drop", getRandomX(), getRandomY(), calculateSize(this.rainAverageValue()+5), 1);
      //}
    }, calculateTimeout(1))
  },



  methods: {
    //Returns API Url for the current day
    getTodaysUrl() {
      let truncatedDate = this.todayDate().slice(0, 10); //cuts off the timestamp from todayDate
      //builds URL-String with BaseURL and the truncatedDate
      return 'https://api.open-meteo.com/v1/forecast?latitude=53.08&longitude=8.81&hourly=apparent_temperature&start_date=' + truncatedDate + '&end_date=' + truncatedDate;
    },
    getWeatherData() {
      //fetches WeatherData from today's URL and stores it in weatherDataList
      fetch(this.getTodaysUrl())
          .then(response => (response.json()))
          .then(data => (data["hourly"]))
          .then(data => this.getWeatherMap(data))
          .then(data => (this.weatherDataList = data));
    },
    getWeatherMap(timeWeatherLists) {
      const timesArray = Array.from(timeWeatherLists["time"])
      const tempArray = Array.from(timeWeatherLists["apparent_temperature"])

      return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: tempArray.at(currentIndex)})
      }, {})
    },
    showWeatherByDate(date) {
      //used to display the weatherDataList on the Website
      return this.weatherDataList[date]
    },

    //returns the current date+hour
    todayDate() {
      const now = moment()
      return now.format("yy-MM-DDThh:00")
    },

    //calculates average Value of the weatherDataList
    tempAverageValue() {
      let sum = 0;
      let count = 0;

      //sum up all values, increment count every item
      for (const item in this.weatherDataList) {
        sum += this.weatherDataList[item];
        ++count;
      }
      sum /= count; //average

      //protection for empty list case
      if (isNaN(sum)) {
        return 0;
      }

      return sum;
    },

    setBackground() {
      //hue - color value; Color from Average Temp gets calculated via polynomialInterpolationRemap
      let hue = polynomialInterpolationRemap(this.tempAverageValue());
      //color the background square with the given hue
      context.fillStyle = 'hsl(' + [hue, '100%', '50%'] + ')';
      context.fillRect(0, 0, canvas.width, canvas.height);
    },
    //Rain Data
    getTodayUrlRain() {
      let truncatedDateRain = this.todayDate().slice(0, 10); //cuts off the timestamp from todayDate
      //builds URL-String with BaseURL and the truncatedDate
      return 'https://api.open-meteo.com/v1/forecast?latitude=53.08&longitude=8.81&hourly=apparent_temperature&start_date=' + truncatedDateRain + '&end_date=' + truncatedDateRain;
    },
    getRainmap(rainlists) {
      const timesArray = Array.from(rainlists["time"])
      const rainArray = Array.from(rainlists["rain"])
      // console.log(rainArray)

      return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: rainArray.at(currentIndex)})
      }, {})
    },
    getRainData() {
      //fetches WeatherData from today's URL and stores it in weatherDataList
      fetch(this.getTodayUrlRain())
          .then(response => (response.json()))
          .then(data => (data["hourly"]))
          .then(data => this.getRainmap(data))
          .then(data => (this.rainDataList = data))
    },
    rainAverageValue() {
      let sum = 0;
      let count = 0;

      //sum up all values, increment count every item
      for (const item in this.rainDataList) {
        sum += this.rainDataList[item];
        ++count;
      }
      sum /= count; //average

      //protection for empty list case
      if (isNaN(sum)) {
        return 0;
      }
      return sum;
    },



  },

};

//maps given value to color in hue spectrum
function polynomialInterpolationRemap(value) {
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
}

function getRandomX() {
  return Math.floor(Math.random() * screen.width);
}

function getRandomY() {
  return Math.floor(Math.random() * screen.height);
}

function calculateSize(rainInMm) {
  return Math.round(2.49 * rainInMm + 0.1) * 2; //see https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0%2C0.1%7D%5C%2844%29%7B10%2C25%7D
}

//mapping for timeout
function calculateTimeout(rainInMm) {
  return Math.round((-6.68687 * Math.pow(rainInMm, 3) + 19.0424 * Math.pow(rainInMm, 2) + 488.163 * rainInMm + 1) / 3); //see https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0%2C1%7D%5C%2844%29%7B0.1%2C50%7D%5C%2844%29%7B2%2C1000%7D%5C%2844%29%7B10%2C100%7D
}

</script>
<template>
  <header>
    <h1>Average Value: {{ tempAverageValue() }}</h1>
<!--    <h1>Average Value: {{ rainAverageValue() }}</h1>-->

  </header>
  <!--   DEBUGGING VALUES        -->
  <p>rain thing :{{this.rainDataList[33]}}</p>

</template>

<style scoped>
h1 {
  padding: 400px;
  color: white;
}

weatherData {
  color: darkturquoise;
  background-color: brown;
  margin: 0;
  padding: 0;
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