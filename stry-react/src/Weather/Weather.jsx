import $ from "jquery";
import ripples from "jquery.ripples";
import { useState } from "react";
import { getRandomX, getRandomY } from "../functions/random";
import { calculateSize, calculateTimeout } from "../functions/calculate";
import style from "./Weather.component.css";
import { getPrecipitationData } from "../functions/precipitation";
import { todayDate } from "../functions/dates";
import { useEffect } from "react";





export const Weather = () => {
    const [weatherDataList, setWeatherDataList] = useState([]);
    const [precipitationDataList, setPrecipitationDataList] = useState({});
    //const canvas = document.getElementById('canvas');
    //const context = canvas.getContext('2d');
    const date = todayDate();

    useEffect(() => {
      async function fetchData() {
        setPrecipitationDataList(await getPrecipitationData());
        window.setInterval(() => {
          if(precipitationDataList && precipitationDataList["2022-12-05T22:00"] > 0){ // use date instead of number, and change it in dates.js
            $('body').ripples("drop", getRandomX(), getRandomY(), calculateSize(precipitationDataList["2022-12-05T22:00"]+5), 1);
          }
        }, calculateTimeout(1))
      }
      fetchData()
    }, [precipitationDataList])
}

export default Weather;