import React, { useRef } from "react";
import ScrollButtons from "./ScrollButtons";

export const HorizontalScrollContainer = ({ children }) => {
  const scrollRef = useRef(null);

  return (
    <div className="relative w-full">
      <ScrollButtons scrollRef={scrollRef} />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll hide-scrollbar scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
};


