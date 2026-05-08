// src/components/Navbar.jsx
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useIsMobile } from "@/hooks/useIsMobile"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const navbarRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Scroll tracking for background
    const wrapper = document.querySelector(".page-wrapper")
    const handleScroll = () => {
      if (wrapper) setScrolled(wrapper.scrollTop > 200) // Trigger blur slightly after it sticks
    }
    if (wrapper) wrapper.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (wrapper) wrapper.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    if (window.scrollToPage) {
      window.scrollToPage(href)
    }
  }

  // Magnetic effect
  const onMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 })
  }
  const onMouseLeave = (el) => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" })
  }

  return (
    <nav
      ref={navbarRef}
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isMobile ? "16px 20px" : "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.92)" : "#0A0A0A",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
          fontSize: "20px",
          color: "white",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
      >
        AVI.
      </div>

      {/* Nav links */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "32px" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              onMouseMove={(e) => onMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#A0A0A0"
                onMouseLeave(e.currentTarget)
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "13px",
                color: "#A0A0A0",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Open to work pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "100px",
          padding: "6px 16px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          color: "white",
        }}
      >
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#4ADE80", animation: "pulse 2s ease-in-out infinite",
        }} />
        Open to work
      </div>
    </nav>
  )
}
