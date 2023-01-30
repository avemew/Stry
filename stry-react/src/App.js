import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import React from "react";
import {Snow} from "./Snow/Snow";
// import RightPage from "./LeftPage";
// import LeftPage1 from "./RightPage";

function App() {

    //setup page reload every 10 minutes
    setTimeout(() => {
        document.location.reload();
    }, 600000);

    return (
        <div>
            <div className={'row'}>
                <div className={'col-md'}>
                    <LeftPage/>
                </div>
                <div className={'col-md'}>
                    <RightPage/>
                    <div className="snow">
                        <Snow/>
                    </div>
                </div>
            </div>
            <img src="/Scale.png"/>
            <img className={"airplane"} src={"/render.gif"}/>
        </div>
    );
}

export default App;
