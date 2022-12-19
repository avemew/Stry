import styles from "./ClockDisplay.component.css"
import Clock from 'react-live-clock';

export const ClockDisplay = () => {
    return (
        <h1>
            <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Berlin'}/>
        </h1>
    )
}