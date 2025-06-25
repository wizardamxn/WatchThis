import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/MovieSlice";
import { options } from "../constants/options";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  const pageNum = useSelector((store) => store.movies.pageAndMovieNum.pageNum);
  
  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/popular?page=${pageNum}`,
          options
        );
        const json = await data.json();
        console.log(json)
        dispatch(addPopularMovies(json.results));
      } catch (err) {
        console.error("Failed to fetch now playing movies:", err);
      }
    };

    getPopularMovies(); // Call it inside useEffect
  }, [dispatch, pageNum]);
};

