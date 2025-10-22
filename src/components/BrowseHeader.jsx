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
import { LogOut, Bookmark, User, ChevronDown, Menu, X, Search } from "lucide-react";
import {
  changeIsActiveToFalse,
  changeIsActiveToTrue,
  setLoading,
} from "../utils/GPTSlice";

const BrowseHeader = () => {
  const dispatch = useDispatch();
  const userImage = useSelector((store) => store.user);
  const watchlist = useSelector((store) => store.watchlist.movies);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");
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

  const handleClearSearch = () => {
    setInputValue("");
    queryRef.current.value = "";
    dispatch(addSearchQuery(""));
    dispatch(changeIsActiveToFalse());
  };

  const handleClickSearch = async () => {
    const trimmedQuery = queryRef.current.value.trim();
    dispatch(addSearchQuery(trimmedQuery));
    setShowMobileMenu(false);

    if (trimmedQuery === "") {
      dispatch(changeIsActiveToFalse());
      return;
    }

    dispatch(changeIsActiveToTrue());
    dispatch(setLoading(true));

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:
          "Act as a Movie Recommendation System and suggest some movies for the query: " +
          trimmedQuery +
          ". Movies should be comma separated like the example result given as 'Harry Potter, Lord of the Rings, Twilight'. DO NOT SAY ANYTHING OTHER THAN THE RESULT!",
      });

      console.log(response.text);
      const arrQuery = response.text.split(",").map((movie) => movie.trim());
      console.log(arrQuery);
      const data = arrQuery.map((movie) => fetchMovieOnSearch(movie));
      const tmdbResult = await Promise.all(data);
      dispatch(
        addMovieResult({ resultMovies: tmdbResult, arrQuery: arrQuery })
      );
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };

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
    <>
      <div className="fixed flex justify-between items-center top-0 w-full h-16 sm:h-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-black z-50">
        {/* Logo */}
        <img src={NETFLIX_LOGO_URL} alt="Netflix Logo" className="w-20 sm:w-22 md:w-24" />

        {/* Desktop Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex relative items-center gap-2 mr-6">
          <div className="relative">
            <input
              ref={queryRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="border border-white/30 text-white bg-white/10 backdrop-blur placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-4 py-3 w-[250px] lg:w-[300px] pr-10"
            />
            {inputValue && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <motion.button
            onClick={handleClickSearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center items-center gap-2 px-6 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Search className="h-5 w-5" />
            Search
          </motion.button>
        </div>

        {/* Right Side: Profile (Desktop) & Hamburger (Mobile) */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white hover:text-cyan-400 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Profile Dropdown */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 group"
            >
              <img
                src={userImage?.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-lg object-cover border-2 border-transparent group-hover:border-cyan-500 transition-all duration-300"
              />
              <ChevronDown
                className={`w-4 h-4 text-white transition-transform duration-300 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Desktop Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-16 right-0 w-56 bg-gray-900 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <img
                          src={userImage?.photoURL || "/default-avatar.png"}
                          alt="User"
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-white font-semibold text-sm truncate max-w-[140px]">
                            {userImage?.displayName || "User"}
                          </p>
                          <p className="text-gray-400 text-xs truncate max-w-[140px]">
                            {userImage?.email || "user@example.com"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate("/browse");
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                      >
                        <User className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Browse Movies</span>
                      </button>

                      <button
                        onClick={() => {
                          navigate("/watchlist");
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                      >
                        <Bookmark className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">My Watchlist</span>
                        {watchlist.length > 0 && (
                          <span className="ml-auto bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                            {watchlist.length}
                          </span>
                        )}
                      </button>

                      <div className="my-2 border-t border-white/10" />

                      <button
                        onClick={() => {
                          handleSignOut();
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                      >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setShowMobileMenu(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gray-900 z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h2 className="text-white text-lg font-bold">Menu</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="text-white hover:text-cyan-400 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* User Profile Section */}
                <div className="px-4 py-4 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={userImage?.photoURL || "/default-avatar.png"}
                      alt="User"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {userImage?.displayName || "User"}
                      </p>
                      <p className="text-gray-400 text-xs truncate max-w-[180px]">
                        {userImage?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Search Section */}
                <div className="p-4 border-b border-white/10">
                  <div className="relative mb-3">
                    <input
                      ref={queryRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="w-full border border-white/30 text-white bg-white/10 backdrop-blur placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg px-4 py-3 pr-10 text-sm"
                    />
                    {inputValue && (
                      <button
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleClickSearch}
                    className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold rounded-lg transition-all duration-200 shadow-lg text-sm"
                  >
                    <Search className="h-4 w-4" />
                    Search Movies
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 py-2">
                  <button
                    onClick={() => {
                      navigate("/browse");
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-4 flex items-center gap-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                  >
                    <User className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Browse Movies</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/watchlist");
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-4 flex items-center gap-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                  >
                    <Bookmark className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">My Watchlist</span>
                    {watchlist.length > 0 && (
                      <span className="ml-auto bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                        {watchlist.length}
                      </span>
                    )}
                  </button>

                  <div className="my-2 mx-4 border-t border-white/10" />

                  <button
                    onClick={() => {
                      handleSignOut();
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-4 flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                  >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BrowseHeader;
