"use strict";
class WeatherApp {
  // https://openweathermap.org/api/one-call-3
  apiKey = "3de7bd79ff351d443868c0e738e3bc08";

  constructor(tilesContainer, input) {
    this.tilesContainer = tilesContainer;
    this.input = input;
  }

  // API url to be fetched
  getUrl(city, apiKey) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  }

  // fetch data from api using given city
  async getWeatherJSON(city, apiKey) {
    const resp = await fetch(this.getUrl(city, apiKey));
    const respJSON = await resp.json();
    return respJSON;
  }

  getWindDirection(deg) {
    const degNumber = parseFloat(deg);
    if (degNumber >= 0 && degNumber < 35) return "North";
    if (degNumber > 35 && degNumber < 55) return "North-East";
    if (degNumber > 55 && degNumber < 125) return "East";
    if (degNumber > 125 && degNumber < 145) return "South-East";
    if (degNumber > 145 && degNumber < 215) return "South";
    if (degNumber > 215 && degNumber < 235) return "South-West";
    if (degNumber > 235 && degNumber < 305) return "West";
    if (degNumber > 305 && degNumber < 325) return "North-West";
    if (degNumber > 325 && degNumber <= 360) return "North";
  }

  // resolve .json() promise and generate tile
  generatePage(city, apiKey) {
    this.getWeatherJSON(city, apiKey).then((res) => {
      this.generateTileElement(
        res.name,
        res.main.temp,
        `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,
        res.main.feels_like,
        res.main.humidity,
        res.main.pressure,
        res.wind.speed,
        this.getWindDirection(res.wind.deg)
      );
    });
  }

  // https://stackoverflow.com/questions/50776874/how-to-smoothly-add-dynamically-created-element-to-the-dom-using-css3-only
  generateTileElement(
    city,
    temperature,
    src,
    feelsLike,
    humidity,
    pressure,
    windSpeed,
    windDirection
  ) {
    const html = `
    <div class="tile">
        <div class="city">${city}</div>
        <hr class="divider" />
        <div class="temperature">
        <img class="temperature__icon" src="${src}" alt="current weather icon" />
          <div class="temperature__value">${Math.round(
            parseFloat(temperature) - 273
          )}°</div>
          <img class="temperature__icon" src="${src}" alt="current weather icon" />
        </div>
        <hr class="divider divider--2" />
        <div class="feels-like"><span>Feels like:</span> <span>${Math.round(
          parseFloat(feelsLike) - 273
        )}°</span></div>
        <div class="humidity"><span>Humidity:</span> <span>${humidity}%</span></div>
        <div class="pressure"><span>Pressure:</span> <span>${pressure} mbar</span></div>
        <div class="wind">
          <span>Wind Speed:</span> <span>${Math.round(
            parseFloat(windSpeed) * 1.852
          )} km/h</span> 
        </div>
        <div class="wind__dir"><span> Wind Direction:</span><span>${windDirection}</span></div>
      </div>
    `;
    // wind speed formula to get in km/h: wind*1.852
    // generate

    this.input.value = "";
    this.tilesContainer.innerHTML = "";
    this.tilesContainer.insertAdjacentHTML("beforeend", html);
  }
}

// ///////////////////////////////////////////////////////////////
// /////////////////// EVENT LISTENERS ///////////////////////////
// ///////////////////////////////////////////////////////////////
const input = document.querySelector("[data-form-input]");
const formBtn = document.querySelector("[data-form-button]");
const container = document.querySelector(".container");
const tilesContainer = document.querySelector(".tiles");

const weatherApp = new WeatherApp(tilesContainer, input);

formBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputText = input.value.toLowerCase();
  weatherApp.generatePage(inputText, weatherApp.apiKey);

  container.style.marginTop = "4.8rem";
});

// Update year in footer
const year = document.querySelector("[data-year]");
const updateYear = () => {
  year.textContent = new Date().getFullYear();
  console.log(new Date().getFullYear());
};
updateYear();
