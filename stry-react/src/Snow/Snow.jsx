import React, {useEffect, useState} from 'react'
import Snowfall from 'react-snowfall'
import {getSnowData} from "../functions/bremen-precipitation";
import {todayDate} from "../functions/times";


export const Snow = () => {
    /**
     * Define state variables
     * @snowDataList store snow Data from the api
     * @fetchTimestamp store data and time from this moment
     * @restList boolean to control the timeout
     */
    const [snowDataList, setSnowDataList] = useState({});
    const [fetchTimestamp, setFetchTimestamp] = useState("");
    const [resetList, setResetList] = useState(true);


    // Define useEffect to handle data fetching and updating

    useEffect(() => {

        // Define async function to fetch snow data
        async function fetchData() {


                if (todayDate() !== fetchTimestamp) {

                    // Update snow data list with new data
                    setSnowDataList(await getSnowData());
                    // Update the fetch timestamp to today's date
                    setFetchTimestamp(todayDate())

                } else {

                    //reload useEffect in 250ms intervals
                    setTimeout(() => {
                        resetList ? setResetList(false) : setResetList(true);
                    }, 250)

                }

            }

            fetchData();
        }, [snowDataList]
    )
    // snowflakeCount={mapSnowFall(snowDataList)}
    // Return a Snowfall component with snowflakeCount based on mapped snowDataList
    return (
        <Snowfall snowflakeCount={mapSnowFall(snowDataList)} style={{
            position: 'fixed',
            width: '50vw',
            height: '100vh',
        }}
        />
    )
}


/**
 * Calculates the number of snowflakes to render based on the snow data list for today's date
 *
 * @param {object} snowDataList - The object containing snow data
 * @returns {number} - The number of snowflakes to render
 */
const mapSnowFall = (snowDataList) => {
    let snowValue = snowDataList[todayDate()];

    //TODO Debug snow here


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