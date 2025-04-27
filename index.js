window.addEventListener("DOMContentLoaded", function () {
  let apiKey = "t1a14ccfc72cfoaaeca2b9b3f85290df"; // <- Replace this with your real key
  let searchInput = document.querySelector(".search input");
  let searchButton = document.querySelector(".search button");

  searchButton.addEventListener("click", function () {
    let city = searchInput.value;
    if (city) {
      getWeather(city);
    }
  });

  async function getWeather(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    let response = await fetch(apiUrl);

    if (response.ok) {
      let data = await response.json();
      updateWeatherCard(data);
      getForecast(data.coordinates);
    } else {
      alert("City not found!");
    }
  }

  function updateWeatherCard(data) {
    document.querySelector(".city").textContent = data.city;
    document.querySelector(".temperature").textContent = `${Math.round(
      data.temperature.current
    )}°C`;
    let description = data.condition.description.toLowerCase();
    description = description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    document.querySelector(".description").textContent = description;

    let timestamp = data.time * 1000;
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    document.querySelector(".time").textContent = `Time: ${hours}:${minutes}`;

    document.querySelector(
      ".humidity span"
    ).textContent = `${data.temperature.humidity}%`;
    document.querySelector(
      ".wind span"
    ).textContent = `${data.wind.speed} km/h`;
    document.querySelector(".weather-icon").src = data.condition.icon_url;
  }
});

async function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?1on=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metrics`;

  let response = await fetch(apiUrl);

  if (response.ok) {
    let data = await response.json();
    displayForecast(data.daily);
  }
}

function displayForecast(forecastData) {
  let forecastHTML = `<div class="forecast-container">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `<div class="forecast-day">
            <div class="forecast-date">${formatDay(forecastDay.time)}</div>
            <img src="${forecastDay.condition.icon_url}" alt=" " width="50" />
            <div class="forecast-temperature">
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</span> /
            <span class="forecast-temp-min">${Math.round(
              forecastDay.temperature.minimum
            )}°</span>
            </div>
            </div>
            `;
    }
  });

  forecastHTML += `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}
function formatDay(timestamp) {
  let date = new date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
