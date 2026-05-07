// src/components/ui/encrypted-text.jsx
import { useState, useEffect, useRef } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

export function EncryptedText({ text, trigger = false, className = "", style = {} }) {
  const [displayText, setDisplayText] = useState(text)
  const [isDecrypted, setIsDecrypted] = useState(false)
  const intervalRef = useRef(null)

  const decrypt = () => {
    if (isDecrypted) return
    let iteration = 0
    const chars = text.split("")
    const total = chars.length

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplayText(
        chars
          .map((char, i) => {
            if (char === " " || char === "\n") return char
            if (i < iteration) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )
      iteration += 1
      if (iteration > total) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsDecrypted(true)
      }
    }, 30)
  }

  useEffect(() => {
    if (trigger) {
      setTimeout(decrypt, 300)
    }
    return () => clearInterval(intervalRef.current)
  }, [trigger])

  return (
    <p className={className} style={{ whiteSpace: "pre-wrap", ...style }}>
      {displayText}
    </p>
  )
}
