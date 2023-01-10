"use strict";
class WeatherApp {
  // https://openweathermap.org/api/one-call-3
  apiKey = "3de7bd79ff351d443868c0e738e3bc08";

  constructor() {}

  // API url to be fetched
  getUrl(city, apiKey) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  }

  // fetch data from api using given city
  async getWeatherByCity(city, apiKey) {
    const resp = await fetch(this.getUrl(city, apiKey));
    const respJSON = await resp.json();
    console.log(respJSON);
    // return respJSON;
  }
}

const weatherApp = new WeatherApp();

// ///////////////////////////////////////////////////////////////
// /////////////////// EVENT LISTENERS ///////////////////////////
// ///////////////////////////////////////////////////////////////
const input = document.querySelector("[data-form-input]");
const formBtn = document.querySelector("[data-form-button]");
const container = document.querySelector(".container");

formBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputText = input.value.toLowerCase();
  console.log(inputText);
  weatherApp.getWeatherByCity(inputText, weatherApp.apiKey);

  container.style.marginTop = "4.8rem";
});

// Update year in footer
const year = document.querySelector("[data-year]");
const updateYear = () => {
  year.textContent = new Date().getFullYear();
  console.log(new Date().getFullYear());
};
updateYear();
