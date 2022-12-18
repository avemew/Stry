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

    const date = todayDate(); //Date in format: yy-MM-DDThh:00 - string

    useEffect(() => {

      async function fetchData() {

        setPrecipitationDataList(await getPrecipitationData()); //awaits api data for precipitation
        setWeatherDataList(await getWeatherData()); //awaits api data for temperature

        setBackground(weatherDataList); //calculated hue value and adds css rule

        window.setInterval(() => {
            //if there is precipitation, create ripples
          if(precipitationDataList && precipitationDataList[date] > 0){
            $('body').ripples("drop", getRandomX(), getRandomY(), calculateSize(precipitationDataList[date]+2), 0.5);
          }
        }, 1000) //timeout of ripple creation in ms
      }

      fetchData();
    }, [precipitationDataList])
}

export default Weather;
