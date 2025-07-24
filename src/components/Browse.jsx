import BrowseHeader from "./BrowseHeader";
import { useNavigate } from "react-router";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { Landing } from "./Landing";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GPTSearch from "./GPTSearch";

const Browse = () => {
  const navigate = useNavigate();
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const showGPTSearch = useSelector(store => store?.GPT?.isActive)

  return (
    <div className="w-full h-full ">

      <BrowseHeader />
      {showGPTSearch ? <GPTSearch/> : <Landing />}
      
    </div>
  );
};

export default Browse;