import React from "react";
import "./DeleteConfirmationModal.css";
import iconClose from "../../assets/close 2.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content--confirm">
        <button onClick={onClose} className="modal__close">
          <img src={iconClose} alt="Close" className="modal__close-icon" />
        </button>

        <div className="modal__text">
          <p>Are you sure you want to delete this item?</p>
          <p>This action is irreversible.</p>
        </div>

        <div className="modal__actions">
          <button className="modal__btn modal__btn_danger" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="modal__btn modal__btn_link" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
