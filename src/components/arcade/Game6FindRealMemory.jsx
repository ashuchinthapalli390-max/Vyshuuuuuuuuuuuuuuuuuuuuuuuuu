import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

const ROUNDS = [
  {
    question: "Which of these actually happened during our childhood?",
    cards: [
      { text: "We accidentally locked the neighbor's dog on the balcony.", isReal: false },
      { text: "We hid behind the curtains for 40 minutes to scare Mom, but fell asleep.", isReal: true, story: "We had a master plan to jump out shouting 'BOO'. After 20 minutes of complete silence, Mom found us both fast asleep on the floor behind the curtains! 😂" },
      { text: "Vyshuu cooked full paneer butter masala at age 7.", isReal: false },
      { text: "Brother agreed to give the TV remote willingly with a bow.", isReal: false }
    ]
  },
  {
    question: "Which of these shopping incidents is 100% authentic?",
    cards: [
      { text: "Vyshuu tried 14 pairs of shoes and ended up buying a hair clip.", isReal: true, story: "Spent 2 hours in the shoe section asking 'does this look good?', made the salesperson run 9 times to the store room, and walked out holding a ₹50 hair clip." },
      { text: "Brother carried 0 shopping bags and sat on the bench the whole time.", isReal: false },
      { text: "Vyshuu said 'I have enough clothes, let's go home early'.", isReal: false },
      { text: "We walked into a mall and left within 10 minutes without food.", isReal: false }
    ]
  }
];

export default function Game6FindRealMemory({ onBack }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const round = ROUNDS[roundIdx];

  const handleSelect = (idx, isReal) => {
    if (hasAnswered) return;
    setSelectedIdx(idx);
    setHasAnswered(true);

    if (isReal) {
      playSparkle();
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    } else {
      playBonk();
    }
  };

  const nextRound = () => {
    setSelectedIdx(null);
    setHasAnswered(false);
    setRoundIdx((prev) => (prev + 1) % ROUNDS.length);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Memory Detective</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
        FIND THE REAL MEMORY
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
        3 are pure fabrications. Only 1 actually happened! Round {roundIdx + 1} of {ROUNDS.length}
      </p>

      <p style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '20px' }}>
        {round.question}
      </p>

      {/* 4 Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
        {round.cards.map((card, idx) => {
          const isSelected = selectedIdx === idx;
          let borderColor = 'var(--gold-border)';
          let bg = 'rgba(20, 5, 12, 0.7)';

          if (hasAnswered) {
            if (card.isReal) {
              borderColor = '#22c55e';
              bg = 'rgba(34, 197, 94, 0.15)';
            } else if (isSelected && !card.isReal) {
              borderColor = '#ef4444';
              bg = 'rgba(239, 68, 68, 0.15)';
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx, card.isReal)}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                border: `1.5px solid ${borderColor}`,
                background: bg,
                cursor: hasAnswered ? 'default' : 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ fontSize: '1.2rem' }}>
                {hasAnswered && card.isReal ? (
                  <CheckCircle size={22} color="#22c55e" />
                ) : hasAnswered && isSelected && !card.isReal ? (
                  <XCircle size={22} color="#ef4444" />
                ) : (
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>#{idx + 1}</span>
                )}
              </div>
              <div style={{ flex: 1, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {card.text}
              </div>
            </div>
          );
        })}
      </div>

      {hasAnswered && (
        <div style={{
          background: 'rgba(229, 193, 88, 0.12)',
          border: '1.5px solid var(--gold)',
          borderRadius: '16px',
          padding: '20px',
          animation: 'floatGentle 2.5s ease-in-out infinite',
          marginBottom: '16px'
        }}>
          <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.2rem', marginBottom: '6px' }}>
            {round.cards[selectedIdx].isReal ? "SPOT ON! YOU REMEMBER! 🥳" : "WRONG! Nice imagination though 😭"}
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '0.95rem', lineHeight: '1.5' }}>
            {round.cards.find(c => c.isReal).story}
          </p>
          <button onClick={nextRound} className="btn-gold" style={{ marginTop: '16px' }}>
            Next Round →
          </button>
        </div>
      )}
    </div>
  );
}
