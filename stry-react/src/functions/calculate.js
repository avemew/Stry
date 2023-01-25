import {todayDate} from "./bremen-dates";

/*
source for categories: https://www.merkur.de/welt/niederschlag-wetter-arten-menge-messen-definition-vorhersage-90162102.html#:~:text=leichter%20Regen%3A%20<%202%2C5,Regen%3A%20≥%2050%2C0%20mm

leichter Sprühregen:  < 0,1 mm
mäßiger Sprühregen:   ≥ 0,1 mm
starker Sprühregen:   ≥ 0,5 mm
leichter Regen:       < 2,5 mm
mäßiger Regen:        ≥ 2,5 mm - < 10,0 mm
starker Regen:        ≥ 10,0 mm
sehr starker Regen:   ≥ 50,0 mm

 */

//calculates size of ripples according to precipitation in mm
export const calculateSize = (rainInMm) => {
    return    ( 0.480962 * rainInMm + 0.951904 )//base function
            * ( 1 + Math.random()/2 )           //multiplies with random factor from 1-1.5
            + 2;                                //adds 2 to raise lower values above 3, so they don't look bugged
}

//calculates timout in ms according to precipitation in mm
//see: https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0.1%2C1500%7D%5C%2844%29%7B50%2C250%7D
export const calculateTimeout = (rainInMm) => {

    /*
    function with set values:
    0.1 = 1500
    50  = 250
     */
    let timeout = 1502.51 - 25.0501 * rainInMm;

    //safecheck for timeout < 250, prevents too small & negative values
    return timeout < 250 ? 250 : timeout;
}