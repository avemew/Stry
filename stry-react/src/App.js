import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import React from "react";
// import RightPage from "./LeftPage";
// import LeftPage1 from "./RightPage";


function App() {

    //setup page reload every 10 minutes
    setTimeout(() => {
        document.location.reload();
    }, 600000);

    return (

        <div className={'container'}>
            <div className={'row'}>

                <div className={'col-md'}>
                    <LeftPage/>
                </div>
                <div className={'col-md'}>
                    <RightPage/>
                </div>
            </div>
        </div>

    );
}

export default App;
