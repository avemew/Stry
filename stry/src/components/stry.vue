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
    getTodayUrl() {
      let truncatedDate = this.todayDate().slice(0, 10);
      return 'https://api.open-meteo.com/v1/forecast?latitude=53.08&longitude=8.81&hourly=temperature_2m&start_date=' + truncatedDate + '&end_date=' + truncatedDate;
    },
    getWeatherData() {
      fetch(this.getTodayUrl())
          .then(response => (response.json()))
          .then(data => (data["hourly"]))
          .then(data => this.getWeatherMap(data))
          .then(data => (this.weatherDataList = data));
    },
    getWeatherMap(timeWeatherLists) {
      const timesArray = Array.from(timeWeatherLists["time"])
      const tempArray = Array.from(timeWeatherLists["temperature_2m"])
      return timesArray.reduce((previousValue, currentValue, currentIndex) => {
        return Object.assign(previousValue, {[currentValue]: tempArray.at(currentIndex)})
      }, {})
    },
    showWeatherByDate(date) {
      return this.weatherDataList[date]
    },
    todayDate() {
      const now = moment()
      return now.format("yy-MM-DDThh:00")
    },
    averageValue() {
      let sum = 0;
      let count = 0;

      for (const item in this.weatherDataList) {
        sum += this.weatherDataList[item];
        ++count;
      }
      sum /= count;

      if (isNaN(sum)) {
        return 0;
      }
      return sum;
    },
    setBackground() {
      let hue = polynomialInterpolationRemap(this.averageValue());
      context.fillStyle = 'hsl(' + [hue, '100%', '50%'] + ')';
      context.fillRect(0, 0, canvas.width, canvas.height);
    },

  },

};

function polynomialInterpolationRemap(value) {
  //calculated via https://www.wolframalpha.com/input?key=&i=interpolating+polynomial+%7B-10%2C240%7D%2C%7B15%2C100%7D%2C%7B30%2C20%7D%2C%7B40%2C0%7D
  /*Set Values are:
  -10°C - 240h  (deep blue)
   15°C - 100h  (green)
   30°C - 20 h  (orange)
   40°C - 0  h  (deep red)
   */

  return (
      +(19 * Math.pow(value, 3) / 7500)
      - (41 * Math.pow(value, 2) / 500)
      - (169 * value / 30)
      + (972 / 5)
  )
}



</script>
<template>

  <div>
    <header>
    <h1>My Weather App</h1>
  </header>

    <button v-on:click="getWeatherData">Get Weather Data</button>
    <button v-on:click="setBackground">set Background</button>
<body class="myList">
    <div class="weather-data">Average Value: {{ averageValue() }}</div>

    <div class="weather-data">{{ showWeatherByDate(todayDate()) }}</div>
    <li  class="weather-data" v-for=" (item , index) in weatherDataList">
      {{ index }} - {{ item }}
    </li>
</body>
  </div>
</template>

<style scoped>
.myList{
  background-color: rgb(0,0,0,0.01);
  height: 100%;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

}
.weather-data {
  display: flex;
  flex: 1;
  overflow: auto;
  align-items: center;
  margin-top: 2px;
  margin-left: 20px;
  border-bottom: 2px solid #ccc;
  padding: 20px;
  color: brown;

}

.weather-icon {
  flex-grow: 1;
}

.weather-stats {
  flex-grow: 8;
  text-align: left;
  padding-left: 20px;
}

.weather-stats .location {
  font-size: 30px;
}

.weather-temp {
  flex-grow: 1;
  font-size: 35px;
}

img {
  width: 70px;
}

button {
  padding: 10px;
  background-color: #1aa832;
  color: white;
  border: 1px solid #ccc;
}
</style>