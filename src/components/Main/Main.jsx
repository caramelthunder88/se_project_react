import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./main.css";

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="card__text">Today is 75 &deg; F/ You want to wear:</p>
        <ul className="cards__list">
          {defaultClothingItems
            // .filter((item) => {
            // return item.weather === weatherData.type;
            //})
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
