import { apiClient } from './apiClient';

export const newsService = {
    // Fetch all articles for the home feed
    getAllArticles: async () => {
        const response = await apiClient.get('data.json');
        return response.data;
    },

    // Fetch a specific article by its ID
    getArticleById: async (id) => {
        const response = await apiClient.get('articleDetails.json');
        return response.data.find((item) => item.id === Number(id));
    },
};

