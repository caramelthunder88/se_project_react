import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./main.css";

function Main({ weatherData, clothingItems, handleCardClick }) {
  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
      <section className="cards">
        <p className="card__text">
          Today is {weatherData.temp.F} &deg; F/ You want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
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
