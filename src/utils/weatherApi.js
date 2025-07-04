import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const fahrenheit = Math.round(data.main.temp);
  const celsius = Math.round(((data.main.temp - 32) * 5) / 9);

  return {
    city: data.name,
    temp: {
      F: fahrenheit,
      C: celsius,
    },
    type: {
      F: getWeatherType(fahrenheit),
      C: getWeatherTypeCelsius(celsius),
    },
  };
};

const getWeatherType = (tempF) => {
  if (tempF > 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
};

const getWeatherTypeCelsius = (tempC) => {
  if (tempC > 30) return "hot";
  if (tempC >= 18) return "warm";
  return "cold";
};
