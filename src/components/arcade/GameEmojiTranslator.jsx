import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

const EMOJI_QUESTIONS = [
  {
    id: 1,
    emojis: "😭😂👍🏻💀",
    question: "What does this exact sequence sent by Vyshuu actually mean?",
    options: [
      "I am deeply moved and contemplating philosophical existence.",
      "I am laughing at your suffering while secretly agreeing with you.",
      "My phone screen glitched and my thumb slipped."
    ],
    correctIdx: 1,
    note: "Translation 100% verified by Sibling Linguistics Institute."
  },
  {
    id: 2,
    emojis: "👀🍿👀",
    question: "When this is dropped into the chat, what is happening?",
    options: [
      "I am snacking healthily on organic corn.",
      "Mom and Dad are arguing and I am safely spectating from the sofa.",
      "I bought movie tickets for both of us."
    ],
    correctIdx: 1,
    note: "Universal code for domestic spectator entertainment."
  }
];

export default function GameEmojiTranslator({ onBack }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQ = EMOJI_QUESTIONS[qIdx];

  const handleSelect = (idx) => {
    if (hasAnswered) return;
    setSelectedIdx(idx);
    setHasAnswered(true);

    if (idx === currentQ.correctIdx) {
      playSparkle();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      playBonk();
    }
  };

  const nextQ = () => {
    setSelectedIdx(null);
    setHasAnswered(false);
    setQIdx((prev) => (prev + 1) % EMOJI_QUESTIONS.length);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Emoji Linguistics</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        EMOJI TRANSLATOR 🔤
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
        Decode the hidden emotional subtext behind her favorite emojis.
      </p>

      {/* Big Emojis Box */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.85)',
        border: '1.5px solid var(--gold-border-bright)',
        borderRadius: '16px',
        padding: '24px',
        fontSize: '2.8rem',
        letterSpacing: '10px',
        marginBottom: '20px'
      }}>
        {currentQ.emojis}
      </div>

      <p style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '20px' }}>
        {currentQ.question}
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          const isCorrect = idx === currentQ.correctIdx;

          let border = '1px solid var(--gold-border)';
          let bg = 'rgba(28, 7, 16, 0.7)';

          if (hasAnswered) {
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
                padding: '14px',
                borderRadius: '12px',
                border,
                background: bg,
                color: 'var(--text-main)',
                textAlign: 'left',
                fontSize: '0.95rem',
                cursor: hasAnswered ? 'default' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ color: 'var(--gold)', fontWeight: 700, marginRight: '8px' }}>
                {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div style={{
          background: 'rgba(229, 193, 88, 0.12)',
          border: '1.5px solid var(--gold)',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ color: 'var(--cream)', fontSize: '0.9rem', marginBottom: '12px' }}>
            {currentQ.note}
          </p>
          <button onClick={nextQ} className="btn-gold">
            Next Translation →
          </button>
        </div>
      )}
    </div>
  );
}
