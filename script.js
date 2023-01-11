"use strict";
class WeatherApp {
  // https://openweathermap.org/api/one-call-3
  apiKey = "3de7bd79ff351d443868c0e738e3bc08";

  constructor(tiles) {
    this.tiles = tiles;
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

  // resolve .json() promise and generate tile
  generatePage(city, apiKey) {
    this.getWeatherJSON(city, apiKey).then((res) => {
      console.log(res);
      this.generateTileElement(
        res.name,
        res.main.temp,
        "cloudy-outline",
        res.main.feels_like,
        res.main.humidity,
        res.main.pressure,
        res.wind.speed,
        res.wind.deg
      );
    });
  }

  // https://stackoverflow.com/questions/50776874/how-to-smoothly-add-dynamically-created-element-to-the-dom-using-css3-only
  generateTileElement(
    city,
    temperature,
    icon,
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
          <div class="temperature__icon">
            <ion-icon name="${icon}"></ion-icon>
          </div>
          <div class="temperature__value">${Math.round(
            parseFloat(temperature) - 273
          )}°</div>
          <div class="temperature__icon">
            <ion-icon name="${icon}"></ion-icon>
          </div>
        </div>
        <hr class="divider divider--2" />
        <div class="feels-like"><span>Feels like:</span> <span>${Math.round(
          parseFloat(feelsLike) - 273
        )}°</span></div>
        <div class="humidity"><span>Humidity:</span> <span>${humidity}%</span></div>
        <div class="pressure"><span>Pressure:</span> <span>${pressure}mbar</span></div>
        <div class="wind">
          <span>Wind Speed:</span> <span>${windSpeed}KM/H</span> 
        </div>
        <div class="wind__dir"><span> Wind Direction:</span><span>${windDirection}</span></div>
      </div>
    `;
    // wind speed formula to get in km/h: wind*1.852
    // generate

    this.tiles.insertAdjacentHTML("beforeend", html);
  }
}

// ///////////////////////////////////////////////////////////////
// /////////////////// EVENT LISTENERS ///////////////////////////
// ///////////////////////////////////////////////////////////////
const input = document.querySelector("[data-form-input]");
const formBtn = document.querySelector("[data-form-button]");
const container = document.querySelector(".container");
const tiles = document.querySelector(".tiles");

const weatherApp = new WeatherApp(tiles);

formBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputText = input.value.toLowerCase();
  console.log(inputText);
  console.log(weatherApp.generatePage(inputText, weatherApp.apiKey));

  container.style.marginTop = "4.8rem";
});

// Update year in footer
const year = document.querySelector("[data-year]");
const updateYear = () => {
  year.textContent = new Date().getFullYear();
  console.log(new Date().getFullYear());
};
updateYear();
