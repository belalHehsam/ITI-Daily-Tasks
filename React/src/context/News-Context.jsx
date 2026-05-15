// import { createContext, useCallback, useEffect, useState } from "react";
// import { useSearch } from "./Search-Context";
// import toast from "react-hot-toast";
// import { newsService } from "../api/newsService";

// export const NewsContext = createContext();

// export default function NewsProvider({ children }) {
//   const [news, setNews] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { searchQuery } = useSearch();

//   // 1. Fetch Data

//   useEffect(() => {
//     async function loadNews() {
//       try {
//         setIsLoading(true);
//         const data = await newsService.getAllArticles();
//         setNews(data);
//       } catch (err) {
//         setError(err.message || "Failed to load news");
//         toast.error("Failed to load articles");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadNews();
//     return () => {
//       console.log("hello");
//     };
//   }, []);

//   // 2. Add New Article Logic
//   const addArticle = useCallback((newPost) => {
//     const updatedPost = {
//       ...newPost,
//       image: newPost.image.startsWith("http")
//         ? newPost.image
//         : `../src/assets/${newPost.image}`,
//       id: news.length,
//     };
//     setNews((prevNews) => [updatedPost, ...prevNews]);
//     toast.success("Article Published!");
//   }, []);

//   // 3. Filter Logic
//   const filteredNews = searchQuery
//     ? news.filter((item) =>
//         item.title.toLowerCase().includes(searchQuery.toLowerCase()),
//       )
//     : news;

//   return (
//     <NewsContext.Provider
//       value={{ addArticle, news: filteredNews, isLoading, error }}
//     >
//       {children}
//     </NewsContext.Provider>
//   );
// }
