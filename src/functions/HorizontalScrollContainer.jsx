import React, { useRef } from "react";
import ScrollButtons from "./ScrollButtons";

export const HorizontalScrollContainer = ({ children }) => {
  const scrollRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Enhanced container with subtle background */}
      <div className="relative backdrop-blur-sm bg-black/10 rounded-lg sm:rounded-xl border border-white/5 overflow-hidden">
        {/* Ambient glow effect - desktop only */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <ScrollButtons scrollRef={scrollRef} />

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-scroll hide-scrollbar scroll-smooth p-2 sm:p-3 md:p-4 relative z-10"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
          }}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
