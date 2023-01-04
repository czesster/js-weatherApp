"use strict";

// https://openweathermap.org/api/one-call-3
let lat, lon;
const apiKey = "3de7bd79ff351d443868c0e738e3bc08";
let city = "Łódź";

// Get coordinates of user location
navigator.geolocation.getCurrentPosition(
  function (pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    console.log(lat, lon);
  },
  function () {
    console.log("Could not get your position");
  }
);

// API url to be fetched
const url = (city, apiKey) =>
  //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`; // podgorzyn
  //   `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`; // wrong lat
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // works by city

// fetch data from api using given city
async function getWeatherByCity(city, apiKey) {
  const resp = await fetch(url(city, apiKey));
  const respData = await resp.json();
  console.log(respData);
}

getWeatherByCity(city, apiKey);

// const urlReverseGeocoding = (lat, lon, apiKey) =>
//   `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// async function getCoords(lat, lon, apiKey) {
//   const resp = await fetch(urlReverseGeocoding(lat, lon, apiKey));
//   const respData = await resp.json();
//   console.log(respData);
// }

// getCoords(lat, lon, apiKey);
