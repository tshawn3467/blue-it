import { configureStore } from "@reduxjs/toolkit";
import homeSliceReducer from "../Components/homeSlice";
import displayPageSliceReducer from "../Components/displayPageSlice";


const store = configureStore({
    reducer: {
        home: homeSliceReducer,
        displayPage: displayPageSliceReducer
    }        
});

export default store;