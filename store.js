import { configureStore } from "@reduxjs/toolkit";
import navReducer from './Apps/slices/navSlice';

export const store =configureStore({
    reducer:{
        nav:navReducer,
    },
});