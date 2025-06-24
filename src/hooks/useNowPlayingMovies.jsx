import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/MovieSlice";
import { options } from "../constants/options";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const pageNum = useSelector((store) => store.movies.pageAndMovieNum.pageNum);

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?page=${pageNum}`,
          options
        );
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
      } catch (err) {
        console.error("Failed to fetch now playing movies:", err);
      }
    };

    getNowPlayingMovies(); // Call it inside useEffect
  }, [dispatch, pageNum]);
};

