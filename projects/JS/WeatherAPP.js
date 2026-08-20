//
const timeKey = "U29C5IA8CNNW";
const openKey = "97350c597549410ea68b775b0153b1ea";
const pixKey = "48845354-814d36687204caabd12c9f5af";
const unsplashKey = "HUQIHvwC0fDB9qJA6e9Vsa1i8kU4Dzh0BB90eiHmNRo";
const addInfo = document.querySelector(".addInfo");
const tempreture = document.querySelector(".tempreture");

const head1 = document.querySelector(".head1");
const btn = document.querySelector(".btn");
const myInput = document.querySelector("input");
const body = document.querySelector("body");
const page_ = document.querySelector(".page_");

const Rain = "🌧️",
  Clouds = "☁️",
  Clear = "☀️",
  Snow = "🌨️",
  Thunderstorm = "⛈️";

let belal_lat = 1,
  belal_lon = 2,
  belal_temp = 0,
  weather = "",
  weatherIcon = "";

function background() {
  fetch(
    `https://api.unsplash.com/search/photos?query=${myInput.value}&client_id=${unsplashKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (myInput.value == "") {
        page_.style.background = `url("/project-bg.jpg")`;
        page_.style.backgroundSize = `cover`;
      }
      if (data.results.length > 2) {
        page_.style.background = `url(${data.results[0].urls.regular})`;
        page_.style.backgroundSize = `cover`;
      }
    });
}

btn.addEventListener("click", () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${myInput.value}&units=metric&appid=${openKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      belal_lat = data.coord.lat;
      belal_lon = data.coord.lon;
      belal_temp = Math.floor(data.main.temp);
      weather = data.weather[0].main;
      if (weather == "Rain") {
        weatherIcon = Rain;
      }

      if (weather == "Clear") {
        weatherIcon = Clear;
      } else if (weather == "Clouds") {
        weatherIcon = Clouds;
      } else if (weather == "Thunderstorm") {
        weatherIcon = Thunderstorm;
      } else if (weather == "Snow") {
        weatherIcon = Snow;
      } else {
        weatherIcon = Clear;
      }
      const content1 = `
          <div class="d-flex justify-content-center gap-5 mb-4 ">
                  <div class="display-1 text-light">${weatherIcon}</div>
                  <div>
                      <h1 class="text-light">${weather}</h1>
                  </div>
          </div>
          <h1 class="text-light display-2 mb-3">${belal_temp}°</h1>`;

      const content2 = `
      <h4 class="text-center text-warning mb-4">Additional Information</h4>
                <div class="row g-3 text-light">
                    <div class="col-md-4">
                        <div class="metric-box p-3 rounded-3">
                            <h5 class="text-warning">Wind Speed</h5>
                            <p class="text-light mb-0 fs-5">${data.wind.speed} mph</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="metric-box p-3 rounded-3">
                            <h5 class="text-warning">Humidity</h5>
                            <p class="text-light mb-0 fs-5">${data.main.humidity}%</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="metric-box p-3 rounded-3">
                            <h5 class="text-warning">Pressure</h5>
                            <p class="text-light mb-0 fs-5">${data.main.pressure} hPa</p>
                            </div>
                    </div>
                </div>
        `;

      tempreture.innerHTML = content1;
      addInfo.innerHTML = content2;
      page_.style.background = "";
      background();

      fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeKey}&format=json&by=position&lat=${belal_lat}&lng=${belal_lon}`
      )
        .then((res) => res.json())
        .then((data2) => {
          if (data2.status == "FAILED") {
            head1.innerHTML = `<h1 class="text-danger" >Wrong City</h1>`;
          } else {
            let head1Content = `
            <h2 class="text-warning mb-3">${data2.cityName} / ${data2.countryName}</h2>
            <h4 class="text-warning  ">Time : ${data2.formatted}</h4>`;
            head1.innerHTML = head1Content;
          }
        });
    });
});
