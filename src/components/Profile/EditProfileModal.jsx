import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      setSubmitting(false);
      setError("");
    }
  }, [isOpen, currentUser]);

  const isValid =
    name.trim().length >= 2 && (!avatar || /^https?:\/\/.+/i.test(avatar));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    setSubmitting(true);
    setError("");

    Promise.resolve(onSubmit({ name: name.trim(), avatar: avatar.trim() }))
      .catch((err) => {
        setError(err?.message || "Could not update profile. Try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <ModalWithForm
      title="Change Profile data"
      buttonText={isSubmitting ? "Saving..." : "Save"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isSubmitting}
      variant="edit-profile"
    >
      <label className="modal__label">
        Name*
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
        Avatar
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://..."
          className="modal__input"
        />
      </label>

      {error && (
        <div className="modal__error" style={{ marginTop: 6 }}>
          {error}
        </div>
      )}
    </ModalWithForm>
  );
}
