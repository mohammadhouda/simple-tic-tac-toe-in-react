import { useState } from "react";

function Squares({ value, onClick, currentPlayer }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <div
      className="border-2 border-black h-20 w-20 cursor-pointer bg-transparent flex justify-center items-center text-3xl font-semibold relative"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)} // Set hover to true when mouse enters
      onMouseLeave={() => setIsHovered(false)} // Set hover to false when mouse leaves
    >
      {value ||
        (isHovered && <span className="opacity-40">{currentPlayer}</span>)}
    </div>
  );
}

export default Squares;
