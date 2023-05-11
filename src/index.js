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
