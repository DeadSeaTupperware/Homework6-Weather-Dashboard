const apiKey = "87415fb694122c5c0a1eacde1eec7367";
const searchButton = document.querySelector("#search-button");
const cityInput = document.querySelector("#city-input");

const getCoordinates = () => {
    let cityName = cityInput.value.trim(); // Get user input city name.
    const apiCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    if(!cityName) {
        return;
    }

    // Get coordinates from openweathermap API
    fetch(apiCall)
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

searchButton.addEventListener("click", getCoordinates);
