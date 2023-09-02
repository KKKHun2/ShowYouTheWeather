import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCountry } from '../api';

export interface Country {
  name: string;
}

function CountryCity() {
  const [countries, setCountries] = useState<Country[]>([]);
  const navigate = useNavigate();

  const { data: countryData, isLoading } = useQuery<Country[]>(
    ['cities'], getCountry
  );;
 

  const handleCountryClick = (country: string) => {
    navigate(`/weather/${country}`);
  };

  return (
    <div>
      <h2>Select a country:</h2>
      <ul>
        {countryData.map((country, index) => (
          <li key={index}>
            <button onClick={() => handleCountryClick(country.name+"")}>
              {country.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryCity;
