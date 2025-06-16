import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img src={sunny} alt="sunny state" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
