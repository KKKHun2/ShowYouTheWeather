import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RouteParams {
  country: string;
  city: string;
}

interface City {
  name: string;
}

const CitySelector: React.FC = () => {
  const { country, city } = useParams();
  const [cities, setCities] = useState<City[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?city=${city}`);
        
        const cityData = response.data.city;
        
        const cityNames = cityData.map((city: any) => {
          return {
            name: city.name
          };
        });
        setCities(cityNames);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [country]);

  const handleCityClick = (city: string) => {
    navigate(`/weather/${country}/${city}`);
  };
 
  return (
    <div>
      <h2>Select a city in {country}:</h2>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            <button onClick={() => handleCityClick(city.name)}>
              {city.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelector;
