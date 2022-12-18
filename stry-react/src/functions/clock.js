import moment from "moment/moment";
import {Component} from "react";

export class ClockDisplay extends Component {
    time = getTimeStamp();

    componentDidMount() {
        this.time = getTimeStamp();
    }

    render() {
        console.log("called");
        return getTimeStamp();
    }
}

function getTimeStamp() {
    return moment().format("HH:mm");
}