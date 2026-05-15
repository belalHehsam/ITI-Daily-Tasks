import { useEffect } from "react";
import Slider from "../common/slider/slider";
import NewsFeed from "../features/news/newsFeed";
import "./HomePage.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state?.fromGuard) {
      console.log(location.state.message);
      toast.error(location.state.message);
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  return (
    <main className="home-page-container">
      <Slider />

      {/* 3. The Feed Section */}
      <section className="feed-section" style={{ padding: "2rem" }}>
        <div className="section-header">
          <h2 className="section-header-h2">Latest Tech News</h2>
        </div>
        <NewsFeed />
      </section>
    </main>
  );
}
