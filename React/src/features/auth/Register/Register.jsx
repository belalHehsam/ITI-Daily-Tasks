import { useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useAuth } from "../../../context/Auth-Context";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation("register");
  const { SignUp } = useAuth();
  const navigate = useNavigate();
  const fNameInput = useRef();
  const lNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    SignUp(email, password);
    toast.success("Registration successful");
    navigate("/");
  }

  return (
    <section className="form-section">
      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <span className="form-header__badge">{t("header.badge")}</span>
          <h2 className="form-header__title">{t("header.title")}</h2>
          <p className="form-header__subtitle">
            {t("header.subtitle")}
          </p>
        </div>

        <form className="news-form" onSubmit={handleSubmit}>
          {/* Name Row */}
          <div className="form-row">
            <div className="form-group">
              <label>{t("fields.firstName.label")}</label>
              <input type="text" placeholder={t("fields.firstName.placeholder")} ref={fNameInput} required />
            </div>
            <div className="form-group">
              <label>{t("fields.lastName.label")}</label>
              <input type="text" placeholder={t("fields.lastName.placeholder")} ref={lNameInput} required />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>{t("fields.email.label")}</label>
            <input type="email" placeholder={t("fields.email.placeholder")} ref={emailInput} required />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>{t("fields.password.label")}</label>
            <input type="password" placeholder={t("fields.password.placeholder")} ref={passwordInput} required />
          </div>

          <button type="submit" className="form-submit">
            {t("actions.createAccount")}
          </button>

          <div className="form-footer">
            <p>
              {t("footer.alreadyHaveAccount")} <Link to="/auth" className="form-link">{t("actions.login")}</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
