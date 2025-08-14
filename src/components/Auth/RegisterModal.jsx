import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    avatar: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    form: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const validate = (vals) => {
    const e = { name: "", email: "", password: "", avatar: "" };
    if (!vals.name || vals.name.trim().length < 2)
      e.name = "Name must be at least 2 characters";
    if (!vals.email) e.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(vals.email))
      e.email = "Enter a valid email";
    if (!vals.password) e.password = "Password is required";
    if (vals.avatar && !/^https?:\/\/.+/i.test(vals.avatar))
      e.avatar = "Enter a valid URL (https)";
    return e;
  };

  const v = validate({ name, avatar, email, password });
  const isValid = !(v.name || v.email || v.password || v.avatar);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
      setTouched({ name: false, email: false, password: false, avatar: false });
      setErrors({ name: "", email: "", password: "", avatar: "", form: "" });
      setSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eMap = validate({ name, avatar, email, password });
    setErrors((prev) => ({ ...prev, ...eMap, form: "" }));
    setTouched({ name: true, email: true, password: true, avatar: true });
    if (!isValid || isSubmitting) return;

    setSubmitting(true);
    Promise.resolve(
      onSubmit({
        name: name.trim(),
        avatar: avatar.trim(),
        email: email.trim(),
        password,
      })
    )
      .catch((err) => {
        const msg =
          err?.status === 409
            ? "Email already in use."
            : err?.message || "Something went wrong. Try again.";
        setErrors((p) => ({ ...p, form: msg }));
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isSubmitting ? "Creating..." : "Next"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isSubmitting}
      variant="register"
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          required
        />
        {touched.email && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          required
        />
        {touched.password && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          minLength={2}
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          required
        />
        {touched.name && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, avatar: true }))}
          required
        />
        {touched.avatar && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>

      <button
        type="button"
        className="modal__alt modal__alt--register"
        onClick={onSwitchToLogin}
        aria-label="Switch to Log in"
      >
        or Log in
      </button>

      {errors.form && (
        <div className="modal__error" style={{ marginTop: 6 }}>
          {errors.form}
        </div>
      )}
    </ModalWithForm>
  );
}
