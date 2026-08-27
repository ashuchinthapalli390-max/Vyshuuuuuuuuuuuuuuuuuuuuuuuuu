import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor({ cursorMode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [speechBubble, setSpeechBubble] = useState('Hi Vyshuu 👋');
  const [particles, setParticles] = useState([]);
  const [isIdle, setIsIdle] = useState(false);

  // Animated positions
  const teddyPosRef = useRef({ x: window.innerWidth + 100, y: 150 });
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const prevMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const tiltRef = useRef(0);
  const teddyElRef = useRef(null);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Hide initial speech bubble after 2.5 seconds
    const bubbleTimer = setTimeout(() => {
      setSpeechBubble('');
    }, 2800);

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setIsIdle(false);
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Calculate velocity
      const vx = e.clientX - prevMouseRef.current.x;
      const vy = e.clientY - prevMouseRef.current.y;
      velocityRef.current = { vx, vy };
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      // Target rotation clamped
      tiltRef.current = Math.max(-8, Math.min(8, vx * 0.35));

      // Reset idle timer
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
        tiltRef.current = 0;
      }, 2500);

      // Check clickable element
      const target = e.target;
      const clickable = target && (target.closest('button') || target.closest('a') || target.closest('[data-cursor]'));
      setIsHovering(!!clickable);
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Spawn 2 tiny heart / sparkle particles
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: Math.random() > 0.5 ? '❤️' : '✨'
      };
      setParticles(prev => [...prev.slice(-4), newParticle]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 700);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Physics Animation Loop
    let animFrame;
    const animate = () => {
      // Smooth lerp physics: x += (targetX - x) * 0.16
      const current = teddyPosRef.current;
      const target = mousePosRef.current;

      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      if (teddyElRef.current) {
        // Hotspot offset: paw near pointer, body slightly offset bottom-right
        const offsetX = 4;
        const offsetY = 4;
        const scale = isClicking ? 0.88 : (isHovering ? 1.18 : 1);
        const rotation = tiltRef.current;

        teddyElRef.current.style.transform = `translate3d(${current.x + offsetX}px, ${current.y + offsetY}px, 0) rotate(${rotation}deg) scale(${scale})`;
      }

      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    return () => {
      clearTimeout(bubbleTimer);
      clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, [isClicking, isHovering]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Living Teddy Mascot Cursor */}
      <div
        ref={teddyElRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          transition: 'filter 0.2s ease'
        }}
      >
        {/* Living Teddy Mascot Image */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: isIdle ? 'floatGentle 2.2s ease-in-out infinite' : 'none'
        }}>
          <img
            src="/cursor.png"
            alt="Teddy Mascot"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: isHovering 
                ? 'drop-shadow(0 0 10px rgba(229,193,88,0.85)) drop-shadow(0 4px 10px rgba(0,0,0,0.5))' 
                : 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
              transform: isHovering ? 'rotate(-6deg)' : 'none',
              transition: 'transform 0.15s ease'
            }}
          />

          {/* Hover Waving Sparkle Ring */}
          {isHovering && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              fontSize: '12px',
              animation: 'spinSlow 3s linear infinite'
            }}>
              ✨
            </span>
          )}

          {/* Initial Speech Bubble: “Hi Vyshuu 👋” */}
          {speechBubble && (
            <div style={{
              position: 'absolute',
              top: '-32px',
              left: '20px',
              background: '#fff',
              color: '#1a0702',
              fontSize: '0.74rem',
              fontWeight: 800,
              padding: '3px 9px',
              borderRadius: '9999px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              border: '1.5px solid var(--gold)',
              animation: 'fadeInScale 0.3s ease forwards'
            }}>
              {speechBubble}
            </div>
          )}
        </div>
      </div>

      {/* Pop Particles on Click */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: `${p.x}px`,
            top: `${p.y}px`,
            pointerEvents: 'none',
            zIndex: 999998,
            fontSize: '1.2rem',
            animation: 'floatGentle 0.7s ease-out forwards',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {p.emoji}
        </div>
      ))}
    </>
  );
}
