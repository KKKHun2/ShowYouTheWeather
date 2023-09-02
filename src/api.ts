

const BASE_PATH = "https://api.openweathermap.org/data/2.5/weather";
export const API_KEY = 'd189247ce8012abe147988569fccd6a8';
const BASE_PATH2 ="https://restcountries.com"


export function getWeather(city: string) {
  return fetch( `${BASE_PATH}?q=${city}&appid=${API_KEY}&units=metric`).then(
  (response) => response.json()
  )
};

export function getCity(city: string) {
  return fetch(`https://api.open-meteo.com/v1/forecast?city=${city}`).then(
    (response) => response.json()
  );
}

export function getCountry() {
  return fetch(`${BASE_PATH2}/v3.1/all`).then(
    (response) => response.json()
  );
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