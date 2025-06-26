import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./main.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp[currentTemperatureUnit];
  const weatherType = weatherData.type[currentTemperatureUnit];

  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
      <section className="cards">
        <p className="card__text">
          Today is {temperature} &deg; {currentTemperatureUnit} / You want to
          wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherType)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
