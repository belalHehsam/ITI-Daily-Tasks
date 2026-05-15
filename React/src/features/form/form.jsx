import "./form.css";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addArticle } from "../../Redux/slices/newsSlice";
function Form() {
  const defaultPost = {
    category: "",
    title: "",
    description: "",
    image: "",
  };

  const [newPost, setNewpost] = useState(defaultPost);

  const navigate = useNavigate();

  const { t } = useTranslation("form");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewpost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (newPost) => {
    console.log(newPost);

    dispatch(addArticle(newPost));
    navigate("/");
  };

  return (
    <>
      <section className="form-section">
        <div className="form-card">
          {/* Header */}
          <div className="form-header">
            <span className="form-header__badge">{t("header.badge")}</span>
            <h2 className="form-header__title">{t("header.title")}</h2>
            <p className="form-header__subtitle">{t("header.subtitle")}</p>
          </div>

          <form
            className="news-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddSubmit(newPost);
            }}
          >
            {/* Row: Category + Read Time */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">{t("fields.category.label")}</label>

                <select
                  id="category"
                  name="category"
                  required
                  onChange={handleChange}
                  value={newPost.category}
                >
                  <option value="" disabled>
                    {t("fields.category.placeholder")}
                  </option>
                  <option value="Artificial Intelligence">
                    {t("fields.category.options.artificialIntelligence")}
                  </option>
                  <option value="Cybersecurity">
                    {t("fields.category.options.cybersecurity")}
                  </option>
                  <option value="Gadgets">
                    {t("fields.category.options.gadgets")}
                  </option>
                  <option value="Software">
                    {t("fields.category.options.software")}
                  </option>
                  <option value="Cloud">
                    {t("fields.category.options.cloud")}
                  </option>
                  <option value="Startups">
                    {t("fields.category.options.startups")}
                  </option>
                  <option value="Networking">
                    {t("fields.category.options.networking")}
                  </option>
                  <option value="Data Science">
                    {t("fields.category.options.dataScience")}
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="readTime">{t("fields.readTime.label")}</label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  placeholder={t("fields.readTime.placeholder")}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">{t("fields.title.label")}</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder={t("fields.title.placeholder")}
                required
                onChange={handleChange}
                value={newPost.title}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">
                {t("fields.description.label")}
              </label>
              <textarea
                id="description"
                name="description"
                placeholder={t("fields.description.placeholder")}
                rows={4}
                required
                onChange={handleChange}
                value={newPost.description}
              />
            </div>

            {/* Row: Image URL + Date */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="image">{t("fields.image.label")}</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  placeholder={t("fields.image.placeholder")}
                  onChange={handleChange}
                  value={newPost.image}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">{t("fields.date.label")}</label>
                <input type="date" id="date" name="date" required />
              </div>
            </div>

            <button type="submit" className="form-submit">
              {t("actions.publish")} <span>↗</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default memo(Form);
