import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

const GPTSearch = () => {
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
          key={movie?.id}
          movieTitle={movie?.title}
          coverImage={movie?.poster_path}
          rating={movie?.vote_average}
        />
      ))
  );

  return (
    <div className="w-full min-h-screen bg-black px-8 py-6 overflow-y-auto">
      <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 mt-20">
        Showing Search Results for: <span className="text-red-500">{query}</span>
      </h1>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilterExact(false)}
          className={`px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition ${
            !filterExact ? 'border-2 border-red-500' : ''
          }`}
        >
          Broad Search
        </button>
        <button
          onClick={() => setFilterExact(true)}
          className={`px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition ${
            filterExact ? 'border-2 border-green-500' : ''
          }`}
        >
          Exact Match
        </button>
      </div>

      {/* Movie Grid or Empty */}
      {filteredMovies.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filteredMovies}
        </div>
      ) : (
        <p className="text-gray-400 text-lg italic ml-2">
          No results found for exact match.
        </p>
      )}
    </div>
  );
};

export default GPTSearch;
