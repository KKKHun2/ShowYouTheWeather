import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWeather, WeatherData, getWeatherIconUrl } from '../api';

const Weather: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(city + '');
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>Error fetching weather data.</div>;
  }

  const { name, main, weather } = weatherData;
  const weatherIconUrl = getWeatherIconUrl(weather[0]?.icon || '');

  return (
    <div className='p-5 bg-gray-500'>
      <h2 className='m-5'>{name} Weather Information</h2>
      <p className='ml-2'>기온: {main?.temp.toFixed(1)}°C</p>
      <p>습도: {main?.humidity}%</p>
      <p>날씨: {weather[0]?.description}</p>
      <img src={weatherIconUrl} alt="Weather Icon" className="w-32 h-32" />
    </div>
  );
};

export default Weather;
