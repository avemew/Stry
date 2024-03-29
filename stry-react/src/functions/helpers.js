//maps given value to color in hue spectrum
import {arrivalDate, arrivalDateRounded, todayDate} from "./times";
import RightPage from "../RightPage";
import LeftPage from "../LeftPage";

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

export const setBackground = (weatherDataListRight, weatherDataListLeft) => {
    //hue - color value - Color from Average Temp gets calculated via polynomialInterpolationRemap
    let hueRight = polynomialInterpolationRemap(weatherDataListRight[todayDate()]);
    let hueLeft = polynomialInterpolationRemap(weatherDataListLeft[arrivalDateRounded()]);

    //creates hsl value from calculated hue above
    let colorRight = 'hsl(' + [hueRight, '100%', '40%'] + ')';
    let colorLeft = 'hsl(' + [hueLeft, '100%', '40%'] + ')';

    //gets current stylesheet and sets the color
    let rightColor = document.getElementById('right')
    rightColor.style.backgroundColor = colorRight
    let leftColor = document.getElementById('left')
    leftColor.style.backgroundColor = colorLeft
}

//sets background value according to rain intensity by inserting css rule
//see: https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0.1%2C0.4%7D%5C%2844%29%7B50%2C1%7D
export function RainOpacity(rainInMm) {
    let rainOpa = 1//set auf 0 when finish debugging
    let x = 1
    if (rainInMm === 0) {
        rainOpa = 0;
    }
    if (rainInMm > 0 && rainInMm < 1) {
        rainOpa = 0.222222 * x + 0.377778
    }
    if (rainInMm >= 1 && rainInMm < 25) {
        rainOpa = 0.0166667 * x + 0.583333
    }
    if (rainInMm >= 25) {
        rainOpa = 1
    }

    //gets current stylesheet
    let sheet = document.styleSheets[0]

    //css version support checks
    //--> dynamically adds css rule
    if ("insertRule" in sheet) {
        sheet.insertRule(".jquery-ripples canvas { filter: " + "opacity(" + rainOpa + ") !important; }", 0);
    } else if ("addRule" in sheet) {
        sheet.addRule(".jquery-ripples canvas", "filter: " + "opacity(" + rainOpa + ") !important;", 0);
    }
    return rainOpa
}
