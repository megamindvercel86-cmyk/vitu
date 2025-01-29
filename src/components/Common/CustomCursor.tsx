import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CustomCursorProps {
  cursorVariant: string;
  cursorText: string;
}

const CustomCursor = ({ cursorVariant, cursorText }: CustomCursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none flex items-center justify-center rounded-full text-black font-bold"
      variants={{
        default: { opacity: 1, height: 10, width: 10, x: mousePosition.x, y: mousePosition.y },
        project: { opacity: 1, height: 80, width: 80, x: mousePosition.x - 32, y: mousePosition.y - 32 },
      }}
      animate={cursorVariant}
      style={{ top: 0, left: 0, transform: "translate(-50%, -50%)", zIndex: 1000 }}
    >
      {cursorText}
    </motion.div>
  );
};

export default CustomCursor;