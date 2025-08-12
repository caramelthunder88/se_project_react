import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import avatar from "../../assets/Ellipse 18.png";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const name = currentUser?.name || "You";
  const userAvatar = currentUser?.avatar;
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className="sidebar">
      <div className="sidebar__avatar">
        {userAvatar ? (
          <img src={avatar} alt={name} />
        ) : (
          <div className="sidebar__avatar_placeholder">{initial}</div>
        )}
      </div>

      <p className="sidebar__username">{name}</p>

      <div className="sidebar__actions">
        <button className="sidebar__btn" onClick={onEditProfile}>
          Edit profile
        </button>
        <button
          className="sidebar__btn sidebar__btn_signout"
          onClick={onSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
