import { useEffect, useState } from "react"
import Dot from "../assets/icons/pointer.svg"

type MousePosition = {
  x: number
  y: number
}

const MouseTracker: React.FC = () => {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMove)

    return () => {
      window.removeEventListener("mousemove", handleMove)
    }
  }, [])

  return (
    <img
      src={Dot}
      alt="cursor-dot"
      className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-9999 transition-transform duration-75"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
      }}
    />
  )
}

export default MouseTracker
