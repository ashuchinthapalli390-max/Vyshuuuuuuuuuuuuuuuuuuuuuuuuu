import React, { useState, useEffect } from 'react';
import { MessageSquare, RotateCcw, AlertTriangle } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

export default function GameTypingSim({ onBack }) {
  const [typingStage, setTypingStage] = useState(0); // 0: ready, 1: typing 5s, 2: typing 10s, 3: "hmm" arrived!
  const [isShaking, setIsShaking] = useState(false);

  const startTyping = () => {
    setTypingStage(1);
    playPop(600);

    setTimeout(() => {
      setTypingStage(2);
      playPop(700);
    }, 2800);

    setTimeout(() => {
      setTypingStage(3);
      playBonk();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800);
    }, 5500);
  };

  const restart = () => {
    setTypingStage(0);
    setIsShaking(false);
  };

  return (
    <div className={`glass-panel ${isShaking ? 'animate-shake' : ''}`} style={{
      padding: '36px 20px',
      maxWidth: '520px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Suspense Simulator</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
        TYPING… SIMULATOR 💬
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Experience the emotional rollercoaster of waiting for a sister to reply.
      </p>

      {/* Simulated Smartphone Chat Screen */}
      <div style={{
        background: '#0e0308',
        border: '2px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '24px 16px',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        {/* Brother message sent */}
        <div style={{
          alignSelf: 'flex-end',
          background: 'linear-gradient(135deg, #e5c158, #b89127)',
          color: '#14040a',
          padding: '10px 16px',
          borderRadius: '16px 16px 2px 16px',
          fontSize: '0.9rem',
          fontWeight: 600,
          maxWidth: '80%',
          textAlign: 'left'
        }}>
          “Hey Vyshuu, listen! Something crazy happened today! Are you free to talk?”
        </div>

        {/* Typing indicator or final message */}
        {typingStage === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
            Click button below to initiate typing...
          </div>
        )}

        {(typingStage === 1 || typingStage === 2) && (
          <div style={{
            alignSelf: 'flex-start',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '8px 16px',
            borderRadius: '16px 16px 16px 2px',
            color: 'var(--rose-light)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'pulseGoldGlow 1.5s infinite'
          }}>
            <span style={{ fontWeight: 700 }}>Vyshuu is typing</span>
            <span style={{ letterSpacing: '2px' }}>● ● ●</span>
          </div>
        )}

        {typingStage === 3 && (
          <div style={{
            alignSelf: 'flex-start',
            background: '#9f1239',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '16px 16px 16px 2px',
            fontSize: '1.4rem',
            fontWeight: 900,
            letterSpacing: '1px',
            boxShadow: '0 0 25px rgba(244,63,94,0.6)'
          }}>
            “hmm”
          </div>
        )}
      </div>

      {typingStage === 3 ? (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '1.5px solid var(--rose)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <h4 style={{ color: 'var(--gold)', fontSize: '1.2rem', marginBottom: '6px' }}>
            10 SECONDS OF SUSPENSE FOR THIS MASTERPIECE! 😭
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '0.95rem', marginBottom: '16px' }}>
            Brother’s heart rate was at 140 BPM, all for a three-letter philosophical thesis.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={restart} className="btn-secondary">
              <RotateCcw size={16} /> Try Again
            </button>
            <button onClick={onBack} className="btn-gold">
              Return to Arcade
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={startTyping}
          disabled={typingStage > 0}
          className="btn-rose"
          style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
        >
          {typingStage > 0 ? "Vyshuu is preparing an essay..." : "Trigger Vyshuu's Reply ⏳"}
        </button>
      )}
    </div>
  );
}
