import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { playPop, playSparkle, playChime } from '../utils/audio';

const VIRTUES = [
  { id: 'kind', word: 'Kind', note: 'Your empathy towards people and your soft heart, even when you pretend to be tough.' },
  { id: 'funny', word: 'Funny', note: 'Your unintentional comedy and the way you can turn any boring day into non-stop laughing.' },
  { id: 'strong', word: 'Strong', note: 'Your quiet resilience when things get difficult. You are braver than you give yourself credit for.' },
  { id: 'caring', word: 'Caring', note: 'How you remember the smallest details and quietly look out for me without needing praise.' },
  { id: 'important', word: 'Important', note: 'Our family would simply feel incomplete without your laughter, chaos, and presence.' },
  { id: 'family', word: 'Family', note: 'More than just a sister by chance—my closest confidant, best friend, and eternal teammate.' }
];

export default function AppreciationSculpture3D() {
  const [clickedWords, setClickedWords] = useState(new Set());
  const [activeNote, setActiveNote] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleWordClick = (item) => {
    playChime();
    setActiveNote(item);

    const nextSet = new Set(clickedWords);
    nextSet.add(item.id);
    setClickedWords(nextSet);

    if (nextSet.size === VIRTUES.length) {
      setTimeout(() => {
        setIsCollapsed(true);
        playSparkle();
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      }, 1600);
    }
  };

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '1000px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <span className="badge-rose">Inner Virtues</span>
      <h2 className="font-serif text-gold-gradient" style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800,
        marginTop: '10px',
        marginBottom: '10px'
      }}>
        REASONS I APPRECIATE YOU
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px auto', fontSize: '1rem' }}>
        Click every word orb to reveal why you mean the world to me. (Revealed: {clickedWords.size} / {VIRTUES.length})
      </p>

      {/* Interactive 3D Word Constellation Orbit */}
      {isCollapsed ? (
        <div 
          className="glass-panel animate-float"
          style={{
            maxWidth: '520px',
            margin: '0 auto 30px auto',
            padding: '48px 30px',
            border: '2px solid var(--gold)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 50px var(--gold-glow)'
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>👑</div>
          <h3 className="font-serif text-gold-gradient" style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 900,
            letterSpacing: '4px',
            marginBottom: '14px'
          }}>
            VYSHUU ❤️
          </h3>
          <p style={{ color: 'var(--cream)', fontSize: '1.15rem', lineHeight: '1.6' }}>
            “All these qualities, virtues, and moments come together to make you the greatest sister anyone could ever ask for.”
          </p>
        </div>
      ) : (
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          minHeight: '320px',
          margin: '0 auto 30px auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px'
        }}>
          {VIRTUES.map((item, idx) => {
            const isRead = clickedWords.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleWordClick(item)}
                className="glass-pill"
                style={{
                  padding: '16px 28px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-serif)',
                  color: isRead ? 'var(--gold)' : '#fff',
                  border: isRead ? '1.5px solid var(--gold)' : '1px solid var(--gold-border)',
                  background: isRead ? 'rgba(229, 193, 88, 0.18)' : 'rgba(24, 5, 12, 0.75)',
                  cursor: 'pointer',
                  boxShadow: isRead ? '0 0 20px var(--gold-glow)' : 'var(--shadow-glass)',
                  transition: 'all 0.3s var(--ease-smooth)',
                  animation: `floatGentle ${4 + (idx % 3)}s ease-in-out infinite`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08) translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--rose)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  if (!isRead) e.currentTarget.style.borderColor = 'var(--gold-border)';
                }}
              >
                {item.word} {isRead && '✨'}
              </button>
            );
          })}
        </div>
      )}

      {/* Note Display Dialog */}
      {activeNote && !isCollapsed && (
        <div style={{
          background: 'rgba(20, 5, 12, 0.9)',
          border: '1.5px solid var(--gold-border-bright)',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '560px',
          margin: '0 auto',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '8px' }}>
            {activeNote.word}
          </h4>
          <p style={{ color: 'var(--cream)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            “{activeNote.note}”
          </p>
        </div>
      )}
    </section>
  );
}
