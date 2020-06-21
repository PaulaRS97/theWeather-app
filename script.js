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
let hour = now.getHours();
let minutes = now.getMinutes();

let currentTimeHour = document.querySelector("#current-day");
currentTimeHour.innerHTML = `${day}, ${hour}:${minutes}, ${year}`;

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
    temperature.innerHTML = `${newTemp}`;
    tempUnit.innerHTML = "°C";
  } else {
    temperature.innerHTML = temp2;
    tempUnit.innerHTML = "°F";
  }
}
tempUnit.addEventListener("click", showFar);

// Show current temperature -- input value

  function apiTemperature(response) {
    let city = document.querySelector("#city-name");
    city.innerHTML = response.data.name;
    let currentTemperature = Math.round(response.data.main.temp);
    let actualTemperature = document.querySelector("#changeTemperature");
    actualTemperature.innerHTML = `${currentTemperature}`;
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
