import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../slices/languageS";
import newsReducer from "../slices/newsSlice";

export let store = configureStore({
    reducer: {
        language: languageReducer,
        news: newsReducer,
    }
})

export default store;