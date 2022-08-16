let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

let city = prompt("Enter your city, please.");
city = city.trim();
city = city.toLowerCase();
if (weather[city] !== undefined) {
  let tempCelcius = Math.round(weather[city].temp);
  let tempFahrenheit = Math.round(weather[city].temp * 1.8 + 32);
  alert(
    `It is currently ${tempCelcius}°C (${tempFahrenheit}°F) in ${city} with a humidity of ${weather[city].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}

// 1
function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day}  ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");

  let cityInput = document.querySelector("#city-input");

  cityElement.innerHTML = cityInput.value;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "66";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "19";
}

let dateElement = document.querySelector(`#date`);
let currentTime = new Date();

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);

dateElement.innerHTML = formatDate(currentTime);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#tempMain");
  showTemp.innerHTML = temperature;
  let cityname = response.data.name;
  let showCityName = document.querySelector("#city-main");
  showCityName.innerHTML = cityname;
}

function searchCity(event) {
  event.preventDefault();
  let cities = document.querySelector("#usercityInput");
  let city = cities.value;
  let apiKey = "9d9254fabd8a44bac14ad45441ef74d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9d9254fabd8a44bac14ad45441ef74d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let searchanother = document.querySelector("#submitCityid");
searchanother.addEventListener("click", searchCity);

let currentButton = document.querySelector("#currentid");
currentButton.addEventListener("click", currentLocation);
