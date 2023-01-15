import moment from "moment";

//returns date in format: yy-MM-DDThh:00
export const todayDate = () => {
    const now = moment()

    return now.format("yy-MM-DDTHH:00")
}

export function getTimeStamp() {
    return moment().format("HH:mm");
}