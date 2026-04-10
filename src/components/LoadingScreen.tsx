import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './theme-context';
import darkSignature from '../assets/ChatGPT Image Apr 10, 2026, 10_43_37 AM.png';
import lightSignature from '../assets/ChatGPT Image Apr 10, 2026, 10_44_15 AM.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

const SIGNATURE_WRITE_DURATION_MS = 1750; // Faster, more confident writing speed
const SUN_PAUSE_DURATION_MS = 600; // Slightly shorter pause for rhythm
const SUN_DRAW_DURATION_MS = 800;
const WRITE_DURATION_MS = SIGNATURE_WRITE_DURATION_MS + SUN_PAUSE_DURATION_MS + SUN_DRAW_DURATION_MS;
const HOLD_DURATION_MS = 300;
const EXIT_DURATION_MS = 800;

type Point = { x: number; y: number };

// Normalized points that follow the visual pen trajectory of the provided signature image.
const SIGNATURE_NAME_STROKES: Point[][] = [
  [
    { x: 0.14, y: 0.68 },
    { x: 0.19, y: 0.60 },
    { x: 0.24, y: 0.54 },
    { x: 0.29, y: 0.51 },
    { x: 0.33, y: 0.50 },
    { x: 0.30, y: 0.60 },
    { x: 0.24, y: 0.70 },
    { x: 0.18, y: 0.76 },
    { x: 0.14, y: 0.73 },
    { x: 0.19, y: 0.60 },
    { x: 0.28, y: 0.45 },
    { x: 0.34, y: 0.35 },
    { x: 0.28, y: 0.30 },
    { x: 0.22, y: 0.36 },
  ],
  [
    { x: 0.31, y: 0.50 },
    { x: 0.36, y: 0.58 },
    { x: 0.40, y: 0.55 },
    { x: 0.43, y: 0.50 },
    { x: 0.41, y: 0.55 },
  ],
  [
    { x: 0.43, y: 0.64 },
    { x: 0.49, y: 0.55 },
    { x: 0.55, y: 0.51 },
    { x: 0.60, y: 0.50 },
    { x: 0.58, y: 0.58 },
    { x: 0.52, y: 0.69 },
    { x: 0.46, y: 0.75 },
    { x: 0.42, y: 0.72 },
    { x: 0.47, y: 0.60 },
    { x: 0.56, y: 0.43 },
    { x: 0.62, y: 0.37 },
    { x: 0.58, y: 0.34 },
    { x: 0.53, y: 0.39 },
  ],
  [
    { x: 0.59, y: 0.52 },
    { x: 0.65, y: 0.58 },
    { x: 0.70, y: 0.55 },
    { x: 0.74, y: 0.50 },
    { x: 0.72, y: 0.56 },
    { x: 0.68, y: 0.70 },
    { x: 0.64, y: 0.80 },
    { x: 0.61, y: 0.82 },
    { x: 0.64, y: 0.66 },
    { x: 0.71, y: 0.54 },
    { x: 0.80, y: 0.50 },
    { x: 0.90, y: 0.50 },
  ],
];

const SUN_STROKES: Point[][] = [
  [
    { x: 0.646, y: 0.446 },
    { x: 0.654, y: 0.414 },
    { x: 0.670, y: 0.389 },
    { x: 0.695, y: 0.374 },
    { x: 0.720, y: 0.376 },
    { x: 0.742, y: 0.392 },
    { x: 0.752, y: 0.418 },
    { x: 0.754, y: 0.447 },
  ],
  [
    { x: 0.667, y: 0.355 },
    { x: 0.646, y: 0.314 },
  ],
  [
    { x: 0.700, y: 0.345 },
    { x: 0.703, y: 0.286 },
  ],
  [
    { x: 0.735, y: 0.352 },
    { x: 0.758, y: 0.299 },
  ],
  [
    { x: 0.760, y: 0.389 },
    { x: 0.806, y: 0.364 },
  ],
  [
    { x: 0.754, y: 0.447 },
    { x: 0.814, y: 0.447 },
  ],
];

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

// Natural handwriting flow: starts slightly slow, goes fast through the middle, and neatly tapers off.
const easeWrite = (t: number): number => {
  // easeInOutSine provides a very natural, pendulum-like motion for handwriting.
  return -(Math.cos(Math.PI * t) - 1) / 2;
};

const toPixelStrokes = (strokes: Point[][], width: number, height: number): Point[][] =>
  strokes.map((stroke) =>
    stroke.map((point) => ({
      x: point.x * width,
      y: point.y * height,
    })),
  );

const distance = (a: Point, b: Point): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.hypot(dx, dy);
};

const getStrokesLength = (strokes: Point[][]): number => {
  let total = 0;

  for (const stroke of strokes) {
    for (let i = 1; i < stroke.length; i += 1) {
      total += distance(stroke[i - 1], stroke[i]);
    }
  }

  return total;
};

