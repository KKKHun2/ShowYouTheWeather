import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCity } from '../api';

interface City {
  name: {
    common: string;
  };
  countryInfo: {
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
  };
}

function CitySelector() {
  const { country } = useParams();
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);

  // useQuery를 사용하여 데이터 가져오기
  const { data: citiesData, isLoading } = useQuery<City[]>(
    ['cities', country],
    () => getCity(country + '')
  );

  useEffect(() => {
    // 데이터 로딩이 완료되면 cities 상태를 업데이트합니다.
    if (citiesData && !isLoading) {
      console.log(citiesData);
      setCities(citiesData);
    }
  }, [citiesData, isLoading]);

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
            {cities.map((city, index) => (
              <li key={index}>
                <button onClick={() => handleCityClick(city.name.common)}>
                  {city.name.common}
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
