let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentTime = now.getHours();
let currentDay = days[now.getDay()];
let currentMinute = now.getMinutes();

let today = `${currentDay}, ${currentTime}:${currentMinute},`;
let day = document.querySelector("#currentDay");
day.innerHTML = today;

function search(event) {
  event.preventDefault();
  let update = document.querySelector("#city");
  let pinpoint = document.querySelector("#cityWeather");
  pinpoint.innerHTML = update.value;
  searchCity(update.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function newForecast(response) {
  console.log(response);
  console.log(response.data.temperature.current);
  console.log(response.data.temperature.humidity);
  console.log(response.data.condition.description);

  celsiusTemperature = response.data.temperature.current;

  let newTemp = document.querySelector("#today-temp");
  newTemp.innerHTML = `${Math.round(response.data.temperature.current)}`;

  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;

  let newWind = document.querySelector("#windSpeed");
  newWind.innerHTML = `${Math.round(response.data.wind.speed)}mph`;

  let newDescrption = document.querySelector("#weather-description");
  newDescrption.innerHTML = response.data.condition.description;

  let newCity = document.querySelector("#cityWeather");
  newCity.innerHTML = response.data.city;

  let newIcon = document.querySelector("#icon");
  newIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  newIcon.setAttribute("alt", response.data.condition.icon);
}

function searchCity(city) {
  let apiKey = "odc80af43206eetf0e915ae198eb039c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newForecast);
}
let celsiusTemperature = null;

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let newTemp = document.querySelector("#today-temp");
  newTemp.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let newTemp = document.querySelector("#today-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  newTemp.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Miami");
