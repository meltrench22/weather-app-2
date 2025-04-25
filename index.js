let apiKey = "t1a14ccfc72cfoaaeca2b9b3f85290df";

let searchInput = document.querySelector(".search input");
let searchButton = document.querySelector(".search nutton");

async function getWeather(city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${apikey}`
  );

  if (response.ok) {
    let data = await response.json();
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
  document.querySelector(".wind span").textContent = `${data.wind.speed}km/h`;

  let iconCode = data.weather[0].icon;
  document.querySelector(
    ".weather-icon"
  ).src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

searchButton.addEventListener("click", function () {
  let city = searchInput.value;
  if (city) {
    getWeather(city);
  }
});
