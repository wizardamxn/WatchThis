import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies, addtopRatedMovies, addUpcomingMovies } from "../utils/MovieSlice";
import { options } from "../constants/options";

export const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const pageNum = useSelector((store) => store.movies.pageAndMovieNum.pageNum);
  
  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?page=${pageNum}`,
          options
        );
        const json = await data.json();
        console.log(json)
        dispatch(addUpcomingMovies(json.results));
      } catch (err) {
        console.error("Failed to fetch now playing movies:", err);
      }
    };

    getUpcomingMovies(); // Call it inside useEffect
  }, [dispatch, pageNum]);
};

