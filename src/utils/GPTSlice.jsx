import { createSlice } from "@reduxjs/toolkit";



const GPTSlice = createSlice({
    name:"GPT",
    initialState:{
        searchQuery:null,
        isActive: false,
        resultMovies: null,
        movieNames: null
    },
    reducers:{
        changeIsActiveToTrue: (state, action) => {
            state.isActive = true
        },
        changeIsActiveToFalse: (state, action) =>{
            state.isActive=false;
        },
        addMovieResult: (state,action) => {
            const {arrQuery, resultMovies} = action.payload
            state.resultMovies = resultMovies
            state.movieNames = arrQuery
        },
        addSearchQuery: (state,action) => {
            state.searchQuery = action.payload
        }

    }

})


export const {changeIsActiveToTrue, changeIsActiveToFalse, addMovieResult, addSearchQuery} = GPTSlice.actions

export default GPTSlice.reducer