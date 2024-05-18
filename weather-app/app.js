const apiKey = '6938b08ff3d88608a56d9694b3589890';
const inputElement = document.querySelector('input[type=text]');
const weatherElement = document.querySelector('.weather');
const errorContainerElement = document.querySelector('.errorMessage')
const searchButtonElement = document.querySelector('.search button');
const cardElement = document.querySelector('.card')

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

    const weatherImgElement = document.querySelector('.weather img');
    const weatherDescription = document.querySelector('.description');
    const tempDisplay = document.querySelector('.temp');
    const cityDisplay = document.querySelector('.cityName');
    const humidityDisplay = document.querySelector('.humidity');
    const windDisplay = document.querySelector('.wind');

    const dayTime = getDayTime(currentTimestamp, sunrise, sunset);

    const weatherImg = getWeatherImg(id, dayTime);
    weatherImgElement.setAttribute('src', weatherImg);
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
            200: 'images/storm.png',
            201: 'images/storm.png',
            202: 'images/storm.png',
            210: 'images/storm.png',
            211: 'images/storm.png',
            212: 'images/storm.png',
            221: 'images/storm.png',
            230: 'images/storm.png',
            231: 'images/storm.png',
            232: 'images/storm.png',
            300: 'images/day-rain.png',
            301: 'images/day-rain.png',
            302: 'images/day-rain.png',
            310: 'images/day-rain.png',
            311: 'images/day-rain.png',
            312: 'images/heavy-rain.png',
            313: 'images/heavy-rain.png',
            314: 'images/heavy-rain.png',
            321: 'images/heavy-rain.png',
            500: 'images/day-rain.png',
            501: 'images/day-rain.png',
            502: 'images/day-rain.png',
            503: 'images/day-rain.png',
            504: 'images/day-rain.png',
            511: 'images/freezing-rain.png',
            520: 'images/heavy-rain.png',
            521: 'images/heavy-rain.png',
            522: 'images/heavy-rain.png',
            531: 'images/heavy-rain.png',
            600: 'images/snowy.png',
            601: 'images/snowy.png',
            602: 'images/snowy.png',
            611: 'images/snowy.png',
            612: 'images/snowy.png',
            613: 'images/snowy.png',
            615: 'images/snowy.png',
            616: 'images/snowy.png',
            620: 'images/snowy.png',
            621: 'images/snowy.png',
            622: 'images/snowy.png',
            701: 'images/mist.png',
            711: 'images/mist.png',
            721: 'images/mist.png',
            731: 'images/mist.png',
            741: 'images/mist.png',
            751: 'images/mist.png',
            761: 'images/mist.png',
            762: 'images/mist.png',
            771: 'images/mist.png',
            781: 'images/mist.png',
            800: 'images/clear.png',
            801: 'images/clouds.png',
            802: 'images/clouds.png',
            803: 'images/full-clouds.png',
            804: 'images/full-clouds.png',

        },
        'night': {
            200: 'images/storm.png',
            201: 'images/storm.png',
            202: 'images/storm.png',
            210: 'images/storm.png',
            211: 'images/storm.png',
            212: 'images/storm.png',
            221: 'images/storm.png',
            230: 'images/storm.png',
            231: 'images/storm.png',
            232: 'images/storm.png',
            300: 'images/rain-night.png',
            301: 'images/rain-night.png',
            302: 'images/rain-night.png',
            310: 'images/rain-night.png',
            311: 'images/rain-night.png',
            312: 'images/heavy-rain.png',
            313: 'images/heavy-rain.png',
            314: 'images/heavy-rain.png',
            321: 'images/heavy-rain.png',
            500: 'images/rain-night.png',
            501: 'images/rain-night.png',
            502: 'images/rain-night.png',
            503: 'images/rain-night.png',
            504: 'images/rain-night.png',
            511: 'images/freezing-rain.png',
            520: 'images/heavy-rain.png',
            521: 'images/heavy-rain.png',
            522: 'images/heavy-rain.png',
            531: 'images/heavy-rain.png',
            600: 'images/snowy.png',
            601: 'images/snowy.png',
            602: 'images/snowy.png',
            611: 'images/snowy.png',
            612: 'images/snowy.png',
            613: 'images/snowy.png',
            615: 'images/snowy.png',
            616: 'images/snowy.png',
            620: 'images/snowy.png',
            621: 'images/snowy.png',
            622: 'images/snowy.png',
            701: 'images/mist.png',
            711: 'images/mist.png',
            721: 'images/mist.png',
            731: 'images/mist.png',
            741: 'images/mist.png',
            751: 'images/mist.png',
            761: 'images/mist.png',
            762: 'images/mist.png',
            771: 'images/mist.png',
            781: 'images/mist.png',
            800: 'images/clear-night.png',
            801: 'images/night-clouds.png',
            802: 'images/cloudy.png',
            803: 'images/full-clouds.png',
            804: 'images/full-clouds.png',
        },
    };

    return icons[dayTime][weatherId]

}


function displayError(message) {
    const errorDisplay = document.querySelector('.errorMessage p');
    errorDisplay.textContent = message;
    errorContainerElement.style.display = 'flex';
}


