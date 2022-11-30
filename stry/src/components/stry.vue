<script>

import moment from "moment";

//canvas settings
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d')

export default {
  name: "Weather",
  data() {
    return {
      weatherDataList: [],
    };
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
    averageValue() {
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
      let hue = polynomialInterpolationRemap(this.averageValue());
      //color the background square with the given hue
      context.fillStyle = 'hsl(' + [hue, '100%', '50%'] + ')';
      context.fillRect(0, 0, canvas.width, canvas.height);
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

</script>
<template>
  <body>
  <div id="weatherData">

    <h1>My Weather App</h1>

    <button v-on:click="getWeatherData">Get Weather Data</button>
    <button v-on:click="setBackground">set Background</button>
    <br>
    Average Value: {{ averageValue() }}
    <br>
    {{ showWeatherByDate(todayDate()) }}

    <li v-for=" (item , index) in weatherDataList">
      {{ index }} - {{ item }}
    </li>

  </div>
  </body>
</template>

<style scoped>
h1 {
  color: white;
}

#weatherData {
  color: darkturquoise;
  background-color: transparent;
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