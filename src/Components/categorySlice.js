import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* 
    topics url ex: /topics/a-1/   /topics/b-1/  ...
    single topic url ex: /t/gaming/   /t/sports/  ...

    create logic for random selection of topics/categories
*/

export const loadCategories = createAsyncThunk(
    'category/loadCategories',
    async() => {
        //-----use random logic to get topics/categories---------
        const response = await fetch('https://www.reddit.com');
        const data = await response.json();
        return data;
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        isLoadingCategories: false,
        failedToLoadCategories: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategories.pending, (state) => {
                state.isLoadingCategories = true;
                state.failedToLoadCategories = false;
            })
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.isLoadingCategories = false;
                state.failedToLoadCategories = false;
                //----add logic to load categories to state-----
                console.log('Fulfilled');
            })
            .addCase(loadCategories.rejected, (state) => {
                state.isLoadingCategories = false;
                state.failedToLoadCategories = true;
                state.categories = [];
                console.log('Failed');
            })
    }
})

export default categorySlice.reducer;
export const selectCategories = (state) => state.category.categories;
export const isLoading = (state) => state.category.isLoadingCategories;
export const failedToLoad = (state) => state.category.failedToLoadCategories;