import {todayDate} from "./dates";

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
//TODO: AFTER debug testing --> implement linear mapping inside the if-statements
export const calculateSize = (rainInMm) => {

    if(rainInMm < 0.1){ //mapping from [0 - 0.1) bzw. leichter Sprühregen
        return 1;
    }

    if(rainInMm < 0.5){ //mapping from [0.1 - 0.5) bzw. mäßiger Sprühregen
        return 1;
    }

    if(rainInMm < 1.0){ //mapping from [0.5 - 1.0) bzw. starker Sprühregen
        return 1.5;
    }

    if(rainInMm < 2.5){ //mapping from [1.0 - 2.5) bzw. leichter Regen
        return 5;
    }

    if(rainInMm < 10){ //mapping from [2.5 - 10) bzw. mäßiger Regen
        return 15;
    }

    if(rainInMm < 50){ //mapping from [10 - 50) bzw. starker Regen
        return 25;
    }

    if(rainInMm >= 50){ //mapping from [50 - ∞) bzw. sehr starker Regen
        return 30;
    }

    return 25;
}

//calculates timout in ms according to precipitation in mm
//TODO: AFTER debug testing --> implement linear mapping inside the if-statements
export const calculateTimeout = (rainInMm) => {
    console.log(rainInMm);

    if(rainInMm < 0.1){ //mapping from [0 - 0.1) bzw. leichter Sprühregen
        return 350;
    }

    if(rainInMm < 0.5){ //mapping from [0.1 - 0.5) bzw. mäßiger Sprühregen
        return 400;
    }

    if(rainInMm < 1.0){ //mapping from [0.5 - 1.0) bzw. starker Sprühregen
        return 200;
    }

    if(rainInMm < 2.5){ //mapping from [1.0 - 2.5) bzw. leichter Regen
        return 800;
    }

    if(rainInMm < 10){ //mapping from [2.5 - 10) bzw. mäßiger Regen
        return 500;
    }

    if(rainInMm < 50){ //mapping from [10 - 50) bzw. starker Regen
        return 250;
    }

    if(rainInMm >= 50){ //mapping from [50 - ∞) bzw. sehr starker Regen
        return 125;
    }

    return 5000;
}