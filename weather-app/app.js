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
        weather: [{ description, id }], wind: { speed } } = data;

    const weatherImgElement = document.querySelector('.weather img');
    const tempDisplay = document.querySelector('.temp');
    const cityDisplay = document.querySelector('.cityName');
    const humidityDisplay = document.querySelector('.humidity');
    const windDisplay = document.querySelector('.wind');

    const weatherImg = getWeatherImg(id);
    weatherImgElement.setAttribute('src', weatherImg);
    tempDisplay.textContent = `${Math.round(temp)}\u00B0C`;
    cityDisplay.textContent = city;
    humidityDisplay.textContent = `${humidity}%`;
    windDisplay.textContent = speed;

    weatherElement.style.display = 'flex';

}

function getWeatherImg(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return `images/rain.png`;

        case (weatherId >= 300 && weatherId < 500):
            return `images/drizzle.png`;

        case (weatherId >= 500 && weatherId < 600):
            return `images/rain.png`;

        case (weatherId >= 600 && weatherId < 700):
            return `images/snow.png`;

        case (weatherId >= 700 && weatherId < 800):
            return `images/mist.png`;

        case (weatherId == 800):
            return `images/clear.png`;

        case (weatherId > 800):
            return `images/clouds.png`;
    }

}


function displayError(message) {
    const errorDisplay = document.querySelector('.errorMessage p');
    errorDisplay.textContent = message;
    errorContainerElement.style.display = 'flex';
}


