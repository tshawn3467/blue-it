import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const loadHomeArticles = createAsyncThunk(
    'homeArticles/loadHomeArticles',
    async() => {
        const response = await fetch('https://www.reddit.com/r/popular.json')
        const data = await response.json();
        return data;
    }
)


export const homeArticles = createSlice({
    name: 'homeArticles',
    initialState: {
        articles: [],
        isLoadingHomeArticles: false,
        failedToLoadHomeArticles: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadHomeArticles.pending, (state) => {
                state.isLoadingHomeArticles = true;
                state.failedToLoadHomeArticles = false
            })
            .addCase(loadHomeArticles.fulfilled, (state, action) => {
                state.isLoadingHomeArticles = false;
                state.failedToLoadHomeArticles = false;
                //------fix state logic to add articles-----------
                state.articles.push(action.payload.data.children[0].data);
                state.articles.push(action.payload.data.children[1].data);
                console.log(action.payload.data.children[0].data);
                console.log(state.articles);
                console.log(state.articles[0].title)
            })
            .addCase(loadHomeArticles.rejected, (state) => {
                state.isLoadingHomeArticles = false;
                state.failedToLoadHomeArticles = true;
                state.articles = []
            })
    }
})


export const selectHomeArticles = (state) => state.articles;
export const isLoadingHomeArticles = (state) => state.isLoadingHomeArticles;
export const failedToLoadHomeArticles = (state) => state.failedToLoadHomeArticles;
export default homeArticles.reducer;