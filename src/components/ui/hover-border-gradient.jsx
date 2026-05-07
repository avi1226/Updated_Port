// src/components/ui/hover-border-gradient.jsx
import { useState, useRef } from "react"

export function HoverBorderGradient({ children, className = "", style = {}, onClick }) {
  const [angle, setAngle] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const animRef = useRef(null)

  const startAnimation = () => {
    setIsHovered(true)
    let a = 0
    const animate = () => {
      a = (a + 3) % 360
      setAngle(a)
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
  }

  const stopAnimation = () => {
    setIsHovered(false)
    cancelAnimationFrame(animRef.current)
  }

  return (
    <div
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
      onClick={onClick}
      style={{
        position: "relative",
        borderRadius: "8px",
        padding: "1px",
        background: isHovered
          ? `conic-gradient(from ${angle}deg, transparent 0deg, rgba(255,255,255,0.4) 60deg, transparent 120deg)`
          : "rgba(255,255,255,0.12)",
        cursor: "pointer",
        ...style,
      }}
    >
      <div
        className={className}
        style={{
          background: "#111111",
          borderRadius: "7px",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "'Space Mono', monospace",
          fontSize: "13px",
          transition: "background 0.2s ease",
        }}
      >
        {children}
      </div>
    </div>
  )
}
