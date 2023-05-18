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
let currentTime = now.toLocaleTimeString([], {
  hour: `2-digit`,
  minute: `2-digit`,
});
let currentDay = days[now.getDay()];
let currentMinute = now.getMinutes();

let today = `${currentDay}, ${currentTime},`;
let day = document.querySelector("#currentDay");
day.innerHTML = today;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      ${formatDay(forecastDay.time)}
   
      <img
        class="weekly-img"
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt="broken clouds"
        width="48"
        height="48"
      />
      <div class="forecast-temperature">
        <span class="forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}° </span>
        <span class="forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "odc80af43206eetf0e915ae198eb039c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "odc80af43206eetf0e915ae198eb039c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(newForecast);
}

searchCity("Miami");
