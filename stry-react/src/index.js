import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {todayDate} from "./functions/bremen-dates";
import {currentWindSpeed} from "./Weather/Weather";
import RightPage from "./RightPage";
import LeftPage from "./LeftPage";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);