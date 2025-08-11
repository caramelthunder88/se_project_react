import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: name.trim(), avatar: avatar.trim() });
  };

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={name.trim().length >= 2}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          minLength={2}
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="modal__input"
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://..."
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
}
