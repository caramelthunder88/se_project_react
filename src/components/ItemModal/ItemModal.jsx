import "./ItemModal.css";
import "../Main/Main.css";
import iconClose from "../../assets/close 2.png";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__item_content modal__item_content_type_image">
        <button onClick={onClose} type="button" className="modal__item_close">
          <img src={iconClose} alt="Close" className="modal__item_close-icon" />
        </button>
        <img src={card.link} alt="" className="modal__item_image" />
        <div className="modal__item_footer">
          <h2 className="modal__item_caption">{card.name}</h2>
          <p className="modal__item_weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
