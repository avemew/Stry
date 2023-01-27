import styles from "./ClockDisplay.component.css"
import Clock from 'react-live-clock';
import moment from "moment/moment";
import {arrivalDate} from "../functions/times";

export const ClockDisplayBremen = () => {
    return (
        <h1 className={"time"}>
            <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Berlin'}/>
        </h1>
    )
}
export const ClockDisplayCairo = () => {
    return (
        <h1 className={"time"}>
            <Clock date={arrivalDate()} format={'HH:mm'} ticking={true} timezone={'Africa/Cairo'}/>
        </h1>
    )
}

