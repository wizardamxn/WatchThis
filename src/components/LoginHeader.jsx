import React from "react";
import { NETFLIX_LOGO_URL } from "../constants/URL";

const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-gradient-to-b from-black z-50 ">
      <img
        src={NETFLIX_LOGO_URL}
        className="m-4 ml-10 w-28"
      />
    </div>
  );
};

export default Header;
