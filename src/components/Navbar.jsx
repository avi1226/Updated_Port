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
  const [menuOpen, setMenuOpen] = useState(false)
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
    setMenuOpen(false)
    if (window.scrollToPage) {
      window.scrollToPage(href)
    }
  }

  // Magnetic effect
  const onMouseMove = (e, el) => {
    if (isMobile) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 })
  }
  const onMouseLeave = (el) => {
    if (isMobile) return
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" })
  }

  return (
    <>
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
          background: scrolled || menuOpen ? "rgba(10,10,10,0.92)" : "#0A0A0A",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease",
          borderBottom: menuOpen ? "1px solid rgba(255,255,255,0.1)" : "none"
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
          onClick={() => window.scrollToPage("hero")}
          onMouseEnter={(e) => !isMobile && gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })}
          onMouseLeave={(e) => !isMobile && gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
        >
          AVI.
        </div>

        {/* Nav links (Desktop) */}
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

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {!isMobile && (
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
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >
              <div style={{ width: "20px", height: "2px", background: "white", transition: "0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <div style={{ width: "20px", height: "2px", background: "white", transition: "0.3s", opacity: menuOpen ? 0 : 1 }} />
              <div style={{ width: "20px", height: "2px", background: "white", transition: "0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "60px",
            zIndex: 999,
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            animation: "fadeIn 0.3s ease"
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "24px",
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "4px"
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "100px",
              padding: "10px 24px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              color: "white",
            }}
          >
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#4ADE80",
            }} />
            Open to work
          </div>
        </div>
      )}
    </>
  )
}
