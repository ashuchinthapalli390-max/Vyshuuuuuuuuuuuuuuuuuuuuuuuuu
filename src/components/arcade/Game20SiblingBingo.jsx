import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, RotateCcw } from 'lucide-react';
import { playPop, playSparkle } from '../../utils/audio';

const BINGO_ITEMS = [
  "Started random argument", "Said 'chaalu' early", "Forgot why we were fighting", "Shared funny meme",
  "Made mom intervene", "Random 2 AM laughing", "Borrowed without asking", "Acted like nothing happened",
  "Complained about food while eating it", "Took 50 selfies, kept 1", "Asked for Wi-Fi restart", "Hid the TV remote",
  "Stole socks silently", "Pretended to be asleep", "Cheated in Ludo/cards", "Sent screaming voice note"
];

export default function Game20SiblingBingo({ onBack }) {
  const [selected, setSelected] = useState(new Set());
  const [hasBingo, setHasBingo] = useState(false);

  const toggleItem = (idx) => {
    playPop(600);
    const nextSet = new Set(selected);
    if (nextSet.has(idx)) {
      nextSet.delete(idx);
    } else {
      nextSet.add(idx);
    }
    setSelected(nextSet);

    // Simple winning condition: 4 or more clicked!
    if (nextSet.size >= 4 && !hasBingo) {
      setHasBingo(true);
      playSparkle();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    }
  };

  const restart = () => {
    setSelected(new Set());
    setHasBingo(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Interactive Bingo Card</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        SIBLING CHAOS BINGO 🎯
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
        Tap all the habits that apply to us. Mark 4 boxes to achieve SIBLING BINGO!
      </p>

      {/* 4x4 Bingo Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        marginBottom: '24px'
      }}>
        {BINGO_ITEMS.map((item, idx) => {
          const isMarked = selected.has(idx);
          return (
            <button
              key={idx}
              onClick={() => toggleItem(idx)}
              style={{
                aspectRatio: '1',
                padding: '8px 4px',
                borderRadius: '12px',
                border: isMarked ? '2px solid var(--gold)' : '1px solid var(--gold-border)',
                background: isMarked ? 'rgba(229, 193, 88, 0.25)' : 'rgba(20, 5, 12, 0.75)',
                color: isMarked ? '#fff' : 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: isMarked ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1.2',
                transition: 'all 0.2s ease',
                boxShadow: isMarked ? '0 0 15px var(--gold-glow)' : 'none'
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      {hasBingo && (
        <div style={{
          background: 'rgba(229, 193, 88, 0.15)',
          border: '2px solid var(--gold)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <Award size={36} color="var(--gold)" style={{ margin: '0 auto 8px auto' }} />
          <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.4rem', marginBottom: '6px' }}>
            🎉 SIBLING BINGO CONFIRMED!
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '0.95rem', marginBottom: '16px' }}>
            Certified 100% authentic Indian sibling experience. Chaos level certified off the charts!
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={restart} className="btn-secondary">
              <RotateCcw size={16} /> Clear Board
            </button>
            <button onClick={onBack} className="btn-gold">
              Return to Arcade
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
