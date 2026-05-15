import "./card.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
export default function Card({ news }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(news.id);
    navigate(`/article/${news.id}`);
  };

  return (
    <>
      <div className="news-card" onClick={handleClick}>
        {/* Image */}
        <div className="news-card__image-wrap">
          <img src={news.image} alt={news.title} className="news-card__image" />
          <span className="news-card__category">{news.category}</span>
        </div>
        {/* Body */}
        <div className="news-card__body">
          <h3 className="news-card__title">{news.title}</h3>
          <p className="news-card__description">{news.description}</p>
          {/* Meta */}
          <div className="news-card__meta">
            <span className="news-card__date">📅 {news.date}</span>
            <span className="news-card__read-time">⏱ {news.readTime}</span>
          </div>
          <div>
            <Button> </Button>
          </div>
          <button className="news-card__btn">
            Read More <span>↗</span>
          </button>
        </div>
      </div>
    </>
  );
}
