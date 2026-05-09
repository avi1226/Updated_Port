import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const WORDS_POOL = [
  "CHAOS", "BUILD", "SHIP", "BREAK", "DEBUG", "DEPLOY", "RENDER", "THINK", "CRASH", "LOOP",
  "STACK", "PUSH", "MERGE", "HACK", "DREAM", "ITERATE", "NULL", "VOID", "ASYNC", "ERROR","VIRAT","CRICKET","CODING","DSA","AVINASH","SLEEP","FOOD","PLAY","BGMI","PHONE"
];

const TypographyChaosRoom = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const flashRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // Initialize Matter.js
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Gravity
    engine.gravity.y = 1;

    // Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    runnerRef.current = runner;

    // Canvas setup
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update boundaries
      Matter.Composite.clear(world, false);
      bodiesRef.current = [];
      
      const ground = Matter.Bodies.rectangle(canvas.width / 2, canvas.height + 50, canvas.width, 100, { isStatic: true });
      const leftWall = Matter.Bodies.rectangle(-50, canvas.height / 2, 100, canvas.height, { isStatic: true });
      const rightWall = Matter.Bodies.rectangle(canvas.width + 50, canvas.height / 2, 100, canvas.height, { isStatic: true });
      
      Matter.Composite.add(world, [ground, leftWall, rightWall]);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Rendering loop
    let animationId;
    const render = () => {
      // Clear with background
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse following glow
      const mouse = mouseRef.current;
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 500
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Central ambient glow
      const ambientGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      ambientGradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      ambientGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flash effect
      if (flashRef.current > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashRef.current * 0.15})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flashRef.current *= 0.85;
        if (flashRef.current < 0.01) flashRef.current = 0;
      }

      // Mouse force application
      bodiesRef.current.forEach(body => {
        const dx = body.position.x - mouse.x;
        const dy = body.position.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const forceMagnitude = (150 - distance) / 150;
          Matter.Body.applyForce(body, body.position, {
            x: mouse.vx * 0.0005 * forceMagnitude,
            y: mouse.vy * 0.0005 * forceMagnitude
          });
        }
      });

      // Decay mouse velocity
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      // Render words
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add strong glow
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      
      bodiesRef.current.forEach(body => {
        const { x, y } = body.position;
        const angle = body.angle;
        const word = body.label;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.font = "bold 48px 'Space Mono', monospace";
        ctx.fillText(word, 0, 0);
        ctx.restore();
      });

      // Reset shadow for next frame
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, [isActive]);

  const spawnWord = (e) => {
    if (!isActive || !engineRef.current) return;

    if (showHint) setShowHint(false);
    flashRef.current = 1.0;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const word = WORDS_POOL[Math.floor(Math.random() * WORDS_POOL.length)];
    
    // Measure word
    const ctx = canvasRef.current.getContext('2d');
    ctx.font = "bold 48px 'Space Mono', monospace";
    const metrics = ctx.measureText(word);
    const width = metrics.width;
    const height = 40; // Approximate height for 48px font

    const body = Matter.Bodies.rectangle(x, y, width, height, {
      restitution: 0.4,
      friction: 0.1,
      angle: (Math.random() - 0.5) * (30 * Math.PI / 180),
      label: word
    });

    bodiesRef.current.push(body);
    Matter.Composite.add(engineRef.current.world, body);

    if (bodiesRef.current.length > 40) {
      const oldest = bodiesRef.current.shift();
      Matter.Composite.remove(engineRef.current.world, oldest);
    }
  };

  const handleMouseMove = (e) => {
    const mouse = mouseRef.current;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouse.vx = x - mouse.lastX;
    mouse.vy = y - mouse.lastY;
    mouse.x = x;
    mouse.y = y;
    mouse.lastX = x;
    mouse.lastY = y;
  };

  return (
    <section
      ref={containerRef}
      id="chaos-room"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0A',
        cursor: 'none' // We use the portfolio's custom cursor
      }}
      onClick={spawnWord}
      onMouseMove={handleMouseMove}
    >
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '10px',
        color: '#888888',
        letterSpacing: '0.2em',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        THE PLAYGROUND / CHAOS ROOM
      </div>

      {showHint && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Space Mono', monospace",
          fontSize: '12px',
          color: '#FFFFFF',
          letterSpacing: '0.5em',
          opacity: 0.8,
          pointerEvents: 'none',
          transition: 'opacity 0.5s ease'
        }}>
          CLICK ANYWHERE
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </section>
  );
};

export default TypographyChaosRoom;
