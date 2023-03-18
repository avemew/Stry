import moment from "moment";

//returns date in format: yy-MM-DDThh:00
export const todayDate = () => {
    const now = moment()

    return now.format("yy-MM-DDTHH:00")
}

//returns time in format: HH:mm
export function getTimeStamp() {
    return moment().format("HH:mm");
}

const travelTime = 7;   //placeholder for traveltime from departure to destination country

//returns date and time of destination after arrival
//with minutes, used for clock display
export const arrivalDate = () => {
    const now = moment()

    now.add(travelTime, 'hours');

    return now.format("yy-MM-DDTHH:mm");
}

//returns date and time of destination after arrival
//without minutes, used for fetching
export const arrivalDateRounded = () => {
    const now = moment()
    const travelTime = 5;

    now.add(travelTime, 'hours');

    return now.format("yy-MM-DDTHH:00");
}