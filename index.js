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
    } else {
      alert("City not found!");
    }
  }

  function updateWeatherCard(data) {
    document.querySelector(".city").textContent = data.city;
    document.querySelector(".temperature").textContent = `${Math.round(
      data.temperature.current
    )}°C`;
    document.querySelector(".description").textContent =
      data.Condition.Description;

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
