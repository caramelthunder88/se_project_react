import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  weatherType,
  clothingItems,
  handleCardClick,
  onAddClick,
}) {
  return (
    <div className="clothessection">
      <div className="clothessection__header">
        <p className="clothessection__title">Your Items</p>
        <button className="clothessection__button" onClick={onAddClick}>
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
