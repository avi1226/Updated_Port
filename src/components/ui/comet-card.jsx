// src/components/ui/comet-card.jsx
import { useRef, useState } from "react"

export function CometCard({ children, className = "", style = {} }) {
  const [comet, setComet] = useState(null)
  const cardRef = useRef(null)

  const handleMouseEnter = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setComet({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setTimeout(() => setComet(null), 800)
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {comet && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            left: comet.x,
            top: comet.y,
            width: "2px",
            height: "60px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
            animation: "comet-fall 0.8s ease-out forwards",
            zIndex: 10,
            transformOrigin: "top",
          }}
        />
      )}
      {children}
      <style>{`
        @keyframes comet-fall {
          0% { transform: translateY(0) scaleY(0); opacity: 1; }
          100% { transform: translateY(80px) scaleY(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
