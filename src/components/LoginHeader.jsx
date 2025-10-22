import React from "react";
import { NETFLIX_LOGO_URL } from "../constants/URL";

const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-gradient-to-b from-black z-50">
      <img
        src={NETFLIX_LOGO_URL}
        className="m-3 sm:m-4 ml-4 sm:ml-6 md:ml-8 lg:ml-10 w-20 sm:w-24 md:w-28"
        alt="Logo"
      />
    </div>
  );
};

export default Header;
