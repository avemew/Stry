import './App.css';
import Weather from "./Weather/Weather";
import {Wind} from "./Wind/Wind";
import {ClockDisplay, ClockDisplayCairo} from "./ClockDisplay/ClockDisplay";
import {Snow} from "./Snow/Snow";
import {WeatherCairo} from "./Weather/Weather";

function LeftPage() {
    document.getElementsByTagName("")


    return (



            <div id={'left'} className={'left'}>
                <div>
                    <h2 className={'city'}>
                        Cairo
                        [CAI]
                    </h2>
                </div>
                <WeatherCairo/>
                <Wind/>
                <div>
                <ClockDisplayCairo/>
                </div>
            </div>
    );
}

export default LeftPage;
