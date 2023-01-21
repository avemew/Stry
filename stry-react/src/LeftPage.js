import './App.css';
import Weather from "./Weather/Weather";
import {Wind} from "./Wind/Wind";
import {ClockDisplay} from "./ClockDisplay/ClockDisplay";
import {Snow} from "./Snow/Snow";


function LeftPage() {
    document.getElementsByTagName("")


    return (


            <div id={'left'} className={'left'}>

                <Weather/>
                <Wind/>
                <ClockDisplay/>

            </div>
    );
}

export default LeftPage;
