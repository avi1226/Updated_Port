// src/components/bits/TargetCursor.jsx
import { useEffect, useRef, useState } from "react"

export function TargetCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      requestAnimationFrame(animateRing)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", () => setClicked(true))
    window.addEventListener("mouseup", () => setClicked(false))
    animateRing()

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "white",
          pointerEvents: "none",
          zIndex: 99999,
          top: 0,
          left: 0,
          transition: "transform 0.05s ease",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: `1.5px solid ${clicked ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)"}`,
          pointerEvents: "none",
          zIndex: 99998,
          top: 0,
          left: 0,
          transition: "border-color 0.15s ease",
        }}
      />
    </>
  )
}
