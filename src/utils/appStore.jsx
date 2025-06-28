import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import MoviesReducer from './MovieSlice'
import GPTReducer from './GPTSlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: MoviesReducer,
    GPT: GPTReducer,
  },
});

export default appStore;
