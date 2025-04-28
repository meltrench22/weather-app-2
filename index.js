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
    console.log("trying to fetch weather data...");
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    let response = await fetch(apiUrl);

    if (response.ok) {
      let data = await response.json();
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
});
