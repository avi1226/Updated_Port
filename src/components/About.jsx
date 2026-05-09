// src/components/About.jsx
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { useIsMobile } from "@/hooks/useIsMobile"

const STATS = [
  { value: "3+", label: "Years Building" },
  { value: "10+", label: "Projects Shipped" },
  { value: "5+", label: "AI Apps Built" },
  { value: "∞", label: "Things to Learn" },
]

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)
  const [triggerDecrypt, setTriggerDecrypt] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => setTriggerDecrypt(true),
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="no-snap"
      style={{
        padding: isMobile ? "80px 0" : "140px 0",
        background: "#0A0A0A",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 40px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "40px" : "80px",
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ flex: isMobile ? "1" : "0 0 55%" }}>
          <span className="section-label">01 / About</span>
          <h2 ref={headingRef} className="section-heading">Who I am.</h2>

          <div style={{ marginTop: "24px" }}>
            <EncryptedText
              text="I'm Avinash, a full-stack developer passionate about building AI-powered products and immersive digital experiences. I enjoy creating applications that are not only functional but also visually engaging and intuitive. Currently focused on blending AI, modern web technologies, and creative design into impactful real-world projects."
              trigger={triggerDecrypt}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                color: "#A0A0A0",
                lineHeight: 1.8,
              }}
            />
          </div>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {["📍 Hyderabad, India", "🎓 SRM University, Chennai", "⚡ Available for work"].map((tag) => (
              <span
                key={tag}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "100px",
                  padding: "6px 16px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          ref={cardsRef}
          style={{
            flex: isMobile ? "1" : "0 0 45%",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "16px",
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "48px",
                  fontWeight: 900,
                  color: "white",
                }}
              >
                {stat.value}
              </span>
              <div style={{ marginTop: "4px" }}>
                <TextHoverEffect
                  text={stat.label}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#A0A0A0",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
