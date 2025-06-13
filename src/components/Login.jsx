import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSiginIn, setIsSignIn] = useState(true)
  const handleSignIn = () => {
    setIsSignIn(!isSiginIn);
  }
  return (
    <div className=' bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/6863f6e8-d419-414d-b5b9-7ef657e67ce4/web/IN-en-20250602-TRIFECTA-perspective_27a3fdfa-126f-4148-b153-55d60b51be6a_large.jpg")] w-screen h-screen flex justify-center items-center'>
      <Header/>
      <div className="flex  w-[450px] h-[600px] bg-black/83  flex-col box-border
">
        <h1 className="text-white text-3xl font-semibold mt-10 ml-10 mr-10 mb-5 relative left-[7%]">{isSiginIn ? "Sign In" : "Sign Up"}</h1>
        <form className="w-full h-full flex items-center flex-col">
            {!isSiginIn && <input
            type="text"
            placeholder="Full Name"
            className="p-2 m-4 text-white border-2 rounded-sm border-gray-200 w-[70%] h-[50px] "
          ></input>}
          <input
            type="text"
            placeholder="Email Address"
            className="p-2 m-4 text-white border-2 rounded-sm border-gray-200 w-[70%] h-[50px] "
          ></input>
          <input
            type="text"
            placeholder="Password"
            className="p-2 m-4 text-white border-2 rounded-sm border-gray-200 w-[70%] h-[50px]"
          ></input>
          <button className="flex p-1 m-2 justify-center rounded-sm w-[70%] font-bold text-white text-xl bg-[rgb(229,9,20)]
 ">{isSiginIn ? "Sign In" : "Sign Up"}</button>
<p className="text-gray-400 m-8">
  {isSiginIn
    ? (
      <>
        New to Netflix? <span className="text-white font-bold cursor-pointer" onClick={handleSignIn}>Sign up now.</span>
      </>
    )
    : (
      <>
        Already have an account? <span className="text-white font-bold cursor-pointer" onClick={handleSignIn}>Sign in here.</span>
      </>
    )
  }
</p>

        </form>

      </div>
    </div>
  );
};

export default Login;
