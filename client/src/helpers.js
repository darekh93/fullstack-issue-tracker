export function convertDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return `${dt}-${month}-${year} ${hours}:${minutes}`
}

export function generateStatusName(statusNumber) {
    let result = "";
    switch (statusNumber) {
        case 0:
            result = "open";
            break;
        case 1: 
            result = "pending";
            break;
        case 2:
            result = "close";
            break;
    
        default:
            result = "undefined";
            break;
    }
    return result;
}