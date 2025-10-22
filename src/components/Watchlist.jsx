import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieDetailCard from "./MovieDetailCard";
import { clearWatchlist } from "../utils/WatchlistSlice";
import { changeShowMovieDetailsCardToFalse } from "../utils/CartSlice";
import { Trash2, ArrowLeft } from "lucide-react";
import BrowseHeader from "./BrowseHeader";

const Watchlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlist = useSelector((store) => store.watchlist.movies);
  const showMovie = useSelector((store) => store.Cart.showMovieDetailsCard);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire watchlist?")) {
      dispatch(clearWatchlist());
    }
  };

  return (
    <>
      <BrowseHeader />

      {/* Movie Detail Card Modal */}
      {showMovie && (
        <MovieDetailCard
          onClose={() => {
            dispatch(changeShowMovieDetailsCardToFalse());
          }}
        />
      )}

      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 sm:px-6 md:px-8 py-6 pt-20 sm:pt-24 md:pt-28">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <button
              onClick={() => navigate(-1)}
              className="mb-3 sm:mb-4 flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                My Watchlist
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} saved
            </p>
          </div>

          {watchlist.length > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Clear All
            </button>
          )}
        </div>

        {/* Movies Grid */}
        {watchlist.length > 0 ? (
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                movieTitle={movie.title}
                coverImage={movie.poster_path}
                rating={movie.vote_average}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 text-center px-4">
            <div className="relative mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-3xl sm:text-4xl">🎬</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/30 to-gray-700/30 rounded-full blur-xl"></div>
            </div>

            <p className="text-gray-300 text-lg sm:text-xl font-medium mb-2">
              Your watchlist is empty
            </p>
            <p className="text-gray-500 text-sm sm:text-base max-w-md mb-6 px-4">
              Start adding movies you want to watch by clicking the bookmark icon
              on any movie card.
            </p>

            <button
              onClick={() => navigate("/browse")}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Browse Movies
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Watchlist;
