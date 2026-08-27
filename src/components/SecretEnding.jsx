import React, { useState } from 'react';
import { Heart, X, Sparkles } from 'lucide-react';
import { playPop, playSparkle } from '../utils/audio';

export default function SecretEnding() {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <>
      {/* Tiny subtle button in bottom left */}
      <footer style={{
        position: 'relative',
        zIndex: 20,
        padding: '30px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(229, 193, 88, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <button
          onClick={() => {
            playSparkle();
            setShowSecret(true);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(229, 193, 88, 0.4)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            fontStyle: 'italic',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(229, 193, 88, 0.4)'}
        >
          psst...
        </button>

        <div>
          VYSHUUVERSE ❤️ — Crafted with infinite love & sibling chaos
        </div>

        <div style={{ color: 'var(--gold)', fontWeight: 600 }}>
          Raksha Bandhan 2026
        </div>
      </footer>

      {/* Secret Modal */}
      {showSecret && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(5, 1, 3, 0.94)',
          backdropFilter: 'blur(16px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div 
            className="glass-panel"
            style={{
              maxWidth: '460px',
              width: '100%',
              padding: '36px 28px',
              textAlign: 'center',
              border: '2px solid var(--gold)',
              boxShadow: '0 0 60px rgba(229, 193, 88, 0.3)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => { playPop(400); setShowSecret(false); }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
              🤫
            </div>

            <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
              YOU FOUND THE SECRET CORNER!
            </h3>

            <p style={{ color: 'var(--cream)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
              “You really clicked every single corner of this website, didn’t you? <br /><br />
              <strong>Good.</strong> That means you noticed every little detail I built for you. <br /><br />
              <span style={{ color: 'var(--gold-champagne)', fontStyle: 'italic' }}>
                P.S. Yes, you can have the TV remote today without an argument. Happy Raksha Bandhan, Vyshuu!
              </span>”
            </p>

            <button
              onClick={() => { playSparkle(); setShowSecret(false); }}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Heart size={18} fill="var(--rose)" color="var(--rose)" />
              Close with a Smile
            </button>
          </div>
        </div>
      )}
    </>
  );
}
