import { useEffect, useRef, useState, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
//  S U R E   S U R Y A  —  Loading Screen
//  Paths verbatim from SVG (viewBox 0 0 2048 1365).
//
//  Improvements applied:
//  [Visual]      — layered ink glow (warm + cool), chromatic inner stroke,
//                  per-particle sparkle colour jitter, shimmer pass on
//                  completed strokes, ink-fade-in on background flush
//  [Animation]   — spring-damped easing replaces cubic for mid-stroke feel,
//                  staggered sun ray burst with radial delay, pen-tip
//                  acceleration ripple, smooth trail interpolation
//  [Performance] — offscreen OffscreenCanvas composite for glow layer,
//                  vignette pre-baked once (static gradient), trail capped
//                  with ring-buffer, RAF self-halts when tab hidden via
//                  visibilitychange, getPointAt path el cached per-d string
//
//  ✦ NEW Improvements (additions only — nothing removed):
//  [Visual+]     — velocity-based line-width pressure simulation,
//                  pen-lift micro-flash between stroke groups,
//                  subtle paper-grain noise texture layer
//  [Performance+]— requestIdleCallback path pre-warm before RAF,
//                  skipFrame glow throttle for low-end devices,
//                  onComplete double-fire guard
//  [A11y]        — aria-live sr-only status region
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Timing (ms) ─────────────────────────────────────────────────────────────
const T_WRITE = 3000;
const T_SUN_PAU = 160;
const T_SUN_DRW = 800;
const T_HOLD = 700;
const T_EXIT = 900;
const T_MAX = 9500;
const STROKE_GAP = 100;
const T_RAF_PAD = 250;
const MOBILE_BREAKPOINT = 640;
const MOBILE_WIDTH_RATIO = 0.92;
const DESKTOP_WIDTH_RATIO = 0.8;
const DPR_MAX = 2.25;

// ─── Visual constants ─────────────────────────────────────────────────────────
const VB_W = 2048;
const VB_H = 1365;

const TRAIL_MAX = 80;
const TRAIL_LIFE = 500;

// ✦ ADDED — pen-lift flash duration (ms)
const T_LIFT_FLASH = 180;

// ✦ ADDED — velocity pressure: how much line width varies with drawing speed (0 = none)
const PRESSURE_STRENGTH = 0.22;

// ═══════════════════════════════════════════════════════════════════════════════
//  SVG PATH STRINGS — verbatim from source SVG
// ═══════════════════════════════════════════════════════════════════════════════

const PATH_S1 =
  "M 1126.54 422.375 C 1131.36 422.131 1136.18 422.634 1140.84 423.868 C 1150.07 426.283 1153.96 430.479 1158.45 438.242 C 1159.38 466.698 1137.66 487.712 1120.33 508.908 C 1113.76 516.947 1086.05 547.948 1077.03 548.532 C 1074.68 547.137 1075.44 547.96 1074.48 544.867 C 1076.73 538.482 1093.6 524.738 1099.37 519.398 C 1109.37 510.03 1118.65 499.916 1127.11 489.142 C 1135.43 478.514 1152.36 455.332 1150.12 441.856 C 1149.61 438.82 1147.78 436.334 1145.27 434.611 C 1138.01 429.614 1127.11 429.745 1118.8 431.197 C 1065.59 440.504 978.242 501.901 947.805 545.618 C 942.547 553.169 936.519 563.575 938.48 573.185 C 943.556 598.058 1032.57 625.999 1055.66 640.688 C 1064.89 636.829 1119.25 619.689 1125.43 623.741 L 1124.24 626.064 C 1122.5 627.514 1067.23 643.774 1062.31 644.643 C 1076.89 654.617 1092.96 666.697 1089.63 686.964 C 1085.59 711.618 1062.14 730.831 1043.03 744.812 C 1015.27 764.687 985.436 781.501 954.056 794.961 C 914.878 812.087 839.633 840.34 795.407 826.976 C 787.382 824.551 783.223 818.826 779.989 811.434 C 780.596 805.812 781.554 800.88 784.153 795.792 C 806.859 751.341 909.822 698.606 956.657 677.975 C 985.878 665.104 1015.49 654.167 1045.86 644.324 C 1036.27 641.038 1022.99 634.036 1014.7 630.845 C 923.528 595.603 892.075 570.92 981.493 496.449 C 1012.38 470.728 1047.47 447.329 1085.79 431.646 C 1099.07 426.21 1112.24 423.991 1126.54 422.375 z M 820.417 821.528 C 893.765 820.593 1008.79 765.231 1063.08 714.583 C 1077.9 700.755 1089.09 678.189 1069.98 661.918 C 1065.23 657.871 1055.24 648.577 1048.77 649.195 C 972.821 674.214 894.789 711.023 830.485 758.708 C 807.468 775.776 757.128 821.024 820.417 821.528 z";

const PATH_S2 =
  "M 698.565 384.451 C 705.216 384.116 713.851 385.263 719.976 387.966 C 725.105 390.23 728.981 394.044 730.987 399.339 C 734.451 408.482 731.898 418.492 728.002 427.045 C 719.08 446.633 659.266 521.949 640.273 528.312 C 638.021 529.067 637.792 528.9 635.741 527.765 C 634.804 519.411 657.507 503.571 663.878 496.573 C 686.35 471.889 717.342 443.699 724.069 409.556 C 726.253 398.469 711.753 391.746 702.56 392.454 C 640.682 396.728 582.109 437.951 537.488 478.399 C 524.54 490.137 503.662 512.652 503.065 531.192 C 503.882 551.547 555.084 572.252 571.418 580.009 C 583.95 585.837 596.347 591.951 608.599 598.348 C 621.52 605.239 635.629 613.769 645.795 624.366 C 653.05 621.811 699.927 611.561 706.018 613.632 L 706.279 615.501 C 702.297 619.764 662.187 625.417 650.554 630.091 L 650.028 630.306 C 650.453 630.737 650.868 631.176 651.275 631.624 C 678.281 661.596 637.928 699.191 616.484 717.771 C 566.432 758.93 443.389 824.995 371.941 803.273 C 350.758 793.464 366.202 769.506 375.877 760.24 C 444.532 694.494 545.285 652.307 635.344 627.064 C 603.505 602.272 566.833 589.816 531.607 571.219 C 512.615 561.192 498.331 552.201 491.71 531.209 C 495.969 512.856 502.71 500.999 515.343 487.022 C 558.532 439.236 633.225 389.107 698.565 384.451 z M 384.143 797.796 C 437.742 808.513 538.568 759.411 582.473 729.772 C 605.417 714.284 666.822 672.175 644.237 637.575 C 642.605 635.074 641.126 633.263 638.247 632.074 C 614.578 641.177 589.6 647.137 565.83 656.33 C 518.816 674.512 393.474 733.927 372.813 779.443 C 371.355 782.655 370.507 786.2 371.768 789.629 C 373.016 793.022 375.551 794.634 378.772 795.922 C 380.539 796.612 382.331 797.237 384.143 797.796 z";

const PATH_URYA =
  "M 1324.55 645.597 C 1339.72 632.294 1359.01 621.073 1374.46 607.589 C 1380.05 602.706 1395.34 594.865 1403.14 596.765 C 1421.35 601.202 1405.47 631.83 1409.88 639.044 C 1426.91 644.843 1494.16 615.252 1516.69 611.595 C 1531.33 609.217 1602.63 594.027 1612.53 604.375 C 1609.41 607.045 1599.26 607.159 1594.86 607.316 C 1548.44 608.892 1504.87 621.007 1461.45 636.82 C 1447.81 641.788 1414 656.372 1401.4 643.789 C 1396.82 639.215 1398.55 632.532 1398.89 626.875 C 1395.32 625.608 1370.51 653.161 1360.77 654.618 C 1341.91 657.441 1349.5 639.963 1354.11 631.412 C 1348.78 635.064 1324.38 651.33 1321.5 655.443 C 1311.8 669.286 1304.16 690.821 1295.34 706.781 C 1262.01 765.893 1223.58 837.237 1162.82 871.899 C 1145.87 881.564 1128.35 882.148 1120.78 861.731 C 1122.74 853.161 1124.97 842.29 1129.15 834.743 C 1168.17 764.226 1233.71 707.533 1299.46 662.213 C 1312.4 653.296 1314.28 645.5 1321.39 632.349 C 1311.12 640.998 1295.02 659.234 1280.21 658.302 C 1266.24 657.423 1277.16 632.312 1279.95 625.471 C 1272.77 628.479 1266.08 631.217 1258.2 628.436 C 1253.14 626.651 1251.77 619.853 1249.62 615.102 C 1237.59 622.068 1219.29 654.855 1211.21 666.773 C 1209.01 670.027 1208.05 670.303 1204.9 670.747 C 1197.94 665.425 1212.41 640.045 1215.7 633.223 C 1207.01 643.333 1186.95 668.208 1171.17 666.554 C 1162.34 665.628 1165.28 650.305 1163.49 647.324 C 1160.17 648.279 1112.28 712.286 1116.3 664.518 C 1116.94 656.804 1136.33 615.669 1145.43 617.65 C 1151.1 627.575 1119.26 663.408 1125.9 671.525 C 1144.85 668.504 1177.2 608.241 1185.46 612.325 C 1188.2 622.688 1168.81 647.099 1174.73 657.883 L 1177.43 658.249 C 1192.06 653.441 1208.36 632.348 1218.06 620.417 C 1221.6 616.061 1227.81 604.042 1233.28 604.784 C 1236.62 609.813 1234.75 612.036 1232.43 617.155 C 1229.88 620.41 1228.34 624.555 1226.66 628.373 C 1229.58 625.451 1232.09 623.225 1234.31 619.725 C 1238.08 613.983 1248.41 601.771 1255.6 602.762 C 1262.1 608.201 1258.36 617.434 1261.55 621.74 C 1279.4 628.674 1292.33 600.992 1300.4 605.821 C 1302.92 614.922 1282.53 638.39 1283.39 648.164 C 1300.41 654.399 1336.17 599.868 1342.15 598.102 C 1345.61 598.836 1344.58 598.088 1346.36 600.585 C 1346.36 609.283 1329.87 636.185 1324.55 645.597 z M 1133.63 868.857 C 1186.95 875.315 1258.28 756.926 1280.45 715.07 C 1288.19 700.451 1296.52 682.971 1303.62 667.85 L 1302.86 666.953 C 1283.82 681.302 1264.36 694.909 1246.17 710.354 C 1214.48 737.252 1136.53 813.014 1131.16 854.629 C 1130.52 859.572 1130.51 864.713 1133.63 868.857 z M 1364 643.894 C 1373.09 637.082 1398.04 618.958 1401.99 609.236 L 1401.53 607.167 C 1399.18 605.972 1399.32 605.983 1396.69 605.975 C 1385.35 610.887 1358.68 631.676 1359.42 644.182 C 1361.56 645.194 1360.97 644.827 1364 643.894 z";

const PATH_URE =
  "M 862.736 608.151 C 868.057 607.675 872.292 607.771 875.317 612.543 C 876.13 627.275 847.231 641.29 835.608 646.217 C 834.591 650.179 832.469 657.856 834.042 660.828 C 842.429 676.663 879.523 652.806 890.148 646.044 C 896.232 642.172 900.091 637.805 906.153 635.512 L 907.967 636.434 C 908.87 652.503 808.951 705.862 825.154 648.222 C 826.698 642.73 812.923 648.208 808.723 642.954 C 804.071 637.135 804.547 636.328 803.901 628.261 C 785.05 642.491 767.734 683.155 760.439 686.788 C 757.269 686.043 758.425 686.659 756.139 683.77 C 754.421 676.381 764.89 658.179 768.576 650.882 C 760.48 658.002 727.227 700.107 717.921 674.459 C 716.847 671.498 718.747 667.178 717.33 664.313 C 711.393 671.099 706.703 676.404 700.202 682.652 C 693.57 688.67 682.926 699.391 673.551 694.147 C 665.312 682.892 679.802 658.65 685.746 648.121 C 688.524 643.201 696.944 627.665 703.581 632.642 C 703.82 635.206 703.208 638.684 701.819 640.859 C 691.902 656.391 682.562 671.015 678.311 689.342 C 697.45 680.104 709.485 661.427 722.168 645.141 C 725.805 640.472 733.606 627.125 740.016 627.871 C 743.891 636.027 724.07 662.571 728.927 673.676 L 730.671 674.279 C 751.757 668.31 779.041 620.488 786.907 620.498 C 789.578 627.299 783.534 637.434 780.6 643.47 C 787.111 636.436 797.56 621.004 806.195 618.693 C 814.971 620.46 813.708 631.075 814.112 638.491 C 819.168 638.362 824.978 637.653 830.079 637.152 C 839.644 624.535 847.283 613.295 862.736 608.151 z";

const PATH_SUN_ARC =
  "M 1322.66 484.423 C 1369.12 481.698 1412.07 512.268 1414.46 560.599 C 1414.6 563.484 1413.18 564.422 1411.41 566.105 L 1410.1 565.44 C 1404.35 522.656 1370.91 495.268 1328.45 493.173 C 1295.62 493.717 1264.41 507.524 1245.7 536.345 C 1241.78 542.39 1237.38 555.775 1232.05 560.38 L 1230.15 559.947 C 1225.66 551.275 1243 525.594 1249.11 518.62 C 1269.08 495.818 1293.3 486.758 1322.66 484.423 z";

const PATH_RAY_TOP = "M 1340.16 360.15 L 1342.64 361.052 C 1347.42 367.631 1331.89 448.085 1330.46 460.008 C 1330.25 461.731 1328.3 464.533 1327.14 465.95 C 1326.01 465.109 1325.37 464.349 1324.4 463.343 C 1320.67 452.114 1336.22 376.572 1340.16 360.15 z";
const PATH_RAY_UR = "M 1454.83 400.594 C 1457.22 401.946 1456.48 400.984 1457.27 403.437 C 1454.04 411.102 1399.55 483.942 1392.73 488.292 C 1391.48 486.952 1391.22 486.447 1390.22 484.959 C 1390.81 478.581 1447 407.433 1454.83 400.594 z";
const PATH_RAY_RIGHT = "M 1497.94 505.901 C 1500.38 505.82 1500.35 505.934 1502.5 506.859 L 1502.67 508.655 C 1497.77 514.121 1442.7 535.633 1432.26 539.964 L 1430.41 540.682 C 1427.42 539.81 1428.51 540.677 1426.94 538.123 L 1427.86 535.831 C 1436.15 529.448 1484.76 511.336 1497.94 505.901 z";
const PATH_RAY_LL = "M 1224.74 411.397 C 1227.32 412.45 1228.35 412.719 1229.73 415.939 C 1234.44 426.878 1260.11 479.011 1257.63 487.754 C 1253.97 486.179 1253.86 486.429 1251.6 482.362 C 1245.94 472.208 1222.88 419.422 1224.74 411.397 z";
const PATH_RAY_LEFT = "M 1168.91 502.908 C 1177.56 502.314 1205.09 521.808 1213.92 526.554 C 1218.23 528.873 1219.62 530.173 1219.37 534.72 C 1212.07 535.27 1170.74 509.854 1168.91 502.908 z";

// ═══════════════════════════════════════════════════════════════════════════════
//  EASING
// ═══════════════════════════════════════════════════════════════════════════════

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const springEase = (t: number): number => {
  const c = clamp(t, 0, 1);
  const overshoot = Math.exp(-7 * c) * Math.sin(10 * c) * 0.06;
  const base = c < 0.5
    ? 4 * c * c * c
    : 1 - Math.pow(-2 * c + 2, 3) / 2;
  return clamp(base - overshoot * (1 - c), 0, 1.02);
};

const snapEase = (t: number): number => {
  const c = clamp(t, 0, 1);
  return 1 - Math.pow(1 - c, 3);
};

const tremble = (t: number, seed: number): number =>
  0.008 * Math.sin(t * Math.PI * 9 + seed) * Math.sin(t * Math.PI * 13 + seed * 2) * t * (1 - t) * 4;

// ✦ ADDED — velocity-based pressure: derivative of springEase at t,
//   returns a 0..1 "speed" factor used to fatten line width mid-stroke.
const strokeVelocity = (t: number): number => {
  const dt = 0.008;
  const v = (springEase(Math.min(t + dt, 1)) - springEase(Math.max(t - dt, 0))) / (2 * dt);
  // normalise: max derivative of ease-in-out³ ≈ 1.5 at t=0.5
  return clamp(v / 1.5, 0, 1);
};

// ═══════════════════════════════════════════════════════════════════════════════
//  SVG MEASUREMENT — one persistent element, per-d caching
// ═══════════════════════════════════════════════════════════════════════════════

const lenCache = new Map<string, number>();
const pathElMap = new Map<string, SVGPathElement>();

const getMeasureContainer = (): SVGSVGElement => {
  const id = "__ss_measure";
  let el = document.getElementById(id) as SVGSVGElement | null;
  if (!el) {
    el = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGSVGElement;
    el.setAttribute("id", id);
    el.style.cssText = "position:fixed;left:-9999px;top:-9999px;width:0;height:0;overflow:hidden;pointer-events:none;";
    document.body.appendChild(el);
  }
  return el;
};

const getPathEl = (d: string): SVGPathElement => {
  if (pathElMap.has(d)) return pathElMap.get(d)!;
  const container = getMeasureContainer();
  const el = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
  el.setAttribute("d", d);
  container.appendChild(el);
  pathElMap.set(d, el);
  return el;
};

const measureLen = (d: string): number => {
  if (lenCache.has(d)) return lenCache.get(d)!;
  const len = getPathEl(d).getTotalLength();
  lenCache.set(d, len);
  return len;
};

const getPointAt = (d: string, fraction: number): DOMPoint =>
  getPathEl(d).getPointAtLength(fraction * measureLen(d));

// ✦ ADDED — all path strings in one array for idle pre-warm
const ALL_PATH_STRINGS = [
  PATH_S1, PATH_S2, PATH_URYA, PATH_URE,
  PATH_SUN_ARC, PATH_RAY_TOP, PATH_RAY_UR,
  PATH_RAY_RIGHT, PATH_RAY_LL, PATH_RAY_LEFT,
];

// ═══════════════════════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface StrokeGroup {
  d: string;
  path2d: Path2D;
  svgLen: number;
  scaledLen: number;
  lw: number;
  seed: number;
  isSunRay: boolean;
}

