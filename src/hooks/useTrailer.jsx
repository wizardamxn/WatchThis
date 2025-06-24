import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { options } from "../constants/options";
import { addOverview, addTitle, addTrailer } from "../utils/MovieSlice";
import useRandom from "./useRandom";

const useTrailer = () => {
  const { movieNum } = useSelector(store => store.movies.pageAndMovieNum);

  const dispatch = useDispatch();
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const id = movies?.[movieNum]?.id;
  const title = movies?.[movieNum]?.original_title
  const overView = movies?.[movieNum]?.overview
  dispatch(addOverview(overView))
  dispatch(addTitle(title))
//   const [trailer, setTrailer] = useState();
  useEffect(() => {
    let json = null;
    const getMovieVideo = async () => {
      if (!id) return; // wait until id is ready
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?`,
          options
        );
        json = await data.json();
      } catch (err) {
        console.error("Error fetching movie video:", err);
      }
      const filterData = json?.results?.filter(
        (video) => video.type.toLowerCase() === "trailer"
      );
      const traile = filterData?.length ? filterData[0] : json?.results?.[0];
    //   setTrailer(traile);
      dispatch(addTrailer(traile));

    };

    getMovieVideo();
  }, [id]);
};

export default useTrailer;
