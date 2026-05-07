// src/components/bits/LogoLoop.jsx

const logos = [
  { name: "React", svg: "⚛" },
  { name: "TypeScript", svg: "TS" },
  { name: "JavaScript", svg: "JS" },
  { name: "Node.js", svg: "⬡" },
  { name: "Python", svg: "🐍" },
  { name: "Next.js", svg: "▲" },
  { name: "TailwindCSS", svg: "~" },
  { name: "PostgreSQL", svg: "🐘" },
  { name: "MongoDB", svg: "🍃" },
  { name: "Docker", svg: "🐋" },
  { name: "Figma", svg: "◈" },
  { name: "Git", svg: "⌥" },
]

function LogoItem({ name, svg }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 24px",
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "8px",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      <span style={{ fontSize: "18px", filter: "grayscale(1) brightness(2)" }}>{svg}</span>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#A0A0A0", whiteSpace: "nowrap" }}>
        {name}
      </span>
    </div>
  )
}

function MarqueeRow({ reverse = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          animation: `marquee-${reverse ? "reverse" : "forward"} 30s linear infinite`,
          willChange: "transform",
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <LogoItem key={i} {...logo} />
        ))}
      </div>
      <style>{`
        @keyframes marquee-forward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${logos.length * 160}px); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-${logos.length * 160}px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export function LogoLoop() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", overflow: "hidden" }}>
      <MarqueeRow reverse={false} />
      <MarqueeRow reverse={true} />
    </div>
  )
}
