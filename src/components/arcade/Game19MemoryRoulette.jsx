import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCw, Heart } from 'lucide-react';
import { playPop, playSparkle } from '../../utils/audio';

const SLICES = [
  { label: "Funny", color: "#fbbf24", memory: "The time we tried to make homemade ice cream and ended up with sweet salty milk." },
  { label: "Fight", color: "#f43f5e", memory: "The historic 2-hour battle over who got the bigger mango slice during summer holidays." },
  { label: "Embarrassing", color: "#a855f7", memory: "Singing full pitch in the car thinking the windows were tinted and up, only to realize the auto driver next to us was watching." },
  { label: "Wholesome", color: "#22c55e", memory: "When you secretly saved half of your chocolate bar and left it on my study table without saying a word." },
  { label: "Random", color: "#38bdf8", memory: "Creating an entire secret sibling language that consisted of 3 facial twitches and a cough." },
  { label: "Secret", color: "#e5c158", memory: "No matter how much we tease each other, I am always rooting for your dreams and happiness." }
];

export default function Game19MemoryRoulette({ onBack }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [landedSlice, setLandedSlice] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLandedSlice(null);

    // Random landing index
    const randomIdx = Math.floor(Math.random() * SLICES.length);
    const sliceAngle = 360 / SLICES.length;
    const targetRotation = rotation + 1440 + (360 - randomIdx * sliceAngle - sliceAngle / 2);

    playPop(500);
    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setLandedSlice(SLICES[randomIdx]);
      playSparkle();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }, 3200);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Roulette of Memories</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        SIBLING MEMORY ROULETTE 🎡
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Spin the wheel to unlock random authentic sibling moments!
      </p>

      {/* Spinning Wheel */}
      <div style={{ position: 'relative', width: '260px', height: '260px', margin: '0 auto 24px auto' }}>
        {/* Pointer at top */}
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: '20px solid var(--gold)',
          zIndex: 10,
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))'
        }} />

        {/* Circular Wheel Disk */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '4px solid var(--gold)',
          boxShadow: '0 0 30px var(--gold-glow)',
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 3.2s cubic-bezier(0.15, 0.9, 0.25, 1)',
          overflow: 'hidden',
          position: 'relative',
          background: '#0c0205'
        }}>
          {SLICES.map((s, i) => {
            const angle = (360 / SLICES.length) * i;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '50%',
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0% 0%',
                  transform: `rotate(${angle}deg)`,
                  background: `${s.color}25`,
                  borderTop: `1px solid ${s.color}50`,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '24px',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.8rem'
                }}
              >
                {s.label}
              </div>
            );
          })}
        </div>
      </div>

      {landedSlice ? (
        <div style={{
          background: 'rgba(229, 193, 88, 0.15)',
          border: `2px solid ${landedSlice.color}`,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <span style={{
            color: landedSlice.color,
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '4px'
          }}>
            Landed on {landedSlice.label} Memory!
          </span>
          <p style={{ color: 'var(--cream)', fontSize: '1.05rem', lineHeight: '1.5', margin: '8px 0 16px 0' }}>
            “{landedSlice.memory}”
          </p>
          <button onClick={spinWheel} className="btn-gold" style={{ justifyContent: 'center' }}>
            Spin Again 🎡
          </button>
        </div>
      ) : (
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="btn-gold"
          style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
        >
          <RotateCw size={18} className={isSpinning ? 'animate-spin' : ''} />
          {isSpinning ? "Spinning the Cosmic Wheel..." : "SPIN THE MEMORY WHEEL"}
        </button>
      )}
    </div>
  );
}
