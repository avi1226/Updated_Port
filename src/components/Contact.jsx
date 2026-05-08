// src/components/Contact.jsx
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { BackgroundLines } from "@/components/ui/background-lines"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { Copy } from "lucide-react"

const EMAIL = "avinash.yemeneni@gmail.com"

export default function Contact() {
  const headingRef = useRef(null)
  const subtextRef = useRef(null)
  const sectionRef = useRef(null)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      })

      gsap.from(subtextRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        opacity: 0, y: 20, duration: 0.6, delay: 0.3, ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundLines />

      <div style={{
        position: "relative", zIndex: 1, maxWidth: "700px",
        margin: "0 auto", padding: "0 24px", width: "100%", textAlign: "center",
      }}>
        <span className="section-label">06 / Contact</span>
        <h2 ref={headingRef} style={{
          fontFamily: "'Space Mono', monospace", fontSize: "clamp(48px, 7vw, 88px)",
          fontWeight: 900, color: "white", lineHeight: 1.05,
        }}>
          Let's build something.
        </h2>

        <p ref={subtextRef} style={{
          fontFamily: "'Inter', sans-serif", fontSize: "18px",
          color: "#A0A0A0", lineHeight: 1.8, margin: "24px 0 48px",
        }}>
          I'm open to freelance projects, full-time roles, and interesting collaborations.
        </p>

        <CardSpotlight style={{
          background: "#111111", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px", padding: "48px", textAlign: "left",
        }}>
          {/* Email row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "18px", color: "white" }}>
              {EMAIL}
            </span>
            <div onClick={copyEmail} style={{ cursor: "pointer", color: "#A0A0A0", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A0A0A0")}
            >
              <Copy size={20} />
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "28px 0" }} />

          {/* Social row */}
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              {
                label: "GitHub",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                ),
                url: "https://github.com/avi1226",
              },
              {
                label: "LinkedIn",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
                url: "https://www.linkedin.com/in/sree-naga-avinash-yemeneni",
              },
              {
                label: "Instagram",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                ),
                url: "https://www.instagram.com/__avinashhh.18/",
              },
            ].map((social) => (
              <div
                key={social.label}
                onClick={() => window.open(social.url, "_blank")}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  cursor: "pointer", color: "#A0A0A0",
                  fontFamily: "'Space Mono', monospace", fontSize: "13px",
                  transition: "color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white"
                  e.currentTarget.style.transform = "translateX(4px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#A0A0A0"
                  e.currentTarget.style.transform = "translateX(0)"
                }}
              >
                {social.icon}
                {social.label}
              </div>
            ))}
          </div>

          <HoverBorderGradient
            onClick={() => window.open(`mailto:${EMAIL}`)}
            style={{ width: "100%", marginTop: "36px" }}
          >
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px" }}>Send a message →</span>
          </HoverBorderGradient>
        </CardSpotlight>

        {/* Footer */}
        <footer style={{ marginTop: "48px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#666666" }}>
            Built by Avinash · {new Date().getFullYear()}
          </p>
        </footer>
      </div>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: "fixed", bottom: "32px", right: "32px", zIndex: 9000,
          background: "#111111", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "8px", padding: "12px 24px",
          fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          animation: "toast-in 0.3s ease forwards",
        }}>
          Email copied ✓
          <style>{`
            @keyframes toast-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </section>
  )
}
