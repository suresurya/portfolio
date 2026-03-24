import { useCallback, useEffect, useRef, useState } from "react"

type CursorState = {
  label: string
  isHovering: boolean
  isClicking: boolean
  isHidden: boolean
}

const MouseTracker: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const rafId = useRef<number>(0)

  const [state, setState] = useState<CursorState>({
    label: "",
    isHovering: false,
    isClicking: false,
    isHidden: false,
  })

  const showCustomCursor =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches

  const animate = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`
    }
  }, [])

  const getLabelForElement = (el: HTMLElement): string => {
    const target = el.closest("a, button, [role='button'], [data-cursor-label]") as HTMLElement | null
    if (!target) return ""

    if (target.dataset.cursorLabel) return target.dataset.cursorLabel

    const href = (target as HTMLAnchorElement).href || ""
    if (href.includes("github.com")) return "GITHUB"

    if (target.tagName === "A") {
      const isExternal = href.startsWith("http") && !href.includes(window.location.hostname)
      if (isExternal) return "OPEN"
      return "VIEW"
    }

    if (target.tagName === "BUTTON" || target.getAttribute("role") === "button") {
      return target.textContent?.trim().slice(0, 8).toUpperCase() || "CLICK"
    }

    return "VIEW"
  }

  useEffect(() => {
    if (!showCustomCursor) return

    const previousCursor = document.body.style.cursor
    document.body.style.cursor = "none"

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const label = getLabelForElement(e.target as HTMLElement)
      if (label) {
        setState(s => ({ ...s, isHovering: true, label }))
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [role='button'], [data-cursor-label]")) {
        setState(s => ({ ...s, isHovering: false, label: "" }))
      }
    }

    const onMouseDown = () => setState(s => ({ ...s, isClicking: true }))
    const onMouseUp = () => setState(s => ({ ...s, isClicking: false }))
    const onMouseLeave = () => setState(s => ({ ...s, isHidden: true }))
    const onMouseEnter = () => setState(s => ({ ...s, isHidden: false }))

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    const loop = () => {
      animate()
      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      cancelAnimationFrame(rafId.current)
      document.body.style.cursor = previousCursor
    }
  }, [showCustomCursor, animate])

  if (!showCustomCursor) return null

  const { label, isHovering, isClicking, isHidden } = state

  const width  = isHovering ? (label.length > 4 ? "90px" : "72px") : isClicking ? "16px" : "20px"
  const height = isHovering ? "32px" : isClicking ? "16px" : "20px"

  return (
    <>
      {/* Kills the browser hand/pointer cursor on every element */}
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width,
          height,
          borderRadius: "999px",
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
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
          ].join(", "),
        }}
      >
        {isHovering && label && (
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#000000",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              userSelect: "none",
              mixBlendMode: "normal",
              fontFamily: "monospace",
              opacity: isHovering ? 1 : 0,
              transition: "opacity 200ms ease 100ms",
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