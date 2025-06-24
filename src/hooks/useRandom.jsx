// useRandom.js
import { useRef } from "react";

const useRandom = (max = 20) => {
  const randomRef = useRef(Math.floor(Math.random() * max));
  return randomRef.current;
};

export default useRandom;
