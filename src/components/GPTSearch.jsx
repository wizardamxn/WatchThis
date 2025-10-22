import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import MovieDetailCard from "./MovieDetailCard";
import { changeShowMovieDetailsCardToFalse } from "../utils/CartSlice";
import { changeIsActiveToFalse, addSearchQuery } from "../utils/GPTSlice";

const GPTSearch = () => {
  const dispatch = useDispatch();

  const showMovie = useSelector((store) => store.Cart.showMovieDetailsCard);
  const resultMovies = useSelector((store) => store?.GPT?.resultMovies);
  const movieNames = useSelector((store) => store?.GPT?.movieNames);
  const query = useSelector((store) => store?.GPT?.searchQuery);
  const isLoading = useSelector((store) => store?.GPT?.isLoading);

  const [filterExact, setFilterExact] = useState(false);

  const handleBackToHome = () => {
    dispatch(changeIsActiveToFalse());
    dispatch(addSearchQuery(""));
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg sm:text-xl font-semibold">Searching for amazing movies...</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">Powered by Gemini AI</p>
        </div>
      </div>
    );
  }

  if (!resultMovies || !movieNames) return null;

  const filteredMovies = resultMovies?.flatMap((category, i) =>
    category?.results
      ?.filter((movie) => {
        if (!filterExact) return true;
        const originalTitle = movieNames?.[i];
        return movie?.title?.toLowerCase() === originalTitle?.toLowerCase();
      })
      ?.map((movie) => (
        <MovieCard
          id={movie.id}
          key={movie?.id}
          movieTitle={movie?.title}
          coverImage={movie?.poster_path}
          rating={movie?.vote_average}
        />
      ))
  );

  return (
    <>
      {showMovie && (
        <MovieDetailCard
          onClose={() => {
            dispatch(changeShowMovieDetailsCardToFalse());
          }}
        />
      )}

      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 sm:px-6 md:px-8 py-4 sm:py-6 overflow-y-auto relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-purple-500/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-indigo-500/20 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <button
            onClick={handleBackToHome}
            className="mb-4 mt-16 sm:mt-20 flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-200 group text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Showing Search Results for:
              </span>
            </h1>
            <div className="relative inline-block">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse break-words">
                "{query}"
              </span>
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-60"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => setFilterExact(false)}
              className={`
              group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white text-sm sm:text-base
              transition-all duration-300 transform hover:scale-105 hover:shadow-lg
              ${
                !filterExact
                  ? "bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/25 shadow-lg"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
              }
            `}
            >
              <span className="relative z-10">📡 Broad Search</span>
              {!filterExact && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              )}
            </button>

            <button
              onClick={() => setFilterExact(true)}
              className={`
              group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white text-sm sm:text-base
              transition-all duration-300 transform hover:scale-105 hover:shadow-lg
              ${
                filterExact
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/25 shadow-lg"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
              }
            `}
            >
              <span className="relative z-10">🎯 Exact Match</span>
              {filterExact && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              )}
            </button>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-2xl"></div>

              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 relative z-10 p-2 sm:p-3 md:p-4 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10">
                {filteredMovies}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 text-center px-4">
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-2xl sm:text-3xl md:text-4xl">🔍</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/30 to-gray-700/30 rounded-full blur-xl"></div>
              </div>

              <p className="text-gray-300 text-base sm:text-lg md:text-xl font-medium mb-2">
                No exact matches found
              </p>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md">
                Try switching to "Broad Search" to see more results, or refine
                your search query.
              </p>

              <div className="flex gap-2 mt-4">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GPTSearch;
