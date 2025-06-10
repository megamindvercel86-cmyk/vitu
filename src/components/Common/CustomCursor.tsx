import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CustomCursorProps {
  cursorVariant: string;
  cursorText: string;
  cursorBackground?: string;
}

const CustomCursor = ({ cursorVariant, cursorText , cursorBackground= "bg-customBrown" }: CustomCursorProps) => {
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
      className={`fixed pointer-events-none px-4 lg2:px-7  !w-auto flex items-center justify-center font-FreightNeoProNormal rounded-md text-2xl ${cursorBackground} text-white font-bold`}
      variants={{
        default: {
          opacity: 1,
          height: 0,
          width: 0,
          x: mousePosition.x,
          y: mousePosition.y,
        },
        project: {
          opacity: 1,
          height: 50,
          width: 170,
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
        },
      }}
      animate={cursorVariant}
      style={{
        top: 0,
        left: 0,
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      {cursorText}
    </motion.div>
  );
};

export default CustomCursor;
