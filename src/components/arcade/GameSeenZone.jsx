import React, { useState, useEffect } from 'react';
import { CheckCheck, Clock, RotateCcw } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

export default function GameSeenZone({ onBack }) {
  const [secondsSeen, setSecondsSeen] = useState(1);
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSeen((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = (type) => {
    if (type === 'wait') {
      playPop(600);
      setOutcome("You waited for 4 hours. Status: Still on seen. Brother dignity reduced by 12 points.");
    } else if (type === 'question_mark') {
      playBonk();
      setOutcome("Sending '?' triggered an immediate: 'Arey chaalu, I am busy!' (while watching reels).");
    } else if (type === 'reel') {
      playSparkle();
      setOutcome("Sending a reel worked instantly! Replied within 4 seconds with '😂😂😂'. Dinner question still ignored.");
    } else if (type === 'panic') {
      playBonk();
      setOutcome("PANIC PROTOCOL: You called her phone. Call disconnected with SMS: 'Call you later'.");
    }
  };

  const restart = () => {
    setSecondsSeen(1);
    setOutcome(null);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Digital Survival</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        SEEN-ZONE SURVIVAL 👁️
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        You sent an important message. Blue ticks appeared. No reply in sight.
      </p>

      {/* Simulated Chat Bubble */}
      <div style={{
        background: '#0d0206',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        textAlign: 'left'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #e5c158, #b89127)',
          color: '#14040a',
          padding: '12px 18px',
          borderRadius: '16px 16px 2px 16px',
          fontWeight: 600,
          fontSize: '0.95rem',
          maxWidth: '85%',
          marginLeft: 'auto'
        }}>
          “Hey, are we ordering pizza or biryani tonight? Tell me quick before the restaurant closes!”
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.7rem', color: '#1a0802' }}>
            <span>Seen 00:{String(secondsSeen).padStart(2, '0')}</span>
            <CheckCheck size={14} color="#0284c7" />
          </div>
        </div>
      </div>

      {outcome ? (
        <div style={{
          background: 'rgba(229, 193, 88, 0.12)',
          border: '1.5px solid var(--gold)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <h4 style={{ color: 'var(--gold)', fontSize: '1.2rem', marginBottom: '8px' }}>
            SURVIVAL OUTCOME 📊
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '16px' }}>
            {outcome}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={restart} className="btn-secondary">
              <RotateCcw size={16} /> Replay
            </button>
            <button onClick={onBack} className="btn-gold">
              Return to Arcade
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>
            Choose your next tactical move:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button onClick={() => handleAction('wait')} className="btn-secondary" style={{ justifyContent: 'center' }}>
              ⏳ Wait Patiently
            </button>
            <button onClick={() => handleAction('question_mark')} className="btn-secondary" style={{ justifyContent: 'center' }}>
              ❓ Send '?'
            </button>
            <button onClick={() => handleAction('reel')} className="btn-rose" style={{ justifyContent: 'center' }}>
              📱 Send Reel Instead
            </button>
            <button onClick={() => handleAction('panic')} className="btn-secondary" style={{ justifyContent: 'center' }}>
              🚨 Full Panic Mode 😂
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
