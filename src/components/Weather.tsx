import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWeather, WeatherData,getWeatherIconUrl } from '../api';

const Weather: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(city + '');
        setWeatherData(data);
        setLoading(false); // 데이터 로딩이 끝났을 때 로딩 상태 업데이트
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
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
    <div>
      <h2>{name} Weather Information</h2>
      <p>기온: {main.temp.toFixed(1)}°C</p>
      <p>습도: {main?.humidity}%</p>
      <p>날씨: {weather[0]?.description}</p>
      <img src={weatherIconUrl} alt="Weather Icon" />
    </div>
  );
};

export default Weather;
