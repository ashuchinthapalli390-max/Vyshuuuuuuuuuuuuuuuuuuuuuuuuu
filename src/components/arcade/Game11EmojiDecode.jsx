import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

const PUZZLES = [
  {
    id: 1,
    emojis: "📺🛋️🤼‍♀️🤫",
    options: [
      "Wrestling on the sofa for the TV remote while trying not to make noise.",
      "Cleaning the living room together peacefully on Sunday morning.",
      "Watching an educational documentary about marine biology."
    ],
    correctIdx: 0,
    reveal: "True story! Sofas were our official WWE championship arena whenever favorite serials or matches aired."
  },
  {
    id: 2,
    emojis: "🌙🍜🤫👣",
    options: [
      "Going to sleep early like well-behaved children.",
      "1 AM stealth Maggi operation without clinking a single utensil.",
      "Practicing yoga in the moonlight on the terrace."
    ],
    correctIdx: 1,
    reveal: "Correct! The silence was louder than a rock concert whenever a steel fork dropped on the kitchen tiles."
  },
  {
    id: 3,
    emojis: "🛍️👗🚶‍♂️🎒",
    options: [
      "Brother buying luxury designer suits for himself.",
      "Going to the gym to do heavy weight lifting.",
      "Vyshuu shopping for 4 hours while brother turns into a human shopping bag carrier."
    ],
    correctIdx: 2,
    reveal: "100% accuracy! Official title: Chief Baggage Officer & Payment Terminal."
  }
];

export default function Game11EmojiDecode({ onBack }) {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentPuzzle = PUZZLES[puzzleIdx];

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    if (idx === currentPuzzle.correctIdx) {
      playSparkle();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      playBonk();
    }
  };

  const nextPuzzle = () => {
    setSelectedIdx(null);
    setIsAnswered(false);
    setPuzzleIdx((prev) => (prev + 1) % PUZZLES.length);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Emoji Decryption</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
        EMOJI MEMORY DECODE 🧩
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Puzzle {puzzleIdx + 1} of {PUZZLES.length}: Guess the sibling memory!
      </p>

      {/* Emojis Display Box */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.85)',
        border: '1.5px solid var(--gold-border-bright)',
        borderRadius: '20px',
        padding: '24px',
        fontSize: '3rem',
        letterSpacing: '12px',
        marginBottom: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(229, 193, 88, 0.1)'
      }}>
        {currentPuzzle.emojis}
      </div>

      {/* Multiple Choice Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {currentPuzzle.options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          const isCorrect = idx === currentPuzzle.correctIdx;

          let border = '1px solid var(--gold-border)';
          let bg = 'rgba(28, 7, 16, 0.7)';

          if (isAnswered) {
            if (isCorrect) {
              border = '1.5px solid #22c55e';
              bg = 'rgba(34, 197, 94, 0.15)';
            } else if (isSelected && !isCorrect) {
              border = '1.5px solid #ef4444';
              bg = 'rgba(239, 68, 68, 0.15)';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border,
                background: bg,
                color: 'var(--text-main)',
                textAlign: 'left',
                fontSize: '0.95rem',
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ color: 'var(--gold)', fontWeight: 700 }}>
                {String.fromCharCode(65 + idx)}.
              </span>
              <span style={{ flex: 1 }}>{opt}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div style={{
          background: 'rgba(229, 193, 88, 0.12)',
          border: '1.5px solid var(--gold)',
          borderRadius: '16px',
          padding: '18px',
          marginBottom: '16px'
        }}>
          <h4 style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '6px' }}>
            {selectedIdx === currentPuzzle.correctIdx ? "DECIPHERED CORRECTLY! 🥳" : "NICE TRY! 😭"}
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '14px' }}>
            {currentPuzzle.reveal}
          </p>
          <button onClick={nextPuzzle} className="btn-gold">
            Next Puzzle →
          </button>
        </div>
      )}
    </div>
  );
}
