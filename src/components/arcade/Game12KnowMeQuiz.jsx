import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, RotateCcw } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

const QUESTIONS = [
  {
    q: "What is brother's ultimate emergency food when coding late?",
    options: ["Boiled broccoli & green tea (100% fake)", "Whatever snack Vyshuu left unattended on the counter", "Ordering food at 1:45 AM while calculating calories"],
    correctIdx: 1
  },
  {
    q: "What triggers brother's blood pressure faster than anything?",
    options: ["Someone switching off the fan/light while walking out", "Terrible internet during an online match", "Both of the above with 999% intensity"],
    correctIdx: 2
  },
  {
    q: "If brother ever wins the lottery, what will Vyshuu demand?",
    options: ["A polite congratulations hug", "50% share immediately or she tells Mom his secrets", "Just one cup of coffee"],
    correctIdx: 1
  }
];

export default function Game12KnowMeQuiz({ onBack }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUESTIONS[qIdx];

  const handleSelect = (idx) => {
    const isCorrect = idx === currentQ.correctIdx;
    if (isCorrect) {
      playSparkle();
      setScore((s) => s + 1);
    } else {
      playBonk();
    }

    if (qIdx + 1 < QUESTIONS.length) {
      setQIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const restart = () => {
    setQIdx(0);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percent = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="glass-panel" style={{ padding: '36px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <Award size={48} color="var(--gold)" style={{ margin: '0 auto 12px auto' }} />
        <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
          SISTER LICENSE CERTIFICATION
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Brother Knowledge Accuracy: <strong style={{ color: 'var(--gold)' }}>{percent}%</strong>
        </p>

        <div style={{ background: 'rgba(20, 5, 12, 0.8)', border: '1px solid var(--gold-border)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: '#fff', fontSize: '1.05rem', lineHeight: '1.5', fontWeight: 600 }}>
            {percent >= 66 
              ? "✅ LICENSE RENEWED! You know your brother too well. Suspect surveillance operation confirmed." 
              : "⚠️ LICENSE PROBATION! You clearly need to pay more attention during brother's speeches!"}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={restart} className="btn-secondary">
            <RotateCcw size={16} /> Retake Quiz
          </button>
          <button onClick={onBack} className="btn-gold">
            Return to Arcade
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Question {qIdx + 1} of {QUESTIONS.length}</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
        HOW WELL DO YOU KNOW ME?
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        A test of Vyshuu’s brother-decoding prowess.
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

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {currentQ.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className="glass-panel"
            style={{
              padding: '16px',
              border: '1px solid var(--gold-border)',
              color: 'var(--text-main)',
              fontSize: '0.95rem',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
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
            <span style={{ color: 'var(--gold)', fontWeight: 700 }}>
              {String.fromCharCode(65 + idx)}.
            </span>
            <span style={{ flex: 1 }}>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
