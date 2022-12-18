//calculates size of ripples according to precipitation in mm
//see https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0%2C0.1%7D%5C%2844%29%7B10%2C25%7D
export const calculateSize = (rainInMm) =>  Math.round(2.49 * rainInMm + 0.1) * 2; 

//calculates timout in ms according to precipitation in mm
//see https://www.wolframalpha.com/input?i2d=true&i=interpolating+polynomial+%7B0%2C1%7D%5C%2844%29%7B0.1%2C50%7D%5C%2844%29%7B2%2C1000%7D%5C%2844%29%7B10%2C100%7D
export const calculateTimeout = (rainInMm) => Math.round((-6.68687 * Math.pow(rainInMm, 3) + 19.0424 * Math.pow(rainInMm, 2) + 488.163 * rainInMm + 1) / 3);