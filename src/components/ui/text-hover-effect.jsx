// src/components/ui/text-hover-effect.jsx
import { useState } from "react"

export function TextHoverEffect({ text, className = "", style = {} }) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        cursor: "default",
        transition: "letter-spacing 0.3s ease, opacity 0.3s ease",
        letterSpacing: hovered ? "0.08em" : "0",
        opacity: hovered ? 1 : 0.7,
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
    </span>
  )
}
