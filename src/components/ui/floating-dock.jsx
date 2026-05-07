// src/components/ui/floating-dock.jsx
import { useState } from "react"

export function FloatingDock({ items = [], className = "" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
        padding: "12px 20px",
        background: "rgba(17,17,17,0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            transform:
              hoveredIndex === i
                ? "scale(1.4) translateY(-8px)"
                : hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1
                ? "scale(1.2) translateY(-4px)"
                : "scale(1)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {item.icon}
          </div>
          {hoveredIndex === i && (
            <span
              style={{
                position: "absolute",
                bottom: "72px",
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                padding: "4px 10px",
                fontSize: "11px",
                fontFamily: "'Space Mono', monospace",
                color: "#A0A0A0",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {item.title}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
