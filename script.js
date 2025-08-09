
const apiKey = '6ab4a642c13fdfcd672c21a7e95449ac';
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim(); 
    if (city) {
        fetchWeatherData(city);
    } else {
        displayError("Please enter a city name.");
    }
});

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    
    console.log("Fetching data from URL:", apiUrl);

    
    weatherDisplay.innerHTML = '';
    errorMessage.textContent = '';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            
            if (data.cod === 401) {
                displayError("Invalid API key. Please check your key and make sure it's active.");
            } else {
                displayError(data.message || "City not found.");
            }
        }

    } catch (error) {
        displayError("An error occurred. Please check your internet connection.");
        console.error("Fetch error:", error);
    }
}

function displayWeather(data) {
    const { name, sys, main, weather, wind } = data;
    const weatherHtml = `
        <h2>${name}, ${sys.country}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
    weatherDisplay.innerHTML = weatherHtml;
}

function displayError(message) {
    errorMessage.textContent = message;
}