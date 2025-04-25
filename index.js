window.addEventListener("DOMContentLoaded", function () {
  let searchInput = document.querySelector(".search input");
  let searchButton = document.querySelector(".search button");

  searchButton.addEventListener("click", function () {
    let city = searchInput.value;
    if (city) {
      getWeather(city);
    }
  });

  async function getWeather(city) {
    let apiKey = "t1a14ccfc72cfoaaeca2b9b3f85290";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metrics`;

    let response = await fetch(apiUrl);

    if (response.ok) {
      let data = await response.json();
      console.log(data);
      updateWeatherCard(data);
    } else {
      alert("City not found");
    }
  }

  function updateWeatherCard(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temperature").textContent = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(
      ".humidity span"
    ).textContent = `${data.main.humidity}%`;
    document.querySelector(
      ".wind span"
    ).textContent = `${data.wind.speed} km/h`;

    let iconCode = data.condition.icon_url;
    document.querySelector(".weather-icon").src = iconCode;
  }
});
