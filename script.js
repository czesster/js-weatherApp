"use strict";

// https://openweathermap.org/api/one-call-3
const apiKey = "3de7bd79ff351d443868c0e738e3bc08";
let city = "Łódź";

// API url to be fetched
const url = (city, apiKey) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // works by city

// fetch data from api using given city
async function getWeatherByCity(city, apiKey) {
  const resp = await fetch(url(city, apiKey));
  const respData = await resp.json();
  console.log(respData);
}

getWeatherByCity(city, apiKey);
