import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ClockDisplay} from './functions/clock';
import TurbulenceFilter from "./TurbulenceFilter";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <head>
        </head>
        <body>

        <div id="time">
            <ClockDisplay text="Timestamp"/>
        </div>

        <TurbulenceFilter/>
        <App/>

        </body>
    </React.StrictMode>
);