const buildInkCanvas = (sourceImage: HTMLImageElement, width: number, height: number, darkTheme: boolean): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return canvas;
  }

  ctx.drawImage(sourceImage, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Isolate ink from textured background so only signature strokes are revealed.
    const alpha = darkTheme
      ? clamp((luminance - 145) / 85, 0, 1)
      : clamp((98 - luminance) / 70, 0, 1);

    data[index] = darkTheme ? 255 : 0;
    data[index + 1] = darkTheme ? 255 : 0;
    data[index + 2] = darkTheme ? 255 : 0;
    data[index + 3] = Math.round(alpha * 255);
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

const drawRevealMask = (
  context: CanvasRenderingContext2D,
  strokes: Point[][],
  targetLength: number,
  brushWidth: number,
  shouldClear: boolean,
): Point => {
  if (shouldClear) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }
  
  // Soft, wide brush for a smoother ink reveal without sharp blocky edges
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = '#ffffff';
  context.lineWidth = brushWidth * 1.5; // Slightly fatter brush to cover the text perfectly
  context.shadowColor = '#ffffff';
  context.shadowBlur = brushWidth * 0.5; // Soft reveal edge

  let remaining = targetLength;
  let lastPoint = strokes[0]?.[0] ?? { x: 0, y: 0 };

  for (const stroke of strokes) {
    if (stroke.length < 2 || remaining <= 0) {
      continue;
    }

    let strokeLength = 0;
    for (let i = 1; i < stroke.length; i += 1) {
      strokeLength += distance(stroke[i - 1], stroke[i]);
    }

    const drawUntil = Math.min(remaining, strokeLength);
    let consumed = 0;

    context.beginPath();
    context.moveTo(stroke[0].x, stroke[0].y);

    for (let i = 1; i < stroke.length; i += 1) {
      const previous = stroke[i - 1];
      const current = stroke[i];
      const segmentLength = distance(previous, current);

      if (consumed + segmentLength <= drawUntil) {
        context.lineTo(current.x, current.y);
        consumed += segmentLength;
        lastPoint = current;
      } else {
        const ratio = segmentLength > 0 ? (drawUntil - consumed) / segmentLength : 0;
        const partialPoint = {
          x: previous.x + (current.x - previous.x) * ratio,
          y: previous.y + (current.y - previous.y) * ratio,
        };

        context.lineTo(partialPoint.x, partialPoint.y);
        lastPoint = partialPoint;
        consumed = drawUntil;
        break;
      }
    }

    context.stroke();
    remaining -= drawUntil;
  }

  return lastPoint;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReadyToUnmount, setIsReadyToUnmount] = useState(false);
  const activeSignature = theme === 'dark' ? darkSignature : lightSignature;
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    // Start removing the splash screen after the signature drawing animation.
    const fadeTimer = setTimeout(() => {
      setIsReadyToUnmount(true);
    }, WRITE_DURATION_MS + HOLD_DURATION_MS);

    // Call onComplete after the fade out transition finishes
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, WRITE_DURATION_MS + HOLD_DURATION_MS + EXIT_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let cancelled = false;
    let animationFrameId = 0;

    const sourceImage = new Image();
    sourceImage.src = activeSignature;

    sourceImage.onload = () => {
      if (cancelled) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      canvas.width = width;
      canvas.height = height;

      const inkCanvas = buildInkCanvas(sourceImage, width, height, isDarkTheme);
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = width;
      maskCanvas.height = height;

      const revealCanvas = document.createElement('canvas');
      revealCanvas.width = width;
      revealCanvas.height = height;

      const maskContext = maskCanvas.getContext('2d');
      const revealContext = revealCanvas.getContext('2d');

      if (!maskContext || !revealContext) {
        return;
      }

      const nameStrokes = toPixelStrokes(SIGNATURE_NAME_STROKES, width, height);
      const sunStrokes = toPixelStrokes(SUN_STROKES, width, height);
      const nameLength = getStrokesLength(nameStrokes);
      const sunLength = getStrokesLength(sunStrokes);

      const brushWidth = Math.max(10 * dpr, width * 0.0205);

      let startTime: number | null = null;

      const render = (time: number) => {
        if (cancelled) {
          return;
        }

        if (startTime === null) {
          startTime = time; // Use sync frame time for flawless initial play
        }

        const elapsed = time - startTime;
        const signatureProgressRaw = clamp(elapsed / SIGNATURE_WRITE_DURATION_MS, 0, 1);
        const signatureProgress = easeWrite(signatureProgressRaw);
        const revealedNameLength = nameLength * signatureProgress;

        drawRevealMask(maskContext, nameStrokes, revealedNameLength, brushWidth, true);

        const sunStartTime = SIGNATURE_WRITE_DURATION_MS + SUN_PAUSE_DURATION_MS;
        const sunElapsed = elapsed - sunStartTime;

        if (sunElapsed > 0) {
          const sunProgressRaw = clamp(sunElapsed / SUN_DRAW_DURATION_MS, 0, 1);
          const sunProgress = easeWrite(sunProgressRaw);
          const revealedSunLength = sunLength * sunProgress;
          const sunBrushWidth = Math.max(3.4 * dpr, brushWidth * 0.34);

          drawRevealMask(maskContext, sunStrokes, revealedSunLength, sunBrushWidth, false);
        }

        revealContext.clearRect(0, 0, width, height);
        revealContext.drawImage(maskCanvas, 0, 0);
        revealContext.globalCompositeOperation = 'source-in';
        revealContext.drawImage(inkCanvas, 0, 0);
        revealContext.globalCompositeOperation = 'source-over';

        context.clearRect(0, 0, width, height);
        context.drawImage(revealCanvas, 0, 0);

        if (elapsed < WRITE_DURATION_MS) {
          animationFrameId = window.requestAnimationFrame(render);
        }
      };

      animationFrameId = window.requestAnimationFrame(render);
    };

    return () => {
      cancelled = true;
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeSignature, isDarkTheme]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] loader-screen ${
        isReadyToUnmount ? 'opacity-0 -translate-y-full blur-sm' : 'opacity-100 translate-y-0 blur-none'
      } ${theme === 'dark' ? 'loader-screen--dark' : 'loader-screen--light'}`}
    >
      <div className="signature-frame" aria-label="Sure Surya loading signature">
        <canvas ref={canvasRef} className="signature-canvas" aria-label="Sure Surya" />
      </div>
    </div>
  );
};

export default LoadingScreen;
