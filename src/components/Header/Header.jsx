import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/wtwr.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Avatar({ name, avatar }) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return avatar ? (
    <img src={avatar} alt={name || "User"} className="header__avatar" />
  ) : (
    <div className="header__avatar header__avatar_placeholder">{initial}</div>
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
        <>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name || "You"}</p>
              <Avatar name={currentUser?.name} avatar={currentUser?.avatar} />
            </div>
          </Link>
          <button className="header__link" onClick={onSignOut}>
            Sign out
          </button>
        </>
      ) : (
        <div className="header__auth">
          <button className="header__link" onClick={onOpenLogin}>
            Log in
          </button>
          <button className="header__link" onClick={onOpenRegister}>
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}
