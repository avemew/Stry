import './App.css';
import Weather from "./Weather/Weather";
import {Wind} from "./Wind/Wind";
import {ClockDisplayBremen, ClockDisplayCairo} from "./ClockDisplay/ClockDisplayBremen";
import {Snow} from "./Snow/Snow";
import {WeatherCairo} from "./Weather/Weather";

function LeftPage() {
    document.getElementsByTagName("")


    return (



            <div id={'left'} className={'left'}>
                <div>
                    <h2 className={'city'}>
                        Cairo
                    </h2>
                </div>
                <WeatherCairo/>
                <Wind/>
                <ClockDisplayCairo/>

            </div>
    );
}

export default LeftPage;
