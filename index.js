window.addEventListener("DOMContentLoaded", function () {
  let apiKey = "t1a14ccfc72cfoaaeca2b9b3f85290df";
  let searchInput = document.querySelector(".search input");
  let searchButton = document.querySelector(".search button");

  searchButton.addEventListener("click", function () {
    let city = searchInput.value;
    if (city) {
      getWeather(city);
    }
  });

  async function getWeather(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    let response = await fetch(apiUrl);

    if (response.ok) {
      let data = await response.json();
      Console.log(data.daily);
      updateWeatherCard(data);
      displayForecast(data.daily);
    } else {
      alert("City not found!");
    }
  }

  function updateWeatherCard(data) {
    document.querySelector(".city").textContent = data.city;
    document.querySelector(".temperature").textContent = `${Math.round(
      data.daily[0].temperature.day
    )}°C`;
    document.querySelector(
      ".humidity span"
    ).textContent = `${data.daily[0].temperature.humidity}%`;
    document.querySelector(
      ".wind span"
    ).textContent = `${data.daily[0].wind.speed} km/h`;
    document.querySelector(".weather-icon").src =
      data.daily[0].condition.icon_url;

    // Description
    let description = data.daily[0].condition.description.toLowerCase();
    description = description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    document.querySelector(".description").textContent = description;

    // Time
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    document.querySelector(
      ".time"
    ).textContent = `Last updated ${hours}:${minutes}`;
  }

  function displayForecast(forecastData) {
    let forecastHTML = "";

    forecastData.slice(1, 7).forEach(function (day) {
      let timestamp = day.time * 1000;
      let date = new Date(timestamp);
      let dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      forecastHTML += `
        <div class="forecast-day">
          <div class="forecast-date">${dayName}</div>
          <img src="${day.condition.icon_url}" alt="${
        day.condition.description
      }" class="forecast-icon" />
          <div class="forecast-temp">${Math.round(
            day.temperature.maximum
          )}° / ${Math.round(day.temperature.minimum)}°</div>
        </div>
      `;
    });

    document.querySelector(".forecast").innerHTML = forecastHTML;
  }
});
