function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey ="6o3abb692a1005b740713e4d4bftb103";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
const apiKey = "6o3abb692a1005b740713e4d4bftb103"
const baseUrl = 'https://api.shecodes.io/weather/v1/current?query={query}&key={key}';

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherContainer = document.getElementById("weather-result");
const errorMsg = document.getElementById("error-msg");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name.");
    return;
  }
  fetchWeather(city);
});
async function fetchWeather(city) {
  try {
    const res = await fetch(
      '${baseUrl}?q=${city}&appid=${apiKey}&units=metric'
    );
    const data = await res.json();

    if (!res.ok) {
      showError("City not found – try another.");
      return;
    }
    errorMsg.classList.add("hidden");
    displayWeather(data);
  } catch (err) {
    showError("Network error – try again later.");
    console.error(err);
  }
}
function displayWeather(data) {
  document.getElementById("city-name").textContent = '${data.name}, ${data.sys.country}';
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("temperature").textContent = 'Temperature: ${data.main.temp}°C';
  document.getElementById("wind-speed").textContent = 'Wind Speed:${data.wind.speed} m/s';
  document.getElementById("humidity").textContent = 'Humidity: ${data.main.humidity}%';

  const iconCode = data.weather[0].icon;
  document.getElementById("weather-icon").src =
    'https://openweathermap.org/img/wn/${iconCode}@2x.png';

  weatherContainer.classList.remove("hidden");
}
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
  weatherContainer.classList.add("hidden");
}
