import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { options } from "../constants/options";
import { addNowPlayingMovies } from "../utils/MovieSlice";
import useRandom from "./useRandom";


export const useNowPlayingMovies = () => {
  const pageNum = useSelector(store => store.movies.pageAndMovieNum.pageNum);

    console.log("pageNum = " + pageNum)
const dispatch = useDispatch();

const getNowPlayingMovies = async () => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?page=${pageNum || 1}`,
      options
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  getNowPlayingMovies();
}, []);

}