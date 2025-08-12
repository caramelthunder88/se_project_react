import { useContext, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../CurrentTemperatureUnitContext";

function Main({
  weatherData,
  clothingItems,
  handleCardClick,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature = weatherData?.temp?.[currentTemperatureUnit];

  const rawType =
    typeof weatherData?.type === "object"
      ? weatherData?.type?.[currentTemperatureUnit]
      : weatherData?.type;

  const weatherType = (rawType ?? "").toString().toLowerCase();

  const filteredItems = useMemo(() => {
    const arr = Array.isArray(clothingItems) ? clothingItems : [];
    if (!weatherType) return [];
    return arr.filter((i) => (i.weather || "").toLowerCase() === weatherType);
  }, [clothingItems, weatherType]);

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

        {filteredItems.length === 0 ? (
          <p className="cards__empty">
            No items for {weatherType || "this weather"} yet.
          </p>
        ) : (
          <ul className="cards__list">
            {filteredItems.slice(0, 12).map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Main;
