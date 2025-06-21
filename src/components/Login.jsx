import { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/fireBase";
import Header from "./Header";
import { checkValidate } from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/useSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isSiginIn, setIsSignIn] = useState(true);
  const [isPassword, setIsPassword] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleSignIn = () => {
    setIsSignIn(!isSiginIn);
  };
  const handlePasswordVis = () => {
    setIsPassword(!isPassword)
  }
  const handleButtonClick = () => {
    const Message = checkValidate(email.current.value, password.current.value);
    setErrorMessage(Message);
    if (Message) return;
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
              navigate("/error")
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
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
        });
    }
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  return (
    <div className=' bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/6863f6e8-d419-414d-b5b9-7ef657e67ce4/web/IN-en-20250602-TRIFECTA-perspective_27a3fdfa-126f-4148-b153-55d60b51be6a_large.jpg")] w-screen h-screen flex justify-center items-center'>
      <Header />
      <div
        className="flex  w-[450px] h-[600px] bg-black/83  flex-col box-border
"
      >
        <h1 className="text-white text-3xl font-semibold mt-10 ml-10 mr-10 mb-5 relative left-[7%]">
          {isSiginIn ? "Sign In" : "Sign Up"}
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full h-full flex items-center flex-col"
        >
          {!isSiginIn && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-2 px-4 m-4 text-white border border-gray-600 rounded-sm  w-[70%] h-[50px] "
            ></input>
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-2 px-4 m-4 text-white border rounded-sm border-gray-600 w-[70%] h-[50px] "
          ></input>
          <div className="relative border m-4 border-gray-600 rounded-sm w-[70%] h-[50px] flex justify-center items-center ">
      <input
        ref={password}
        type={isPassword ? "password" : "text"}
        placeholder="Password"
        className="w-full h-full bg-transparent text-white placeholder-gray-400 px-4 pr-10 focus:outline-none"
      />
      <p
        className="text-gray-400 hover:text-white absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg"
        onClick={handlePasswordVis}
      >
        {isPassword ? "👁️" : "🙈"}
      </p>
    </div>
          <p className="text-[rgb(229,9,20)] font-medium text-md">
            {errorMessage}
          </p>
          <button
            onClick={handleButtonClick}
            className="flex p-1 m-2 justify-center rounded-sm w-[70%] font-bold text-white text-xl bg-[rgb(229,9,20)]"
          >
            {isSiginIn ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-gray-400 m-8">
            {isSiginIn ? (
              <>
                New to Netflix?{" "}
                <span
                  className="text-white font-bold cursor-pointer"
                  onClick={handleSignIn}
                >
                  Sign up now.
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-white font-bold cursor-pointer"
                  onClick={handleSignIn}
                >
                  Sign in here.
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
