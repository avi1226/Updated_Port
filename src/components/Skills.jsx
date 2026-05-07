// src/components/Skills.jsx
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { LogoLoop } from "@/components/bits/LogoLoop"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function Skills() {
  const physicsZoneRef = useRef(null)
  const sectionRef = useRef(null)
  const isMobile = useIsMobile()

  // Heading animation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.from(".skills-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="no-snap"
      style={{ padding: isMobile ? "80px 0" : "140px 0", background: "#111111" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 24px" : "0 40px" }}>
        <span className="section-label">02 / Skills</span>
        <h2 className="section-heading skills-heading">What I work with.</h2>

        {/* LOGO LOOP */}
        <div style={{ marginBottom: "80px" }}>
          <LogoLoop />
        </div>
      </div>
    </section>
  )
}
