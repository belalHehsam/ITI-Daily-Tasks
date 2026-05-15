import "./footer.css";
import { memo } from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  console.log("foorer");
  const { t } = useTranslation("footer");

  return (
    <>
      <footer className="footer">
        <div className="footer__inner">
          {/* Top Section */}
          <div className="footer__top">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__logo">⚡ {t("brand.name")}</div>
              <p className="footer__tagline">
                {t("brand.tagline")}
              </p>
              <div className="footer__socials">
                <a
                  href="#"
                  className="footer__social-link"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="footer__social-link"
                  aria-label="LinkedIn"
                >
                  in
                </a>
                <a href="#" className="footer__social-link" aria-label="GitHub">
                  ⌂
                </a>
                <a href="#" className="footer__social-link" aria-label="RSS">
                  ◎
                </a>
              </div>
            </div>

            {/* Categories */}
            <div className="footer__col">
              <h4 className="footer__col-title">{t("categories.title")}</h4>
              <ul className="footer__col-links">
                <li>
                  <a href="#">{t("categories.items.artificialIntelligence")}</a>
                </li>
                <li>
                  <a href="#">{t("categories.items.cybersecurity")}</a>
                </li>
                <li>
                  <a href="#">{t("categories.items.networking")}</a>
                </li>
                <li>
                  <a href="#">{t("categories.items.dataScience")}</a>
                </li>
                <li>
                  <a href="#">{t("categories.items.cloud")}</a>
                </li>
                <li>
                  <a href="#">{t("categories.items.startups")}</a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer__col">
              <h4 className="footer__col-title">{t("company.title")}</h4>
              <ul className="footer__col-links">
                <li>
                  <a href="#">{t("company.links.aboutUs")}</a>
                </li>
                <li>
                  <a href="#">{t("company.links.writeForUs")}</a>
                </li>
                <li>
                  <a href="#">{t("company.links.advertise")}</a>
                </li>
                <li>
                  <a href="#">{t("company.links.contact")}</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer__col footer__newsletter">
              <h4 className="footer__col-title">{t("newsletter.title")}</h4>
              <p className="footer__newsletter-text">
                {t("newsletter.description")}
              </p>
              <div className="footer__newsletter-form">
                <input type="email" placeholder={t("newsletter.placeholder")} />
                <button>→</button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer__divider" />

          {/* Bottom Row */}
          <div className="footer__bottom">
            <p className="footer__copy">
              © {new Date().getFullYear()} TechNews. {t("copy")}
            </p>
            <p className="footer__credit">
              Developed with by <span>Belal Hesham</span>
            </p>
            <div className="footer__legal">
              <a href="#">{t("privacyPolicy")}</a>
              <a href="#">{t("termsOfService")}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default memo(Footer);
