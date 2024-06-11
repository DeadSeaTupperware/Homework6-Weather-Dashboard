const apiKey = "87415fb694122c5c0a1eacde1eec7367";
const searchButton = document.querySelector("#search-button");
const cityInput = document.querySelector("#city-input");
const weatherCards = document.querySelector(".weather-cards");

function getCoordinates () {
    let cityName = cityInput.value.trim(); // Get user input city name.
    const apiGeocodingCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=imperial&limit=1&appid=${apiKey}`;
    if(!cityName) {
        return;
    }

    // Get coordinates from openweathermap API
    fetch(apiGeocodingCall)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if(!data.length) return alert( `${cityName} was not found.`);
        const { name, lat, lon } = data[0];
        getWeather(name, lat, lon);
    }).catch(() => {
        alert("An error occurred.");
    });
}

function getWeather(cityName, lat, lon) {
    const apiWeatherCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(apiWeatherCall)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const uniqueDays = [];
        console.log(data);

        // Get one forcast per day
       const fiveDayForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueDays.includes(forecastDate)) {
                return uniqueDays.push(forecastDate);
            }
        });

        // Clear previous values
        cityInput.value = "";
        weatherCards.innerHTML = "";
        console.log(fiveDayForecast);

        fiveDayForecast.forEach(weatherItem => {
            weatherCards.insertAdjacentHTML("beforeend", createCard(weatherItem));
        });

    }).catch(() => {
        alert("An error occurred.");
    });
}

function createCard(weatherItem) {
    return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather.icon}@2x.png" alt="">
                    <h4>Temp: ${weatherItem.main.temp}°F</h4>
                    <h4>Wind: ${weatherItem.wind.speed} mph</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                </li>`;

}

searchButton.addEventListener("click", getCoordinates);
