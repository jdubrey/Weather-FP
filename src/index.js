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

function newForecast(response) {
  console.log(response);
  console.log(response.data.main.temp);
  console.log(response.data.main.humidity);
  console.log(response.data.weather[0].description);
  let newTemp = document.querySelector("#today-temp");
  newTemp.innerHTML = `${Math.round(response.data.main.temp)}`;

  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;

  let newDescrption = document.querySelector("#weather-description");
  newDescrption.innerHTML = response.data.weather[0].description;

  let newCity = document.querySelector("#cityWeather");
  newCity.innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "odc80af43206eetf0e915ae198eb039c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=odc80af43206eetf0e915ae198eb039c&units=metric`;
  axios.get(apiUrl).then(newForecast);
}
searchCity("Miami");

let exact = document.querySelector("#button");
exact.addEventListener("click", searchCity);
