//calculates size of ripples according to precipitation in mm
//see https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0%2C0.1%7D%5C%2844%29%7B10%2C25%7D
import {todayDate} from "./dates";

export const calculateSize = (rainInMm) => Math.round(2.49 * rainInMm + 0.1) * 2;

//calculates timout in ms according to precipitation in mm
export const calculateTimeout = (rainInMm) => {
    return Math.round(6588.81 - 607.87 * rainInMm);
}