function formatCurrentDate(nowDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDay = days[nowDate.getDay()];
  let currentDate = nowDate.getDate();
  let currentMonth = months[nowDate.getMonth()];
  let currentYear = nowDate.getFullYear();

  let currentTimeHours = nowDate.getHours();
  if (currentTimeHours < 10) {
    currentTimeHours = `0${currentTimeHours}`;
  }

  let currentTimeMinutes = nowDate.getMinutes();

  if (currentTimeMinutes < 10) {
    currentTimeMinutes = `0${currentTimeMinutes}`;
  }

  let currentDisplayDate = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}, ${currentTimeHours}:${currentTimeMinutes}`;
  return currentDisplayDate;
}

function displayCityWeatherInfo(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity-data").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function search(city) {
  let units = "metric";
  let apiKey = "b1710895b469eb434ca65896f4e0d1be";
  let urlEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let apiUrl = `${urlEndpoint}${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCityWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();

  let inputCity = document.querySelector("#search-city-name");
  if (inputCity.value) {
    let city = `${inputCity.value}`;
    search(city);
  } else {
    alert("Please enter a city");
  }
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = "metric";
  let apiKey = "b1710895b469eb434ca65896f4e0d1be";
  let urlEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${urlEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCityWeatherInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let nowDate = new Date();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatCurrentDate(nowDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentCityBtn = document.querySelector("#current-city-btn");
currentCityBtn.addEventListener("click", getCurrentLocation);

search("Tokyo");
