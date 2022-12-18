//maps given value to color in hue spectrum
import {todayDate} from "./dates";

export const polynomialInterpolationRemap = (value) => {
    //calculated via https://www.wolframalpha.com/input?key=&i=interpolating+polynomial+%7B-10%2C240%7D%2C%7B15%2C100%7D%2C%7B30%2C20%7D%2C%7B40%2C0%7D
    /*Set Values are:
    -10°C - 240h  (deep blue)
    15°C - 100h  (green)
    30°C - 20 h  (orange)
    40°C - 0  h  (deep red)
    */

    //Out of range protection
    if (value <= -10) {
      return 240;
    }
    if (value >= 40) {
      return 0;
    }

    //polynomial Interpolation Function
    return (
        +(19 * Math.pow(value, 3) / 7500)
        - (41 * Math.pow(value, 2) / 500)
        - (169 * value / 30)
        + (972 / 5)
    )
}

export const setBackground = (weatherDataList) => {

    console.log(weatherDataList[todayDate()]);

    //hue - color value; Color from Average Temp gets calculated via polynomialInterpolationRemap
    let hue = polynomialInterpolationRemap(weatherDataList[todayDate()]);
    //color the background square with the given hue
    let myColor = 'hsl(' + [hue, '100%', '50%'] + ')';

    let stylesheets = document.styleSheets;
    let sheet = document.styleSheets[0];

    sheet.insertRule("body { background: " + myColor + " !important; }", 0);
}