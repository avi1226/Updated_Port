// src/components/Skills.jsx
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import Matter from "matter-js"
import { LogoLoop } from "@/components/bits/LogoLoop"
import { FloatingDock } from "@/components/ui/floating-dock"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Atom, Terminal, Database, GitBranch, Cpu, Code2 } from "lucide-react"

const SKILLS_LIST = [
  "React", "TypeScript", "Node.js", "Python", "Next.js", "TailwindCSS",
  "PostgreSQL", "MongoDB", "Docker", "Figma", "Git", "GSAP"
]

const DOCK_ITEMS = [
  { title: "React", icon: <Atom size={20} color="white" /> },
  { title: "TypeScript", icon: <Terminal size={20} color="white" /> },
  { title: "Node", icon: <Database size={20} color="white" /> },
  { title: "Python", icon: <Cpu size={20} color="white" /> },
  { title: "Figma", icon: <Code2 size={20} color="white" /> },
  { title: "Git", icon: <GitBranch size={20} color="white" /> },
]

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

  // Physics
  useEffect(() => {
    if (isMobile || !physicsZoneRef.current) return

    const container = physicsZoneRef.current
    const width = container.offsetWidth
    const height = 420

    const engine = Matter.Engine.create({ gravity: { y: 1.2 } })

    // Boundaries
    const ground = Matter.Bodies.rectangle(width / 2, height + 15, width, 30, { isStatic: true })
    const leftWall = Matter.Bodies.rectangle(-15, height / 2, 30, height, { isStatic: true })
    const rightWall = Matter.Bodies.rectangle(width + 15, height / 2, 30, height, { isStatic: true })

    // Create skill bodies
    const bodies = SKILLS_LIST.map((skill, index) =>
      Matter.Bodies.rectangle(
        Math.random() * (width - 160) + 80,
        -100 - index * 80,
        100, 44,
        { restitution: 0.4, friction: 0.3, density: 0.002, chamfer: { radius: 8 }, label: skill }
      )
    )

    Matter.World.add(engine.world, [ground, leftWall, rightWall, ...bodies])

    // Create DIVs
    const bodyDivs = bodies.map((body) => {
      const div = document.createElement("div")
      div.innerText = body.label
      Object.assign(div.style, {
        position: "absolute",
        width: "100px",
        height: "44px",
        background: "#1A1A1A",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Mono', monospace",
        fontSize: "11px",
        color: "white",
        pointerEvents: "auto",
        userSelect: "none",
        transformOrigin: "center",
        cursor: "grab",
      })
      container.appendChild(div)

      div.addEventListener("click", () => {
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.015,
          y: -0.07,
        })
      })

      return { body, div }
    })

    // Mouse constraint
    const mouse = Matter.Mouse.create(container)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse, constraint: { stiffness: 0.2, render: { visible: false } },
    })
    Matter.World.add(engine.world, mouseConstraint)

    // Sync loop
    let rafId
    const sync = () => {
      bodyDivs.forEach(({ body, div }) => {
        div.style.transform = `translate(${body.position.x - 50}px, ${body.position.y - 22}px) rotate(${body.angle}rad)`
      })
      Matter.Engine.update(engine)
      rafId = requestAnimationFrame(sync)
    }
    sync()

    return () => {
      cancelAnimationFrame(rafId)
      Matter.Engine.clear(engine)
      Matter.World.clear(engine.world)
      bodyDivs.forEach(({ div }) => div.remove())
    }
  }, [isMobile])

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

        {/* PHYSICS ZONE / MOBILE PILLS */}
        {isMobile ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
            {SKILLS_LIST.map((skill) => (
              <span key={skill} style={{
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: "100px",
                padding: "8px 20px", fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "white",
              }}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <div
            id="physics-zone"
            ref={physicsZoneRef}
            aria-hidden="true"
            style={{
              position: "relative", height: "420px", overflow: "hidden", marginBottom: "80px",
              background: "rgba(255,255,255,0.02)", borderRadius: "16px",
              border: "1px dashed rgba(255,255,255,0.05)",
            }}
          />
        )}

        {/* FLOATING DOCK */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FloatingDock items={DOCK_ITEMS} />
        </div>
      </div>
    </section>
  )
}
