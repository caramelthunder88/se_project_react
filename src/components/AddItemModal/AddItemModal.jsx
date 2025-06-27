import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({ onClose, isOpen }) {
  const [name, setName] = useState("");
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor="name" className="modal__label modal__label_type_name">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>

      <label
        htmlFor="imageUrl"
        className="modal__label modal__label_type_image"
      >
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
        />
      </label>

      <fieldset className="modal__radio-buttons modal__radio-buttons_type_garment">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
