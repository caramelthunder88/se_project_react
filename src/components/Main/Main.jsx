import { useContext, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../CurrentTemperatureUnitContext";

function Main({
  weatherData,
  clothingItems,
  handleCardClick,

  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature = weatherData?.temp?.[currentTemperatureUnit];

  const normalizeWeather = (v) =>
    String(v ?? "")
      .trim()
      .toLowerCase();

  const rawType =
    typeof weatherData?.type === "object"
      ? weatherData?.type?.[currentTemperatureUnit]
      : weatherData?.type;

  const weatherType = normalizeWeather(rawType);
  const KNOWN = new Set(["hot", "warm", "cold"]);

  const filteredItems = useMemo(() => {
    const arr = Array.isArray(clothingItems) ? clothingItems : [];
    if (!arr.length) return [];

    if (!KNOWN.has(weatherType)) return arr;
    return arr.filter(
      (i) =>
        normalizeWeather(i.weather ?? i.weatherType ?? i.type) === weatherType
    );
  }, [clothingItems, weatherType]);

  console.log("clothingItems:", clothingItems);
  console.log("weatherType:", weatherType);
  console.log("filteredItems:", filteredItems);

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
                key={item._id || item.key}
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
