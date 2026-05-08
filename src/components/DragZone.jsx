// src/components/DragZone.jsx
import { MapPin, Code2, Zap, Mail, Coffee } from "lucide-react"
import { FollowingPointer } from "@/components/ui/following-pointer"
import { DraggableCard } from "@/components/ui/draggable-card"
import { useIsMobile } from "@/hooks/useIsMobile"

const CARDS_DATA = [
  {
    id: 1,
    title: "From Hyderabad Currently Studying in Chennai 🌏",
    subtitle: "GMT+5:30 · Open to remote",
    icon: <MapPin size={18} color="#404040" />,
    x: "5%", y: "15%",
  },
  {
    id: 2,
    title: "Building since 2024",
    subtitle: "Self-taught, still learning",
    icon: <Code2 size={18} color="#404040" />,
    x: "38%", y: "8%",
  },
  {
    id: 3,
    title: "Currently: ExpenseSpliter",
    subtitle: "Split bills effortlessly with friends.",
    icon: <Zap size={18} color="#404040" />,
    x: "68%", y: "20%",
  },
  {
    id: 4,
    title: "Open to freelance",
    subtitle: "DM me, let's build",
    icon: <Mail size={18} color="#404040" />,
    x: "60%", y: "60%",
  },
  {
    id: 5,
    title: "Hobbies",
    subtitle: "Playing Cricket, Watching Esports, Gaming, and building projects.",
    icon: <Coffee size={18} color="#404040" />,
    x: "15%", y: "65%",
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
                animation: `floatCardMobile ${3 + (card.id % 2)}s ease-in-out infinite`,
                animationDelay: `${card.id * 0.2}s`,
              }}>
                <div style={{ position: "absolute", top: "12px", right: "12px" }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", fontWeight: 700, color: "white", paddingRight: "24px" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#A0A0A0", marginTop: "12px" }}>
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ position: "relative", height: "calc(100vh - 200px)", minHeight: "400px" }}>
            <style>{`
              @keyframes floatCard {
                0% { transform: translate(0px, 0px) rotate(0deg); }
                33% { transform: translate(6px, -12px) rotate(1.5deg); }
                66% { transform: translate(-6px, 8px) rotate(-1deg); }
                100% { transform: translate(0px, 0px) rotate(0deg); }
              }
              @keyframes floatCardMobile {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-3px); }
                100% { transform: translateY(0px); }
              }
            `}</style>
            {CARDS_DATA.map((card, i) => (
              <DraggableCard key={card.id} initialX={card.x} initialY={card.y}>
                <div style={{
                  width: "260px", background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
                  padding: "28px 32px", position: "relative",
                  animation: `floatCard ${4 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}>
                  <div style={{ position: "absolute", top: "20px", right: "20px" }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "18px", fontWeight: 700, color: "white", paddingRight: "28px" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#A0A0A0", marginTop: "16px" }}>
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
