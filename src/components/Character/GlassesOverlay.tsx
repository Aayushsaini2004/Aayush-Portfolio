import { useEffect, useState } from "react";
import "./styles/GlassesOverlay.css";

const GlassesOverlay = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Track mouse movement to slightly adjust glasses position
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="glasses-overlay"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Black Square Glasses SVG */}
      <svg
        viewBox="0 0 200 80"
        xmlns="http://www.w3.org/2000/svg"
        className="glasses-svg"
      >
        {/* Left Lens */}
        <rect
          x="10"
          y="15"
          width="75"
          height="50"
          rx="5"
          fill="rgba(0, 0, 0, 0.15)"
          stroke="#1a1a1a"
          strokeWidth="4"
        />
        {/* Right Lens */}
        <rect
          x="115"
          y="15"
          width="75"
          height="50"
          rx="5"
          fill="rgba(0, 0, 0, 0.15)"
          stroke="#1a1a1a"
          strokeWidth="4"
        />
        {/* Bridge */}
        <path
          d="M 85 35 Q 100 30 115 35"
          stroke="#1a1a1a"
          strokeWidth="4"
          fill="none"
        />
        {/* Left Temple */}
        <line
          x1="10"
          y1="30"
          x2="0"
          y2="25"
          stroke="#1a1a1a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Right Temple */}
        <line
          x1="190"
          y1="30"
          x2="200"
          y2="25"
          stroke="#1a1a1a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Reflection effect on left lens */}
        <line
          x1="20"
          y1="25"
          x2="45"
          y2="25"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Reflection effect on right lens */}
        <line
          x1="125"
          y1="25"
          x2="150"
          y2="25"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default GlassesOverlay;
