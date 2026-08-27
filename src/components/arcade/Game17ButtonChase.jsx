import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

export default function Game17ButtonChase({ onBack }) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isCaught, setIsCaught] = useState(false);

  const handleHover = () => {
    if (escapeCount < 4) {
      playBonk();
      const nextCount = escapeCount + 1;
      setEscapeCount(nextCount);
      // Move button randomly within box
      setPos({
        x: (Math.random() - 0.5) * 220,
        y: (Math.random() - 0.5) * 140
      });
    }
  };

  const handleClick = () => {
    if (escapeCount >= 4) {
      playSparkle();
      setIsCaught(true);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    }
  };

  const restart = () => {
    setEscapeCount(0);
    setPos({ x: 0, y: 0 });
    setIsCaught(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '36px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Agility Test</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        THE BUTTON CHASE 🏃‍♀️
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Catch the elusive secret button! Dodges remaining: {Math.max(0, 4 - escapeCount)}
      </p>

      {/* Chase Arena */}
      <div style={{
        height: '240px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, #1b0610 0%, #0c0205 100%)',
        borderRadius: '16px',
        border: '1.5px solid var(--gold-border)',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        {isCaught ? (
          <div style={{ padding: '20px', animation: 'floatGentle 3s ease-in-out infinite' }}>
            <Heart size={44} color="var(--rose)" fill="var(--rose)" style={{ margin: '0 auto 10px auto' }} />
            <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '6px' }}>
              SECRET UNLOCKED! ❤️
            </h4>
            <p style={{ color: '#fff', fontSize: '1.05rem', lineHeight: '1.5' }}>
              “Secret: I knew you’d actually chase this button across the screen! <br />
              <span style={{ color: 'var(--rose-light)' }}>
                Happy Raksha Bandhan, Vyshuuu! You are one of a kind.
              </span>”
            </p>
          </div>
        ) : (
          <button
            onMouseEnter={handleHover}
            onClick={handleClick}
            className="btn-rose"
            style={{
              position: 'absolute',
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: escapeCount >= 4 ? 'pointer' : 'default',
              boxShadow: '0 0 25px var(--rose-glow)'
            }}
          >
            <Sparkles size={16} />
            {escapeCount >= 4 ? "CLICK ME NOW!" : "Click for Secret"}
          </button>
        )}
      </div>

      {isCaught && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={restart} className="btn-secondary">
            <RotateCcw size={16} /> Replay
          </button>
          <button onClick={onBack} className="btn-gold">
            Return to Arcade
          </button>
        </div>
      )}
    </div>
  );
}
