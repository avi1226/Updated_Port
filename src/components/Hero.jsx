// src/components/Hero.jsx
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { ThreeDCard } from "@/components/ui/3d-card"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function Hero() {
  const eyebrowRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const matterRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const cardRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Eyebrow
      tl.from(eyebrowRef.current, {
        y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
      })

      // "I build" + "things that"
      tl.from([line1Ref.current, line2Ref.current], {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      }, "-=0.4")

      // "matter."
      tl.from(matterRef.current, {
        y: 80, opacity: 0, duration: 0.7, ease: "power4.out",
      }, "-=0.3")

      // Subtitle
      tl.from(subtitleRef.current, {
        y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
      }, "-=0.4")

      // CTA buttons
      if (ctaRef.current) {
        tl.from(Array.from(ctaRef.current.children), {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
        }, "-=0.4")
      }

      // 3D Card
      if (cardRef.current) {
        tl.from(cardRef.current, {
          scale: 0.85, opacity: 0, duration: 0.9, ease: "power3.out",
        }, "-=0.8")
      }
    })

    return () => ctx.revert()
  }, [])

  const scrollToProjects = () => {
    const wrapper = document.querySelector(".page-wrapper")
    const target = document.querySelector("#projects")
    if (wrapper && target) {
      wrapper.scrollTo({ top: target.offsetTop, behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#0A0A0A",
      }}
    >
      <BackgroundBeamsWithCollision />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "40px" : "80px",
            alignItems: "center",
            width: "100%",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ flex: 1, maxWidth: isMobile ? "100%" : "600px" }}>
            <div
              ref={eyebrowRef}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                color: "#404040",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Full Stack Developer · AI Builder · Hyderabad/Chennai
            </div>

            <div style={{ marginTop: "16px" }}>
              <div ref={line1Ref} style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(16px, 3vw, 28px)", fontWeight: 300, color: "#A0A0A0" }}>
                I build
              </div>
              <div ref={line2Ref} style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(16px, 3vw, 28px)", fontWeight: 300, color: "#A0A0A0" }}>
                things that
              </div>
              <div ref={matterRef} style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(56px, 9vw, 120px)", fontWeight: 900, color: "white", lineHeight: 0.95 }}>
                matter.
              </div>
            </div>

            <p
              ref={subtitleRef}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "17px",
                color: "#A0A0A0",
                lineHeight: 1.8,
                maxWidth: "440px",
                marginTop: "24px",
                margin: isMobile ? "24px auto 0" : "24px 0 0",
              }}
            >
              Chennai-based developer building AI-powered web apps, interactive experiences, and tools that feel alive.
            </p>

            <div
              ref={ctaRef}
              style={{
                marginTop: "40px",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToProjects();
                  }}
                  aria-label="View projects section"
                  style={{
                    background: "white",
                    color: "black",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 700,
                    padding: "0 32px",
                    height: "48px",
                    borderRadius: "8px",
                    border: "1px solid transparent",
                    cursor: "pointer",
                    transition: "transform 0.1s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    textDecoration: "none",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  View Projects →
                </a>
              </div>
              
              <div>
                <a
                  href="/cv.pdf"
                  download
                  aria-label="Download CV"
                  style={{
                    background: "transparent",
                    color: "white",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 700,
                    padding: "0 32px",
                    height: "48px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          {!isMobile && (
            <div ref={cardRef} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <ThreeDCard>
                <div
                  style={{
                    width: "280px",
                    height: "360px",
                    background: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  {/* Replace '/profile.jpg' with your actual image path */}
                  <img 
                    src="/profile.jpg" 
                    alt="Avinash" 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover" 
                    }} 
                  />
                </div>
              </ThreeDCard>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "16px", color: "white", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>YEMENENI SREE NAGA AVINASH</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
