// src/components/ui/tabs.jsx
import { useState } from "react"

export function Tabs({ tabs = [], onTabChange, className = "" }) {
  const [activeTab, setActiveTab] = useState(tabs[0] || "")

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        gap: "4px",
        padding: "4px",
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          style={{
            padding: "8px 20px",
            borderRadius: "7px",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
            fontSize: "13px",
            fontWeight: activeTab === tab ? "700" : "400",
            background: activeTab === tab ? "#FFFFFF" : "transparent",
            color: activeTab === tab ? "#000000" : "#A0A0A0",
            transition: "all 0.2s ease",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
