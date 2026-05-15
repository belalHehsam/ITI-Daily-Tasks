// Notice how few imports we need now!
// import { useNews } from "../../hooks/useNews";
import CardList from "../../common/cardList/cardList";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredNews,
  selectLoading,
  selectError,
  selectNews,
} from "../../Redux/slices/newsSelector";
import { fetchNews } from "../../Redux/slices/newsThunks";
import { useEffect } from "react";
import { useSearch } from "../../context/Search-Context";
export default function NewsFeed() {
  //  1. We delegate ALL the heavy lifting to our custom hook
  const { searchQuery } = useSearch();

  const news = useSelector((state) => {
    return selectFilteredNews(state, searchQuery);
  });

  console.log("the news is from newsFeed", news);

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const allNews = useSelector(selectNews);
  useEffect(() => {
    // fetch only first time
    if (allNews.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, allNews.length]);

  //  2. Handle the loading state gracefully
  if (isLoading) {
    return (
      <div
        className="loader-container"
        style={{ textAlign: "center", padding: "2rem" }}
      >
        <h3>Loading latest tech news... </h3>
      </div>
    );
  }

  //  3. Handle errors gracefully
  if (error) {
    return (
      <div
        className="error-container"
        style={{ color: "red", textAlign: "center" }}
      >
        <h3>Failed to load news: {error}</h3>
      </div>
    );
  }

  //  4. Handle empty search results
  if (news.length === 0) {
    return (
      <div
        className="empty-container"
        style={{ textAlign: "center", padding: "2rem" }}
      >
        <h3>No articles found matching your search.</h3>
      </div>
    );
  }

  //  5. Render the actual data
  return (
    <div className="news-feed-container">
      <CardList data={news} />
    </div>
  );
}
