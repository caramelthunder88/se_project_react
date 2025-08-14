import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartLiked from "../../assets/heart_liked.svg";
import heartUnliked from "../../assets/heart_unliked.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => onCardClick(item);

  const isLiked = useMemo(() => {
    const likes = Array.isArray(item.likes) ? item.likes : [];
    return currentUser?._id
      ? likes.some((id) => id === currentUser._id)
      : false;
  }, [item.likes, currentUser?._id]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    onCardLike({ id: item._id, isLiked });
  };

  const imageSrc = item.imageUrl || item.link;
  const likeBtnClass = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__top">
        <h2 className="card__name">{item.name}</h2>

        {isLoggedIn && item._id && (
          <button
            type="button"
            className={likeBtnClass}
            aria-pressed={isLiked}
            title={isLiked ? "Unlike" : "Like"}
            onClick={handleLike}
          >
            <img
              className="card__like-icon"
              src={isLiked ? heartLiked : heartUnliked}
              alt={isLiked ? "Unlike" : "Like"}
            />
          </button>
        )}
      </div>

      <img
        className="card__image"
        src={imageSrc}
        alt={item.name || "Item"}
        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
      />
    </li>
  );
}

export default ItemCard;
