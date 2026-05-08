// src/components/Projects.jsx
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { projects } from "@/data/projects"
import { CometCard } from "@/components/ui/comet-card"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { useIsMobile } from "@/hooks/useIsMobile"

const CATEGORIES = ["All", "Web", "AI", "Experiment"]

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All")
  const cardsContainerRef = useRef(null)
  const sectionRef = useRef(null)
  const isMobile = useIsMobile()

  const filteredProjects = projects.filter((p) =>
    activeTab === "All" ? true : p.category === activeTab
  )

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return
    const cards = cardsContainerRef.current?.querySelectorAll(".project-card-wrapper")
    if (!cards || cards.length === 0) {
      setActiveTab(newTab)
      return
    }

    gsap.to(cards, {
      x: -30,
      opacity: 0,
      stagger: 0.05,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setActiveTab(newTab),
    })
  }

  useEffect(() => {
    const cards = cardsContainerRef.current?.querySelectorAll(".project-card-wrapper")
    if (!cards || cards.length === 0) return

    gsap.fromTo(cards,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.08, duration: 0.35, ease: "power3.out" }
    )
  }, [activeTab])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
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
      id="projects"
      ref={sectionRef}
      className="no-snap"
      style={{
        padding: isMobile ? "80px 0" : "140px 0",
        background: "#0A0A0A",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 24px" : "0 40px" }}>
        <span className="section-label">03 / Projects</span>
        <h2 className="section-heading projects-heading">Things I've built.</h2>

        {/* TABS — simple inline tabs */}
        <div
          style={{
            display: "inline-flex",
            gap: "4px",
            padding: "4px",
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            marginBottom: "48px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: "7px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
                fontSize: "13px",
                fontWeight: activeTab === cat ? 700 : 400,
                background: activeTab === cat ? "#FFFFFF" : "transparent",
                color: activeTab === cat ? "#000000" : "#A0A0A0",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div
          ref={cardsContainerRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card-wrapper">
              <CometCard>
                <CardSpotlight
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "28px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{
                      fontFamily: "'Space Mono', monospace", fontSize: "10px",
                      border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px",
                      padding: "4px 10px", color: "white",
                    }}>
                      {project.category}
                    </span>
                    {project.featured && (
                      <span style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "10px",
                        border: "1px solid rgba(255,255,255,0.4)", borderRadius: "4px",
                        padding: "4px 10px", color: "white",
                      }}>
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: "'Space Mono', monospace", fontSize: "22px",
                    fontWeight: 700, color: "white", margin: "16px 0 8px",
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "15px",
                    color: "#A0A0A0", lineHeight: 1.7, flexGrow: 1,
                  }}>
                    {project.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px", padding: "4px 10px",
                        fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#A0A0A0",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                    {project.githubLink && (
                      <div style={{ flex: 1 }}>
                        <HoverBorderGradient
                          onClick={() => window.open(project.githubLink, "_blank")}
                          style={{ width: "100%" }}
                        >
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px" }}>GitHub</span>
                        </HoverBorderGradient>
                      </div>
                    )}
                    {project.deployLink && (
                      <div style={{ flex: 1 }}>
                        <HoverBorderGradient
                          onClick={() => window.open(project.deployLink, "_blank")}
                          style={{ width: "100%" }}
                        >
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px" }}>Live Demo →</span>
                        </HoverBorderGradient>
                      </div>
                    )}
                  </div>
                </CardSpotlight>
              </CometCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
