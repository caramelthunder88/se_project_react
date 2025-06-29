import React from "react";
import "./DeleteConfirmationModal.css";
import iconClose from "../../assets/close 2.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal modal_opened">
      <div className="delete-modal__content">
        <button onClick={onClose} className="delete-modal__close-button">
          <img src={iconClose} alt="Close" className="modal__close-icon" />
        </button>
        <div className="delete-modal__text">
          <p>Are you sure you want to delete this item?</p>
          <p>This action is irreversible.</p>
        </div>

        <div className="delete-modal__button-group">
          <button className="delete-modal__confirm-button" onClick={onConfirm}>
            Yes, Delete Item
          </button>
          <button className="delete-modal__cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
