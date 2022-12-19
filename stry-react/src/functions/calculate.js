import {todayDate} from "./dates";

/*
source for categories: https://www.merkur.de/welt/niederschlag-wetter-arten-menge-messen-definition-vorhersage-90162102.html#:~:text=leichter%20Regen%3A%20<%202%2C5,Regen%3A%20≥%2050%2C0%20mm

leichter Sprühregen:  < 0,1 mm
mäßiger Sprühregen:   ≥ 0,1 mm
starker Sprühregen:   ≥ 0,5 mm -todo
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
//TODO: AFTER debug testing --> implement linear mapping inside the if-statements
export const calculateTimeout = (rainInMm) => {

    if (rainInMm < 0.1) { //mapping from [0 - 0.1) bzw. leichter Sprühregen
        return 50;
    }

    if (rainInMm < 0.5) { //mapping from [0.1 - 0.5) bzw. mäßiger Sprühregen
        return Math.round(875 * rainInMm - 37.5);
    }

    if (rainInMm < 1.0) { //mapping from [0.5 - 1.0) bzw. starker Sprühregen
        return Math.round(100 * rainInMm + 350);
    }

    if (rainInMm < 2.5) { //mapping from [1.0 - 2.5) bzw. leichter Regen
        return Math.round(470 - 20 * rainInMm);
    }

    if (rainInMm < 10) { //mapping from [2.5 - 10) bzw. mäßiger Regen
        return Math.round(436.667 - 6.66667 * rainInMm);
    }

    if (rainInMm < 50) { //mapping from [10 - 50) bzw. starker Regen
        return Math.round( (775 / 2) - ((7 * rainInMm) / 4));
    }

    if (rainInMm >= 50) { //mapping from [50 - ∞) bzw. sehr starker Regen
        let returnValue = Math.round(660 - ((36 * rainInMm)/5));

        if(returnValue < 120){
            return 120;
        }

        return returnValue;
    }

    return 5000;
}