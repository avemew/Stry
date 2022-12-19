import React from "react";

function TurbulenceFilter() {

    return (
        <svg>
            <filter id="turbulence-1">
                <feTurbulence type="fractalNoise" baseFrequency={randomFrequency()} numOctaves="3" data-filterId="3" seed={randomSeed()}/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="9"/>
            </filter>

            <filter id="turbulence-2">
                <feTurbulence type="fractalNoise" baseFrequency={randomFrequency()} numOctaves="3" data-filterId="3" seed={randomSeed()}/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="9"/>
            </filter>

            <filter id="turbulence-3">
                <feTurbulence type="fractalNoise" baseFrequency={randomFrequency()} numOctaves="3" data-filterId="3" seed={randomSeed()}/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="9"/>
            </filter>

            <filter id="turbulence-4">
                <feTurbulence type="fractalNoise" baseFrequency={randomFrequency()} numOctaves="3" data-filterId="3" seed={randomSeed()}/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="9"/>
            </filter>

            <filter id="turbulence-5">
                <feTurbulence type="fractalNoise" baseFrequency={randomFrequency()} numOctaves="3" data-filterId="3" seed={randomSeed()}/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="9"/>
            </filter>

        </svg>
    );

}

export default TurbulenceFilter;

function randomFrequency(){
    return (25 * (Math.random()*0.25))/1000;
}

function randomSeed(){
    return Math.floor(100000 * Math.random());
}