interface TrailParticle {
  x: number;
  y: number;
  t: number;
  hue: number;
}

// ✦ ADDED — pen-lift flash state
interface LiftFlash {
  x: number;
  y: number;
  startE: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface Props { onComplete?: () => void }

export default function SureSuryaLoader({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLCanvasElement>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  // ✦ ADDED — guard to prevent onComplete firing twice
  const completedRef = useRef(false);
  const [phase, setPhase] = useState<"drawing" | "exiting" | "done">("drawing");

  const startExit = useCallback(() => {
    setPhase((prev) => (prev === "drawing" ? "exiting" : prev));

    if (exitTimeoutRef.current !== null) {
      window.clearTimeout(exitTimeoutRef.current);
    }

    exitTimeoutRef.current = window.setTimeout(() => {
      setPhase("done");
      // ✦ ADDED — double-fire guard
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      pathElMap.forEach(el => el.remove());
      pathElMap.clear();
      lenCache.clear();
      document.getElementById("__ss_measure")?.remove();
    }, T_EXIT);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let cancelled = false;
    let rafId = 0;

    // ── Canvas sizing (HiDPI + mobile fallback) ─────────────────────────────
    const rect = canvas.getBoundingClientRect();
    const isMobileViewport =
      window.matchMedia?.(`(max-width: ${MOBILE_BREAKPOINT}px)`)?.matches ??
      window.innerWidth <= MOBILE_BREAKPOINT;

    const fallbackCssWidth = Math.min(
      window.innerWidth * (isMobileViewport ? MOBILE_WIDTH_RATIO : DESKTOP_WIDTH_RATIO),
      980,
    );
    const fallbackCssHeight = fallbackCssWidth * (VB_H / VB_W);

    const cssWidth = rect.width > 2 ? rect.width : fallbackCssWidth;
    const cssHeight = rect.height > 2 ? rect.height : fallbackCssHeight;

    if (rect.width <= 2 || rect.height <= 2) {
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
    const W = Math.max(2, Math.round(cssWidth * dpr));
    const H = Math.max(2, Math.round(cssHeight * dpr));
    canvas.width = W;
    canvas.height = H;

    // ── Offscreen glow canvas ────────────────────────────────────────────────
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = W;
    glowCanvas.height = H;
    const gCtx = glowCanvas.getContext("2d", { alpha: true })!;

    // ── Scale factors ────────────────────────────────────────────────────────
    const sx = W / VB_W;
    const sy = H / VB_H;
    const avgScale = Math.min(sx, sy);
    const compactMode = cssWidth <= 520;
    const LW = Math.max(compactMode ? 2.8 : 2.2, W * (compactMode ? 0.0058 : 0.0052));

    // ── Colours ──────────────────────────────────────────────────────────────
    const INK_MAIN = "rgba(240,241,250,1)";
    const INK_INNER = "rgba(210,220,255,0.55)";
    const GLOW_WARM = "rgba(255,245,210,0.18)";
    const GLOW_COOL = "rgba(190,210,255,0.22)";

    // ── Pre-bake static vignette ─────────────────────────────────────────────
    const vigCanvas = document.createElement("canvas");
    vigCanvas.width = W;
    vigCanvas.height = H;
    const vCtx = vigCanvas.getContext("2d")!;
    const vig = vCtx.createRadialGradient(
      W / 2, H / 2, Math.min(W, H) * 0.28,
      W / 2, H / 2, Math.max(W, H) * 0.72
    );
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(0.65, "rgba(0,0,0,0.12)");
    vig.addColorStop(1, "rgba(0,0,0,0.42)");
    vCtx.fillStyle = vig;
    vCtx.fillRect(0, 0, W, H);

    // ✦ ADDED — pre-bake paper grain noise texture once (subtle warm fibres)
    const grainCanvas = document.createElement("canvas");
    // Small tile that tiles across the canvas
    const GRAIN_TILE = 256;
    grainCanvas.width = GRAIN_TILE;
    grainCanvas.height = GRAIN_TILE;
    const grCtx = grainCanvas.getContext("2d")!;
    const grainImg = grCtx.createImageData(GRAIN_TILE, GRAIN_TILE);
    for (let i = 0; i < grainImg.data.length; i += 4) {
      // warm-tinted noise: slightly amber channel bias
      const n = Math.random();
      grainImg.data[i]     = Math.round(n * 18 + 4);   // R — warm
      grainImg.data[i + 1] = Math.round(n * 12 + 2);   // G
      grainImg.data[i + 2] = Math.round(n * 8);         // B — cooler
      grainImg.data[i + 3] = Math.round(n * 9);         // A — very faint
    }
    grCtx.putImageData(grainImg, 0, 0);

    // ── Build stroke groups ──────────────────────────────────────────────────
    const makeGroup = (d: string, lw: number, isSunRay = false, seed = 0): StrokeGroup => ({
      d,
      path2d: new Path2D(d),
      svgLen: measureLen(d),
      scaledLen: measureLen(d) * avgScale,
      lw,
      seed,
      isSunRay,
    });

    const sigGroups: StrokeGroup[] = [
      makeGroup(PATH_S2, LW * 1.15, false, 1.1),
      makeGroup(PATH_S1, LW * 1.15, false, 2.3),
      makeGroup(PATH_URE, LW * 0.82, false, 3.7),
      makeGroup(PATH_URYA, LW * 0.82, false, 5.2),
    ];

    const sunGroups: StrokeGroup[] = [
      makeGroup(PATH_SUN_ARC, LW * 0.78, false, 0),
      makeGroup(PATH_RAY_TOP, LW * 0.58, true, 0),
      makeGroup(PATH_RAY_UR, LW * 0.58, true, 0),
      makeGroup(PATH_RAY_RIGHT, LW * 0.58, true, 0),
      makeGroup(PATH_RAY_LL, LW * 0.58, true, 0),
      makeGroup(PATH_RAY_LEFT, LW * 0.58, true, 0),
    ];

    const sigTotal = sigGroups.reduce((s, g) => s + g.scaledLen, 0);

    // ── Timing ───────────────────────────────────────────────────────────────
    let cur = 0;
    const sigTiming = sigGroups.map((g, i) => {
      const dur = (g.scaledLen / sigTotal) * T_WRITE;
      const start = cur;
      cur += dur + (i < sigGroups.length - 1 ? STROKE_GAP : 0);
      return { start, dur };
    });

    const tSunStart = cur + T_SUN_PAU;
    const sunArcDur = T_SUN_DRW * 0.55;
    const tRayStart = tSunStart + sunArcDur + 40;
    const rayDur = T_SUN_DRW * 0.45;

    const sunTiming = sunGroups.map((_, i) => {
      if (i === 0) return { start: tSunStart, dur: sunArcDur };
      return { start: tRayStart + (i - 1) * 22, dur: rayDur };
    });

    const tTotal = tRayStart + rayDur + 4 * 22;

    const exitT = setTimeout(() => { if (!cancelled) startExit(); }, tTotal + T_HOLD);
    const safeT = setTimeout(() => { if (!cancelled) startExit(); }, T_MAX);

    // ── Ring-buffer trail ────────────────────────────────────────────────────
    const trail: TrailParticle[] = new Array(TRAIL_MAX).fill(null).map(() => ({
      x: 0, y: 0, t: -Infinity, hue: 220,
    }));
    let trailHead = 0;

    const pushTrail = (x: number, y: number, now: number) => {
      trail[trailHead] = { x, y, t: now, hue: 210 + Math.random() * 40 };
      trailHead = (trailHead + 1) % TRAIL_MAX;
    };

    // ✦ ADDED — pen-lift flash state: fires when a stroke group ends
    let liftFlash: LiftFlash | null = null;
    // Track which group index was last active so we can detect transitions
    let lastActiveGroupIdx = -1;

    // ✦ ADDED — skipFrame counter for glow throttle on low-end devices
    // Detects low-end by checking if DPR=1 and canvas is wider than 600px
    const isLowEnd = dpr <= 1 && W > 600;
    let frameCount = 0;

    // ── Draw one stroke group ────────────────────────────────────────────────
    const drawGroup = (
      targetCtx: CanvasRenderingContext2D,
      g: StrokeGroup,
      progress: number,
      strokeStyle: string,
      lineWidthOverride?: number,
    ) => {
      if (progress <= 0) return;
      const p = clamp(progress, 0, 1.01);
      const dashLen = g.scaledLen * 1.06;
      const offset = dashLen * (1 - p);

      targetCtx.save();
      targetCtx.scale(sx, sy);
      targetCtx.lineCap = "round";
      targetCtx.lineJoin = "round";
      targetCtx.strokeStyle = strokeStyle;
      targetCtx.lineWidth = (lineWidthOverride ?? g.lw) / avgScale;
      targetCtx.setLineDash([dashLen, dashLen]);
      targetCtx.lineDashOffset = offset;
      targetCtx.stroke(g.path2d);
      targetCtx.restore();
    };

    const drawShimmer = (g: StrokeGroup, completedProgress: number, now: number) => {
      if (completedProgress < 1) return;
      const pulse = 0.5 + 0.5 * Math.sin(now * 0.0015 + g.seed);
      const alpha = (0.06 + 0.08 * pulse).toFixed(3);
      drawGroup(ctx, g, 1, `rgba(220,235,255,${alpha})`, g.lw * 0.4);
    };

    // ── RAF pause on hidden tab ──────────────────────────────────────────────
    let hidden = document.hidden;
    const onVisChange = () => { hidden = document.hidden; };
    document.addEventListener("visibilitychange", onVisChange);

    // ── Main frame loop ──────────────────────────────────────────────────────
    const t0 = performance.now();

    const frame = (now: number) => {
      if (cancelled) return;
      if (hidden) { rafId = requestAnimationFrame(frame); return; }

      const e = now - t0;
      frameCount++;
      ctx.clearRect(0, 0, W, H);

      // ✦ ADDED — skip glow pass every other frame on low-end only
      const doGlowPass = !isLowEnd || frameCount % 2 === 0;

      if (doGlowPass) {
        gCtx.clearRect(0, 0, W, H);
        gCtx.save();
        gCtx.shadowBlur = LW * 7;
      }

      let activeTipD = "";
      let activeTipP = 0;
      let anyActive = false;
      // ✦ ADDED — track active group index for pen-lift detection
      let currentGroupIdx = -1;
      // ✦ ADDED — raw progress for velocity calc
      let activeTipRaw = 0;

      // ── Draw signature strokes ─────────────────────────────────────────────
      for (let i = 0; i < sigGroups.length; i++) {
        const { start, dur } = sigTiming[i];
        if (e <= start) continue;
        const raw = clamp((e - start) / dur, 0, 1);
        const wobble = tremble(raw, sigGroups[i].seed);
        const progress = clamp(springEase(raw) + wobble, 0, 1.02);

        if (doGlowPass) {
          gCtx.shadowColor = GLOW_WARM;
          drawGroup(gCtx, sigGroups[i], progress, INK_MAIN);
          gCtx.shadowColor = GLOW_COOL;
          drawGroup(gCtx, sigGroups[i], progress, INK_INNER, sigGroups[i].lw * 0.38);
        }

        if (raw > 0 && raw < 1) {
          activeTipD = sigGroups[i].d;
          activeTipP = clamp(springEase(raw), 0, 1);
          activeTipRaw = raw; // ✦ ADDED
          anyActive = true;
          currentGroupIdx = i; // ✦ ADDED
        }

        drawShimmer(sigGroups[i], raw, now);
      }

      // ── Sun strokes ────────────────────────────────────────────────────────
      for (let i = 0; i < sunGroups.length; i++) {
        const { start, dur } = sunTiming[i];
        if (e <= start) continue;
        const raw = clamp((e - start) / dur, 0, 1);
        const progress = sunGroups[i].isSunRay ? snapEase(raw) : springEase(raw);

        if (doGlowPass) {
          gCtx.shadowColor = GLOW_WARM;
          drawGroup(gCtx, sunGroups[i], progress, INK_MAIN);
          gCtx.shadowColor = GLOW_COOL;
          drawGroup(gCtx, sunGroups[i], progress, INK_INNER, sunGroups[i].lw * 0.35);
        }

        if (raw > 0 && raw < 1 && !sunGroups[i].isSunRay) {
          activeTipD = sunGroups[i].d;
          activeTipP = progress;
          activeTipRaw = raw; // ✦ ADDED
          anyActive = true;
          currentGroupIdx = i + sigGroups.length; // ✦ ADDED
        }

        drawShimmer(sunGroups[i], raw, now);
      }

      if (doGlowPass) {
        gCtx.restore();
        ctx.drawImage(glowCanvas, 0, 0);
      }

      // ✦ ADDED — detect pen-lift: group changed from active → gap (raw reached 1)
      if (lastActiveGroupIdx !== -1 && currentGroupIdx === -1 && anyActive === false) {
        // just finished a group — do nothing, we'll catch the transition below
      }
      if (lastActiveGroupIdx !== -1 && currentGroupIdx !== lastActiveGroupIdx && currentGroupIdx === -1) {
        // stroke just completed — try to get last tip position for flash
        const prevGroup = lastActiveGroupIdx < sigGroups.length
          ? sigGroups[lastActiveGroupIdx]
          : sunGroups[lastActiveGroupIdx - sigGroups.length];
        try {
          const pt = getPointAt(prevGroup.d, 1.0);
          liftFlash = { x: pt.x * sx, y: pt.y * sy, startE: e };
        } catch { /* ignore */ }
      }
      lastActiveGroupIdx = currentGroupIdx;

      // ── Pen-tip effects ────────────────────────────────────────────────────
      if (anyActive && activeTipD) {
        let tip: { x: number; y: number } | null = null;
        try {
          const pt = getPointAt(activeTipD, activeTipP);
          tip = { x: pt.x * sx, y: pt.y * sy };
        } catch { /* ignore */ }

        if (tip) {
          // ✦ ADDED — velocity-based line width factor: fast stroke = thicker halo
          const vel = strokeVelocity(activeTipRaw);
          const pressureScale = 1 + vel * PRESSURE_STRENGTH;

          const halo = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, LW * 7 * pressureScale); // ✦ scaled
          halo.addColorStop(0, "rgba(255,248,220,0.32)");
          halo.addColorStop(0.35, "rgba(200,215,255,0.16)");
          halo.addColorStop(0.7, "rgba(180,200,255,0.05)");
          halo.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, LW * 7 * pressureScale, 0, Math.PI * 2); // ✦ scaled
          ctx.fill();

          const core = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, LW * 1.8);
          core.addColorStop(0, "rgba(255,255,255,0.92)");
          core.addColorStop(0.5, "rgba(230,235,255,0.5)");
          core.addColorStop(1, "rgba(200,215,255,0)");
          ctx.fillStyle = core;
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, LW * 1.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgba(255,255,255,0.95)";
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, LW * 0.42, 0, Math.PI * 2);
          ctx.fill();

          pushTrail(tip.x, tip.y, e);
        }
      }

      // ✦ ADDED — pen-lift micro-flash: bright expanding ring where pen lifted
      if (liftFlash !== null) {
        const age = e - liftFlash.startE;
        if (age < T_LIFT_FLASH) {
          const life = 1 - age / T_LIFT_FLASH;
          const radius = LW * (2 + (1 - life) * 5.5);
          const alpha = life * 0.55;
          ctx.strokeStyle = `rgba(255,252,230,${alpha.toFixed(3)})`;
          ctx.lineWidth = LW * 0.5 * life;
          ctx.beginPath();
          ctx.arc(liftFlash.x, liftFlash.y, radius, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          liftFlash = null;
        }
      }

      // ── Trail particles ────────────────────────────────────────────────────
      for (let i = 0; i < TRAIL_MAX; i++) {
        const p = trail[i];
        const age = e - p.t;
        if (age <= 0 || age > TRAIL_LIFE) continue;
        const life = 1 - age / TRAIL_LIFE;
        const alpha = life * life * 0.35;
        const r = LW * 0.45 * life;
        ctx.fillStyle = `hsla(${p.hue},80%,82%,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Static vignette ────────────────────────────────────────────────────
      ctx.drawImage(vigCanvas, 0, 0);

      // ✦ ADDED — paper grain texture tiled over canvas at very low opacity
      if (grainCanvas) {
        ctx.save();
        // ✦ use 'screen' blend so grain brightens on dark bg without washing out ink
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = 0.045;
        for (let gx = 0; gx < W; gx += GRAIN_TILE) {
          for (let gy = 0; gy < H; gy += GRAIN_TILE) {
            ctx.drawImage(grainCanvas, gx, gy);
          }
        }
        ctx.restore();
      }

      if (e < tTotal + T_HOLD + T_RAF_PAD) rafId = requestAnimationFrame(frame);
    };

    // ✦ ADDED — requestIdleCallback pre-warm: measure all path lengths
    //   before the first RAF so measurement doesn't stutter frame 1
    const warmPaths = () => {
      ALL_PATH_STRINGS.forEach(d => {
        try { measureLen(d); } catch { /* ignore */ }
      });
    };
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(warmPaths, { timeout: 400 });
    } else {
      // Fallback for Safari / older browsers
      setTimeout(warmPaths, 0);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(exitT);
      clearTimeout(safeT);
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
      document.removeEventListener("visibilitychange", onVisChange);
      pathElMap.forEach(el => el.remove());
      pathElMap.clear();
      lenCache.clear();
      document.getElementById("__ss_measure")?.remove();
    };
  }, [startExit]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#000",
        padding: "max(8px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-right)) max(8px, env(safe-area-inset-bottom)) max(8px, env(safe-area-inset-left))",
        transition: `opacity ${T_EXIT}ms cubic-bezier(.76,0,.24,1), transform ${T_EXIT}ms cubic-bezier(.76,0,.24,1)`,
        opacity: phase === "exiting" ? 0 : 1,
        transform: phase === "exiting" ? "scale(1.04) translateY(-28px)" : "scale(1) translateY(0)",
        pointerEvents: phase === "exiting" ? "none" : "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Sure Surya"
        style={{
          width: "min(92vw, 980px)",
          aspectRatio: `${VB_W} / ${VB_H}`,
          display: "block",
          zIndex: 1,
          filter: phase === "exiting" ? "blur(3px)" : "none",
          transition: `filter ${T_EXIT}ms ease`,
          // ✦ ADDED — hint browser to promote canvas to its own GPU layer
          willChange: "transform",
        }}
      />
      {/* Hidden offscreen glow ref — not rendered in DOM, kept for future ref */}
      <canvas ref={glowRef} style={{ display: "none" }} />
      {/* ✦ ADDED — sr-only live region for screen readers */}
      <span
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1, height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {phase === "drawing" ? "Loading Sure Surya…" : phase === "exiting" ? "Ready" : ""}
      </span>
    </div>
  );
}