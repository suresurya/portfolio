import { useEffect, useRef } from "react";

const GreenCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const showCustomCursor = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  useEffect(() => {
    if (!showCustomCursor) return;

    const handleMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [showCustomCursor]);

  if (!showCustomCursor) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[200] pointer-events-none transition-transform duration-100 ease-out"
      style={{ transform: "translate(-100px, -100px)" }}
    >
      <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_2px_rgba(34,197,94,0.8)]" />
    </div>
  );
};

export default GreenCursor;
