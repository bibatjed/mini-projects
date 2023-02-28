import {DateTime} from "./luxon.js";
function joinZeroToNumber(number){
    if(number < 10){
        return '0' + number;
    }

    return number
}
function displayAmPm(hour){
    if(hour < 12){
        return 'am';
    }

    return 'pm';
}
function displayMessage(hour){
    if(hour >= 12 && hour <= 15){
        return 'wonderful afternoon &#128522';
    }
    if(hour >= 16 && hour <= 22){
        return 'good evening &#127769';
    }
    if(hour == 23 ){
        return 'bed time &#127770'
    }

    if(hour >= 0 && hour <= 5){
        return 'sleep well &#127773';
    }

    if(hour >= 6 && hour <= 12 ){
        return 'good morning &#127774';
    }
}
function displayDateTimeString(){
    let date = DateTime.now();
    let  hour = date.hour;
    let minute = date.minute;
    let second = date.second;

    document.getElementById('display-hour').innerHTML = joinZeroToNumber(hour);
    document.getElementById('display-minute').innerHTML = joinZeroToNumber(minute);
    document.getElementById('display-second').innerHTML = joinZeroToNumber(second);
    document.getElementById('display-am-pm').innerHTML = displayAmPm(hour);

    let month = date.month;
    let day = date.day;
    let year = date.year;
    document.getElementById('month').innerHTML = joinZeroToNumber(month);
    document.getElementById('day').innerHTML = joinZeroToNumber(day);
    document.getElementById('year').innerHTML = joinZeroToNumber(year);

    document.getElementById('message').innerHTML = displayMessage(hour);
}

function displayCopy(){
    let date = new Date();
    document.getElementById('copy').innerHTML = '&copy;Cyril Mukabwa ' + date.getFullYear();
}

setInterval(displayDateTimeString,0.01);
displayCopy();


//module.exports = {getDateTimeComponents,getHour,getMinute,getSecond,displayAmPm}