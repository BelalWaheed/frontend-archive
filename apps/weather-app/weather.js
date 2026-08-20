const timeKey = "U29C5IA8CNNW";
const openKey = "97350c597549410ea68b775b0153b1ea";
const unsplashKey = "HUQIHvwC0fDB9qJA6e9Vsa1i8kU4Dzh0BB90eiHmNRo";

const addInfo = document.querySelector(".addInfo");
const tempreture = document.querySelector(".tempreture");
const head1 = document.querySelector(".head1");
const btn = document.querySelector("#searchBtn");
const myInput = document.querySelector("#cityInput");
const page_ = document.querySelector(".page_");

const Rain = "🌧️",
  Clouds = "☁️",
  Clear = "☀️",
  Snow = "🌨️",
  Thunderstorm = "⛈️";

function fetchBackground(query) {
  fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${unsplashKey}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        page_.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.8)), url(${data.results[0].urls.regular})`;
      }
    })
    .catch(() => {});
}

function getWeather() {
  const city = myInput.value.trim();
  if (!city) return;

  tempreture.innerHTML = `<span class="spinner-border text-info" role="status"></span>`;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${openKey}`)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const temp = Math.round(data.main.temp);
      const weather = data.weather[0].main;

      let weatherIcon = Clear;
      if (weather === "Rain") weatherIcon = Rain;
      else if (weather === "Clear") weatherIcon = Clear;
      else if (weather === "Clouds") weatherIcon = Clouds;
      else if (weather === "Thunderstorm") weatherIcon = Thunderstorm;
      else if (weather === "Snow") weatherIcon = Snow;

      tempreture.innerHTML = `
        <div class="d-flex justify-content-center align-items-center gap-4 my-3">
          <div class="display-3">${weatherIcon}</div>
          <div class="text-start">
            <h3 class="text-light mb-0 fw-bold">${weather}</h3>
            <span class="text-white-50 small">${data.weather[0].description}</span>
          </div>
        </div>
        <h1 class="text-light display-1 fw-bold mb-2">${temp}°C</h1>
      `;

      addInfo.innerHTML = `
        <h5 class="text-center text-info mb-3">Atmospheric Metrics</h5>
        <div class="row g-3 text-light">
          <div class="col-4">
            <div class="metric-box p-3 rounded-3 text-center">
              <span class="text-white-50 d-block small">Wind Speed</span>
              <strong class="fs-5 text-info">${data.wind.speed} m/s</strong>
            </div>
          </div>
          <div class="col-4">
            <div class="metric-box p-3 rounded-3 text-center">
              <span class="text-white-50 d-block small">Humidity</span>
              <strong class="fs-5 text-info">${data.main.humidity}%</strong>
            </div>
          </div>
          <div class="col-4">
            <div class="metric-box p-3 rounded-3 text-center">
              <span class="text-white-50 d-block small">Pressure</span>
              <strong class="fs-5 text-info">${data.main.pressure} hPa</strong>
            </div>
          </div>
        </div>
      `;

      fetchBackground(city);

      return fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${timeKey}&format=json&by=position&lat=${lat}&lng=${lon}`);
    })
    .then((res) => res.json())
    .then((data2) => {
      if (data2 && data2.cityName) {
        head1.innerHTML = `
          <h2 class="h3 fw-bold text-info mb-1">${data2.cityName}, ${data2.countryName}</h2>
          <p class="text-white-50 small mb-0">Local Time: <strong>${data2.formatted}</strong> (${data2.abbreviation})</p>
        `;
      }
    })
    .catch((error) => {
      tempreture.innerHTML = `<h5 class="text-danger my-3">City "${city}" not found. Please verify spelling.</h5>`;
      addInfo.innerHTML = "";
    });
}

btn.addEventListener("click", getWeather);
myInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});

// Initial weather load
getWeather();
