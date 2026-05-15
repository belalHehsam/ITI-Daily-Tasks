import { useEffect, useRef } from "react";
import "./Login.css";
import { useAuth } from "../../../context/Auth-Context";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { login } = useAuth();
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const { t } = useTranslation('login');

  useEffect(() => {
    if (location.state?.message) {
      console.log(location.state.message);
      toast.error(location.state.message);
    }
  }, [location]);

  const handleSubmit = () => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    login(email, password);
    navigate("/");
  };

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

        <form
          className="news-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">{t("fields.email.label")}</label>
            <input
              type="email"
              id="email"
              placeholder={t("fields.email.placeholder")}
              required
              ref={emailInput}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("fields.password.label")}</label>
            <input
              type="password"
              id="password"
              placeholder={t("fields.password.placeholder")}
              required
              ref={passwordInput}
            />
          </div>

          <button type="submit" className="form-submit">
            {t("actions.login")}
          </button>

          <div className="form-footer">
            <p>
              {t("footer.newHere")} {" "}
              <Link to="/auth/register" className="form-link">
                {t("actions.createAccount")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
