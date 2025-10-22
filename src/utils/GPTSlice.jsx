import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "GPT",
  initialState: {
    isActive: false,
    searchQuery: "",
    movieNames: null,
    resultMovies: null,
    isLoading: false, // Add this
  },
  reducers: {
    changeIsActiveToTrue: (state) => {
      state.isActive = true;
    },
    changeIsActiveToFalse: (state) => {
      state.isActive = false;
    },
    addSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addMovieResult: (state, action) => {
      const { resultMovies, arrQuery } = action.payload;
      state.resultMovies = resultMovies;
      state.movieNames = arrQuery;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  changeIsActiveToTrue,
  changeIsActiveToFalse,
  addSearchQuery,
  addMovieResult,
  setLoading,
} = GPTSlice.actions;

export default GPTSlice.reducer;
