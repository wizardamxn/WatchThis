import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    addedMovies: [],
    showMovieDetailsCard: false,
    tappedMovieId:null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.addedMovies.push(action.payload);
    },
    changeShowMovieDetailsCardToTrue: (state, action) => {
      state.showMovieDetailsCard = true;
    },
    changeShowMovieDetailsCardToFalse: (state, action) => {
      state.showMovieDetailsCard = false;
    },
    addId: (state,action) => {
        state.tappedMovieId = action.payload
    }
  },
});

export const {
    addId,
  addToCart,
  changeShowMovieDetailsCardToFalse,
  changeShowMovieDetailsCardToTrue,
} = CartSlice.actions;

export default CartSlice.reducer;
