import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import NavAr from './locales/ar/nav.json'
import NavEng from './locales/en/nav.json'
import SliderAr from './locales/ar/slider.json'
import SliderEng from './locales/en/slider.json'
import FormAr from './locales/ar/form.json'
import FormEng from './locales/en/form.json'
import LoginAr from './locales/ar/login.json'
import LoginEng from './locales/en/login.json'
import RegisterAr from './locales/ar/register.json'
import RegisterEng from './locales/en/register.json'
import FooterAr from './locales/ar/footer.json'
import FooterEng from './locales/en/footer.json'
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        nav: NavEng,
        slider: SliderEng,
        form: FormEng,
        login: LoginEng,
        register: RegisterEng,
        footer: FooterEng
      },
      ar: {
        nav: NavAr,
        slider: SliderAr,
        form: FormAr,
        login: LoginAr,
        register: RegisterAr,
        footer: FooterAr
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    ns: ['nav', 'slider', 'form', 'login', 'register', 'footer'],
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
export default i18n;