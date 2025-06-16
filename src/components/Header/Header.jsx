import "./Header.css";
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/Ellipse 18.png";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">date and location</p>

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn "
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="User" className="header__avatar"></img>
      </div>
    </header>
  );
}
export default Header;
