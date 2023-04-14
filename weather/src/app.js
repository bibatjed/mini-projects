const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const dateLocationDiv = document.querySelector('.date-location');
const modal = document.querySelector('.modal');
const mainDisplay = document.querySelector('.section-center');
const conditionDiv = document.querySelector('.weather-today');
const statsDiv = document.querySelector('.stats');
const changeLocationBtn = document.querySelector('.change-location');
const forecastDayDiv = document.querySelector('.forecast');

function parseDate(dateStr){
    const date = new Date(dateStr);
    const day = `${days[date.getDay()]}`;
    const dayStr = date.getDate();
    const month = `${months[date.getMonth()]}`;
    const year = date.getFullYear();

    return [day,dayStr,month,year]
}




function dateHtml(localtime){
    const dateArray = parseDate(localtime);
    const day = dateArray[0];
    const dayStr = dateArray[1];
    const month = dateArray[2];
    const year = dateArray[3];

    return `
    <span class="day">${day}</span>
    <span class="date">${dayStr} ${month} ${year}</span>
    `

}

function locationHtml(city,country){

    return `
    <span class="location"><i class="fa-sharp fa-solid fa-location-dot"></i>   ${city}, ${country}</span>
    `
}

function temperatureHtml(currentWeather){
    const condition = currentWeather.condition;
    const temperature = currentWeather.temp_c;
    const  text = condition.text;
    const icon = condition.icon
    


    return `
    <img src=${icon} alt="weather icon">
                    <span class="temperature">${temperature}<sup>o</sup>C</span>
                    <span class="weather-description">${text}</span>
    `
}

function forecastDayHtml(forecastDay){
    const day = parseDate(forecastDay.date)[0].slice(0,3);
    const temp = forecastDay.day.maxtemp_c;
    const condition = forecastDay.day.condition;
    const icon = condition.icon;

    return `
    <div id="day1">
                        <img src=${icon} alt="weather icon">
                        <span class="day-str">${day}</span>
                        <span class="temp">${temp}<sup>o</sup>C</span>
                    </div>
    `
}

function errorHtml(){
    const errorSpan = document.querySelector(".error");
    errorSpan.classList.remove('hide-section');
    errorSpan.textContent = "City name is missing";

    return errorSpan;

}


function statsHtml(stats){

    const precipitation = stats.precip_mm;
    const humidity = stats.humidity;
    const wind = stats.wind_kph;

    return `
     <div> <span>PRECIPITATION:</span> <span class="precipitation">${precipitation}%</span></div>
    <div> <span>HUMIDITY</span> <span class="humidity">${humidity}%</span></div>
    <div> <span>WIND: </span> <span class="WIND">${wind} KM/H</span></div> 
    `
}


function displayData(){

    mainDisplay.classList.add('hide-section');
    modal.classList.remove('hide-section');

    const userLocationForm = modal.querySelector('.user-location');
    
    userLocationForm.addEventListener('submit',(e) => {
        e.preventDefault();
        const userInput = userLocationForm.querySelector('.city');
        let city;
       if(!userInput.value){
        errorHtml()
        return;
       }else {
        mainDisplay.classList.remove('hide-section');
        modal.classList.add('hide-section');
        errorHtml().classList.add('hide-section');
        city = userInput.value;
        userInput.value = '';
       }

    
        const apiKey = `http://api.weatherapi.com/v1/forecast.json?key=1bc6a11b0d074047b61112518230304&q=${city}&days=5&aqi=no`;
    

         fetch(apiKey)
         .then((response) => response.json())
         .then(
           (weatherData) => {
            const locationData = weatherData.location;
            const currentWeather = weatherData.current;


             const cityStr = locationData.name;
             const countryStr = locationData.country;
             const localtime = locationData.localtime;
            
            const dateStr = dateHtml(localtime);
             const locationStr = locationHtml(cityStr,countryStr);
             dateLocationDiv.innerHTML = `${dateStr} ${locationStr}`;
             conditionDiv.innerHTML = temperatureHtml(currentWeather);
             statsDiv.innerHTML = statsHtml(currentWeather);

             const forecastDay = weatherData.forecast.forecastday;

             let forecastDayStr = ''
             for(let i = 1; i < forecastDay.length; i++){
                forecastDayStr += forecastDayHtml(forecastDay[i]);  
             }
             forecastDayDiv.innerHTML = forecastDayStr;


           });
    });

}

function loadWindow(){

window.addEventListener('load',(e) =>{
    displayData();
    changeLocationBtn.addEventListener('click',displayData);});
}

loadWindow();












   

    
    //data needed
    //day
    //date
    //location
    //temp
    //description
    //precipitation
    //humidity
    //wind
    // mon-fri

    // fetch(apiKey)
    // .then((response) => response.json())
    // .then(
    //     (weatherData) => {

    //         console.log(weatherData);
    //         displayDateLocation(weatherData.location);
            


    //     }
    // )

    



