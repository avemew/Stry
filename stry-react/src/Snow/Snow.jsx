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
                if(todayDate()!==fetchTimestamp) {

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

    if (isNaN(snowValue) || snowValue <= 0) {
        return 0;
    }

    //TODO: MAPPING

    return 25;
}