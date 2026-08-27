import React, { useState } from 'react';
import { Scale, Gavel, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { playGavel, playBonk, playSparkle, playPop } from '../utils/audio';

const COURT_CASES = [
  {
    id: '001',
    title: 'Leaving Someone on “hmm” and Expecting Conversation to Continue',
    description: 'The defendant sent a single 3-letter word after brother typed a 4-paragraph story.',
    options: ['Legal & Normal', 'Cyber Offense 🚨', 'Depends on mood'],
    verdict: 'The court rules that replying with just “hmm” constitutes emotional vandalism of the highest order! 😂'
  },
  {
    id: '002',
    title: 'Sending 7 Instagram Reels in a Row Without Any Context',
    description: 'Bombarding the inbox with cat videos, dance trends, and memes at 1:30 AM.',
    options: ['Peak Sister Behavior', 'Inappropriate Spam', 'Both'],
    verdict: 'Court accepts this as standard digital sibling taxation. No damages awarded.'
  },
  {
    id: '003',
    title: 'Replying to Exactly 1 Message Out of 5 Questions Asked',
    description: 'Brother asks: What time? Where? Who? Why? Vyshuu replies: “yes”.',
    options: ['Guilty of Ignorance', 'Extreme Efficiency', 'Selective Reading'],
    verdict: 'Diagnosed with Selective Sister Reading Syndrome. Prescription: Buy brother snacks.'
  },
  {
    id: '004',
    title: 'Starting a Heated Debate and Then Randomly Saying “Sarle”',
    description: 'Arguing with 100% passion for 12 minutes, then instantly hitting the “sarle” escape button.',
    options: ['Masterclass Gaslight', 'Victory Move', 'Unlawful Retreat'],
    verdict: 'Defense penalty: Sentenced to being the sister of this brother forever without parole! ❤️'
  }
];

export default function InternetSiblingCourt() {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [verdictsGiven, setVerdictsGiven] = useState({});
  const [activeFeedback, setActiveFeedback] = useState(null);

  const currentCase = COURT_CASES[activeCaseIdx];

  const handlePlead = (choice) => {
    playGavel();
    const result = {
      choice,
      verdict: currentCase.verdict
    };
    setActiveFeedback(result);
    setVerdictsGiven(prev => ({ ...prev, [currentCase.id]: true }));
    playSparkle();
  };

  const nextCase = () => {
    playPop(500);
    setActiveFeedback(null);
    setActiveCaseIdx(prev => (prev + 1) % COURT_CASES.length);
  };

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '860px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="badge-rose">Hypothetical Court Only</span>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          fontWeight: 900,
          marginTop: '10px',
          marginBottom: '10px'
        }}>
          SIBLING INTERNET COURT ⚖️
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
          No fake childhood history—just hilarious hypothetical digital cases from our real chatting habits!
        </p>
      </div>

      {/* Case Navigation Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '28px'
      }}>
        {COURT_CASES.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              playPop(450);
              setActiveFeedback(null);
              setActiveCaseIdx(i);
            }}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: activeCaseIdx === i ? '1.5px solid var(--gold)' : '1px solid var(--gold-border)',
              background: activeCaseIdx === i ? 'linear-gradient(135deg, #e5c158 0%, #caa030 100%)' : 'rgba(20,5,12,0.7)',
              color: activeCaseIdx === i ? '#14040a' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Case #{c.id} {verdictsGiven[c.id] && '✓'}
          </button>
        ))}
      </div>

      {/* Case File Card */}
      <div className="glass-panel" style={{
        padding: '36px 28px',
        border: '1.5px solid var(--gold-border-bright)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px var(--gold-glow)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Gavel size={24} color="var(--gold)" />
          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--gold)', letterSpacing: '1px' }}>
            CASE #{currentCase.id}
          </span>
        </div>

        <h3 className="font-serif text-gold-gradient" style={{
          fontSize: '1.5rem',
          marginBottom: '12px',
          lineHeight: '1.4'
        }}>
          {currentCase.title}
        </h3>

        <p style={{ color: 'var(--cream-dim)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '28px' }}>
          “{currentCase.description}”
        </p>

        {activeFeedback ? (
          <div style={{
            background: 'rgba(229, 193, 88, 0.12)',
            border: '2px solid var(--gold)',
            borderRadius: '16px',
            padding: '24px',
            animation: 'floatGentle 3s ease-in-out infinite',
            marginBottom: '20px'
          }}>
            <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '8px' }}>
              OFFICIAL COURT RULING 🔨
            </h4>
            <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
              {activeFeedback.verdict}
            </p>
            <button onClick={nextCase} className="btn-gold">
              Proceed to Next Case →
            </button>
          </div>
        ) : (
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>
              Vyshuu, what is your official judicial verdict?
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px'
            }}>
              {currentCase.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlead(opt)}
                  className="btn-secondary"
                  style={{ justifyContent: 'center', padding: '14px', textAlign: 'center' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Stamp */}
        <div style={{
          marginTop: '28px',
          paddingTop: '16px',
          borderTop: '1px dashed rgba(229, 193, 88, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <span>Supreme Court Judge: Vyshuu</span>
          <span style={{ color: 'var(--gold)' }}>Accuracy: Questionable 😂</span>
        </div>
      </div>
    </section>
  );
}
