import { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/fireBase";
import LoginHeader from "./LoginHeader";
import { checkValidate } from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_LOGO } from "../constants/URL";

const Login = () => {
  const dispatch = useDispatch();
  const [isSiginIn, setIsSignIn] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    setIsSignIn(!isSiginIn);
    setErrorMessage(null);
  };
  
  const handlePasswordVis = () => {
    setIsPassword(!isPassword);
  };
  
  const handleButtonClick = async () => {
    const Message = checkValidate(email.current.value, password.current.value);
    setErrorMessage(Message);
    if (Message) return;
    
    setIsLoading(true);
    
    if (!isSiginIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://picsum.photos/200/300",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .then(() => {
              navigate("/browse");
            })
            .catch((error) => {
              navigate("/error");
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center relative px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: `url(${BG_LOGO})` }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <LoginHeader />
      
      <div className="relative z-10 flex rounded-xl sm:rounded-2xl w-full max-w-[95%] sm:max-w-md md:max-w-[420px] min-h-[500px] sm:min-h-[550px] md:min-h-[600px] bg-black/90 backdrop-blur-md flex-col shadow-2xl border border-gray-800/50">
        {/* Header */}
        <div className="px-5 sm:px-6 md:px-8 pt-6 sm:pt-7 md:pt-8 pb-4 sm:pb-5 md:pb-6">
          <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-wide">
            {isSiginIn ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1.5 sm:mt-2">
            {isSiginIn ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col px-5 sm:px-6 md:px-8 pb-6 sm:pb-7 md:pb-8 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Name Input (Sign Up only) */}
          {!isSiginIn && (
            <div className="relative">
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="relative">
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="w-full h-11 sm:h-12 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              ref={password}
              type={isPassword ? "password" : "text"}
              placeholder="Password"
              className="w-full h-11 sm:h-12 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
            />
            <button
              type="button"
              onClick={handlePasswordVis}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              {isPassword ? (
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              ) : (
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              )}
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
              <p className="text-red-400 text-xs sm:text-sm font-medium break-words">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleButtonClick}
            disabled={isLoading}
            className="w-full h-11 sm:h-12 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm sm:text-base">Loading...</span>
              </div>
            ) : (
              isSiginIn ? "Sign In" : "Sign Up"
            )}
          </button>

          {/* Toggle Sign In/Up */}
          <div className="text-center pt-3 sm:pt-4">
            <p className="text-gray-400 text-xs sm:text-sm">
              {isSiginIn ? (
                <>
                  New to WatchThis?{" "}
                  <button
                    type="button"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer transition-colors duration-200 underline decoration-transparent hover:decoration-cyan-300"
                    onClick={handleSignIn}
                  >
                    Sign up now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer transition-colors duration-200 underline decoration-transparent hover:decoration-cyan-300"
                    onClick={handleSignIn}
                  >
                    Sign in here
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
