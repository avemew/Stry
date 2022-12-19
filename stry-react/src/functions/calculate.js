//calculates size of ripples according to precipitation in mm
//see https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0%2C0.1%7D%5C%2844%29%7B10%2C25%7D
import {todayDate} from "./dates";

//TODO: Implement correct mapping
export const calculateSize = (rainInMm) => {
    return 25;
}

//calculates timout in ms according to precipitation in mm
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

//TODO: Implement correct mapping
export const calculateTimeout = (rainInMm) => {
    return Math.round(6588.81 - 607.87 * 12);
}