import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addId,
  addToCart,
  changeShowMovieDetailsCardToTrue,
} from "../utils/CartSlice";
import { addToWatchlist, removeFromWatchlist } from "../utils/WatchlistSlice";
import { Bookmark, BookmarkCheck } from "lucide-react";

const MovieCard = ({ movieTitle, rating, coverImage, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = `https://image.tmdb.org/t/p/w500${coverImage}`;
  const dispatch = useDispatch();

  const watchlist = useSelector((store) => store.watchlist.movies);
  const isInWatchlist = watchlist.some((movie) => movie.id === id);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(id));
    } else {
      dispatch(
        addToWatchlist({
          id,
          title: movieTitle,
          poster_path: coverImage,
          vote_average: rating,
        })
      );
    }
  };

  if (!coverImage) return null;

  const getMovieDetails = () => {
    dispatch(addId(id));
    dispatch(changeShowMovieDetailsCardToTrue());
  };

  return (
    <div
      onClick={getMovieDetails}
      className="relative flex-shrink-0 w-[140px] h-[210px] sm:w-[160px] sm:h-[240px] md:w-[180px] md:h-[270px] lg:w-[200px] lg:h-[300px] xl:w-[220px] xl:h-[330px] rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105 sm:hover:scale-110 hover:z-20 group cursor-pointer shadow-lg"
    >
      {/* Shimmer Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1e1e1e] via-[#2c2c2c] to-[#1e1e1e] animate-pulse" />
      )}

      {/* Poster */}
      <img
        src={imageUrl}
        alt={movieTitle}
        className={`w-full h-full object-cover rounded-md transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
      />

      {/* Watchlist Button */}
      <button
        onClick={handleWatchlistToggle}
        className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-30 p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
          isInWatchlist
            ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/50 scale-110"
            : "bg-black/60 text-white hover:bg-black/80"
        }`}
        aria-label={
          isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
        }
      >
        {isInWatchlist ? (
          <BookmarkCheck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        ) : (
          <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        )}
      </button>

      {/* Hover Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-3 md:p-4 text-white">
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold line-clamp-2 mb-1">
          {movieTitle || "Untitled"}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-300">
          ⭐ {rating ? rating.toFixed(1) : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
