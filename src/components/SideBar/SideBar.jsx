import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import fallbackAvatar from "../../assets/Ellipse 18.png";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const name = currentUser?.name || "You";
  const userAvatar = currentUser?.avatar;
  const initial = name.trim().charAt(0).toUpperCase();

  const handleImgError = (e) => {
    if (e.currentTarget.src !== fallbackAvatar) {
      e.currentTarget.src = fallbackAvatar;
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__avatar">
          <img
            src={userAvatar || fallbackAvatar}
            alt={name}
            onError={handleImgError}
          />
        </div>
        <p className="sidebar__username" title={name}>
          {name}
        </p>
      </div>

      <div className="sidebar__actions">
        <button className="sidebar__btn" onClick={onEditProfile}>
          Change profile data
        </button>
        <button
          className="sidebar__btn sidebar__btn_signout"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
