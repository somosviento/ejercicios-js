import React, { useState } from 'react';
import './WeatherWidget.css';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';

function WeatherWidget() {
  // State for temperature unit (true for Celsius, false for Fahrenheit)
  const [isCelsius, setIsCelsius] = useState(true);

  // Hardcoded weather data
  const weatherData = {
    city: 'New York',
    temperature: 22, // in Celsius
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 8
  };

  // Get the appropriate weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <WiDaySunny className="weather-icon" />;
      case 'cloudy':
        return <WiCloudy className="weather-icon" />;
      case 'rainy':
        return <WiRain className="weather-icon" />;
      case 'snow':
        return <WiSnow className="weather-icon" />;
      default:
        return <WiDaySunny className="weather-icon" />;
    }
  };

  // Convert temperature between Celsius and Fahrenheit
  const getTemperature = () => {
    if (isCelsius) {
      return weatherData.temperature;
    } else {
      return (weatherData.temperature * 9/5) + 32;
    }
  };

  // Toggle temperature unit
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="weather-widget">
      <h2 className="city-name">{weatherData.city}</h2>
      
      <div className="weather-icon-container">
        {getWeatherIcon(weatherData.condition)}
      </div>
      
      <div className="temperature">
        {Math.round(getTemperature())}°{isCelsius ? 'C' : 'F'}
      </div>
      
      <div className="condition">{weatherData.condition}</div>
      
      <div className="details">
        <div className="detail">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{weatherData.humidity}%</span>
        </div>
        <div className="detail">
          <span className="detail-label">Wind:</span>
          <span className="detail-value">{weatherData.windSpeed} km/h</span>
        </div>
      </div>
      
      <button 
        className="toggle-button"
        onClick={toggleTemperatureUnit}
      >
        Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
}

export default WeatherWidget;
