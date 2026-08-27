import React, { useState } from 'react';
import { Shield, RotateCcw, Award } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

const INCIDENTS = [
  { id: 1, title: "Incident #001: The TV Remote", desc: "Someone took the remote and hid it inside the cushion." },
  { id: 2, title: "Incident #002: The Last Chocolate", desc: "A Dairy Milk was kept in the fridge door for 3 days. Suddenly disappeared." },
  { id: 3, title: "Incident #003: The Water Bottle Refill", desc: "Empty water bottle placed back into the fridge like modern art." },
  { id: 4, title: "Incident #004: Walking Past The Fan", desc: "Someone switched off the room fan while walking out." },
  { id: 5, title: "Incident #005: The Wifi Password Reset", desc: "The router was turned off because 'it was heating up'." },
  { id: 6, title: "Incident #006: The Phone Charger Theft", desc: "A charger with the brother's mark found plugged next to Vyshuu's bed." },
  { id: 7, title: "Incident #007: Borrowing Without Asking", desc: "A hoodie that 'accidentally' migrated to her wardrobe." },
  { id: 8, title: "Incident #008: Spoiling The Movie", desc: "Loudly saying 'He is the killer' 12 minutes into the movie." },
  { id: 9, title: "Incident #009: The 'I'll Do It in 5 Mins' Lie", desc: "Still waiting 4 hours later." },
  { id: 10, title: "Incident #010: The Sarcastic Look", desc: "No words spoken, just a 0.5 second facial expression that ignited war." }
];

export default function Game1WhoStarted({ onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleChoice = (choice) => {
    let msg = "";
    if (choice === 'Me') {
      playBonk();
      msg = "Very mature answer... suspiciously mature. System suspects false confession to hide snacks.";
    } else if (choice === 'Vyshuu') {
      playPop(700);
      msg = "Evidence accepted immediately! Eye witnesses and satellite imagery corroborate this.";
    } else {
      playSparkle();
      msg = "Finally, 50-50 honesty. Both parties sentenced to mutual apology.";
    }

    setFeedback({ choice, text: msg });
    setAnswers(prev => [...prev, choice]);

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx + 1 < INCIDENTS.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setIsFinished(true);
        playSparkle();
      }
    }, 1800);
  };

  const restart = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setFeedback(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="glass-panel" style={{ padding: '36px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
        <Award size={48} color="var(--gold)" style={{ margin: '0 auto 16px auto' }} />
        <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
          OFFICIAL SIBLING FIGHT REPORT
        </h3>
        <div style={{ background: 'rgba(20, 5, 12, 0.8)', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--gold-border)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
            Cases Investigated: <strong style={{ color: 'var(--gold)' }}>10</strong>
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
            Cases Actually Solved: <strong style={{ color: 'var(--rose-light)' }}>0</strong>
          </p>
          <p style={{ color: 'var(--cream-dim)', fontSize: '0.95rem', fontStyle: 'italic' }}>
            Conclusion: It doesn't matter who started it. Mom will scold both of you anyway.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={restart} className="btn-secondary">
            <RotateCcw size={16} /> Try Again
          </button>
          <button onClick={onBack} className="btn-gold">
            Return to Arcade
          </button>
        </div>
      </div>
    );
  }

  const incident = INCIDENTS[currentIdx];

  return (
    <div className="glass-panel" style={{ padding: '32px 24px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Question {currentIdx + 1} of 10</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '8px' }}>
        {incident.title}
      </h3>
      <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', marginBottom: '28px', minHeight: '50px' }}>
        “{incident.desc}”
      </p>

      {feedback ? (
        <div style={{
          padding: '16px',
          background: 'rgba(229, 193, 88, 0.15)',
          border: '1.5px solid var(--gold)',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '1rem',
          animation: 'floatGentle 1.5s ease-in-out infinite'
        }}>
          {feedback.text}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>
            Who is responsible?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <button onClick={() => handleChoice('Me')} className="btn-secondary" style={{ justifyContent: 'center' }}>
              Brother (Me)
            </button>
            <button onClick={() => handleChoice('Vyshuu')} className="btn-rose" style={{ justifyContent: 'center' }}>
              Vyshuu 😈
            </button>
            <button onClick={() => handleChoice('Both')} className="btn-gold" style={{ justifyContent: 'center' }}>
              Both 🤝
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
