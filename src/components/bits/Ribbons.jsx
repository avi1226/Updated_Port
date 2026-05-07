// src/components/bits/Ribbons.jsx
import { useEffect, useRef } from "react"

export function Ribbons({ className = "" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let mouse = { x: canvas.offsetWidth / 2, y: canvas.offsetHeight / 2 }
    let ribbons = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Create ribbons
    for (let i = 0; i < 5; i++) {
      ribbons.push({
        points: Array.from({ length: 20 }, () => ({ x: mouse.x, y: mouse.y })),
        hue: i * 60,
        speed: 0.05 + i * 0.02,
        offset: i * 15,
      })
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener("mousemove", handleMouseMove)

    let rafId
    const animate = () => {
      ctx.fillStyle = "rgba(10,10,10,0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ribbons.forEach((ribbon) => {
        // Shift points
        for (let i = ribbon.points.length - 1; i > 0; i--) {
          ribbon.points[i].x += (ribbon.points[i - 1].x - ribbon.points[i].x) * ribbon.speed
          ribbon.points[i].y += (ribbon.points[i - 1].y - ribbon.points[i].y) * ribbon.speed
        }
        ribbon.points[0].x += (mouse.x - ribbon.points[0].x) * 0.15
        ribbon.points[0].y += (mouse.y - ribbon.points[0].y) * 0.15

        // Draw ribbon
        ctx.beginPath()
        ctx.moveTo(ribbon.points[0].x, ribbon.points[0].y)
        for (let i = 1; i < ribbon.points.length; i++) {
          ctx.lineTo(ribbon.points[i].x, ribbon.points[i].y)
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.03 + ribbon.speed * 0.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()
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
