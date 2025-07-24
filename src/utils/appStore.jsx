import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import MoviesReducer from './MovieSlice'
import GPTReducer from './GPTSlice'
import CartReducer from './CartSlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: MoviesReducer,
    GPT: GPTReducer,
    Cart: CartReducer
  },
});

export default appStore;
