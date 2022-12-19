import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ClockDisplay} from './functions/clock';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <head>
        </head>
        <body>
            <div id="time">
                <ClockDisplay text="Timestamp"/>
            </div>
        <App/>
        </body>
    </React.StrictMode>
);