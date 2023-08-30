import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWeather,WeatherData } from '../api';

const Weather: React.FC = () => {
  const { country, city } = useParams<{ country: string; city: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(city+"");
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather } = weatherData;

  return (
    <div>
      <h2>{name} Weather Information</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Weather: {weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/w/${weather[0].icon}.png`}
        alt="Weather Icon"
      />
    </div>
  );
};

export default Weather;
