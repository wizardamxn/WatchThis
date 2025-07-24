import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import useTrailer from "../hooks/useTrailer";
import { setPageAndMovieNum } from "../utils/MovieSlice";
import { useEffect, useState } from "react";
import { HorizontalScrollContainer } from "../functions/HorizontalScrollContainer";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { useMediaQuery } from "react-responsive";
import MovieDetailCard from "./MovieDetailCard";
import { changeShowMovieDetailsCardToFalse } from "../utils/CartSlice";

// Enhanced Landing component
export const Landing = () => {
  const dispatch = useDispatch()
  const showMovie = useSelector((store) => store.Cart.showMovieDetailsCard);
  const movies = useSelector((store) => store.movies);
  console.log(movies?.popularMovies);

  return (
    <>
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none z-10"></div>

        {/* Animated background particles */}

        {showMovie && <MovieDetailCard onClose={()=>{dispatch(changeShowMovieDetailsCardToFalse())}}/>}
        <Primary />

        {/* Enhanced fade gradient with subtle glow */}
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-30">
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {/* First row overlaps trailer with enhanced positioning */}
        <div className="relative z-40 px-4 ml-10 -mt-16">
          <Secondary
            Heading={"Now Playing"}
            movies={movies?.nowPlayingMovies}
          />
        </div>

        {/* Other rows with enhanced spacing and background */}
        <div className="relative z-40 p-4 ml-10 space-y-8">
          <Secondary Heading={"Top Rated"} movies={movies?.topRatedMovies} />
          <Secondary Heading={"Popular"} movies={movies?.popularMovies} />
          <Secondary Heading={"Upcoming"} movies={movies?.upcomingMovies} />
        </div>
      </div>
    </>
  );
};

// Enhanced Primary (Trailer) Component
export const Primary = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const trailerVideo = useSelector((store) => store.movies.trailer);
  const title = useSelector((store) => store.movies.title);
  const trailerOverview = useSelector((store) => store.movies.overview);

  const dispatch = useDispatch();

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 20) + 1;
    const randomMovieIndex = Math.floor(Math.random() * 20);
    dispatch(
      setPageAndMovieNum({ pageNum: randomPage, movieNum: randomMovieIndex })
    );
  }, []);

  useTrailer();

  return (
    <div className="relative w-full aspect-[21/9] z-10">
      {/* Enhanced iframe container with subtle border */}
      <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden shadow-2xl">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}&rel=0&modestbranding=1&vq=hd1080`}
          title="YouTube trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-20" />

      {/* Enhanced text content with better typography */}
      <div className="absolute top-[30%] left-12 z-30 text-white max-w-5xl">
        <div className="relative">
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              {title}
            </span>
          </h1>
          {/* Subtle glow effect behind title */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>
        </div>

        {!isMobile && (
          <div className="relative max-w-2xl">
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-lg backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              {trailerOverview}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Secondary (Movie Cards) Component
export const Secondary = ({ Heading, movies }) => {
  if (!movies)
    return (
      <div className="text-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">
            Loading amazing content...
          </span>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full mb-12">
        <div className="relative px-6 mb-6">
          <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {Heading}
            </span>
          </h2>

          {/* ✅ Remove group-hover overlay effects below this line */}
        </div>

        <div className="relative">
          <HorizontalScrollContainer>
            <div className="flex space-x-6 px-6 scrollbar-hide overflow-y-clip">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="transform transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard
                  id={movie.id}
                    movieTitle={movie.title}
                    coverImage={movie.poster_path}
                    rating={movie.vote_average}
                  />
                </div>
              ))}
            </div>
          </HorizontalScrollContainer>
        </div>
      </div>
    </>
  );
};
