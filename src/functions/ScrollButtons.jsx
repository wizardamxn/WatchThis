import { useState } from "react";

const ScrollButtons = ({ scrollRef }) => {
    const [click,setClick] = useState(false)
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -2000 : 2000,
      behavior: "smooth",
    });
  };


  return (
    <>
      <button
        onClick={() => scroll("left")}
        className="absolute h-full w-[60px] left-0 top-1/2 -translate-y-1/2 z-50  text-white px-2 py-1 rounded-md hover:bg-black/60"
        onMouseEnter={() => setClick(true)}
        onMouseLeave={() =>  setClick(false)}
      >
        {click && <svg xmlns="http://www.w3.org/2000/svg" width="32" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>}
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute h-full w-[60px] right-0 top-1/2 -translate-y-1/2 z-50  text-white px-2 py-1 rounded-lg hover:bg-black/60"
        onMouseEnter={() => setClick(true)}
        onMouseLeave={() => setClick(false)}
      >
         {click && <svg xmlns="http://www.w3.org/2000/svg" width="32" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>}
      </button>
    </>
  );
};


export default ScrollButtons