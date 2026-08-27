import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { playBonk, playPop, playSparkle } from '../../utils/audio';

export default function Game3CatchChappal({ onBack }) {
  const [playerPos, setPlayerPos] = useState(50); // percentage: 20, 50, 80
  const [chappalPos, setChappalPos] = useState({ x: 50, y: 0 });
  const [score, setScore] = useState(0);
  const [isBonked, setIsBonked] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  // Lanes: 20%, 50%, 80%
  const lanes = [20, 50, 80];

  useEffect(() => {
    if (hasWon || isBonked) return;

    const interval = setInterval(() => {
      setChappalPos((prev) => {
        if (prev.y >= 85) {
          // Check collision
          if (Math.abs(prev.x - playerPos) < 15) {
            playBonk();
            setIsBonked(true);
            return prev;
          } else {
            // Dodged!
            playPop(700);
            setScore((s) => {
              const nextScore = s + 1;
              if (nextScore >= 10) {
                setHasWon(true);
                playSparkle();
                confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
              }
              return nextScore;
            });
            // Spawn next chappal in random lane
            const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
            return { x: randomLane, y: 0 };
          }
        }
        return { ...prev, y: prev.y + 12 };
      });
    }, 120);

    return () => clearInterval(interval);
  }, [playerPos, hasWon, isBonked]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos]);

  const moveLeft = () => {
    playPop(500);
    setPlayerPos((p) => (p === 80 ? 50 : p === 50 ? 20 : 20));
  };

  const moveRight = () => {
    playPop(500);
    setPlayerPos((p) => (p === 20 ? 50 : p === 50 ? 80 : 80));
  };

  const restart = () => {
    setPlayerPos(50);
    setChappalPos({ x: 50, y: 0 });
    setScore(0);
    setIsBonked(false);
    setHasWon(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '30px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Survival Dodge</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
        DODGE THE FLYING CHAPPAL 😭
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
        Dodge the incoming slippers! Reach 10 points to unlock Indian Sibling Mastery.
      </p>

      {/* Score Header */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        padding: '6px 20px',
        background: 'rgba(229, 193, 88, 0.1)',
        border: '1px solid var(--gold-border)',
        borderRadius: '9999px',
        marginBottom: '16px'
      }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Survival Score:</span>
        <strong style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>{score} / 10</strong>
      </div>

      {/* Mini 2D Arena */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '280px',
        background: 'radial-gradient(circle at center, #1b0610 0%, #0c0205 100%)',
        borderRadius: '16px',
        border: '1.5px solid var(--gold-border)',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        {/* Lane divider lines */}
        <div style={{ position: 'absolute', top: 0, left: '35%', width: '1px', height: '100%', borderLeft: '1px dashed rgba(229, 193, 88, 0.15)' }} />
        <div style={{ position: 'absolute', top: 0, left: '65%', width: '1px', height: '100%', borderLeft: '1px dashed rgba(229, 193, 88, 0.15)' }} />

        {/* Flying Chappal */}
        {!isBonked && !hasWon && (
          <div style={{
            position: 'absolute',
            top: `${chappalPos.y}%`,
            left: `${chappalPos.x}%`,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            fontSize: '2.4rem',
            transition: 'top 0.12s linear'
          }}>
            🩴
          </div>
        )}

        {/* Player Avatar */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: `${playerPos}%`,
          transform: 'translateX(-50%)',
          fontSize: '2.5rem',
          transition: 'left 0.15s ease-out'
        }}>
          {isBonked ? '😵' : hasWon ? '😎' : '🏃‍♂️'}
        </div>

        {/* Comic BONK text on hit */}
        {isBonked && (
          <div className="animate-shake" style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3rem',
            fontWeight: 900,
            color: '#ef4444',
            textShadow: '0 0 20px #000'
          }}>
            💥 BONK!
          </div>
        )}
      </div>

      {/* Result or Controls */}
      {hasWon ? (
        <div style={{ background: 'rgba(229, 193, 88, 0.15)', padding: '20px', borderRadius: '16px', border: '1.5px solid var(--gold)', marginBottom: '16px' }}>
          <Award size={36} color="var(--gold)" style={{ margin: '0 auto 8px auto' }} />
          <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '6px' }}>
            ACHIEVEMENT UNLOCKED!
          </h4>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>
            🏆 Experienced Indian Sibling
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Reflexes forged by years of living with Vyshuu.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
            <button onClick={restart} className="btn-secondary">
              <RotateCcw size={16} /> Replay
            </button>
            <button onClick={onBack} className="btn-gold">
              Arcade Lobby
            </button>
          </div>
        </div>
      ) : isBonked ? (
        <div>
          <p style={{ color: 'var(--rose-light)', fontWeight: 600, marginBottom: '16px' }}>
            Target acquired! The chappal found its mark.
          </p>
          <button onClick={restart} className="btn-gold" style={{ justifyContent: 'center' }}>
            <RotateCcw size={16} /> Try Again
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button onClick={moveLeft} className="btn-secondary" style={{ padding: '14px 28px' }}>
            <ArrowLeft size={20} /> Left
          </button>
          <button onClick={moveRight} className="btn-secondary" style={{ padding: '14px 28px' }}>
            Right <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
