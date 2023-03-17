import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const loadDisplayPageArticles = createAsyncThunk(
    'home/loadDisplayPageArticles',
    /*
        -fetch clicked on object
        -name parameter better?
        ----------not finished/tested---------------
    */
    async(clickedThing) => {
        const response = await fetch(`https://www.reddit.com/${clickedThing}.json`)
        const data = await response.json();
        return data;
    }
)


export const displayPageSlice = createSlice({
    name: 'displayPage',
    initialState: {
        articles: [],
        isLoadingDisplayPageArticles: false,
        failedToLoadDisplayPageArticles: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadDisplayPageArticles.pending, (state) => {
                state.isLoadingDisplayPageArticles = true;
                state.failedToLoadDisplayPageArticles = false;
            })
            .addCase(loadDisplayPageArticles.fulfilled, (state, action) => {
                state.isLoadingDisplayPageArticles = false;
                state.failedToLoadDisplayPageArticles = false;
                //------add article(s) from clicked thing-----------
                state.articles.push(action.payload.data.children);
                //----------console logging to test and for info----------------
                console.log(action.payload.data.children);
                console.log('Fulfilled');
            })
            .addCase(loadDisplayPageArticles.rejected, (state) => {
                state.isLoadingDisplayPageArticles = false;
                state.failedToLoadDisplayPageArticles = true;
                state.articles = [];
                console.log('Failed');
            })
    }
});


export const selectdisplayPageArticles = (state) => state.displayPage.articles;
export const isLoadingDisplayPageArticles = (state) => state.displayPage.isLoadingDisplayPageArticles;
export const failedToLoadDisplayPageArticles = (state) => state.displayPage.failedToLoadDisplayPageArticles;
export default displayPageSlice.reducer;