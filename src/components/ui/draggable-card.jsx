// src/components/ui/draggable-card.jsx
import { useRef, useState } from "react"

export function DraggableCard({ children, className = "", style = {}, initialX = 0, initialY = 0 }) {
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const startRef = useRef({ mouseX: 0, mouseY: 0, cardX: 0, cardY: 0 })

  const handleMouseDown = (e) => {
    e.preventDefault()
    setDragging(true)
    startRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      cardX: pos.x,
      cardY: pos.y,
    }

    const handleMouseMove = (e) => {
      const dx = e.clientX - startRef.current.mouseX
      const dy = e.clientY - startRef.current.mouseY
      setPos({ x: startRef.current.cardX + dx, y: startRef.current.cardY + dy })
    }

    const handleMouseUp = () => {
      setDragging(false)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      className={className}
      style={{
        position: "absolute",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: dragging ? "none" : "transform 0.1s ease",
        zIndex: dragging ? 100 : 10,
        left: initialX,
        top: initialY,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
