import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CinematicLoader({ onComplete, text1 = "loading...", duration = 2500, active = false }) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!active || completed) return;
    
    let start = null;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.floor(currentProgress));
      
      if (currentProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCompleted(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [active, duration, onComplete, completed]);

  return (
    <div className="w-full h-full flex flex-col relative bg-black overflow-hidden font-mono text-white selection:bg-white/20">
      {/* Grid Background with moving glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Subtle Moving Glow */}
      <motion.div 
        className="absolute rounded-full bg-white/5 blur-[100px] pointer-events-none"
        style={{ 
          width: "max(40vw, 300px)", 
          height: "max(40vw, 300px)",
          top: "50%", 
          left: "50%", 
          marginLeft: "-max(20vw, 150px)",
          marginTop: "-max(20vw, 150px)"
        }}
        animate={active ? { 
          x: ["-10%", "10%", "0%", "-10%"], 
          y: ["-10%", "5%", "-5%", "-10%"],
          opacity: [0.3, 0.7, 0.3]
        } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Container for bottom elements */}
      <div className="absolute bottom-16 left-0 right-0 px-8 md:px-16 flex flex-col items-center z-10">
        {/* Loader Text & Percentage */}
        <div className="flex justify-between w-full max-w-[200px] mb-4 text-[9px] md:text-[10px] text-neutral-500 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-1 h-1 bg-white rounded-full"
              animate={active && progress < 100 ? { opacity: [1, 0.2] } : { opacity: 1 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
            <span>{progress === 100 ? "completed" : text1}</span>
          </div>
          <span className="tabular-nums">{progress}%</span>
        </div>

        {/* Tiny Loading Line */}
        <div className="w-full max-w-[200px] h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            initial={{ width: "0%" }}
            animate={active ? { width: `${progress}%` } : {}}
            transition={{ duration: 0 }}
          />
        </div>
      </div>
      
      {/* Very Subtle scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,white_2px,white_4px)]"></div>
    </div>
  );
}

