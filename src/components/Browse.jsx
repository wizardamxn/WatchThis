import Header from "./Header";
import { signOut } from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { Landing } from "./Landing";

const Browse = () => {
  const userImage = useSelector((store) => store.user);
  const navigate = useNavigate();
  useNowPlayingMovies();

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
    <div className="w-full h-full ">
      <div className="flex justify-between fixed z-40 w-full">
        <div className="">
          <Header />
        </div>
        <div className="z-40 flex justify-center items-center cursor-pointer">
          <img
            src={userImage?.photoURL || "/default-avatar.png"}
            className="w-16 h-16 m-6 ml-10"
            onClick={handleSignOut}
            alt="User"
          />
        </div>
      </div>
      <div className="w-full h-full relative">
        <Landing />
      </div>
    </div>
  );
};

export default Browse;
