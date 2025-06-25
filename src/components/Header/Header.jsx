import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/Ellipse 18.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-and-location">
        {currentDate} {weatherData.city}
      </p>

      <div className="header__controls">
        <div className="header__toggle">
          <ToggleSwitch />
        </div>

        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      </div>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="User" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
