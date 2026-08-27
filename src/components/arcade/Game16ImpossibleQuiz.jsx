import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, Award, RotateCcw } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

const TRICK_QUESTIONS = [
  {
    id: 1,
    q: "Who is officially the best sister in the entire universe?",
    options: ["A. Vyshuu", "B. Vyshuu", "C. Vyshuu", "D. Obviously Vyshuu"],
    handler: () => ({ isCorrect: true, text: "Correct! Global consensus reached with 100% voter turnout. 🏆" })
  },
  {
    id: 2,
    q: "Who starts 94% of all arguments in the house?",
    options: ["A. Brother (False allegation)", "B. Vyshuu (Undisputed champion)"],
    handler: (idx) => {
      if (idx === 0) {
        return { isCorrect: false, text: "Website Administrator strongly objects! Evidence thrown out of court. 😂" };
      } else {
        return { isCorrect: true, text: "Accepted immediately without requiring cross-examination!" };
      }
    }
  },
  {
    id: 3,
    q: "Will your brother always stand by you, no matter what?",
    options: ["A. Yes", "B. Absolutely Yes", "C. 1000% Yes", "D. All of the above"],
    handler: () => ({ isCorrect: true, text: "Always. Connected through every fight, laugh, and year. ❤️" })
  }
];

export default function Game16ImpossibleQuiz({ onBack }) {
  const [qIdx, setQIdx] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = TRICK_QUESTIONS[qIdx];

  const handleSelect = (idx) => {
    const res = currentQ.handler(idx);
    setFeedback(res);

    if (res.isCorrect) {
      playSparkle();
    } else {
      playBonk();
    }

    setTimeout(() => {
      setFeedback(null);
      if (qIdx + 1 < TRICK_QUESTIONS.length) {
        setQIdx(prev => prev + 1);
      } else {
        setIsFinished(true);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      }
    }, 2200);
  };

  const restart = () => {
    setQIdx(0);
    setFeedback(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="glass-panel" style={{ padding: '36px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <Award size={48} color="var(--gold)" style={{ margin: '0 auto 12px auto' }} />
        <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
          IMPOSSIBLE QUIZ COMPLETED!
        </h3>
        <p style={{ color: 'var(--cream)', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '24px' }}>
          Conclusion: No matter how many tricks or troll options exist, you are my favorite person in the world! ❤️
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={restart} className="btn-secondary">
            <RotateCcw size={16} /> Retake
          </button>
          <button onClick={onBack} className="btn-gold">
            Return to Arcade
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Question {qIdx + 1} of {TRICK_QUESTIONS.length}</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
        THE IMPOSSIBLE QUIZ ❓
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
        Careful! The questions might be completely rigged in brother's favor.
      </p>

      {/* Question */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.8)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '20px',
        fontSize: '1.1rem',
        color: '#fff',
        marginBottom: '24px',
        minHeight: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        “{currentQ.q}”
      </div>

      {feedback ? (
        <div style={{
          background: feedback.isCorrect ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1.5px solid ${feedback.isCorrect ? '#22c55e' : '#ef4444'}`,
          borderRadius: '12px',
          padding: '16px',
          color: '#fff',
          fontSize: '1rem',
          animation: 'floatGentle 1.8s ease-in-out infinite'
        }}>
          {feedback.text}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="glass-panel"
              style={{
                padding: '14px 18px',
                border: '1px solid var(--gold-border)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.background = 'rgba(229, 193, 88, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-border)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
