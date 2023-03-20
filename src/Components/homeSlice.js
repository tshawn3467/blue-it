import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const loadHomeArticles = createAsyncThunk(
    'home/loadHomeArticles',
    async() => {
        const response = await fetch('https://www.reddit.com/r/popular.json');
        const data = await response.json();
        return data;
    }
)


export const loadSearchResults = createAsyncThunk(
    'home/loadSearchResults',
    async(searchTerm) => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}%20recipes`);
        const data = await response.json()
        return data;
    }
)


export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        articles: [],
        searchTerm: "",
        isLoadingHomeArticles: false,
        failedToLoadHomeArticles: false
    },
    reducers: {
        setSearchTermState(state, action) {
            state.searchTerm = action.payload;
        }
    },
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
                //----------console logging to test and for info----------------
                console.log(action.payload.data.children);
                console.log('Fulfilled');
            })
            .addCase(loadHomeArticles.rejected, (state) => {
                state.isLoadingHomeArticles = false;
                state.failedToLoadHomeArticles = true;
                state.articles = [];
                console.log('Failed');
            })
            .addCase(loadSearchResults.pending, (state) => {
                state.isLoadingHomeArticles = true;
                state.failedToLoadHomeArticles = false;
            })
            .addCase(loadSearchResults.fulfilled, (state, action) => {
                state.isLoadingHomeArticles = false;
                state.failedToLoadHomeArticles = false;
                //------add articles from search page-----------
                state.articles = action.payload.data.children;
                //----------console logging to test and for info----------------
                console.log(action.payload.data.children);
                console.log('Fulfilled');
            })
            .addCase(loadSearchResults.rejected, (state) => {
                state.isLoadingHomeArticles = false;
                state.failedToLoadHomeArticles = true;
                state.articles = [];
                console.log('Failed');
            })
    }
});


export const selectHomeArticles = (state) => state.home.articles;
export const selectSearchTerm = (state) => state.home.searchTerm;
export const isLoadingHomeArticles = (state) => state.home.isLoadingHomeArticles;
export const failedToLoadHomeArticles = (state) => state.home.failedToLoadHomeArticles;
export const { setSearchTermState } = homeSlice.actions;
export default homeSlice.reducer;