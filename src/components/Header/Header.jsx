import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/wtwr.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import fallbackAvatar from "../../assets/Ellipse 18.png";

function Avatar({ name, avatar }) {
  const src = avatar && avatar.trim() ? avatar : fallbackAvatar;
  return (
    <img
      src={src}
      alt={name || "User"}
      className="header__avatar"
      onError={(e) => {
        if (e.currentTarget.src !== fallbackAvatar) {
          e.currentTarget.src = fallbackAvatar;
        }
      }}
    />
  );
}

export default function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onOpenLogin,
  onOpenRegister,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate} {weatherData?.city}
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

      {isLoggedIn ? (
        <Link to="/profile" className="header__link" aria-label="Open profile">
          <div className="header__user-container">
            <p className="header__username">{currentUser?.name || "You"}</p>
            <Avatar name={currentUser?.name} avatar={currentUser?.avatar} />
          </div>
        </Link>
      ) : (
        <div className="header__auth">
          <button
            className="header__link header__link--btn"
            onClick={onOpenLogin}
          >
            Log in
          </button>
          <button
            className="header__link header__link--btn"
            onClick={onOpenRegister}
          >
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}
