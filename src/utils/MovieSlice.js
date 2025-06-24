import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailer: null,
    pageAndMovieNum: {
      pageNum: 4,
      movieNum: 11
    },
    title: null,
    overview: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    setPageAndMovieNum: (state, action) => {
      state.pageAndMovieNum = action.payload; // { pageNum, movieNum }
    },
    addTitle: (state, action) => {
      state.title = action.payload;
    },
    addOverview: (state,action) => {
        state.overview = action.payload
    }
  },
});

export const {
  addNowPlayingMovies,
  addTrailer,
  setPageAndMovieNum,
  addTitle,
  addOverview
} = MovieSlice.actions;

export default MovieSlice.reducer;
