
 const icon = document.querySelector(".weather-icon");
 const temperature = document.querySelector(".temperature-value p");
 const description = document.querySelector(".temperature-description p");
 const locationElement = document.querySelector(".location p"); 
 const notification = document.querySelector(".notification");
 

 const weather = {};

 weather.temperature = {
     unit: "celsius"
 }

  //API constant and key
  const KELVIN = 273;

  const key = "da844889eac10d126955fc3b4bcf9f43"; //access to api 


//User's location

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);

 }else{
     notification.innerHTML.style.display = "block";
     notification.innerHTML = "<p> Geolocation not supported </p>"
 }

 //function for user's position and callback

 function setPosition(position){
     let latitude = position.coords.latitude;
     let longitude = position.coords.longitude;

     getWeather(latitude, longitude);
  }

 function showError(error){
     notification.style.display = "block";
     notification.innerHTML = `<p> ${error.message} </p>`;
 }


//Get weather from api 

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
         .then(function(response){
             let data = response.json();
             return data;
         })

         .then(function(data){
             weather.temperature.value = Math.floor(data.main.temp - KELVIN);
             weather.description = data.weather[0].description;
             weather.iconId = data.weather[0].icon;
             weather.city = data.name;
             weather.country = data.sys.country;

         })
         .then(function(){
             displayWeather();

         })     
};

function displayWeather(){
    icon.innerHTML = `<img src="icon/${weather.iconId}.png"/>`;
    temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    description.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
 

//Temperature conversion from celsius to fahrenheit


function celsiusToFahrenheit(temperature){
    return(temperature * 9/5) + 32;
}

//when user clicks on temperature
temperature.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit); //removes float in number
        temperature.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit";

    }else{
        temperature.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celsius";

    }
  
});



