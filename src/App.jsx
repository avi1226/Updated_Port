// src/App.jsx
import { Suspense, lazy, useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TargetCursor } from "@/components/bits/TargetCursor"
import { SplashCursor } from "@/components/bits/SplashCursor"
import LoadingScreen from "@/components/LoadingScreen"
import { motion, AnimatePresence } from "motion/react"
import { TextFlippingBoard } from "@/components/ui/text-flipping-board"

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger)

// Lazy load sections
const Navbar = lazy(() => import("@/components/Navbar"))
const Hero = lazy(() => import("@/components/Hero"))
const About = lazy(() => import("@/components/About"))
const Skills = lazy(() => import("@/components/Skills"))
const Projects = lazy(() => import("@/components/Projects"))
const Playground = lazy(() => import("@/components/Playground"))
const DragZone = lazy(() => import("@/components/DragZone"))
const Contact = lazy(() => import("@/components/Contact"))

// Intro Slides
function WelcomeSlide() {
  return (
    <section style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 20px" }}>
        <TextFlippingBoard text="WELCOME TO MY PORTFOLIO" />
      </div>
      <ScrollIndicator text="SCROLL" />
    </section>
  )
}

function NameSlide() {
  return (
    <section style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 65%)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 20px" }}>
        <TextFlippingBoard text="I AM AVINASH" />
      </div>
      <ScrollIndicator text="ENTER" />
    </section>
  )
}

function ScrollIndicator({ text }) {
  return (
    <div style={{ position: "absolute", bottom: "48px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <motion.div 
        animate={{ scaleY: [0, 1, 0] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "1px", height: "56px", background: "white", opacity: 0.4, transformOrigin: "top" }} 
      />
      <motion.svg 
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        width="16" height="10" viewBox="0 0 16 10" style={{ opacity: 0.5 }}
      >
        <path d="M1 1l7 7 7-7" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#888888", letterSpacing: "0.3em", marginTop: "4px", textTransform: "uppercase" }}>
        {text}
      </span>
    </div>
  )
}

const PAGES = [
  { id: "intro1", component: <WelcomeSlide /> },
  { id: "intro2", component: <NameSlide /> },
  { id: "hero", component: <Hero /> },
  { id: "about", component: <About /> },
  { id: "skills", component: <Skills /> },
  { id: "projects", component: <Projects /> },
  { id: "playground", component: <Playground /> },
  { id: "dragzone", component: <DragZone /> },
  { id: "contact", component: <Contact /> },
]

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isScrolling = useRef(false)
  const touchStartY = useRef(0)

  // Listen to wheel and touch events for full-page scrolling
  useEffect(() => {
    if (showLoader) return;

    const handleNext = () => {
      if (isScrolling.current || currentIndex >= PAGES.length - 1) return;
      isScrolling.current = true;
      setCurrentIndex(c => c + 1);
      setTimeout(() => { isScrolling.current = false }, 1800); // Lock during transition
    }

    const handlePrev = () => {
      if (isScrolling.current || currentIndex <= 0) return;
      isScrolling.current = true;
      setCurrentIndex(c => c - 1);
      setTimeout(() => { isScrolling.current = false }, 1800);
    }

    const onWheel = (e) => {
      // Prevent scrolling if hovering over an element that needs internal scroll
      const internalScroll = e.target.closest('.internal-scroll');
      if (internalScroll) {
        const { scrollTop, scrollHeight, clientHeight } = internalScroll;
        const atTop = scrollTop === 0;
        const atBottom = scrollHeight - scrollTop <= clientHeight + 1;
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      if (e.deltaY > 40) handleNext();
      else if (e.deltaY < -40) handlePrev();
    }

    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; }
    const onTouchMove = (e) => {
      const internalScroll = e.target.closest('.internal-scroll');
      if (internalScroll) {
        const { scrollTop, scrollHeight, clientHeight } = internalScroll;
        const atTop = scrollTop === 0;
        const atBottom = scrollHeight - scrollTop <= clientHeight + 1;
        const delta = touchStartY.current - e.touches[0].clientY;
        if (delta > 0 && !atBottom) return;
        if (delta < 0 && !atTop) return;
      }

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      if (deltaY > 40) handleNext();
      else if (deltaY < -40) handlePrev();
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    }
  }, [currentIndex, showLoader])

  // Provide a global way to change pages (e.g. for Navbar)
  useEffect(() => {
    window.scrollToPage = (id) => {
      const index = PAGES.findIndex(p => p.id === id || p.id === id.replace('#', ''));
      if (index !== -1 && index !== currentIndex && !isScrolling.current) {
        isScrolling.current = true;
        setCurrentIndex(index);
        setTimeout(() => { isScrolling.current = false }, 1800);
      }
    };
  }, [currentIndex]);

  // We add background grid globally here so it stays throughout
  return (
    <div className="no-cursor" style={{ background: "#0A0A0A", height: "100vh", overflow: "hidden" }}>
      <TargetCursor />
      <SplashCursor />

      {/* Persistent Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {showLoader && (
        <LoadingScreen onComplete={() => setShowLoader(false)} />
      )}

      {!showLoader && (
        <>
          {/* Render Navbar conditionally if past intro */}
          {currentIndex > 1 && (
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000 }}>
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>
            </div>
          )}

          {/* Cinematic Page Transitions */}
          <Suspense fallback={<div style={{ height: "100vh" }} />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: -80, filter: "blur(8px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                style={{ position: "absolute", inset: 0, height: "100vh", width: "100vw", overflowY: "auto" }}
                className="internal-scroll"
              >
                {PAGES[currentIndex].component}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </>
      )}
    </div>
  )
}
