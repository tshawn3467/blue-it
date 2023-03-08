import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";


export const loadHomeArticles = createAsyncThunk(
    'homeArticles/loadHomeArticles',
    async() => {
        const data = await fetch('https://www.reddit.com/r/popular.json')
        return data;
    }
)


export const homeArticles = createSlice({
    name: 'homeArticles',
    initialState: {
        articles: [],
        isLoadingHomeArticles: false,
        hasError: false
    }
})