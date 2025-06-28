import "./SideBar.css";
import avatar from "../../assets/Ellipse 18.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="User" className="sidebar__avatar" />
      <p className="sidbar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
