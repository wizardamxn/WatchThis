import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage on init
const loadWatchlistFromStorage = () => {
  try {
    const savedWatchlist = localStorage.getItem("movieWatchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  } catch (error) {
    console.error("Error loading watchlist from localStorage:", error);
    return [];
  }
};

// Save to localStorage
const saveWatchlistToStorage = (watchlist) => {
  try {
    localStorage.setItem("movieWatchlist", JSON.stringify(watchlist));
  } catch (error) {
    console.error("Error saving watchlist to localStorage:", error);
  }
};

const WatchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: loadWatchlistFromStorage(),
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      const exists = state.movies.find((m) => m.id === movie.id);
      
      if (!exists) {
        state.movies.push(movie);
        saveWatchlistToStorage(state.movies);
      }
    },
    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter((m) => m.id !== movieId);
      saveWatchlistToStorage(state.movies);
    },
    clearWatchlist: (state) => {
      state.movies = [];
      localStorage.removeItem("movieWatchlist");
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } =
  WatchlistSlice.actions;

export default WatchlistSlice.reducer;
