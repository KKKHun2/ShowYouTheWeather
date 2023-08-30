import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Country {
  name: string;
}

const CountryCity: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryData = response.data;
        const countryNames = countryData.map((country: any) => {
          return {
            name: country.name.common
          };
        });
        setCountries(countryNames);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryClick = (country: string) => {
    navigate(`/weather/${country}`);
  };

  return (
    <div>
      <h2>Select a country:</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <button onClick={() => handleCountryClick(country.name)}>
              {country.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryCity;
