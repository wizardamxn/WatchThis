import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import useTrailer from "../hooks/useTrailer";
import { setPageAndMovieNum } from "../utils/MovieSlice";
import { useEffect } from "react";
import { HorizontalScrollContainer } from "../functions/HorizontalScrollContainer";
import { useMediaQuery } from "react-responsive";
import MovieDetailCard from "./MovieDetailCard";
import { changeShowMovieDetailsCardToFalse } from "../utils/CartSlice";

export const Landing = () => {
  const dispatch = useDispatch();
  const showMovie = useSelector((store) => store.Cart.showMovieDetailsCard);
  const movies = useSelector((store) => store.movies);

  return (
    <>
      <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none z-10"></div>

        {showMovie && (
          <MovieDetailCard
            onClose={() => {
              dispatch(changeShowMovieDetailsCardToFalse());
            }}
          />
        )}

        <Primary />

        {/* Fade gradient - Stronger on mobile */}
        <div className="absolute bottom-0 w-full h-32 sm:h-40 md:h-48 bg-gradient-to-t from-black via-black/90 to-transparent z-30 pointer-events-none md:hidden"></div>

        {/* Movie Rows */}
        <div className="relative z-40 px-3 sm:px-4 md:px-6 lg:px-10 -mt-16 sm:-mt-20 md:-mt-14 lg:-mt-20">
          <Secondary Heading={"Now Playing"} movies={movies?.nowPlayingMovies} />
        </div>

        <div className="relative z-40 px-3 sm:px-4 md:px-6 lg:px-10 space-y-4 sm:space-y-6 md:space-y-8 pb-6 sm:pb-8">
          <Secondary Heading={"Top Rated"} movies={movies?.topRatedMovies} />
          <Secondary Heading={"Popular"} movies={movies?.popularMovies} />
          <Secondary Heading={"Upcoming"} movies={movies?.upcomingMovies} />
        </div>
      </div>
    </>
  );
};

export const Primary = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
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
  }, [dispatch]);

  useTrailer();

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:aspect-[16/9] lg:aspect-[21/9] mt-16 sm:mt-20 z-10">
      {/* Video Container */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] md:w-full md:h-full md:top-0 md:left-0 md:translate-x-0 md:translate-y-0 object-cover"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}&rel=0&modestbranding=1&vq=hd1080`}
          title="YouTube trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 sm:via-black/50 md:via-black/30 to-transparent z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-20" />

      {/* Text Content */}
      <div className="absolute top-[25%] sm:top-[30%] md:top-[35%] left-3 sm:left-6 md:left-8 lg:left-12 z-30 text-white max-w-[90%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <div className="relative">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              {title}
            </span>
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl sm:blur-2xl md:blur-3xl -z-10"></div>
        </div>

        {!isMobile && (
          <div className="relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-2 sm:mt-3 md:mt-4">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 leading-relaxed drop-shadow-lg backdrop-blur-sm bg-black/20 p-2 sm:p-3 md:p-4 rounded-lg border border-white/10 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
              {trailerOverview}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const Secondary = ({ Heading, movies }) => {
  if (!movies)
    return (
      <div className="text-white px-2 sm:px-3 md:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm sm:text-base md:text-lg font-medium">
            Loading amazing content...
          </span>
        </div>
      </div>
    );

  return (
    <div className="w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      <div className="relative px-2 sm:px-3 md:px-6 mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            {Heading}
          </span>
        </h2>
      </div>

      <div className="relative">
        <HorizontalScrollContainer>
          <div className="flex space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 px-2 sm:px-3 md:px-6 overflow-y-clip">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="flex-shrink-0 transform transition-all duration-500"
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
  );
};
