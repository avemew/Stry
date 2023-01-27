import moment from "moment";

//returns date in format: yy-MM-DDThh:00
export const todayDate = () => {
    const now = moment()

    return now.format("yy-MM-DDTHH:00")
}

export function getTimeStamp() {
    return moment().format("HH:mm");
}

const travelTime = 7;

export const arrivalDate = () => {
    const now = moment()

    now.add(travelTime, 'hours');

    return now.format("yy-MM-DDTHH:mm");
}

export const arrivalDateRounded = () => {
    const now = moment()
    const travelTime = 5;

    now.add(travelTime, 'hours');

    return now.format("yy-MM-DDTHH:00");
}