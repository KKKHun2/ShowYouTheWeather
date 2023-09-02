import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCity } from '../api';
import { Country } from './CountryCity';

interface RouteParams {
  country: string;
  city?: string; // city 파라미터를 선택적으로 추가
}

interface City {
  name?: string;
  city?: string;
}


function CitySelector() {
  const { country } = useParams<RouteParams>(); // 파라미터에서 city를 선택적으로 받음
  const navigate = useNavigate();

  const { data: citiesData, isLoading } = useQuery<City[]>(
    ['cities', country],
    () => getCity(country) // 이 부분을 수정
  );

  const handleCityClick = (cityName: string) => {
    navigate(`/weather/${country}/${cityName}`);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Select a city in {country}:</h2>
          <ul>
            {citiesData?.map((city, index) => (
              <li key={index}>
                <button onClick={() => handleCityClick(city.name || '')}>
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CitySelector;
