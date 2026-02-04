import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false); // For click state

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      // Check for clickable elements
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]');

      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Only render on desktop (rough check, can be improved with media query hook)
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  if (!isDesktop) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[10000] hidden md:block" // Higher Z-index
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isActive ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 20, // Snappier
          mass: 0.1,
        }}
      >
        <div className="w-full h-full bg-brand-neon rounded-full shadow-[0_0_10px_#00ff9d]"></div>
      </motion.div>

      {/* Trailing Crosshair / Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] hidden md:block mix-blend-screen"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 90 : 0,
          borderColor: isHovering ? "#bd00ff" : "#00ff9d", // Purple on hover, Neon Green default
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8, // Heavier/Slower trail
        }}
      >
        <div
          className={`w-full h-full border border-current rounded-full transition-colors duration-200 flex items-center justify-center`}
        >
          {/* Crosshair lines */}
          <div
            className={`absolute w-full h-[1px] bg-current opacity-30 ${isHovering ? "h-[2px] opacity-100" : ""}`}
          ></div>
          <div
            className={`absolute h-full w-[1px] bg-current opacity-30 ${isHovering ? "w-[2px] opacity-100" : ""}`}
          ></div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
