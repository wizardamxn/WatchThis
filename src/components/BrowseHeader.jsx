import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/fireBase";
import { NETFLIX_LOGO_URL } from "../constants/URL";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";
import { options } from "../constants/options";
import { addMovieResult, addSearchQuery } from "../utils/GPTSlice";
import { LogOut } from "lucide-react";
import { changeIsActiveToFalse, changeIsActiveToTrue } from "../utils/GPTSlice";

const BrowseHeader = () => {
  const dispatch = useDispatch();
  const userImage = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  const queryRef = useRef();

  const fetchMovieOnSearch = async (searchQuery) => {
    try {
      const searchData = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&page=1`,
        options
      );
      return await searchData.json();
    } catch (err) {
      console.error("Error fetching movie:", err);
      return null;
    }
  };

  const handleClickSearch = async () => {
    const trimmedQuery = queryRef.current.value.trim();
    dispatch(addSearchQuery(trimmedQuery))

    if (trimmedQuery === "") {
      dispatch(changeIsActiveToFalse());
      return;
    }

    dispatch(changeIsActiveToTrue());

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:
          "Act as a Movie Recommendation System and suggest some movies for the query: " +
          trimmedQuery +
          "Movies should be comma separtated like the example result given as 'Harry Potter, Lord of the Rings, Twilight ' DO NOT SAY ANYTHING OTHER THAN THE RESULT!",
      });
      console.log(response.text);
      const arrQuery = response.text.split(",").map((movie) => movie.trim());
      console.log(arrQuery);
      const data = arrQuery.map((movie) => fetchMovieOnSearch(movie));
      const tmdbResult = await Promise.all(data);
      dispatch(addMovieResult({resultMovies: tmdbResult,arrQuery: arrQuery}));
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Sign-out logic
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out failed", error);
      });
  };

  return (
    <div className="fixed flex justify-between items-center top-0 w-full h-20 px-8 bg-gradient-to-b from-black z-50">
      {/* Netflix Logo */}
      <img src={NETFLIX_LOGO_URL} alt="Netflix Logo" className="w-22" />

      {/* Search Bar */}
      <div className="relative mt-4 mr-6 flex items-center gap-2">
        <input
          ref={queryRef}
          placeholder="Ask me anything..."
          className="border border-white/30 text-white bg-white/10 backdrop-blur placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-4 py-3 w-[300px]"
        />
        <motion.button
          onClick={handleClickSearch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
         className="w-full flex justify-center items-center gap-2 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405M16.59 16.59L21 21m0 0l-4.41-4.41M10 3a7 7 0 100 14 7 7 0 000-14z"
            />
          </svg>
          Search
        </motion.button>
      </div>

      {/* Avatar + Sign Out */}
      <div
        className="relative flex items-center group"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <img
          src={userImage?.photoURL || "/default-avatar.png"}
          alt="User"
          className="w-14 h-14 rounded-full object-cover cursor-pointer"
        />

        <AnimatePresence>
          {hovering && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={handleSignOut}
              className="absolute top-14 right-0 px-5 py-3 flex items-center gap-2 text-sm font-medium text-white rounded-md 
                         bg-white/10 backdrop-blur border border-white/30 
                         shadow-lg shadow-black/50 hover:bg-white/20 hover:border-white hover:shadow-xl 
                         cursor-pointer z-50"
            >
              <LogOut size={32} className="text-white opacity-80" />
              <span className="transition duration-200 ease-in-out group-hover:text-white">
                Log out
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrowseHeader;