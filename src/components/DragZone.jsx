// src/components/DragZone.jsx
import { MapPin, Code2, Zap, Mail } from "lucide-react"
import { FollowingPointer } from "@/components/ui/following-pointer"
import { DraggableCard } from "@/components/ui/draggable-card"
import { useIsMobile } from "@/hooks/useIsMobile"

const CARDS_DATA = [
  {
    id: 1,
    title: "Based in Chennai 🌏",
    subtitle: "GMT+5:30 · Open to remote",
    icon: <MapPin size={18} color="#404040" />,
    x: "8%", y: "25%",
  },
  {
    id: 2,
    title: "Building since 2022",
    subtitle: "Self-taught, still learning",
    icon: <Code2 size={18} color="#404040" />,
    x: "33%", y: "15%",
  },
  {
    id: 3,
    title: "Currently: StudyMap",
    subtitle: "AI exam coaching app",
    icon: <Zap size={18} color="#404040" />,
    x: "57%", y: "35%",
  },
  {
    id: 4,
    title: "Open to freelance",
    subtitle: "DM me, let's build",
    icon: <Mail size={18} color="#404040" />,
    x: "76%", y: "20%",
  },
]

export default function DragZone() {
  const isMobile = useIsMobile()

  return (
    <section
      id="drag"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#111111",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    >
      <FollowingPointer>
        <div style={{ padding: "40px", position: "relative", zIndex: 5 }}>
          <span className="section-label">05 / Interactive</span>
          <h2 className="section-heading" style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "0" }}>
            A few things about me.
          </h2>
        </div>

        {isMobile ? (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px",
            padding: "0 24px 80px", maxWidth: "600px", margin: "0 auto",
          }}>
            {CARDS_DATA.map((card) => (
              <div key={card.id} style={{
                background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px", padding: "20px", position: "relative",
              }}>
                <div style={{ position: "absolute", top: "12px", right: "12px" }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", fontWeight: 700, color: "white" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#A0A0A0", marginTop: "4px" }}>
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ position: "relative", height: "calc(100vh - 200px)", minHeight: "400px" }}>
            {CARDS_DATA.map((card) => (
              <DraggableCard key={card.id} initialX={card.x} initialY={card.y}>
                <div style={{
                  width: "260px", background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
                  padding: "28px 32px", position: "relative",
                }}>
                  <div style={{ position: "absolute", top: "20px", right: "20px" }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "18px", fontWeight: 700, color: "white" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#A0A0A0", marginTop: "8px" }}>
                    {card.subtitle}
                  </p>
                </div>
              </DraggableCard>
            ))}
          </div>
        )}
      </FollowingPointer>
    </section>
  )
}
