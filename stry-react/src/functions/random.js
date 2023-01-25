/* eslint-disable no-restricted-globals */
export const getRandomXLeft = () => Math.floor(Math.random() * screen.width/2);
export const getRandomYLeft = () => Math.floor(Math.random() * screen.height);

export const getRandomXRight = () => Math.floor((Math.random() * screen.width/2)+screen.width/2);
export const getRandomYRight = () => Math.floor(Math.random() * screen.height);