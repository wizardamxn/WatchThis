import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import MovieDetailCard from "./MovieDetailCard";

import { changeShowMovieDetailsCardToFalse } from "../utils/CartSlice";

const GPTSearch = () => {
  const dispatch = useDispatch();

  const showMovie = useSelector((store) => store.Cart.showMovieDetailsCard);

  const resultMovies = useSelector((store) => store?.GPT?.resultMovies);
  const movieNames = useSelector((store) => store?.GPT?.movieNames);
  const query = useSelector((store) => store?.GPT?.searchQuery);

  const [filterExact, setFilterExact] = useState(false);

  if (!resultMovies || !movieNames) return null; // Show shimmer or loading screen

  // Filtered Movies based on toggle
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

      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-8 py-6 overflow-y-auto relative">
        {/* Background overlay with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none"></div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-purple-500/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-indigo-500/20 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10">
          {/* Enhanced header with gradient text */}
          <div className="mb-8 mt-20">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Showing Search Results for:
              </span>
            </h1>
            <div className="relative inline-block">
              <span className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                "{query}"
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Enhanced Toggle Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setFilterExact(false)}
              className={`
              group relative px-6 py-3 rounded-xl font-semibold text-white 
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
              group relative px-6 py-3 rounded-xl font-semibold text-white 
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

          {/* Movie Grid or Empty State */}
          {filteredMovies.length > 0 ? (
            <div className="relative">
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-2xl"></div>

              <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 relative z-10 p-4 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10">
                {filteredMovies}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {/* Enhanced empty state */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-4xl">🔍</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/30 to-gray-700/30 rounded-full blur-xl"></div>
              </div>

              <p className="text-gray-300 text-xl font-medium mb-2">
                No exact matches found
              </p>
              <p className="text-gray-500 text-sm max-w-md">
                Try switching to "Broad Search" to see more results, or refine
                your search query.
              </p>

              {/* Subtle animated dots */}
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
