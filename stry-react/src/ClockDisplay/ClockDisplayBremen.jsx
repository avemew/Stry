import styles from "./ClockDisplay.component.css"
import Clock from 'react-live-clock';

export const ClockDisplayBremen = () => {
    return (
        <h1>
            <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Berlin'}/>

        </h1>
    )
}
export const ClockDisplayCairo = () => {
    return (
        <h1>
            <Clock format={'HH:mm'} ticking={true} timezone={'Africa/Cairo'}/>

        </h1>
    )
}
