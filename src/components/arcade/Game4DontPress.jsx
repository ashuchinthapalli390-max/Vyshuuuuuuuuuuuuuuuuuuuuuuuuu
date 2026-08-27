import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AlertOctagon, RotateCcw, Sparkles } from 'lucide-react';
import { playBonk, playPop, playLaser, playSparkle } from '../../utils/audio';

const RESPONSES = [
  "“Vyshuu.”",
  "“I literally wrote DO NOT PRESS in capital letters.”",
  "“Why do you always do the exact opposite of what you're told? 😂”",
  "“Okay, you asked for this. System integrity failing...”",
  "🚨 SIBLING EMBARRASSMENT PROTOCOL ACTIVATED!"
];

export default function Game4DontPress({ onBack }) {
  const [pressCount, setPressCount] = useState(0);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePress = () => {
    const nextCount = pressCount + 1;
    setPressCount(nextCount);

    if (nextCount === 1) {
      playPop(400);
    } else if (nextCount === 2) {
      playBonk();
    } else if (nextCount === 3) {
      playLaser();
      setBtnOffset({
        x: (Math.random() - 0.5) * 160,
        y: (Math.random() - 0.5) * 80
      });
    } else if (nextCount === 4) {
      playBonk();
      setBtnOffset({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100
      });
    } else if (nextCount >= 5) {
      playSparkle();
      setIsUnlocked(true);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    }
  };

  const restart = () => {
    setPressCount(0);
    setBtnOffset({ x: 0, y: 0 });
    setIsUnlocked(false);
  };

  return (
    <div className="glass-panel" style={{
      padding: '36px 20px',
      maxWidth: '540px',
      margin: '0 auto',
      textAlign: 'center',
      transform: pressCount === 4 ? 'rotate(1.5deg)' : 'none',
      transition: 'transform 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span className="badge-rose">Reverse Psychology</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
        DON’T PRESS THE BUTTON
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px' }}>
        Whatever you do, keep your fingers away from the red button.
      </p>

      {isUnlocked ? (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '2px solid var(--rose)',
          borderRadius: '16px',
          padding: '24px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <Sparkles size={36} color="var(--gold)" style={{ margin: '0 auto 10px auto' }} />
          <h4 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '8px' }}>
            SECRET EMBARRASSING MEMORY UNLOCKED!
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '16px' }}>
            “Remember that time you tried to blame the broken cup on the imaginary cat when our house literally has no pets? 😂 Caught in 4K!”
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={restart} className="btn-secondary">
              <RotateCcw size={16} /> Reset Button
            </button>
            <button onClick={onBack} className="btn-gold">
              Back to Arcade
            </button>
          </div>
        </div>
      ) : (
        <div style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {pressCount > 0 && (
            <p style={{
              color: 'var(--gold-champagne)',
              fontWeight: 700,
              fontSize: '1.1rem',
              marginBottom: '20px',
              minHeight: '28px'
            }}>
              {RESPONSES[pressCount - 1]}
            </p>
          )}

          <button
            onClick={handlePress}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #f87171, #dc2626 60%, #991b1b)',
              border: '6px solid #7f1d1d',
              boxShadow: '0 12px 30px rgba(220, 38, 38, 0.6), inset 0 4px 10px rgba(255, 255, 255, 0.4)',
              color: '#fff',
              fontWeight: 900,
              fontSize: '1.1rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              transform: `translate(${btnOffset.x}px, ${btnOffset.y}px) scale(${pressCount === 0 ? 1 : 0.96})`,
              transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <AlertOctagon size={28} />
            DO NOT<br />PRESS
          </button>
        </div>
      )}
    </div>
  );
}
