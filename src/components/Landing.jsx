import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import useTrailer from "../hooks/useTrailer";
import { setPageAndMovieNum } from "../utils/MovieSlice";
import { useEffect } from "react";
import { HorizontalScrollContainer } from "../functions/HorizontalScrollContainer";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";

// Landing component
export const Landing = () => {

  const movies = useSelector((store) => store.movies);

  return (
    <div className="relative w-full h-full bg-black">
      <Primary />

      {/* Fade gradient from black to transparent */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-30" />

      {/* First row overlaps trailer */}
      <div className="relative z-40 px-4 ml-10 -mt-16">
        <Secondary Heading={"Now Playing"} movies={movies?.nowPlayingMovies} />
      </div>

      {/* Other rows */}
      <div className="relative z-40 p-4 ml-10 space-y-6">
        <Secondary Heading={"Top Rated"} movies={movies?.topRatedMovies} />
        <Secondary Heading={"Popular"} movies={movies?.popularMovies} />
        <Secondary Heading={"Upcoming"} movies={movies?.upcomingMovies} />
        {/* <Secondary Heading={"Romance"} movies={movies?.nowPlayingMovies} /> */}
      </div>
    </div>
  );
};

// Primary (Trailer) Component
export const Primary = () => {
  const trailerVideo = useSelector((store) => store.movies.trailer);
  const title = useSelector((store) => store.movies.title);
  const trailerOverview = useSelector((store) => store.movies.overview);

  const dispatch = useDispatch();

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 20) + 1;
    const randomMovieIndex = Math.floor(Math.random() * 20);
    dispatch(setPageAndMovieNum({ pageNum: randomPage, movieNum: randomMovieIndex }));
  }, []);

  useTrailer();

  return (
    <div className="relative w-full aspect-[21/9] z-10">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}&rel=0&modestbranding=1&vq=hd1080`}
        title="YouTube trailer"
        allow="autoplay; encrypted-media"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>

      {/* Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-20" />

      {/* Text content */}
      <div className="absolute top-[30%] left-12 z-30 text-white max-w-5xl">
        <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl">{trailerOverview}</p>
      </div>
    </div>
  );
};

// Secondary (Movie Cards) Component
export const Secondary = ({ Heading, movies }) => {
  if (!movies) return <div className="text-white">Loading movies...</div>;

  return (
    <div className="w-full">
      <h2 className="text-white text-2xl ml-6 font-bold mb-4 z-50">{Heading}</h2>
      <HorizontalScrollContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.id} coverImage={movie.poster_path} />
        ))}
      </HorizontalScrollContainer>
    </div>
  );
};
