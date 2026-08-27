import React, { useState } from 'react';
import { Utensils, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../utils/audio';

const BITE_RESPONSES = [
  "“Hmm okay, this bite was decent.”",
  "“Wait, starting to feel full…”",
  "“CHAALU! Nenu full asalu! 😭”",
  "“Arey Ashu stop! I cannot eat one more grain!”",
  "“If you force one more bite, I am reporting you to Mom! 😂”",
  "“Fine, but you have to finish the entire plate!”"
];

export default function VyshuuVsFood() {
  const [bites, setBites] = useState(0);
  const [isFeeding, setIsFeeding] = useState(false);

  const handleBite = () => {
    if (isFeeding) return;
    setIsFeeding(true);
    const nextBite = bites + 1;
    setBites(nextBite);

    if (nextBite === 3) {
      playBonk();
    } else if (nextBite >= 5) {
      playSparkle();
    } else {
      playPop(550 + nextBite * 60);
    }

    setTimeout(() => setIsFeeding(false), 300);
  };

  const restart = () => {
    playPop(400);
    setBites(0);
  };

  // Plate capacity remaining
  const remainingPercent = Math.max(10, 100 - bites * 18);
  const responseText = BITE_RESPONSES[Math.min(bites, BITE_RESPONSES.length - 1)];

  return (
    <section style={{
      padding: '70px 16px',
      maxWidth: '680px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(244,63,94,0.12)',
        border: '1px solid var(--rose)',
        padding: '4px 14px',
        borderRadius: '9999px',
        marginBottom: '10px'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--rose-light)', fontWeight: 700 }}>
          The Universal Sister Mystery
        </span>
      </div>

      <h2 className="font-serif text-gold-gradient" style={{
        fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
        fontWeight: 900,
        marginBottom: '6px'
      }}>
        VYSHUU VS FOOD 😭
      </h2>

      <p style={{
        color: 'var(--cream-dim)',
        fontSize: '0.95rem',
        maxWidth: '520px',
        margin: '0 auto 24px auto'
      }}>
        Scientific Fact: Exactly 3 bites into any meal, Vyshuu says <strong>“chaalu”</strong>.
      </p>

      {/* Interactive Plate Card */}
      <div className="glass-panel" style={{
        padding: '30px 20px',
        border: '1.5px solid var(--gold-border-bright)',
        boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 25px var(--gold-glow)'
      }}>
        {/* Animated Plate Illustration */}
        <div style={{
          position: 'relative',
          width: '140px',
          height: '140px',
          margin: '0 auto 20px auto',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fef3c7 0%, #d4af37 100%)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.6), inset 0 2px 10px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease',
          transform: isFeeding ? 'scale(0.94)' : 'scale(1)'
        }}>
          {/* Sweets & Food Items */}
          <div style={{
            fontSize: '2.5rem',
            filter: `grayscale(${100 - remainingPercent}%)`,
            transition: 'all 0.3s ease'
          }}>
            {remainingPercent > 60 ? '🍛🍧' : remainingPercent > 25 ? '🍰' : '✨'}
          </div>

          {/* Bite Spoon Animation */}
          {isFeeding && (
            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '-15px',
              fontSize: '2rem',
              animation: 'bounce 0.3s ease'
            }}>
              🥄
            </div>
          )}
        </div>

        {/* Plate Meter Bar */}
        <div style={{ maxWidth: '340px', margin: '0 auto 16px auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>FOOD REMAINING: {remainingPercent}%</span>
            <span>BITES TAKEN: {bites}</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{
              width: `${remainingPercent}%`,
              height: '100%',
              background: remainingPercent > 40 ? 'linear-gradient(90deg, #e5c158, #f43f5e)' : '#ef4444',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Dynamic Reaction Box */}
        <div style={{
          minHeight: '64px',
          background: bites >= 3 ? 'rgba(244,63,94,0.15)' : 'rgba(229,193,88,0.1)',
          border: bites >= 3 ? '1.5px solid var(--rose)' : '1px solid var(--gold-border)',
          borderRadius: '14px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '20px'
        }}>
          {bites === 0 ? "“Plate is ready! Tap spoon to feed Vyshuu.”" : responseText}
        </div>

        {/* Feeding Button (Mobile-first min 48px height) */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleBite}
            className="btn-rose"
            style={{
              minHeight: '48px',
              padding: '12px 28px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            <Utensils size={18} />
            One More Bite 🥄
          </button>

          {bites > 0 && (
            <button
              onClick={restart}
              className="btn-secondary"
              style={{
                minHeight: '48px',
                padding: '12px 18px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
