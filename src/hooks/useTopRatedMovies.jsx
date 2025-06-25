import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies, addtopRatedMovies } from "../utils/MovieSlice";
import { options } from "../constants/options";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const pageNum = useSelector((store) => store.movies.pageAndMovieNum.pageNum);
  
  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?page=${pageNum}`,
          options
        );
        const json = await data.json();
        console.log(json)
        dispatch(addtopRatedMovies(json.results));
      } catch (err) {
        console.error("Failed to fetch now playing movies:", err);
      }
    };

    getTopRatedMovies(); // Call it inside useEffect
  }, [dispatch, pageNum]);
};

