import './App.css';
import Weather from './Weather/Weather';
import {ClockDisplay} from "./ClockDisplay/ClockDisplay";
import {Wind} from "./Wind/Wind";
import {Snow} from "./Snow/Snow";




function RightPage() {

    return (

       <div className={'right'}>
        <Weather/>
        <Wind/>
        <ClockDisplay/>
           <div >
        <Snow/>
           </div>
        </div>
    );
}

export default RightPage;
