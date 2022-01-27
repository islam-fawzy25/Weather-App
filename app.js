

//get elements
const button = document.getElementById("button");
const input = document.getElementById("input");
const main = document.querySelector("main");
const iconElement = document.querySelector(".weather-icon img");
const message = document.getElementById("msg");

// Creat elements
const cityName = document.createElement("h3");
const temperature = document.createElement("div");
const weatherType = document.createElement("div");
const windSpeed = document.createElement("div");
const clouds = document.createElement("div");
const sunrise = document.createElement("div");
const sunset = document.createElement("div");

// Append elements
main.appendChild(cityName);
main.appendChild(temperature);
main.appendChild(clouds);
main.appendChild(weatherType);
main.appendChild(windSpeed);
main.appendChild(sunset);
main.appendChild(sunrise);

//google elemnents
const userLocation = document.getElementById("userLocation");
const searchedCity = "";
const latData = 0;
const lngData = 0;

// main function to get data from JSON
const getWeather = function () {
  let searchedCity = input.value;
  if (input.value == "") {
    message.innerText = "Please enter Valid city name";
    message.style.backgroundColor = "red";
  } else {
    message.style.visibility = "hidden";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${ApiKey}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          message.style.visibility = "visible";
          message.style.backgroundColor = "red";
          message.innerText = "Invalid city name";
          return;
        }
      })
      .then((weatherData) => readData(weatherData));
  }
};
// get and print weather data on DOM
function readData(data) {
  if (data === undefined) {
    return;
  } else {
    //print datat in elements
    cityName.innerText = data.name + " " + data.sys.country;
    temperature.innerText = Math.round(data.main.temp) + " °C";
    weatherType.innerText = data.weather[0].description;
    windSpeed.innerText =
      "Wind Speed :  " + Math.round(data.wind.speed) + " M/S";
    // clouds.innerText = 'Clouds :  ' + data.clouds.all
    sunrise.innerText =
      "Sunrise   " +
      new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    sunset.innerText =
      "Sunset   " +
      new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    iconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    // location variable and calling back map function
    let latData = data.coord.lat;
    let lngData = data.coord.lon;
  }
}

// call weather data with click on button
document.addEventListener("DOMContentLoaded", () => {
  button.addEventListener("click", () => {
    getWeather();
    readData();
  });
});

// get weather by  user location
document.addEventListener("DOMContentLoaded", () => {
  userLocation.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      message.style.visibility = "hidden";

      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const getWeather = function () {
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${ApiKey}`
          )
            .then((response) => response.json())
            .then((weatherData) => readData(weatherData));
        };
        getWeather();
      });
    } else {
      message.innerText = "Your Location not support in this websit";
      message.style.backgroundColor = "red";
    }
  });
});
