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

const input = document.querySelector("[data-form-input]");
const formBtn = document.querySelector("[data-form-button]");
const year = document.querySelector("[data-year]");

let clicked = false;

formBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputText = input.value;
  console.log(inputText);
  getWeatherByCity(inputText, apiKey);

  clicked = true;
});

const updateYear = () => {
  year.textContent = new Date().getFullYear();
  console.log(new Date().getFullYear());
};
updateYear();
