import React, { useEffect, useState } from "react";
import { Star, Calendar, Clock, Users, Award, X, Bookmark, BookmarkCheck } from "lucide-react";
import { options } from "../constants/options";
import { useSelector, useDispatch } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../utils/WatchlistSlice";

const MovieDetailCard = ({ onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const movieId = useSelector((store) => store.Cart.tappedMovieId);
  const watchlist = useSelector((store) => store.watchlist.movies);
  const isInWatchlist = watchlist.some((m) => m.id === movieId);

  useEffect(() => {
    const fetchData = async () => {
      if (!movieId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        const responseCreds = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          options
        );
        const responseVid = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }

        const json = await response.json();
        const jsonCreds = await responseCreds.json();
        const jsonVid = await responseVid.json();
        console.log("JSONVID", jsonVid.results);

        const mappedMovie = {
          id: json.id,
          trailerKey: jsonVid.results[0]?.key,
          title: json.title,
          poster: json.poster_path
            ? `https://image.tmdb.org/t/p/w500${json.poster_path}`
            : "https://via.placeholder.com/500x750/1f2937/ffffff?text=No+Image",
          poster_path: json.poster_path,
          rating: json.vote_average?.toFixed(1) || "N/A",
          vote_average: json.vote_average,
          year: json.release_date
            ? new Date(json.release_date).getFullYear()
            : "N/A",
          duration: json.runtime ? `${json.runtime} min` : "N/A",
          genre: json.genres?.map((g) => g.name) || [],
          director: jsonCreds.crew?.find((c) => c.job === "Director")?.name || "N/A",
          cast: jsonCreds.cast || [],
          plot: json.overview || "No plot available.",
          awards: "N/A",
          budget: json.budget ? `$${(json.budget / 1_000_000).toFixed(1)}M` : "N/A",
          boxOffice: json.revenue
            ? `$${(json.revenue / 1_000_000).toFixed(1)}M`
            : "N/A",
        };

        setMovie(mappedMovie);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  const handleWatchlistToggle = () => {
    if (!movie) return;

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(
        addToWatchlist({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden border backdrop-blur-sm">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl p-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-white text-lg">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden border backdrop-blur-sm">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl p-8">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-white text-xl font-bold mb-2">Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            {onClose && (
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden border backdrop-blur-sm">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Movie Poster Section */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>

          <iframe
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.trailerKey}&rel=0&modestbranding=1&vq=hd1080`}
            title="YouTube trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>

          {/* Floating Rating Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-yellow-500/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1 flex items-center gap-1 sm:gap-2 shadow-lg">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
            <span className="text-white font-bold text-sm sm:text-base">
              {movie.rating}
            </span>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 z-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
              {movie.title}
            </h1>
            <div className="flex items-center gap-2 sm:gap-4 text-gray-300 text-sm sm:text-base">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                {movie.year}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                {movie.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Movie Details Section */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {movie.genre.map((g, index) => (
              <span
                key={index}
                className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Plot */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {movie.plot}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Director
                </h3>
                <p className="text-gray-300 text-sm sm:text-base font-medium">
                  {movie.director}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  Awards
                </h3>
                <p className="text-gray-300 text-sm sm:text-base font-medium">
                  {movie.awards}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Cast
                </h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {movie.cast.length > 0 ? (
                    movie.cast.slice(0, 5).map((actor, index) => (
                      <span
                        key={actor.name}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-xs sm:text-sm border border-gray-600 hover:bg-gray-600/50 transition-colors duration-300"
                      >
                        {actor.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs sm:text-sm italic">
                      Loading cast...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
              Watch Now
            </button>
            <button
              onClick={handleWatchlistToggle}
              className={`flex-1 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 ${
                isInWatchlist
                  ? "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
              }`}
            >
              {isInWatchlist ? (
                <>
                  <BookmarkCheck className="w-5 h-5" />
                  Remove from Watchlist
                </>
              ) : (
                <>
                  <Bookmark className="w-5 h-5" />
                  Add to Watchlist
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
