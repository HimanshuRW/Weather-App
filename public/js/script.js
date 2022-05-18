let weather_condition = document.getElementById('weather_condition');
let date = document.getElementById('date');
date.innerHTML = getDate();
function getDate() {

    let str = "";
    let current_date = new Date();

    let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let day = week[current_date.getDay()];

    let year = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    let month = year[current_date.getMonth()];

    let tarik = current_date.getDate();

    let current_hrs = current_date.getHours();
    let period = "AM";
    let current_mins = current_date.getMinutes();
    if (current_hrs > 11) {
        period = "PM";
        if (current_hrs > 12) {
            current_hrs = current_hrs - 12;
        }
    }
    if (current_mins < 10) {
        current_mins = "0" + current_mins;
    }

    return `${day} | ${month} ${tarik} | ${current_hrs}:${current_mins} ${period}`;
}
let weather_status = weather_condition.className;
if (weather_status == "Sunny") {
    weather_condition.innerHTML = `<i class="fa fa-sun-o" style="color:#f9d71c;"></i>`;
} else if (weather_status == "Clouds") {
    weather_condition.innerHTML = `<i class="fa fa-cloud" aria-hidden="true" style="color: rgb(0, 195, 255)"></i>`;
} else if (weather_status == "Rainy") {
    weather_condition.innerHTML = `<i class="fa fa-tint" aria-hidden="true" style="color: rgb(0, 195, 255)"></i>`;
} else {
    weather_condition.innerHTML = `<i class="fa fa-cloud" aria-hidden="true" style="color: rgb(0, 195, 255)"></i>`;
}