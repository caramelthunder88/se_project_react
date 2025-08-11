import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });
  const [isSubmitting, setSubmitting] = useState(false);

  const validate = (vals) => {
    const e = { email: "", password: "" };
    if (!vals.email) e.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(vals.email))
      e.email = "Enter a valid email";
    if (!vals.password) e.password = "Password is required";
    return e;
  };

  const isValid =
    !validate({ email, password }).email &&
    !validate({ email, password }).password;

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setTouched({ email: false, password: false });
      setErrors({ email: "", password: "", form: "" });
      setSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eMap = validate({ email, password });
    setErrors((prev) => ({ ...prev, ...eMap, form: "" }));
    setTouched({ email: true, password: true });
    if (eMap.email || eMap.password || isSubmitting) return;

    setSubmitting(true);
    // parent should return a Promise
    Promise.resolve(onSubmit({ email: email.trim(), password }))
      .catch((err) => {
        const msg =
          err?.status === 401
            ? "Incorrect email or password."
            : "Something went wrong. Try again.";
        setErrors((p) => ({ ...p, form: msg }));
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isSubmitting ? "Logging in..." : "Log in"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isSubmitting}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="you@example.com"
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
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          required
        />
        {touched.password && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      {errors.form && (
        <div className="modal__error" style={{ marginTop: 6 }}>
          {errors.form}
        </div>
      )}
    </ModalWithForm>
  );
}
