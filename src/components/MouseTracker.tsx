import { useEffect, useRef, useState } from "react"

type CursorState = {
  label: string
  isHovering: boolean
  isClicking: boolean
  isHidden: boolean
  isPointerTarget: boolean
}

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], [data-cursor-label], .cursor-pointer, [style*='cursor: pointer']"

const MouseTracker: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const rafId = useRef<number>(0)

  const [state, setState] = useState<CursorState>({
    label: "",
    isHovering: false,
    isClicking: false,
    isHidden: false,
    isPointerTarget: false,
  })

  const showCustomCursor =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const getInteractiveElement = (el: HTMLElement): HTMLElement | null =>
    el.closest(INTERACTIVE_SELECTOR) as HTMLElement | null

  const getLabelForElement = (el: HTMLElement): string => {
    const interactive = getInteractiveElement(el)
    if (!interactive) return ""

    if (interactive.dataset.cursorLabel) return interactive.dataset.cursorLabel

    if (interactive instanceof HTMLInputElement || interactive instanceof HTMLTextAreaElement) {
      return "TYPE"
    }

    if (interactive instanceof HTMLSelectElement) {
      return "SELECT"
    }

    if (interactive instanceof HTMLAnchorElement) {
      const href = interactive.href || ""
      if (href.includes("github.com")) return "GITHUB"

      const isExternal = href.startsWith("http") && !href.includes(window.location.hostname)
      return isExternal ? "OPEN" : "VIEW"
    }

    if (interactive instanceof HTMLButtonElement || interactive.getAttribute("role") === "button") {
      const text = interactive.textContent?.trim() || ""
      return text ? text.slice(0, 10).toUpperCase() : "CLICK"
    }

    return "VIEW"
  }

  const isPointerTargetForElement = (el: HTMLElement): boolean => {
    const interactive = getInteractiveElement(el)
    if (!interactive) return false

    if (
      interactive instanceof HTMLInputElement ||
      interactive instanceof HTMLTextAreaElement ||
      interactive instanceof HTMLSelectElement
    ) {
      return false
    }

    return true
  }

  useEffect(() => {
    if (!showCustomCursor) return

    const previousCursor = document.body.style.cursor
    document.body.style.cursor = "none"

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const element = e.target as HTMLElement
      const label = getLabelForElement(element)
      if (label) {
        setState(prevState => ({
          ...prevState,
          isHovering: true,
          label,
          isPointerTarget: isPointerTargetForElement(element),
        }))
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const element = e.target as HTMLElement
      if (getInteractiveElement(element)) {
        setState(prevState => ({
          ...prevState,
          isHovering: false,
          label: "",
          isPointerTarget: false,
        }))
      }
    }

    const onMouseDown = () => setState(prevState => ({ ...prevState, isClicking: true }))
    const onMouseUp = () => setState(prevState => ({ ...prevState, isClicking: false }))
    const onMouseLeave = () => setState(prevState => ({ ...prevState, isHidden: true }))
    const onMouseEnter = () => setState(prevState => ({ ...prevState, isHidden: false }))
    const onTouchStart = () => setState(prevState => ({ ...prevState, isHidden: true }))

    const onFocusIn = (e: FocusEvent) => {
      const focused = e.target as HTMLElement | null
      if (!focused) return
      const label = getLabelForElement(focused)
      if (!label) return
      setState(prevState => ({
        ...prevState,
        isHovering: true,
        label,
        isPointerTarget: isPointerTargetForElement(focused),
      }))
    }

    const onFocusOut = () => {
      setState(prevState => ({
        ...prevState,
        isHovering: false,
        label: "",
        isPointerTarget: false,
      }))
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("focusin", onFocusIn)
    document.addEventListener("focusout", onFocusOut)

    let running = true
    let lastTime = performance.now()

    const tick = (now: number) => {
      if (!running) return

      const dt = now - lastTime
      lastTime = now

      // Smooth step derived from fixed follow=0.18 at 60fps (~16.6ms per frame)
      const lerpFactor = 1 - Math.exp(-dt * 0.012)

      if (cursorRef.current) {
        const dx = target.current.x - current.current.x
        const dy = target.current.y - current.current.y
        current.current.x += dx * lerpFactor
        current.current.y += dy * lerpFactor

        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("touchstart", onTouchStart)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("focusin", onFocusIn)
      document.removeEventListener("focusout", onFocusOut)

      running = false
      cancelAnimationFrame(rafId.current)
      document.body.style.cursor = previousCursor
    }
  }, [showCustomCursor])

  if (!showCustomCursor) return null

  const { label, isHovering, isClicking, isHidden, isPointerTarget } = state
  const showPointerShape = isHovering && isPointerTarget

  const width = showPointerShape
    ? "30px"
    : isHovering
      ? (label.length > 6 ? "104px" : "84px")
      : isClicking
        ? "16px"
        : "20px"
  const height = showPointerShape
    ? "30px"
    : isHovering
      ? "34px"
      : isClicking
        ? "16px"
        : "20px"

  return (
    <>
      {/* Hide the system cursor only when the custom cursor is enabled */}
      <style>{`
        :root { --cursor-drop-fill: #ffffff; }
        :root[data-theme='light'] { --cursor-drop-fill: #000000; }
        :root[data-theme='dark'] { --cursor-drop-fill: #ffffff; }

        @keyframes cursorDropPulse {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-1px) scale(1.03); }
        }

        html, body { cursor: none !important; }
        a, button, input, textarea, select, label, [role='button'], [data-cursor-label], .cursor-pointer, [style*='cursor: pointer'] { cursor: none !important; }
        @media (pointer: coarse) {
          html, body, a, button, input, textarea, select, label, [role='button'], [data-cursor-label], .cursor-pointer, [style*='cursor: pointer'] { cursor: auto !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          html, body, a, button, input, textarea, select, label, [role='button'], [data-cursor-label], .cursor-pointer, [style*='cursor: pointer'] { cursor: auto !important; }
        }
      `}</style>

      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          mixBlendMode: showPointerShape ? "normal" : "difference",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          opacity: isHidden ? 0 : 1,
          transition: "opacity 300ms ease",
        }}
      >
        {/* Dot / pill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            borderRadius: showPointerShape ? "0" : "999px",
            backgroundColor: showPointerShape ? "transparent" : "#ffffff",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            transition: [
              "width 350ms cubic-bezier(0.34,1.56,0.64,1)",
              "height 350ms cubic-bezier(0.34,1.56,0.64,1)",
            ].join(", "),
          }}
        >
          {showPointerShape ? (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: "block",
                color: "var(--cursor-drop-fill)",
                transform: isClicking ? "scale(0.88)" : "scale(1)",
                transformOrigin: "50% 50%",
                transition: "transform 140ms cubic-bezier(0.34,1.56,0.64,1)",
                animation: isClicking ? "none" : "cursorDropPulse 700ms ease-in-out infinite alternate",
              }}
            >
              <path
                d="M256 32 C 320 120, 432 220, 432 336 C 432 430, 360 480, 256 480 C 152 480, 80 430, 80 336 C 80 220, 192 120, 256 32 Z"
                fill="currentColor"
              />
            </svg>
          ) : isHovering && label && (
            <span
              style={{
                fontSize: "9px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                color: "#000000",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                userSelect: "none",
                mixBlendMode: "normal",
                fontFamily: "monospace",
                opacity: isHidden ? 0 : 1,
                transition: "opacity 200ms ease 90ms",
              }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export default MouseTracker