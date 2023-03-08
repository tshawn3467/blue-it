import { configureStore } from "@reduxjs/toolkit";
import homeSliceReducer from "../Components/homeSlice";


export default configureStore({
    reducer: {
        homeSlice: homeSliceReducer
    }        
});