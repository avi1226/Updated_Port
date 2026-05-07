// src/components/bits/PixelTrail.jsx
import { useEffect, useRef } from "react"

export function PixelTrail({ className = "" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let pixels = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = Math.floor((e.clientX - rect.left) / 8) * 8
      const y = Math.floor((e.clientY - rect.top) / 8) * 8
      pixels.push({ x, y, life: 1 })
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    let rafId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pixels = pixels.filter((p) => p.life > 0)
      pixels.forEach((p) => {
        ctx.fillStyle = `rgba(255,255,255,${p.life * 0.4})`
        ctx.fillRect(p.x, p.y, 6, 6)
        p.life -= 0.02
      })
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  )
}
