
// Get all news
export const selectNews = (state) => state.news.news;


// Loading
export const selectLoading = (state) => state.news.isLoading;


// Error
export const selectError = (state) => state.news.error;


// Filtered News
export const selectFilteredNews = (state, searchQuery) => {
    const news = state.news.news;

    if (!searchQuery) return news;

    return news.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
};