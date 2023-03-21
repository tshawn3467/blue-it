import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const loadSubredditArticles = createAsyncThunk(
    'home/loadSubredditArticles',
    /*
        -fetch clicked on object
        ----------not finished/tested---------------
    */
    async(subredditUrl) => {
        const response = await fetch(`https://www.reddit.com/${subredditUrl}.json`)
        const data = await response.json();
        return data;
    }
)

export const loadSearchResults = createAsyncThunk(
    'displayPage/loadSearchResults',
    async(searchTerm) => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}%20recipes`);
        const data = await response.json()
        return data;
    }
)


export const displayPageSlice = createSlice({
    name: 'displayPage',
    initialState: {
        displayPageArticles: [],
        subredditUrl: "r/popular",
        searchTerm: "",
        isLoadingDisplayPageArticles: false,
        failedToLoadDisplayPageArticles: false
    },
    reducers: {
        setSubredditUrlState(state, action) {
            state.subredditUrl = action.payload;
            state.displayPageArticles = [];            
        },
        loadSingleArticle(state, action) {
            state.displayPageArticles = [action.payload];
        },
        setSearchTermState(state, action) {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSubredditArticles.pending, (state) => {
                state.isLoadingDisplayPageArticles = true;
                state.failedToLoadDisplayPageArticles = false;
            })
            .addCase(loadSubredditArticles.fulfilled, (state, action) => {
                state.isLoadingDisplayPageArticles = false;
                state.failedToLoadDisplayPageArticles = false;
                //------add article(s) from subreddit-----------
                state.displayPageArticles = action.payload.data.children;
                //----------console logging to test and for info----------------
                console.log(action.payload.data.children);
                console.log('Fulfilled   DP');
            })
            .addCase(loadSubredditArticles.rejected, (state) => {
                state.isLoadingDisplayPageArticles = false;
                state.failedToLoadDisplayPageArticles = true;
                state.displayPageArticles = [];
                console.log('Failed');
            })
            .addCase(loadSearchResults.pending, (state) => {
                state.isLoadingDisplayPageArticles = true;
                state.failedToLoadDisplayPageArticles = false;
            })
            .addCase(loadSearchResults.fulfilled, (state, action) => {
                state.isLoadingDisplayPageArticles = false;
                state.failedToLoadDisplayPageArticles = false;
                //------add articles from search page-----------
                state.displayPageArticles = action.payload.data.children;
            })
            .addCase(loadSearchResults.rejected, (state) => {
                state.isLoadingDisplayPageArticles = false;
                state.failedToLoadDisplayPageArticles = true;
                state.displayPageArticles = [];
            })
    }
});


export const selectDisplayPageArticles = (state) => state.displayPage.displayPageArticles;
export const selectSubredditUrl = (state) => state.displayPage.subredditUrl;
export const selectSearchTerm = (state) => state.displayPage.searchTerm;
export const isLoadingDisplayPageArticles = (state) => state.displayPage.isLoadingDisplayPageArticles;
export const failedToLoadDisplayPageArticles = (state) => state.displayPage.failedToLoadDisplayPageArticles;
export const { setSubredditUrlState, loadSingleArticle, setSearchTermState } = displayPageSlice.actions;
export default displayPageSlice.reducer;