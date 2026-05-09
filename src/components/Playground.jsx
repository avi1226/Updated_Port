// src/components/Playground.jsx
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Galaxy } from "@/components/bits/Galaxy"
import { Ribbons } from "@/components/bits/Ribbons"
import { PixelTrail } from "@/components/bits/PixelTrail"
import { useIsMobile } from "@/hooks/useIsMobile"
import TypographyChaosRoom from "./TypographyChaosRoom"

export default function Playground() {
  const headingRef = useRef(null)
  const sectionRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 100,
        opacity: 0,
        ease: "power4.out",
        duration: 0.8,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        id="playground"
        ref={sectionRef}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "#0A0A0A",
        }}
      >
        {/* LAYER STACK */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Galaxy />
        </div>

        {!isMobile && (
          <>
            <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
              <Ribbons />
            </div>
            <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
              <PixelTrail />
            </div>
          </>
        )}

        {/* CONTENT OVERLAY */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
          <div style={{ padding: "40px" }}>
            <span className="section-label">04 / Playground</span>
          </div>

          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)", textAlign: "center", width: "100%", padding: "0 20px",
          }}>
            <h2
              ref={headingRef}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 900,
                color: "white",
                margin: 0,
              }}
            >
              The Playground.
            </h2>
          </div>

          <div style={{
            position: "absolute", bottom: "40px", right: "40px",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: "10px",
              color: "#AAAAAA", letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              Move your mouse around
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ opacity: 0.3, transform: "rotate(-45deg)" }}>
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Typography Chaos Room Section */}
      <TypographyChaosRoom />
    </>
  )
}
