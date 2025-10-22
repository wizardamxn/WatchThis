import { useState, useEffect } from "react";

const ScrollButtons = ({ scrollRef }) => {
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Hide on tablets and below
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check scroll position to show/hide buttons
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    };

    handleScroll(); // Initial check
    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    
    // Responsive scroll distance
    const scrollAmount = window.innerWidth < 640 ? 300 : 
                        window.innerWidth < 1024 ? 600 : 
                        2000;
    
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Don't render buttons on mobile/tablet
  if (isMobile) return null;

  return (
    <>
      {/* Left Button - only show when scrolled */}
      {showLeftButton && (
        <button
          onClick={() => scroll("left")}
          className="absolute h-full w-[60px] lg:w-[80px] left-0 top-1/2 -translate-y-1/2 z-50 text-white 
                     bg-gradient-to-r from-black/80 via-black/40 to-transparent 
                     hover:from-black/90 hover:via-black/60 hover:to-transparent
                     backdrop-blur-sm transition-all duration-300 group
                     focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          onMouseEnter={() => setLeftHover(true)}
          onMouseLeave={() => setLeftHover(false)}
          aria-label="Scroll left"
        >
          <div className="flex items-center justify-center h-full">
            <div
              className={`
                transform transition-all duration-300 ease-out
                ${leftHover ? 'scale-110 -translate-x-1' : 'scale-100'}
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`
                  lg:w-10 lg:h-10 transition-all duration-300
                  ${leftHover ? 'drop-shadow-lg text-cyan-400' : 'text-white/80'}
                `}
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </div>
          </div>

          {/* Animated background glow on hover */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent 
              transition-opacity duration-300 rounded-r-lg
              ${leftHover ? 'opacity-100' : 'opacity-0'}
            `}
          ></div>
        </button>
      )}

      {/* Right Button - only show when more content available */}
      {showRightButton && (
        <button
          onClick={() => scroll("right")}
          className="absolute h-full w-[60px] lg:w-[80px] right-0 top-1/2 -translate-y-1/2 z-50 text-white 
                     bg-gradient-to-l from-black/80 via-black/40 to-transparent 
                     hover:from-black/90 hover:via-black/60 hover:to-transparent
                     backdrop-blur-sm transition-all duration-300 group
                     focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          onMouseEnter={() => setRightHover(true)}
          onMouseLeave={() => setRightHover(false)}
          aria-label="Scroll right"
        >
          <div className="flex items-center justify-center h-full">
            <div
              className={`
                transform transition-all duration-300 ease-out
                ${rightHover ? 'scale-110 translate-x-1' : 'scale-100'}
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`
                  lg:w-10 lg:h-10 transition-all duration-300
                  ${rightHover ? 'drop-shadow-lg text-cyan-400' : 'text-white/80'}
                `}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>

          {/* Animated background glow on hover */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-l from-cyan-500/20 via-blue-500/10 to-transparent 
              transition-opacity duration-300 rounded-l-lg
              ${rightHover ? 'opacity-100' : 'opacity-0'}
            `}
          ></div>
        </button>
      )}
    </>
  );
};

export default ScrollButtons;
