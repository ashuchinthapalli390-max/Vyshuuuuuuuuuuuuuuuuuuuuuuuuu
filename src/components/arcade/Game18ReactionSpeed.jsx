import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Zap, RotateCcw, Award } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

const NAMES = ["Vishu", "Vysuuu", "Vyshu", "Vyyyy", "VishuBaby", "Vyshuuu", "VYSHUUUUUUUUUU"];

export default function Game18ReactionSpeed({ onBack }) {
  const [currentName, setCurrentName] = useState("Get Ready...");
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  const targetTimeRef = useRef(0);
  const timerRef = useRef(null);

  const startGame = () => {
    setIsPlaying(true);
    setResult(null);
    setCurrentName("Wait for it...");
    playPop(500);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < 5) {
        const fakeName = NAMES[Math.floor(Math.random() * (NAMES.length - 1))];
        setCurrentName(fakeName);
        playPop(600);
      } else {
        // Target appears!
        clearInterval(interval);
        setCurrentName("VYSHUUUUUUUUUU");
        targetTimeRef.current = Date.now();
        playSparkle();
      }
    }, 700);

    timerRef.current = interval;
  };

  const handleTap = () => {
    if (!isPlaying) return;

    if (currentName === "VYSHUUUUUUUUUU") {
      // Success!
      const timeTaken = Date.now() - targetTimeRef.current;
      playSparkle();
      setIsPlaying(false);
      setResult({
        success: true,
        ms: timeTaken,
        msg: timeTaken < 350 ? "⚡ LIGHTNING SPEED! Certified brother-annoying reflexes." : "👍 Acceptable speed! Sibling radar functioning."
      });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else {
      // Early tap
      playBonk();
      clearInterval(timerRef.current);
      setIsPlaying(false);
      setResult({
        success: false,
        msg: "“Impatient, as expected! 😭 Tapped before the exact name appeared!”"
      });
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Reflex Test</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        REACTION SPEED TEST ⚡
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Tap ONLY when the exact target <strong style={{ color: 'var(--gold)' }}>VYSHUUUUUUUUUU</strong> appears!
      </p>

      {/* Target Flash Box */}
      <div 
        onClick={handleTap}
        style={{
          height: '180px',
          background: currentName === "VYSHUUUUUUUUUU" ? 'radial-gradient(circle at center, #22c55e30, #0a0104)' : 'radial-gradient(circle at center, #1b0610 0%, #0c0205 100%)',
          border: currentName === "VYSHUUUUUUUUUU" ? '2px solid #22c55e' : '1.5px solid var(--gold-border)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
          fontWeight: 900,
          color: currentName === "VYSHUUUUUUUUUU" ? '#22c55e' : 'var(--gold)',
          letterSpacing: '2px',
          cursor: isPlaying ? 'pointer' : 'default',
          boxShadow: currentName === "VYSHUUUUUUUUUU" ? '0 0 30px #22c55e' : 'none',
          transition: 'all 0.15s ease',
          marginBottom: '20px'
        }}
      >
        {currentName}
      </div>

      {result ? (
        <div style={{
          background: result.success ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1.5px solid ${result.success ? '#22c55e' : '#ef4444'}`,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: result.success ? '#22c55e' : '#ef4444', fontSize: '1.2rem', marginBottom: '6px' }}>
            {result.success ? `Reaction Time: ${result.ms}ms!` : "FOUL TAP!"}
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '0.95rem', marginBottom: '16px' }}>
            {result.msg}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={startGame} className="btn-secondary">
              <RotateCcw size={16} /> Try Again
            </button>
            <button onClick={onBack} className="btn-gold">
              Return to Arcade
            </button>
          </div>
        </div>
      ) : isPlaying ? (
        <button onClick={handleTap} className="btn-rose" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
          TAP TAP TAP! 🎯
        </button>
      ) : (
        <button onClick={startGame} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
          <Zap size={18} />
          Start Reaction Test
        </button>
      )}
    </div>
  );
}
