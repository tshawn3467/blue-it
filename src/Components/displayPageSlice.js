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


export const displayPageSlice = createSlice({
    name: 'displayPage',
    initialState: {
        displayPageArticles: [],
        subredditUrl: "r/popular",
        isLoadingDisplayPageArticles: false,
        failedToLoadDisplayPageArticles: false
    },
    reducers: {
        setSubredditUrlState(state, action) {
            state.subredditUrl = action.payload;
            state.displayPageArticles = [];            
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
    }
});


export const selectDisplayPageArticles = (state) => state.displayPage.displayPageArticles;
export const selectSubredditUrl = (state) => state.displayPage.subredditUrl;
export const isLoadingDisplayPageArticles = (state) => state.displayPage.isLoadingDisplayPageArticles;
export const failedToLoadDisplayPageArticles = (state) => state.displayPage.failedToLoadDisplayPageArticles;
export const { setSubredditUrlState } = displayPageSlice.actions;
export default displayPageSlice.reducer;