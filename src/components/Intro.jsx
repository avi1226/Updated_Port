// src/components/Intro.jsx
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { TextFlippingBoard } from "@/components/ui/text-flipping-board"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function Intro() {
  const introRef = useRef(null)
  const panel2Ref = useRef(null)
  const [showPanel2, setShowPanel2] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Panel 1 entrance
      gsap.from(".panel-1-content", {
        y: 50, opacity: 0, duration: 1.2,
        ease: "power3.out", delay: 0.5,
      })

      // Scroll line animation
      gsap.fromTo(".scroll-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "power2.inOut", repeat: -1, yoyo: true }
      )

      // Chevron bounce
      gsap.to(".chevron-icon", { y: 5, duration: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true })
    }, introRef)

    // Panel 2 observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !showPanel2) {
          setShowPanel2(true)
          gsap.from(".panel-2-content", {
            y: 70, opacity: 0, duration: 1.2, ease: "power4.out",
          })
        }
      },
      { threshold: 0.4 }
    )
    if (panel2Ref.current) observer.observe(panel2Ref.current)

    return () => {
      ctx.revert()
      observer.disconnect()
    }
  }, [])

  return (
    <div
      id="intro"
      ref={introRef}
      style={{
        background: "#0A0A0A",
        position: "relative",
      }}
    >
      {/* PANEL 1 */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      >
        <div className="panel-1-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 20px" }}>
          <TextFlippingBoard text="WELCOME TO MY PORTFOLIO" />
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute", bottom: "48px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}>
          <div className="scroll-line" style={{
            width: "1px", height: "56px", background: "white", opacity: 0.3, transformOrigin: "top",
          }} />
          <svg className="chevron-icon" width="16" height="10" viewBox="0 0 16 10" style={{ opacity: 0.4 }}>
            <path d="M1 1l7 7 7-7" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#888888",
            letterSpacing: "0.3em", marginTop: "4px", textTransform: "uppercase",
          }}>
            scroll
          </span>
        </div>
      </section>

      {/* PANEL 2 */}
      <section
        ref={panel2Ref}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 65%)",
        }}
      >
        <div className="panel-2-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 20px" }}>
          {showPanel2 && (
            <TextFlippingBoard text="I AM AVINASH" />
          )}
        </div>

        <div style={{
          position: "absolute", bottom: "48px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}>
          <div className="scroll-line" style={{
            width: "1px", height: "56px", background: "white", opacity: 0.5, transformOrigin: "top",
          }} />
          <svg className="chevron-icon" width="16" height="10" viewBox="0 0 16 10" style={{ opacity: 0.6 }}>
            <path d="M1 1l7 7 7-7" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#888888",
            letterSpacing: "0.3em", marginTop: "4px", textTransform: "uppercase",
          }}>
            enter
          </span>
        </div>
      </section>
    </div>
  )
}
