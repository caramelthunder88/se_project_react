import { useContext } from "react";
import "./ItemModal.css";
import "../Main/Main.css";
import useModalClose from "../../utils/ModalClose/ModalClose";
import iconClose from "../../assets/close 2.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card = {}, onDelete }) {
  const isOpen = activeModal === "preview";
  useModalClose(isOpen, onClose);

  const currentUser = useContext(CurrentUserContext);

  const ownerId =
    typeof card?.owner === "string" ? card.owner : card?.owner?._id;
  const isOwn = currentUser?._id && ownerId === currentUser._id;

  const imageSrc = card.imageUrl || card.link || "";
  const title = card.name || "";
  const weather = card.weather || "";

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__item_content modal__item_content_type_image">
        <button onClick={onClose} type="button" className="modal__item_close">
          <img src={iconClose} alt="Close" className="modal__item_close-icon" />
        </button>

        <img
          src={imageSrc}
          alt={title || "Item"}
          className="modal__item_image"
        />

        <div className="modal__item_footer">
          <div className="modal__item_header">
            <h2 className="modal__item_caption">{title}</h2>

            {isOwn && (
              <button
                className="modal__item_delete-button"
                onClick={() => onDelete(card)}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__item_weather">Weather: {weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
