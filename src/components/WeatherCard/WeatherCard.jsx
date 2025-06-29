import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}{" "}
        &deg; {currentTemperatureUnit}
      </p>
      <img src={sunny} alt="sunny state" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
