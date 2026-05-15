import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ArticalDetails.css";

export default function ArticalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState();

  useEffect(() => {
    async function getArticle() {
      const response = await axios.get("../../../articleDetails.json");
      const data = response.data;
      const found = data.find((item) => item.id === Number(id));
      setArticle({ ...found });
    }
    getArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="loading-container">
        <h1 className="loading-text">Loading...</h1>
      </div>
    );
  }

  return (
    <section className="article-details-section">
      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate("/home")} className="back-btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="article-grid">
          {/* Image Side */}
          <div className="article-image-wrapper">
            <img
              src={article.image}
              alt={article.author}
              className="article-hero-img"
            />
          </div>

          {/* Content Side */}
          <div className="article-content-card">
            <div className="article-header">
              <span className="author-badge">{article.author}</span>
              <h1 className="article-title">Main Insights & Overview</h1>
            </div>

            <div className="article-body">
              <p className="main-content">{article.content}</p>

              <div className="article-meta-grid">
                <div className="meta-section">
                  <h3 className="section-title">The Sections</h3>
                  <ul className="details-list">
                    {article.sections.map((section, index) => (
                      <li key={index} className="details-list-item">
                        <span className="dot"></span>
                        {section.heading}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="meta-section">
                  <h3 className="section-title">The Tags</h3>
                  <div className="tags-cloud">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
