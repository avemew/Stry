//maps given value to color in hue spectrum
import {todayDate} from "./times";
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

export const setBackground = (weatherDataList) => {
    //hue - color value - Color from Average Temp gets calculated via polynomialInterpolationRemap
    let hueRight = polynomialInterpolationRemap(weatherDataList[todayDate()]);



    //color the background square with the given hue
    let colorRight = 'hsl(' + [hueRight, '100%', '40%'] + ')';

    //gets current stylesheet

    // let sheet = document.styleSheets[0]

    let rightColor = document.getElementById('right')
    rightColor.style.backgroundColor = myColor

    let leftColor = document.getElementById('left')
    leftColor.style.backgroundColor = myColor
    //css version support checks
    //--> dynamically adds css rule
    // if("insertRule" in sheet) {
    //     sheet.insertRule("body { background: " + myColor + " !important; }", 0);
    // }
    // else if("addRule" in sheet) {
    //     sheet.addRule("body", "background: " + myColor + " !important;", 0);
    // }
}
export const setBackgroundLeft = (weatherDataList) => {
    let hueLeft = polynomialInterpolationRemap(weatherDataList[todayDate()]);
    let colorLeft = 'hsl(' + [hueLeft, '100%', '40%'] + ')';
    let leftColor = document.getElementById('left')
    leftColor.style.backgroundColor = colorLeft


}


//sets background value according to rain intensity by inserting css rule
//see: https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0.1%2C0.4%7D%5C%2844%29%7B50%2C1%7D
export function setRainOpacity(precipitationDataList){

    let rainInMm = 50;

    let myOpacity = 0;

    if(rainInMm <= 0)                                  //0 and negative --> o opacity
    {
        myOpacity = 0;
    } else if(rainInMm < 1)                            //(0-1) --> 0.222222 * x + 0.377778
    {
        myOpacity = 0.222222 * rainInMm + 0.377778;
        myOpacity = Math.round(myOpacity * 1000) / 1000;    //rundet auf 2 dezimalstellen
    } else if(rainInMm < 25)                           //[1-25) --> 0.0166667 * x + 0.583333
    {
        myOpacity = 0.0166667 * rainInMm + 0.583333
        myOpacity = Math.round(myOpacity * 1000) / 1000;    //rundet auf 2 dezimalstellen
    } else  if(rainInMm >= 25)                         //[25-x] --> 1
    {
        myOpacity = 1;
    }

    // console.log("opacity" +myOpacity)

    //gets current stylesheet
    let sheet = document.styleSheets[0];
    // let rightPage = document.getElementById('right')

    //css version support checks
    //--> dynamically adds css rule
    if("insertRule" in sheet) {
        sheet.insertRule(".jquery-ripples canvas { filter: " + "opacity(" + myOpacity +") !important; }", 0);
    }
    else if("addRule" in sheet) {
        sheet.addRule(".jquery-ripples canvas", "filter: " + "opacity(" + myOpacity +") !important;", 0);
    }
}