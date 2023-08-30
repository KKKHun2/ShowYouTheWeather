import React from 'react';
import classNames from 'classnames';
import 'weather-icons/css/weather-icons.min.css'; // 스타일 추가

interface WeatherIconProps {
  className?: string;
  code: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ className, code }) => {
  const iconClass = classNames('wi', code);

  return <i className={iconClass}></i>;
};

export default WeatherIcon;
