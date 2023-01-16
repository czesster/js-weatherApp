"use strict";
class WeatherApp {
  apiKey = "3de7bd79ff351d443868c0e738e3bc08";

  constructor(tilesContainer, input, errorContainer) {
    this.tilesContainer = tilesContainer;
    this.input = input;
    this.errorContainer = errorContainer;
  }

  // API url to be fetched
  getUrl(city, apiKey) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  }

  // generating error messages based on error message thrown
  generateError(errorMsg) {
    const errorMessageHTML = `<p class="error__message">${errorMsg}</p>`;

    this.tilesContainer.innerHTML = "";
    this.errorContainer.innerHTML = "";
    errorContainer.insertAdjacentHTML("beforeend", errorMessageHTML);
  }

  // fetch data from api using given city
  async getWeatherJSON(city, apiKey) {
    try {
      const resp = await fetch(this.getUrl(city, apiKey));
      if (!resp.ok) throw new Error(`Searched city does not exist`);

      return await resp.json();
    } catch (err) {
      this.generateError(err.message);
    }
  }

  // get wind direction names for data tile
  getWindDirection(deg) {
    const directions = [
      "North",
      "North-East",
      "East",
      "South-East",
      "South",
      "SouthWest",
      "West",
      "North-West",
    ];

    let degrees = (deg * 8) / 360;
    degrees = Math.round(degrees);

    // to be sure degrees will be from 0-7
    degrees = (degrees + 8) % 8;

    return directions[degrees];
  }

  // generate tile with all informations
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

    this.input.value = "";
    this.tilesContainer.innerHTML = "";
    this.errorContainer.innerHTML = "";
    this.tilesContainer.insertAdjacentHTML("beforeend", html);
  }

  // resolve .json() promise and generate tile
  generatePage(city, apiKey) {
    this.getWeatherJSON(city, apiKey).then((res) => {
      try {
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
      } catch (err) {}
    });
  }
}

// ///////////////////////////////////////////////////////////////
// /////////////////// EVENT LISTENERS ///////////////////////////
// ///////////////////////////////////////////////////////////////
const input = document.querySelector("[data-form-input]");
const formBtn = document.querySelector("[data-form-button]");
const container = document.querySelector(".container");
const tilesContainer = document.querySelector(".tiles");
const errorContainer = document.querySelector(".error__box");

const weatherApp = new WeatherApp(tilesContainer, input, errorContainer);

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
};
updateYear();
