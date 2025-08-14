import { useContext, useMemo } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  onAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const myItems = useMemo(() => {
    const me = currentUser?._id;
    const arr = Array.isArray(clothingItems) ? clothingItems : [];
    return me ? arr.filter((i) => i.owner === me) : [];
  }, [clothingItems, currentUser?._id]);

  return (
    <div className="clothessection">
      <div className="clothessection__header">
        <p className="clothessection__title">Your Items</p>

        {isLoggedIn && (
          <button className="clothessection__button" onClick={onAddClick}>
            + Add new
          </button>
        )}
      </div>

      {myItems.length === 0 ? (
        <p className="clothessection__empty">
          You haven’t added any items yet.
        </p>
      ) : (
        <ul className="clothes-section__items">
          {myItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
