import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCountry } from '../api';

export interface Country {
  name: string;
}
function CountryCity() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);

  // useQuery를 사용하여 데이터 가져오기
  const { data: countryData, isLoading } = useQuery<Country[]>(
    ['countries'],
    getCountry
  );

  // 데이터가 로드되었을 때만 setCountries를 사용하도록 useEffect를 사용합니다.
  useEffect(() => {
    if (!isLoading && countryData) {
      const countryNames = countryData.map((country: any) => {
        return {
          name: country.name.common
         
        };
        
      });

      const sortedCountries = countryNames.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setCountries(sortedCountries);
    }
  }, [isLoading, countryData]);

  const handleCountryClick = (country: string) => {
    navigate(`/weather/${country}`);
  };

  return (
    <div className='bg-500 p-11 '>
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