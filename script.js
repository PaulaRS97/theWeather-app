let now = new Date();
let day = now.getDay();
let year = now.getFullYear();
let apiKey = "f4778adffa0c39d7398ba7664ea1afd9";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

day = days[now.getDay()];
let date= now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let month = now.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
month = months[now.getMonth()];


let currentTimeHour = document.querySelector("#current-day");
currentTimeHour.innerHTML = `${day} ${date}, ${month} ${year} | ${hour}:${minutes}`;


//feature 2

let form = document.querySelector(".form-inline");

function showCity(event) {
  let searchInput = document.querySelector("#inlineFormInputName2");
  if (searchInput.value === "") {
  } else {
    let city = document.querySelector("#city-name");
    city.innerHTML = searchInput.value;
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
      searchInput.value
    }&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(apiTemperature);
  }
}
form.addEventListener("submit", showCity);

// feature 3

let tempUnit = document.querySelector("#f-button");
let temp = document.querySelector("#changeTemperature");
let temp2 = temp.innerHTML;

function showFar() {
  let temperature = document.querySelector("#changeTemperature");

  if (tempUnit.innerHTML == "°F") {
    let newTemp = (temp2 * 9) / 5 + 32;
    temperature.innerHTML = `${Math.round(newTemp)}`;
    tempUnit.innerHTML = "°C";
  } else {
    temperature.innerHTML = `${temp2}`;
    tempUnit.innerHTML = "°F";
  }
}
tempUnit.addEventListener("click", showFar);

// Show current temperature -- input value
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;

  function apiTemperature(response) {
    let city = document.querySelector("#city-name");
    city.innerHTML = response.data.name;
    let currentTemperature = Math.round(response.data.main.temp);
    temp2 = currentTemperature;
    let actualTemperature = document.querySelector("#changeTemperature");
    actualTemperature.innerHTML = `${currentTemperature}`;
    let humidity = document.querySelector("#js-humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    let wind = document.querySelector("#js-wind");
    wind.innerHTML= `Wind: ${response.data.wind.speed} km/h`;
    let iconElement = document.querySelector("#iconjs");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }

// get current location

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiGeolocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiGeolocation).then(apiTemperature);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonPosition = document.querySelector("#current-location-button");
buttonPosition.addEventListener("click", getCurrentPosition);

