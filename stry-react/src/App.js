import './App.css';
import Weather from './Weather/Weather';
import {ClockDisplay} from "./ClockDisplay/ClockDisplay";
import {Wind} from "./Wind/Wind";
import {Snow} from "./Snow/Snow";

function App() {

    //setup page reload every 10 minutes
    setTimeout(() => {
        document.location.reload();
    }, 600000);

    return (
        <>
            <Weather/>
            <Wind/>
            <ClockDisplay/>
            <Snow/>
        </>
    );
}

export default App;
