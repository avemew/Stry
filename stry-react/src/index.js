import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {todayDate} from "./functions/dates";
import {currentWindSpeed} from "./Weather/Weather";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <head>
            <title></title>
        </head>

        <body>
        <App/>
        </body>
    </React.StrictMode>
);