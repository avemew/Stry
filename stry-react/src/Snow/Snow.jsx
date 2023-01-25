import styles from "./Snow.component.css"
import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import Snowfall from 'react-snowfall'
import {getSnowData} from "../functions/bremen-precipitation";
import {todayDate} from "../functions/times";

export const Snow = () => {

    const [snowDataList, setSnowDataList] = useState({});
    const [fetchTimestamp, setFetchTimestamp] = useState("");

    const [resetList, setResetList] = useState(true);

    useEffect(() => {
            async function fetchData() {
                if (todayDate() !== fetchTimestamp) {

                    setSnowDataList(await getSnowData());
                    setFetchTimestamp(todayDate())

                } else {

                    //reload useEffect in 250ms intervals
                    setTimeout(() =>{
                        resetList? setResetList(false):setResetList(true);
                    },250)

                }

            }

            fetchData();
        }, [snowDataList]
    )
    // snowflakeCount={mapSnowFall(snowDataList)}
    return (
        <Snowfall snowflakeCount={mapSnowFall(snowDataList)} style={{
            position: 'fixed',
            width: '50vw',
            height: '100vh',
        }}
        />
    )
}

const mapSnowFall = (snowDataList) => {
    let snowValue = snowDataList[todayDate()];

    //TODO Debug snow here

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