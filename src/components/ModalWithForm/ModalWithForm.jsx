import "./ModalWithForm.css";
import ModalClose from "../../utils/ModalClose/ModalClose";
import closeIcon from "../../assets/close.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  variant,
}) {
  ModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className={`modal__content ${
          variant ? `modal__content--${variant}` : ""
        }`}
      >
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <form
          onSubmit={onSubmit}
          className={`modal__form ${variant ? `modal__form--${variant}` : ""}`}
        >
          {children}

          <button
            type="submit"
            className={`modal__submit ${
              variant ? `modal__submit--${variant}` : ""
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
