// src/components/ui/text-flipping-board.jsx
import { useState, useEffect } from "react"

export function TextFlippingBoard({ phrases = ["Hello World"], className = "", style = {} }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (phrases.length <= 1) return
    const interval = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % phrases.length)
        setAnimating(false)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        display: "inline-block",
        ...style,
      }}
    >
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.4s cubic-bezier(0.68,-0.6,0.32,1.6), opacity 0.4s ease",
          transform: animating ? "translateY(-100%)" : "translateY(0)",
          opacity: animating ? 0 : 1,
        }}
      >
        {phrases[currentIndex]}
      </span>
    </div>
  )
}
