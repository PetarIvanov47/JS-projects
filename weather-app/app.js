const apiKey = '6938b08ff3d88608a56d9694b3589890';
const inputElement = document.querySelector('input[type=text]');
const weatherElement = document.querySelector('.weather');
const errorContainerElement = document.querySelector('.errorMessage')
const searchButtonElement = document.querySelector('.search button');
const cardElement = document.querySelector('.card');


searchButtonElement.addEventListener('click', async (event) => {
    const cityName = inputElement.value;
    errorContainerElement.style.display = 'none';
    weatherElement.style.display = 'none'

    if (cityName) {

        try {
            const weatherData = await getWeatherData(cityName);
            displayWeatherInfo(weatherData);

        } catch (error) {
            displayError(error.message);
        }

    } else {
        displayError('Please enter city')
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Could not fetch weather data')
    }

    return await response.json();

}

function displayWeatherInfo(data) {
    
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }],
        wind: { speed },
        dt: currentTimestamp,
        sys: { sunset, sunrise }
    } = data;

    const weatherIconElement = document.querySelector('.weather img');
    const weatherDescription = document.querySelector('.description');
    const tempDisplay = document.querySelector('.temp');
    const cityDisplay = document.querySelector('.cityName');
    const humidityDisplay = document.querySelector('.humidity');
    const windDisplay = document.querySelector('.wind');
    const bodyElement = document.querySelector('body');

    const dayTime = getDayTime(currentTimestamp, sunrise, sunset);
    const [weatherIcon, backgroundImg] = getWeatherImg(id, dayTime);

    bodyElement.style.backgroundImage = `url(${backgroundImg})`;
    weatherIconElement.setAttribute('src', weatherIcon);
    weatherDescription.textContent = description;
    tempDisplay.textContent = `${Math.round(temp)}\u00B0C`;
    cityDisplay.textContent = city;
    humidityDisplay.textContent = `${humidity}%`;
    windDisplay.textContent = `${speed} km/h`;

    weatherElement.style.display = 'flex';

}

function getDayTime(currentTimestamp, sunrise, sunset) {

    return (currentTimestamp >= sunrise && currentTimestamp < sunset) ? 'day' : 'night'

}

function getWeatherImg(weatherId, dayTime) {

    const icons = {
        'day': {
            200: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            201: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            202: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            210: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            211: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            212: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            221: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            230: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            231: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            232: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            300: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            301: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            302: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            310: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            311: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            312: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            313: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            314: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            321: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            500: ['images/icons/day-rain.png', 'images/backgrounds/dark-clouds.jpg'],
            501: ['images/icons/day-rain.png', 'images/backgrounds/dark-clouds.jpg'],
            502: ['images/icons/day-rain.png', 'images/backgrounds/dark-clouds.jpg'],
            503: ['images/icons/day-rain.png', 'images/backgrounds/dark-clouds.jpg'],
            504: ['images/icons/day-rain.png', 'images/backgrounds/dark-clouds.jpg'],
            511: ['images/icons/freezing-rain.png', 'images/backgrounds/raining-sky.jpg'],
            520: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            521: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            522: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            531: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            600: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            601: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            602: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            611: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            612: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            613: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            615: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            616: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            620: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            621: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            622: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            701: ['images/icons/mist.png', 'images/backgrounds/foggy-weather.webp'],
            711: ['images/icons/mist.png', 'images/backgrounds/foggy-weather.webp'],
            721: ['images/icons/mist.png', 'images/backgrounds/foggy-weather.webp'],
            731: ['images/icons/mist.png', 'images/backgrounds/dust.webp'],
            741: ['images/icons/mist.png', 'images/backgrounds/foggy-weather.webp'],
            751: ['images/icons/mist.png', 'images/backgrounds/dust.webp'],
            761: ['images/icons/mist.png', 'images/backgrounds/dust.webp'],
            762: ['images/icons/mist.png', 'images/backgrounds/volcano.jpg'],
            771: ['images/icons/mist.png', 'images/backgrounds/raining-sky.jpg'],
            781: ['images/icons/mist.png', 'images/backgrounds/tornado.jpg'],
            800: ['images/icons/clear.png', 'images/backgrounds/clear-sky.jpg'],
            801: ['images/icons/clouds.png', 'images/backgrounds/few-clouds.jpg'],
            802: ['images/icons/clouds.png', 'images/backgrounds/scattered-clouds.jpg'],
            803: ['images/icons/full-clouds.png', 'images/backgrounds/dark-clouds.jpg'],
            804: ['images/icons/full-clouds.png', 'images/backgrounds/dark-clouds.jpg'],

        },
        'night': {
            200: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            201: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            202: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            210: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            211: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            212: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            221: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            230: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            231: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            232: ['images/icons/storm.png', 'images/backgrounds/thunderstorm.jpg'],
            300: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            300: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            301: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            302: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            310: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            311: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            312: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            313: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            314: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            321: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            500: ['images/icons/rain-night.png', 'images/backgrounds/night-clouds.jpg'],
            501: ['images/icons/rain-night.png', 'images/backgrounds/night-clouds.jpg'],
            502: ['images/icons/rain-night.png', 'images/backgrounds/night-clouds.jpg'],
            503: ['images/icons/rain-night.png', 'images/backgrounds/night-clouds.jpg'],
            504: ['images/icons/rain-night.png', 'images/backgrounds/night-clouds.jpg'],
            511: ['images/icons/freezing-rain.png', 'images/backgrounds/raining-sky.jpg'],
            520: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            521: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            522: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            531: ['images/icons/rain.png', 'images/backgrounds/raining-sky.jpg'],
            600: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            601: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            602: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            611: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            612: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            613: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            615: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            616: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            620: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            621: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            622: ['images/icons/snowy.png', 'images/backgrounds/snow.jpg'],
            701: ['images/icons/mist.png', 'images/backgrounds/foggy-weather.webp'],
            711: ['images/icons/mist.png', 'images/backgrounds/foggy-weather.webp'],
            721: ['images/icons/mist.png', 'images/backgrounds/foggy-weather.webp'],
            731: ['images/icons/mist.png', 'images/backgrounds/dust.webp'],
            741: ['images/icons/mist.png', 'images/backgrounds/foggy-weather.webp'],
            751: ['images/icons/mist.png', 'images/backgrounds/dust.webp'],
            761: ['images/icons/mist.png', 'images/backgrounds/dust.webp'],
            762: ['images/icons/mist.png', 'images/backgrounds/volcano.jpg'],
            771: ['images/icons/mist.png', 'images/backgrounds/raining-sky.jpg'],
            781: ['images/icons/mist.png', 'images/backgrounds/tornado.jpg'],
            800: ['images/icons/clear-night.png', 'images/backgrounds/clear-night.jpg'],
            801: ['images/icons/night-clouds.png', 'images/backgrounds/night-clouds.jpg'],
            802: ['images/icons/cloudy.png', 'images/backgrounds/night-clouds.jpg'],
            803: ['images/icons/full-clouds.png', 'images/backgrounds/night-clouds.jpg'],
            804: ['images/icons/full-clouds.png', 'images/backgrounds/night-clouds.jpg'],
        },
    };
    
    return [icons[dayTime][weatherId][0], icons[dayTime][weatherId][1]]
    
}


function displayError(message) {
    const errorDisplay = document.querySelector('.errorMessage p');
    errorDisplay.textContent = message;
    errorContainerElement.style.display = 'flex';
}


