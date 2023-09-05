

const BASE_PATH2 = "https://api.openweathermap.org/data/2.5/weather";
const BASE_PATH ="https://restcountries.com"
const API_KEY = "6bedce92f708cdeb65b084ee01b825c0";

export function getCountry() {
  return fetch(`${BASE_PATH}/v3.1/all`).then(
    (response) => response.json()
  );
}

export function getCity(country: string) {
  return fetch(`${BASE_PATH}/v3.1/name/${country}`).then(
    (response) => response.json()
  );
}

export function getWeather(city: string) {
  return fetch(`${BASE_PATH2}?q=${city}&lang=kr&units=metric&appid=${API_KEY}`).then(
  (response) => response.json()
  )
};

export function getWeatherIconUrl(iconCode: string) {
  return `https://openweathermap.org/img/w/${iconCode}.png`;
}


export interface WeatherData {
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    name: string;
  }