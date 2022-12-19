import './App.css';
import Weather from './Weather/Weather';
import {ClockDisplay} from "./ClockDisplay/ClockDisplay";
import {Wind} from "./Wind/Wind";

function App() {

    return (
        <>
            <Weather/>
            <Wind/>
            <ClockDisplay/>
        </>
    );
}

export default App;
