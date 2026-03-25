import { useEffect, useRef, useState } from "react"

type CursorState = {
  label: string
  isHovering: boolean
  isClicking: boolean
  isHidden: boolean
}

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
  })

  const showCustomCursor =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const getLabelForElement = (el: HTMLElement): string => {
    const interactive = el.closest(
      "a, button, input, textarea, select, label, [role='button'], [data-cursor-label]"
    ) as HTMLElement | null
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

  useEffect(() => {
    if (!showCustomCursor) return

    const previousCursor = document.body.style.cursor
    document.body.style.cursor = "none"

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const label = getLabelForElement(e.target as HTMLElement)
      if (label) {
        setState(prevState => ({ ...prevState, isHovering: true, label }))
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const element = e.target as HTMLElement
      if (element.closest("a, button, input, textarea, select, label, [role='button'], [data-cursor-label]")) {
        setState(prevState => ({ ...prevState, isHovering: false, label: "" }))
      }
    }

    const onMouseDown = () => setState(prevState => ({ ...prevState, isClicking: true }))
    const onMouseUp = () => setState(prevState => ({ ...prevState, isClicking: false }))
    const onMouseLeave = () => setState(prevState => ({ ...prevState, isHidden: true }))
    const onMouseEnter = () => setState(prevState => ({ ...prevState, isHidden: false }))

    const onFocusIn = (e: FocusEvent) => {
      const focused = e.target as HTMLElement | null
      if (!focused) return

      const label = getLabelForElement(focused)
      if (!label) return
      setState(prevState => ({ ...prevState, isHovering: true, label }))
    }

    const onFocusOut = () => {
      setState(prevState => ({ ...prevState, isHovering: false, label: "" }))
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("focusin", onFocusIn)
    document.addEventListener("focusout", onFocusOut)

    let running = true
    const follow = 0.18

    const tick = () => {
      if (!running) return

      const dx = target.current.x - current.current.x
      const dy = target.current.y - current.current.y
      current.current.x += dx * follow
      current.current.y += dy * follow

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
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

  const { label, isHovering, isClicking, isHidden } = state

  const width = isHovering ? (label.length > 6 ? "104px" : "84px") : isClicking ? "16px" : "22px"
  const height = isHovering ? "34px" : isClicking ? "16px" : "22px"
  const ringSize = isHovering ? "52px" : isClicking ? "26px" : "38px"
  const ringOpacity = isHovering ? 1 : 0.72

  return (
    <>
      {/* Hide the system cursor only when the custom cursor is enabled */}
      <style>{`
        html, body { cursor: none !important; }
        a, button, input, textarea, select, label, [role='button'], [data-cursor-label] { cursor: none !important; }
        @media (pointer: coarse) {
          html, body, a, button, input, textarea, select, label, [role='button'], [data-cursor-label] { cursor: auto !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          html, body, a, button, input, textarea, select, label, [role='button'], [data-cursor-label] { cursor: auto !important; }
        }
      `}</style>

      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width,
          height,
          borderRadius: "999px",
          backgroundColor: "var(--color-accent)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          opacity: isHidden ? 0 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transition: [
            "width 350ms cubic-bezier(0.34,1.56,0.64,1)",
            "height 350ms cubic-bezier(0.34,1.56,0.64,1)",
            "opacity 300ms ease",
            "background-color 250ms ease",
          ].join(", "),
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: "50% auto auto 50%",
            width: ringSize,
            height: ringSize,
            borderRadius: "999px",
            border: "1px solid var(--color-accent)",
            opacity: isHidden ? 0 : ringOpacity,
            transform: "translate(-50%, -50%)",
            transition: [
              "width 380ms cubic-bezier(0.34,1.56,0.64,1)",
              "height 380ms cubic-bezier(0.34,1.56,0.64,1)",
              "opacity 250ms ease",
            ].join(", "),
          }}
        />

        {/* Label pill */}
        {isHovering && label && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "var(--color-bg)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: "monospace",
              opacity: isHidden ? 0 : 1,
              transition: "opacity 200ms ease 90ms",
              padding: "0 2px",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  )
}

export default MouseTracker