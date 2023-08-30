

import axios from 'axios';

export const API_KEY = 'd189247ce8012abe147988569fccd6a8';

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};


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