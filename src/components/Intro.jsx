// src/components/Intro.jsx
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { TextFlippingBoard } from "@/components/ui/text-flipping-board"
import { useIsMobile } from "@/hooks/useIsMobile"
import { CinematicLoader } from "@/components/ui/cinematic-loader"

export default function Intro({ onLoadComplete }) {
  const introRef = useRef(null)
  
  const loader1Ref = useRef(null)
  const panel2Ref = useRef(null)
  const loader2Ref = useRef(null)

  const [loader1Active, setLoader1Active] = useState(false)
  const [loader1Done, setLoader1Done] = useState(false)

  const [showPanel2, setShowPanel2] = useState(false)

  const [loader2Active, setLoader2Active] = useState(false)
  const [loader2Done, setLoader2Done] = useState(false)

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

    // Loader 1 observer
    const obsL1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loader1Active && !loader1Done) {
          setLoader1Active(true)
        }
      },
      { threshold: 0.5 }
    )
    if (loader1Ref.current) obsL1.observe(loader1Ref.current)

    // Loader 2 observer
    const obsL2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loader2Active && !loader2Done && loader1Done) {
          setLoader2Active(true)
        }
      },
      { threshold: 0.5 }
    )
    if (loader2Ref.current) obsL2.observe(loader2Ref.current)

    return () => {
      ctx.revert()
      obsL1.disconnect()
      obsL2.disconnect()
    }
  }, [loader1Active, loader1Done, loader2Active, loader2Done])

  // Handle Loader 1 Complete
  const handleLoader1Complete = () => {
    setLoader1Done(true)
    setShowPanel2(true)
    setTimeout(() => {
      if (panel2Ref.current) {
        gsap.from(".panel-2-content", {
          y: 70, opacity: 0, duration: 1.2, ease: "power4.out",
        })
        const wrapper = document.querySelector(".page-wrapper")
        if (wrapper) wrapper.scrollTo({ top: panel2Ref.current.offsetTop, behavior: "smooth" })
      }
    }, 100)
  }

  // Handle Loader 2 Complete
  const handleLoader2Complete = () => {
    setLoader2Done(true)
    if (onLoadComplete) onLoadComplete()
  }

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

      {/* LOADER 1 */}
      <section
        ref={loader1Ref}
        style={{ height: "100vh" }}
      >
        <CinematicLoader 
          active={loader1Active} 
          onComplete={handleLoader1Complete} 
          text1="INITIALIZING NEXT SECTION..."
          text2="LOADING PROJECT DATA"
          duration={1200}
        />
      </section>

      {/* PANEL 2 */}
      {showPanel2 && (
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
            <TextFlippingBoard text="I AM AVINASH" />
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
      )}

      {/* LOADER 2 */}
      {showPanel2 && (
        <section
          ref={loader2Ref}
          style={{ height: "100vh" }}
        >
          <CinematicLoader 
            active={loader2Active} 
            onComplete={handleLoader2Complete} 
            text1="INITIALIZING CORE SYSTEM..."
            text2="PREPARING EXPERIENCE"
            duration={1500}
          />
        </section>
      )}
    </div>
  )
}
