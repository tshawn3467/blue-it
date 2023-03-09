import { configureStore } from "@reduxjs/toolkit";
import homeSliceReducer from "../Components/homeSlice";


const store = configureStore({
    reducer: {
        home: homeSliceReducer
    }        
});

export default store;