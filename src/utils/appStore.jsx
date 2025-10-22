import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./MovieSlice";
import GPTReducer from "./GPTSlice";
import CartReducer from "./CartSlice";
import WatchlistReducer from "./WatchlistSlice"; // Import this

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    GPT: GPTReducer,
    Cart: CartReducer,
    watchlist: WatchlistReducer, // Add this
  },
});

export default appStore;
