// import React, { useRef } from "react";
// import ScrollButtons from "./ScrollButtons";

// export const HorizontalScrollContainer = ({ children }) => {
//   const scrollRef = useRef(null);

//   return (
//     <div className="relative w-full">
//       <ScrollButtons scrollRef={scrollRef} />

//       <div
//         ref={scrollRef}
//         className="flex gap-4 overflow-x-scroll hide-scrollbar scroll-smooth"
//       >
//         {children}
//       </div>
//     </div>
//   );
// };


import React, { useRef } from "react";
import ScrollButtons from "./ScrollButtons";

export const HorizontalScrollContainer = ({ children }) => {
  const scrollRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Enhanced container with subtle background */}
      <div className="relative backdrop-blur-sm bg-black/10 rounded-xl border border-white/5 overflow-hidden">
        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <ScrollButtons scrollRef={scrollRef} />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll hide-scrollbar scroll-smooth p-4 relative z-10"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};