import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./newsThunks";
import toast from "react-hot-toast";

const initialState = {
    news: [],
    isLoading: false,
    error: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addArticle: (state, action) => {
            const newPost = action.payload;
            const updatedPost = {
                ...newPost,
                image: newPost.image.startsWith("http")
                    ? newPost.image
                    : `../src/assets/${newPost.image}`,
                id: Date.now(),
            };

            state.news.unshift(updatedPost);

            toast.success("Article Published!");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
    }
})

export const { addArticle } = newsSlice.actions;

export default newsSlice.reducer;
