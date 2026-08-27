import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Scale, Gavel, Award, ShieldAlert } from 'lucide-react';
import { playGavel, playBonk, playSparkle } from '../../utils/audio';

export default function Game8SiblingCourt({ onBack }) {
  const [objectionCount, setObjectionCount] = useState(0);
  const [verdictDelivered, setVerdictDelivered] = useState(false);
  const [showDenied, setShowDenied] = useState(false);

  const handleNotGuilty = () => {
    playGavel();
    setShowDenied(true);
    setObjectionCount(prev => prev + 1);

    setTimeout(() => {
      setShowDenied(false);
    }, 1800);
  };

  const handleGuilty = () => {
    playGavel();
    setVerdictDelivered(true);
    playSparkle();
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="glass-panel" style={{ padding: '36px 20px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">High Sibling Judiciary</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <div style={{ fontSize: '2.8rem', marginBottom: '4px' }}>⚖️</div>
      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        THE HIGH SIBLING COURT
      </h3>
      <p style={{ color: 'var(--rose-light)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '20px' }}>
        CASE NO: 2026/RB/VYSHUU — The State vs. Vyshuu
      </p>

      {/* Indictment Sheet */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.85)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '20px',
        textAlign: 'left',
        marginBottom: '24px'
      }}>
        <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1rem', marginBottom: '10px' }}>
          OFFICIAL CHARGES FILED:
        </h4>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-main)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Charge 1:</strong> Chronic remote confiscation without a warrant.</li>
          <li><strong>Charge 2:</strong> Claiming "I am full" and then eating brother's fries.</li>
          <li><strong>Charge 3:</strong> Unlawful disturbance of domestic peace through random singing.</li>
          <li><strong>Charge 4:</strong> Being too dramatic when asked simple questions.</li>
        </ul>
      </div>

      {showDenied && (
        <div className="animate-shake" style={{
          padding: '16px',
          background: '#b91c1c',
          color: '#fff',
          borderRadius: '12px',
          fontWeight: 800,
          fontSize: '1.2rem',
          marginBottom: '20px',
          boxShadow: '0 0 25px #b91c1c'
        }}>
          🔨 OBJECTION DENIED! (Attempt #{objectionCount})
          <p style={{ fontSize: '0.85rem', fontWeight: 500, marginTop: '4px' }}>
            The defense's claim of innocence is rejected with extreme prejudice.
          </p>
        </div>
      )}

      {verdictDelivered ? (
        <div style={{
          background: 'rgba(229, 193, 88, 0.15)',
          border: '2px solid var(--gold)',
          borderRadius: '16px',
          padding: '24px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <Gavel size={40} color="var(--gold)" style={{ margin: '0 auto 10px auto' }} />
          <h4 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '8px' }}>
            FINAL VERDICT & SENTENCE
          </h4>
          <p style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>
            “SENTENCED TO BEING MY SISTER FOREVER.”
          </p>
          <p style={{ color: 'var(--cream-dim)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>
            No bail. No parole. No appeal to higher courts. You are stuck with me for life! ❤️
          </p>
          <button onClick={onBack} className="btn-gold" style={{ justifyContent: 'center' }}>
            Accept Sentence (Return to Arcade)
          </button>
        </div>
      ) : (
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
            How does the accused plead?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <button onClick={handleGuilty} className="btn-gold" style={{ justifyContent: 'center', padding: '14px' }}>
              Guilty as Charged 😇
            </button>
            <button onClick={handleNotGuilty} className="btn-rose" style={{ justifyContent: 'center', padding: '14px' }}>
              Not Guilty! (Lies) 🤥
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
