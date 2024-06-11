const apiKey = "87415fb694122c5c0a1eacde1eec7367";
const searchButton = document.querySelector("#search-button");
const cityInput = document.querySelector("#city-input");

function getCoordinates () {
    let cityName = cityInput.value.trim(); // Get user input city name.
    const apiGeocodingCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
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
    const apiWeatherCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

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
                uniqueDays.push(forecastDate);
            }
        });

        console.log(fiveDayForecast);
        fiveDayForecast.forEach(weatherItem => {
            createCard(weatherItem);
        })

    }).catch(() => {
        alert("An error occurred.");
    });
}

function createCard(weatherItem) {
    return `<li class="card">
                    <h3>6/11/2024</h3>
                    <div class="weather-icon">

                    </div>
                    <h4>Temp: </h4>
                    <h4>Wind: </h4>
                    <h4>Humidity: </h4>
                </li>`;

}

searchButton.addEventListener("click", getCoordinates);
