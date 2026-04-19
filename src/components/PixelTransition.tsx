import { useRef, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import "./PixelTransition.css";

type PixelTransitionProps = {
  firstContent: ReactNode;
  secondContent: ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  once?: boolean;
  aspectRatio?: string;
  className?: string;
  style?: CSSProperties;
};

function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = "100%",
  className = "",
  style = {},
}: PixelTransitionProps) {
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const [isActive, setIsActive] = useState(false);

  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;

    const canMatchMedia = typeof window.matchMedia === "function";
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (canMatchMedia && window.matchMedia("(pointer: coarse)").matches)
    );
  }, []);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = "";

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixelated-image-card__pixel");
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }

    return () => {
      animationRef.current?.kill();
      animationRef.current = null;
    };
  }, [gridSize, pixelColor]);

  const animatePixels = (activate: boolean) => {
    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll(".pixelated-image-card__pixel");
    setIsActive(activate);

    if (prefersReducedMotion || !pixels.length) {
      activeEl.style.opacity = activate ? "1" : "0";
      return;
    }

    animationRef.current?.kill();
    gsap.killTweensOf(pixels);

    gsap.set(pixels, { display: "block", opacity: 0 });

    const totalPixels = pixels.length;
    const staggerDuration = Math.max(animationStepDuration / totalPixels, 0.0025);

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(pixels, { display: "none", opacity: 0 });
      },
    });

    timeline.to(pixels, {
      opacity: 1,
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    });

    timeline.add(() => {
      activeEl.style.opacity = activate ? "1" : "0";
    });

    timeline.to(pixels, {
      opacity: 0,
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    });

    animationRef.current = timeline;
  };

  const handleEnter = () => {
    if (!isActive) animatePixels(true);
  };

  const handleLeave = () => {
    if (isActive && !once) animatePixels(false);
  };

  const handleClick = () => {
    if (!isActive) animatePixels(true);
    else if (isActive && !once) animatePixels(false);
  };

  return (
    <div
      className={`pixelated-image-card ${className}`.trim()}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      tabIndex={0}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default" aria-hidden={isActive}>
        {firstContent}
      </div>
      <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive}>
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}

export default PixelTransition;
