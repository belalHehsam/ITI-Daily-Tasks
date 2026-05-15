import { createAsyncThunk } from "@reduxjs/toolkit";
import { newsService } from "../../api/newsService";

export const fetchNews = createAsyncThunk('news/fetchNews', async (_, thunkAPI) => {
    try {
        const data = await newsService.getAllArticles();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Failed to load news");
    }
})

