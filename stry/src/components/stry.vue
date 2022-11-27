<script>

import moment from "moment";


export default {
  name: "Weather",
  data() {
    return {
      weatherDataList: [],
      layout: [
        {"x":0,"y":0,"w":2,"h":2,"i":"0"},
        {"x":2,"y":0,"w":2,"h":4,"i":"1"},
        {"x":4,"y":0,"w":2,"h":5,"i":"2"},
        {"x":6,"y":0,"w":2,"h":3,"i":"3"},
        {"x":8,"y":0,"w":2,"h":3,"i":"4"},
        {"x":10,"y":0,"w":2,"h":3,"i":"5"},
        {"x":0,"y":5,"w":2,"h":5,"i":"6"},
        {"x":2,"y":5,"w":2,"h":5,"i":"7"},
        {"x":4,"y":5,"w":2,"h":5,"i":"8"},
        {"x":6,"y":3,"w":2,"h":4,"i":"9"},
        {"x":8,"y":4,"w":2,"h":4,"i":"10"},
        {"x":10,"y":4,"w":2,"h":4,"i":"11"},
        {"x":0,"y":10,"w":2,"h":5,"i":"12"},
        {"x":2,"y":10,"w":2,"h":5,"i":"13"},
        {"x":4,"y":8,"w":2,"h":4,"i":"14"},
        {"x":6,"y":8,"w":2,"h":4,"i":"15"},
        {"x":8,"y":10,"w":2,"h":5,"i":"16"},
        {"x":10,"y":4,"w":2,"h":2,"i":"17"},
        {"x":0,"y":9,"w":2,"h":3,"i":"18"},
        {"x":2,"y":6,"w":2,"h":2,"i":"19"}
      ],
    };
  },
  methods: {
    getTodaysUrl(){
      let baseUrl = "https://api.open-meteo.com/v1/forecast?latitude=53.08&longitude=8.81&hourly=temperature_2m&start_date=";
      let truncatedDate = this.todayDate().slice(0,10);
      //let url = baseUrl.concat(truncatedDate, "&end_date=", truncatedDate);
      return 'https://api.open-meteo.com/v1/forecast?latitude=53.08&longitude=8.81&hourly=temperature_2m&start_date=' + truncatedDate + '&end_date=' + truncatedDate;
    },
    getWeatherData() {
      fetch(this.getTodaysUrl())
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
    showWeatherByDate (date){
      return this.weatherDataList[date]
    },
    todayDate(){
      const now = moment()
      return now.format("yy-MM-DDThh:00")
    }
  },
};

//canvas settings
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

//TODO:
//make this change based on average value
context.fillStyle = 'rgb(255, 165, 0)'
context.fillRect(0,0,canvas.width,canvas.height)

</script>
<template>
  <div>

    <h1>My Weather App</h1>

    <button v-on:click="getWeatherData">Get Weather Data</button>

    <div>{{ showWeatherByDate(todayDate())}}</div>
    <li v-for=" (item , index) in weatherDataList">
        {{index}} -  {{item}}
    </li>

  </div>
</template>

<style scoped>
.weather-data {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  border-bottom: 2px solid #ccc;
  padding: 20px;
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