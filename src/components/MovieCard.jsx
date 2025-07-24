import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addId,
  addToCart,
  changeShowMovieDetailsCardToTrue,
} from "../utils/CartSlice";

const MovieCard = ({ movieTitle, rating, coverImage, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = `https://image.tmdb.org/t/p/w500${coverImage}`;
  const dispatch = useDispatch();
  const handleClick = (movieTitle) => {
    dispatch(addToCart(movieTitle));
  };
  if (!coverImage) return null;
  const getMovieDetails = () => {
    dispatch(addId(id));
    dispatch(changeShowMovieDetailsCardToTrue());
  };
  return (
    <>
      <div
        onClick={getMovieDetails}
        className="relative flex-shrink-0 w-[220px] h-[330px] rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-110 hover:z-20 group cursor-pointer"
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
        Hover Overlay
        <div className="absolute inset-0 pointer-events-none bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
          <h3 className="text-lg font-semibold truncate">
            {movieTitle || "Untitled"}
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            ⭐ {rating ? rating.toFixed(1) : "Not Available"}
          </p>
          
        </div>
      </div>
    </>
  );
};

export default MovieCard;
