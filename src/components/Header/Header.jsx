import "./Header.css";
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/Ellipse 18.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">date and location</p>

      <button className="header__add-clothes-btn ">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">NAME</p>
        <img src={avatar} alt="User" className="header__avatar"></img>
      </div>
    </header>
  );
}
export default Header;
