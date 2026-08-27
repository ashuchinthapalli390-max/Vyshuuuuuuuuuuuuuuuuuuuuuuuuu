import React, { useState } from 'react';
import { Fingerprint, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import { playHeartbeat, playBonk, playPop, playSparkle } from '../../utils/audio';

const QUESTIONS = [
  {
    q: "Do you ever annoy your brother purely on purpose?",
    onYes: { status: "TRUTH", text: "Honesty detected! You enjoy watching him panic over the remote.", isLie: false },
    onNo: { status: "LIE DETECTED!", text: "🚨 Polygraph needles exploded! Satellite telemetry confirms 100% intentional trolling.", isLie: true }
  },
  {
    q: "Do you secretly care about your brother more than you let on?",
    onYes: { status: "TRUTH VERIFIED", text: "Finally! Machine functioning at 100% accuracy. Sister certification officially renewed. ❤️", isLie: false },
    onNo: { status: "SYSTEM ERROR 404", text: "⚠️ Answer rejected! Cosmic laws of sibling bond cannot be overwritten.", isLie: true }
  },
  {
    q: "Did you actually finish your work before scrolling reels?",
    onYes: { status: "EXTREME LIE DETECTED", text: "Screen time analysis proves 3 hours of cat reels watched today.", isLie: true },
    onNo: { status: "RESPECTABLE HONESTY", text: "At least you own your procrastination skills.", isLie: false }
  }
];

export default function Game7LieDetector({ onBack }) {
  const [qIdx, setQIdx] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const currentQ = QUESTIONS[qIdx];

  const handleAnswer = (choice) => {
    playHeartbeat();
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      setScanning(false);
      const outcome = choice === 'yes' ? currentQ.onYes : currentQ.onNo;
      setResult(outcome);

      if (outcome.isLie) {
        playBonk();
      } else {
        playSparkle();
      }
    }, 2200);
  };

  const nextQuestion = () => {
    setResult(null);
    setQIdx((prev) => (prev + 1) % QUESTIONS.length);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Biometric Scanner</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
        FAKE SIBLING LIE DETECTOR
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Place your thumb and answer truthfully. Case #{qIdx + 1}
      </p>

      {/* Question Box */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.8)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '24px',
        fontSize: '1.15rem',
        color: '#fff',
        marginBottom: '28px',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        “{currentQ.q}”
      </div>

      {scanning ? (
        <div style={{ padding: '30px', animation: 'pulseGoldGlow 1.2s infinite' }}>
          <Fingerprint size={64} color="var(--rose)" style={{ margin: '0 auto 12px auto' }} />
          <p style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Scanning Biometrics & Eye Twitches...
          </p>
        </div>
      ) : result ? (
        <div style={{
          background: result.isLie ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
          border: `2px solid ${result.isLie ? '#ef4444' : '#22c55e'}`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          animation: 'floatGentle 2.5s ease-in-out infinite'
        }}>
          <h4 style={{
            color: result.isLie ? '#ef4444' : '#22c55e',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '8px'
          }}>
            {result.status}
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '1rem', lineHeight: '1.5', marginBottom: '16px' }}>
            {result.text}
          </p>
          <button onClick={nextQuestion} className="btn-gold">
            Next Test →
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <button onClick={() => handleAnswer('yes')} className="btn-gold" style={{ justifyContent: 'center', padding: '14px' }}>
            YES (Truth)
          </button>
          <button onClick={() => handleAnswer('no')} className="btn-rose" style={{ justifyContent: 'center', padding: '14px' }}>
            NO (Denial)
          </button>
        </div>
      )}
    </div>
  );
}
