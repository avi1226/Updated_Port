// src/App.jsx
import { Suspense, lazy, useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TargetCursor } from "@/components/bits/TargetCursor"
import { SplashCursor } from "@/components/bits/SplashCursor"
import LoadingScreen from "@/components/LoadingScreen"

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger)

// Lazy load sections
const Intro = lazy(() => import("@/components/Intro"))
const Navbar = lazy(() => import("@/components/Navbar"))
const Hero = lazy(() => import("@/components/Hero"))
const About = lazy(() => import("@/components/About"))
const Skills = lazy(() => import("@/components/Skills"))
const Projects = lazy(() => import("@/components/Projects"))
const Playground = lazy(() => import("@/components/Playground"))
const DragZone = lazy(() => import("@/components/DragZone"))
const Contact = lazy(() => import("@/components/Contact"))

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!showLoader && wrapperRef.current) {
      // Tell ScrollTrigger to use our custom scroll container
      ScrollTrigger.defaults({
        scroller: wrapperRef.current,
      })
      // Force ScrollTrigger to recalculate after all sections mount
      setTimeout(() => ScrollTrigger.refresh(), 100)
    }
  }, [showLoader])

  return (
    <div className="no-cursor">
      <TargetCursor />
      <SplashCursor />

      {showLoader && (
        <LoadingScreen onComplete={() => setShowLoader(false)} />
      )}

      {!showLoader && (
        <Suspense fallback={<div style={{ height: "100vh", background: "#0A0A0A" }} />}>
          <div className="page-wrapper" ref={wrapperRef}>
            <Intro />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Playground />
            <DragZone />
            <Contact />
          </div>
        </Suspense>
      )}
    </div>
  )
}
