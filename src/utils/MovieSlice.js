import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies:null,
    topRatedMovies:null,
    upcomingMovies:null,
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
    },
    addPopularMovies:(state,action) => {
      state.popularMovies = action.payload
    },
    addtopRatedMovies:(state,action) => {
      state.topRatedMovies = action.payload
    },
    addUpcomingMovies: (state,action) => {
      state.upcomingMovies = action.payload
    }
  },
});

export const {
  addNowPlayingMovies,
  addTrailer,
  setPageAndMovieNum,
  addTitle,
  addOverview,
  addPopularMovies,
  addtopRatedMovies,
  addUpcomingMovies
} = MovieSlice.actions;

export default MovieSlice.reducer;
