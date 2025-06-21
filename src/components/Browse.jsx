import React from "react";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Browse = () => {
  const userImage = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out failed", error);
      });
  };

  if (!userImage) {
    return <div className="text-white">Loading user...</div>;
  }

  return (
    <div className="w-full h-full flex justify-between">
      <div className="w-[90%]">
        <Header />
      </div>
      <div className="w-[10%] z-40 flex justify-center items-center cursor-pointer">
        <img
          src={userImage?.photoURL || "/default-avatar.png"}
          className="w-16 h-16 m-6 ml-10"
          onClick={handleSignOut}
          alt="User"
        />
      </div>
    </div>
  );
};

export default Browse;
