import './App.css';
import {Wind} from "./Wind/Wind";
import { ClockDisplayCairo} from "./ClockDisplay/ClockDisplay";
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
