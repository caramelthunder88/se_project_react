import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="card__text">Today is 75 &deg; F/ You want to wear:</p>
        {/* add cards*/}
      </section>
    </main>
  );
}

export default Main;
