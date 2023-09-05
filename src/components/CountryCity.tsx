import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCountry } from '../api';

export interface Country {
  name: string;
}

function CountryCity() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);

  const { data: countryData, isLoading } = useQuery<Country[]>(
    ['countries'],
    getCountry
  );

  useEffect(() => {
    if (!isLoading && countryData) {
      setCountries(countryData.map((country) => ({ name: country.name })));
    }
  }, [isLoading, countryData]);

  const handleCountryClick = (country: string) => {
    navigate(`/weather/${country}`);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
      )}
    </div>
  );
}

export default CountryCity;
