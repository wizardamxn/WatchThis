import { useDispatch, useSelector } from "react-redux";

import MovieCard from "./MovieCard";
import useTrailer from "../hooks/useTrailer";
import { setPageAndMovieNum } from "../utils/MovieSlice";
import useRandom from "../hooks/useRandom";
import { use, useEffect } from "react";
import { HorizontalScrollContainer } from "../functions/HorizontalScrollContainer";

// Landing component
export const Landing = () => {
  return (
    <div className="h-full w-full aspect-[21/9]">
      <Primary />
      <Secondary/>
    </div>
  );
};

// Primary component
export const Primary = () => {
  const trailerVideo = useSelector((store) => store.movies.trailer);
  const trailerTitle = useSelector((store) => store.movies.trailer);
  const trailerOverview = useSelector((store) => store.movies.overview)

  const dispatch = useDispatch();

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 20) + 1; // Pages 1–20
    const randomMovieIndex = Math.floor(Math.random() * 20); // Index 0–19

    dispatch(
      setPageAndMovieNum({
        pageNum: randomPage,
        movieNum: randomMovieIndex,
      })
    );
  }, []);

  const title = useSelector((store) => store.movies.title);
  useTrailer();
  return (
    <div className="relative w-full h-full">
 <iframe
    className="absolute top-0 left-0 w-full h-full object-cover"
    src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}&rel=0&modestbranding=1&vq=hd1080`}
    title="YouTube video player"
    allow="autoplay; encrypted-media"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
  ></iframe>


  {/* Optional: dark gradient for readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-[5]" />

  {/* Text Container */}
  <div className="absolute top-[30%] left-12 z-10 text-white w-[80%] max-w-4xl">
    <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 leading-tight">
      {title}
    </h1>
    <p className="font-medium text-md md:text-lg lg:text-xl xl:text-2xl leading-snug">
      {trailerOverview}
    </p>
  </div>
</div>

  );

  // or return something if needed
};

export const Secondary = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return <div>Loading movies...</div>;

  return (
    <div className="bg-black pt-0 pb-4 px-4 -mt-2 ">
      <h2 className="text-white text-2xl font-bold mb-4 z-50">Now Playing</h2>
      <HorizontalScrollContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.id} coverImage={movie.poster_path} />
        ))}
      </HorizontalScrollContainer>
    </div>
  );
};
