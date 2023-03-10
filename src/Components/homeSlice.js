import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const loadHomeArticles = createAsyncThunk(
    'home/loadHomeArticles',
    async() => {
        const response = await fetch('https://www.reddit.com/r/popular.json')
        const data = await response.json();
        return data;
    }
)


export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        articles: [],
        isLoadingHomeArticles: false,
        failedToLoadHomeArticles: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadHomeArticles.pending, (state) => {
                state.isLoadingHomeArticles = true;
                state.failedToLoadHomeArticles = false;
            })
            .addCase(loadHomeArticles.fulfilled, (state, action) => {
                state.isLoadingHomeArticles = false;
                state.failedToLoadHomeArticles = false;
                //------add articles from popular page-----------
                state.articles = action.payload.data.children;
                console.log('Fulfilled');
            })
            .addCase(loadHomeArticles.rejected, (state) => {
                state.isLoadingHomeArticles = false;
                state.failedToLoadHomeArticles = true;
                state.articles = [];
                console.log('Failed');
            })
    }
});


export const selectHomeArticles = (state) => state.home.articles;
export const isLoadingHomeArticles = (state) => state.home.isLoadingHomeArticles;
export const failedToLoadHomeArticles = (state) => state.home.failedToLoadHomeArticles;
export default homeSlice.reducer;