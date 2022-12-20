import styles from "./Snow.component.css"
import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import Snowfall from 'react-snowfall'
import {getSnowData} from "../functions/precipitation";
import {todayDate} from "../functions/dates";

export const Snow = () => {

    const [snowDataList, setSnowDataList] = useState({});
    const [fetchTimestamp, setFetchTimestamp] = useState("");

    useEffect(() => {
            async function fetchData() {
                if (todayDate() !== fetchTimestamp) {

                    setSnowDataList(await getSnowData());
                    setFetchTimestamp(todayDate())

                } else {
                    let tempSnowDataList = snowDataList
                    setSnowDataList(null);
                    setSnowDataList(tempSnowDataList);
                }

            }

            fetchData();
        }, [snowDataList]
    )

    return (
        <Snowfall snowflakeCount={mapSnowFall(snowDataList)}/>
    )
}

const mapSnowFall = (snowDataList) => {
    let snowValue = snowDataList[todayDate()];

    console.log(snowValue)
    if (!isNaN(snowValue)) {

        switch (true) {

            case snowValue === 0 :
                return 0
            case snowValue < 0.83:
                return 50
            case snowValue < 1.6:
                return 100
            case snowValue < 3.3:
                return 150
            case snowValue >= 3.3:
                return 250
        }
    }

    return 0;
}