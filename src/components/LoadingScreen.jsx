// src/components/LoadingScreen.jsx
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { LoaderFourDemo } from "@/components/ui/loader-four-demo"

export default function LoadingScreen({ onComplete }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    // After 2000ms start the exit animation
    const timeout = setTimeout(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      
      if (!prefersReduced) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            document.body.style.overflow = ""
            onComplete()
          },
        })
      } else {
        document.body.style.overflow = ""
        onComplete()
      }
    }, 2000) // The 2.5s unmount in App.jsx includes this 2s + 0.5s animation

    return () => {
      clearTimeout(timeout)
      document.body.style.overflow = ""
    }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0A0A",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoaderFourDemo />
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          color: "#404040",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginTop: "24px",
        }}
      >
        Loading...
      </span>
    </div>
  )
}
