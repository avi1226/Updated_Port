// src/components/ui/background-beams-with-collision.jsx
import { useRef, useEffect, useState } from "react"

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function Beam({ style, onCollide }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const anim = el.animate(
      [
        { transform: "translateY(-100%)", opacity: 1 },
        { transform: "translateY(200vh)", opacity: 0.2 },
      ],
      {
        duration: randomBetween(3000, 7000),
        iterations: Infinity,
        delay: randomBetween(0, 3000),
        easing: "linear",
      }
    )
    return () => anim.cancel()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        width: "1px",
        height: "120px",
        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)",
        ...style,
      }}
    />
  )
}

export function BackgroundBeamsWithCollision({ children, className = "" }) {
  const beams = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${randomBetween(5, 95)}%`,
    opacity: randomBetween(0.2, 0.8),
  }))

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0A0A0A",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {beams.map((beam) => (
          <Beam
            key={beam.id}
            style={{ left: beam.left, opacity: beam.opacity }}
          />
        ))}
      </div>
      {children}
    </div>
  )
}
