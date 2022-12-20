import './App.css';
import Weather from './Weather/Weather';
import {ClockDisplay} from "./ClockDisplay/ClockDisplay";
import {Wind} from "./Wind/Wind";

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
        </>
    );
}

export default App;
