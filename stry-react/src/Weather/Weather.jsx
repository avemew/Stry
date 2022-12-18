import $ from "jquery";
import ripples from "jquery.ripples";
import { useState } from "react";
import { getRandomX, getRandomY } from "../functions/random";
import { calculateSize, calculateTimeout } from "../functions/calculate";
import style from "./Weather.component.css";
import { getPrecipitationData } from "../functions/precipitation";
import {getTodaysUrl, todayDate} from "../functions/dates";
import { useEffect } from "react";
import {getWeatherData} from "../functions/weather";
import {setBackground} from "../functions/helpers";






export const Weather = () => {
    const [weatherDataList, setWeatherDataList] = useState([]);
    const [precipitationDataList, setPrecipitationDataList] = useState({});
    const date = todayDate();

    useEffect(() => {
      async function fetchData() {
        setPrecipitationDataList(await getPrecipitationData());
        setWeatherDataList(await getWeatherData());
        setBackground(weatherDataList);
        window.setInterval(() => {
          if(precipitationDataList && precipitationDataList[todayDate()] > 0){ // use date instead of
              // number, and change it in dates.js
            $('body').ripples("drop", getRandomX(), getRandomY(), calculateSize(precipitationDataList[todayDate()]+2), 0.5);
          }
        }, 1000)
      }
      fetchData()
    }, [precipitationDataList])
}

export default Weather;
