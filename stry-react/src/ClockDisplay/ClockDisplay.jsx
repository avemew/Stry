import {getTimeStamp} from "../functions/dates";
import {useEffect, useState} from "react";
import styles from "./ClockDisplay.component.css"
import $ from "jquery";
import {getRandomX, getRandomY} from "../functions/random";

export const ClockDisplay = () => {
    const [time, setTime] = useState(getTimeStamp());
    const [timeChanged, setTimeChanged] = useState(true);

    useEffect(() => {

        async function updateTime() {
            setTime(getTimeStamp());
            if (timeChanged) {
                setTimeChanged(false);
            } else {
                setTimeChanged(true);
            }
        }

        setTimeout(() => {
            console.log("timeStamp")
            updateTime();
        }, 5000)

    }, [time, timeChanged])

    return (
        <h1>{time}</h1>
    )
}