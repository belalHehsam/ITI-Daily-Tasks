import { NavLink } from "react-router-dom";
import "../../index.css";
import "./navbar.css";
import { useRef, useState } from "react";
import { useSearch } from "../../context/Search-Context";
import { useAuth } from "../../context/Auth-Context";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  let [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const { searchQuery, setSearchQuery } = useSearch();
  const { isAuth, logout } = useAuth();
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const inputRef = useRef();
  const { t, i18n } = useTranslation("nav");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const focusSearch = () => {
    inputRef.current.focus();
  };

  const changeLanguageFun = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const currentLang = i18n.language?.startsWith("ar") ? "ar" : "en";

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          {/* Logo */}
          <div className="navbar__logo">
            <span className="navbar__logo-icon">⚡</span>
            {t("brand.name")}
          </div>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? "is-open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Nav Links */}
          <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
            <ul className="navbar__links">
              <li>
                <NavLink className="nav" to="/home">
                  {t("navigation.home")}
                </NavLink>
              </li>
              <li>
                <NavLink className="nav" to="/addNew">
                  {t("navigation.addNews")}
                </NavLink>
              </li>
              {!isAuth && (
                <li>
                  <NavLink className="nav" to="/auth">
                    {t("navigation.login")}
                  </NavLink>
                </li>
              )}
              {!isAuth && (
                <li>
                  <NavLink className="nav" to="/auth/register">
                    {t("navigation.register")}
                  </NavLink>
                </li>
              )}
              {isAuth && (
                <li>
                  <button
                    className="navbar__logout-btn"
                    onClick={() => {
                      logout();
                      toast.success(t("toast.logoutSuccess"));
                    }}
                  >
                    {t("navigation.signout")}
                  </button>
                </li>
              )}
            </ul>

            {/* Search + Subscribe */}
            <div className="navbar__actions">
              <div className="navbar__search">
                <span className="navbar__search-icon" onClick={focusSearch}>
                  🔍
                </span>
                <input
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={handleChange}
                  ref={inputRef}
                />
              </div>
              <button className="navbar__subscribe">{t("actions.subscribe")}</button>
            </div>
          </nav>

          {/* ── Controls: Language + Theme ── */}
          <div className="navbar__controls">

            {/* Language pill toggle */}
            <div className="navbar__lang-toggle" role="group" aria-label="Language selector">
              <button
                className={`navbar__lang-btn ${currentLang === "en" ? "navbar__lang-btn--active" : ""}`}
                onClick={() => changeLanguageFun("en")}
                aria-pressed={currentLang === "en"}
              >
                EN
              </button>
              <span className="navbar__lang-divider" />
              <button
                className={`navbar__lang-btn ${currentLang === "ar" ? "navbar__lang-btn--active" : ""}`}
                onClick={() => changeLanguageFun("ar")}
                aria-pressed={currentLang === "ar"}
              >
                AR
              </button>
            </div>

            {/* Theme icon button */}
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            >
              <span className="navbar__theme-icon">
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>

          </div>
        </div>
      </header>
    </>
  );
}
