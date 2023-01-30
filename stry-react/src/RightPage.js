import './App.css';
import Weather, {WeatherCairo} from './Weather/Weather';
import {ClockDisplayBremen} from "./ClockDisplay/ClockDisplay";
import {Wind} from "./Wind/Wind";
import {Snow} from "./Snow/Snow";



function RightPage() {


    return (


        <div id={'right'} className={'right'}>
            <div>
                <h2 className={'city'}>
                    Bremen
                    [BRE]
                </h2>
            </div>

            <Weather/>
            <Wind/>
            <ClockDisplayBremen/>
        </div>

    );
}

export default RightPage;
