import "./slider.css";
import { useReducer, memo, useMemo, } from "react";
import { useTranslation } from "react-i18next";
import getSlides from "./sliderData";

function reducer(state, action) {

  switch (action.type) {

    case "NEXT": return { currentIndex: (state.currentIndex + 1) % action.payload };

    case "PREV": return { currentIndex: (state.currentIndex - 1 + action.payload) % action.payload };

    case "GOTO": return { currentIndex: action.payload };

    default: return state;
  }
}

function Slider() {

  const { t, i18n } = useTranslation("slider");

  const slides = useMemo(() => getSlides(t), [i18n.language]);

  const [state, dispatch] = useReducer(reducer, { currentIndex: 0 });

  const slide = slides[state.currentIndex];

  const next = () => { dispatch({ type: "NEXT", payload: slides.length, }); };

  const prev = () => { dispatch({ type: "PREV", payload: slides.length, }); };

  const goTo = (index) => { dispatch({ type: "GOTO", payload: index, }); };

  return (

    <div className="carousel-wrapper">

      <button className="carousel-arrow carousel-arrow--left" onClick={prev}>
        &#8249;
      </button>

      <div className="carousel-slide">

        <div className="carousel-text">

          <span className="carousel-badge">
            {slide.badge}
          </span>

          <h1 className="carousel-title">
            {slide.title}
          </h1>

          <h2 className="carousel-subtitle">
            {slide.subtitle}
          </h2>

          <p className="carousel-description">
            {slide.description}
          </p>

          <button className="carousel-cta">

            {t("actions.readFullStory")}

            <span className="cta-arrow">
              ↗
            </span>

          </button>

        </div>

        <div className="carousel-image-wrap">

          <img
            src={slide.image}
            alt={slide.title}
            className="carousel-image"
          />

        </div>

      </div>

      <button className="carousel-arrow carousel-arrow--right" onClick={next}>
        &#8250;
      </button>

      <div className="carousel-dots">

        {slides.map((_, i) => (

          <button key={i} className={`carousel-dot ${i === state.currentIndex ? "carousel-dot--active" : ""}`} onClick={() => goTo(i)} />

        ))}

      </div>

    </div>
  );

};




export default memo(Slider);