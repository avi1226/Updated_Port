import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CinematicLoader({ onComplete, text1 = "INITIALIZING NEXT SECTION...", text2 = "LOADING ASSETS", duration = 1500, active = false }) {
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
        }, 200);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [active, duration, onComplete, completed]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-black overflow-hidden font-mono text-white">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="z-10 flex flex-col items-start w-full max-w-[90vw] md:max-w-xl px-6">
        <motion.div 
          className="text-[10px] md:text-xs text-neutral-500 mb-2 tracking-[0.3em] uppercase"
          animate={active && progress < 100 ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {progress === 100 ? "SYSTEM READY" : text2}
        </motion.div>
        
        <div className="flex items-center text-sm md:text-base tracking-[0.2em] font-bold mb-6 h-6">
          <motion.span 
            animate={active && progress < 100 ? { x: [-1, 1, -0.5, 0.5, 0] } : { x: 0 }} 
            transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror", repeatDelay: 1.2 }}
          >
            {text1}
          </motion.span>
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
            className="ml-2 w-[8px] h-[16px] bg-white block"
          />
        </div>

        {/* Loading Bar */}
        <div className="w-full h-[1px] bg-neutral-800 relative mb-4">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            initial={{ width: "0%" }}
            animate={active ? { width: `${progress}%` } : {}}
            transition={{ duration: 0 }}
          />
        </div>

        {/* Counter */}
        <div className="flex justify-between w-full text-[10px] text-neutral-400 font-bold tracking-[0.2em]">
          <span>{progress === 100 ? "ACCESS GRANTED" : "SYS.OP."}</span>
          <span>{progress}%</span>
        </div>
      </div>
      
      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,white_2px,white_4px)]"></div>
    </div>
  );
}
