import { useState } from "react";

const ScrollButtons = ({ scrollRef }) => {
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -2000 : 2000,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Enhanced Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute h-full w-[80px] left-0 top-1/2 -translate-y-1/2 z-50 text-white 
                   bg-gradient-to-r from-black/80 via-black/40 to-transparent 
                   hover:from-black/90 hover:via-black/60 hover:to-transparent
                   backdrop-blur-sm transition-all duration-300 group"
        onMouseEnter={() => setLeftHover(true)}
        onMouseLeave={() => setLeftHover(false)}
      >
        <div className="flex items-center justify-center h-full">
          {/* Enhanced left arrow with smooth animation */}
          <div className={`
            transform transition-all duration-300 ease-out
            ${leftHover ? 'scale-110 -translate-x-1' : 'scale-100'}
          `}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`
                transition-all duration-300
                ${leftHover ? 'drop-shadow-lg text-blue-400' : 'text-white/80'}
              `}
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </div>
        </div>

        {/* Animated background glow on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent 
          transition-opacity duration-300 rounded-r-lg
          ${leftHover ? 'opacity-100' : 'opacity-0'}
        `}></div>
      </button>

      {/* Enhanced Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute h-full w-[80px] right-0 top-1/2 -translate-y-1/2 z-50 text-white 
                   bg-gradient-to-l from-black/80 via-black/40 to-transparent 
                   hover:from-black/90 hover:via-black/60 hover:to-transparent
                   backdrop-blur-sm transition-all duration-300 group"
        onMouseEnter={() => setRightHover(true)}
        onMouseLeave={() => setRightHover(false)}
      >
        <div className="flex items-center justify-center h-full">
          {/* Enhanced right arrow with smooth animation */}
          <div className={`
            transform transition-all duration-300 ease-out
            ${rightHover ? 'scale-110 translate-x-1' : 'scale-100'}
          `}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`
                transition-all duration-300
                ${rightHover ? 'drop-shadow-lg text-blue-400' : 'text-white/80'}
              `}
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>

        {/* Animated background glow on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-l from-blue-500/20 via-purple-500/10 to-transparent 
          transition-opacity duration-300 rounded-l-lg
          ${rightHover ? 'opacity-100' : 'opacity-0'}
        `}></div>
      </button>
    </>
  );
};

export default ScrollButtons;