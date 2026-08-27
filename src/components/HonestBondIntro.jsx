import React from 'react';
import { Heart } from 'lucide-react';

export default function HonestBondIntro() {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px',
      background: 'radial-gradient(circle at center, #15030c 0%, #070103 100%)',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '740px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(244, 63, 94, 0.12)',
          border: '1.5px solid var(--rose)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulseGoldGlow 3s infinite'
        }}>
          <Heart size={22} color="var(--rose)" fill="var(--rose)" />
        </div>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          color: 'var(--text-muted)',
          lineHeight: '1.6'
        }}>
          “We don’t have a thousand photos together.”
        </p>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          color: 'var(--text-muted)',
          lineHeight: '1.6'
        }}>
          “Or a giant collection of childhood adventures.”
        </p>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.3rem, 3.2vw, 1.75rem)',
          color: 'var(--gold-champagne)',
          lineHeight: '1.6'
        }}>
          “But that doesn’t mean the bond matters any less.”
        </p>

        <p style={{
          fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
          color: 'var(--cream)',
          lineHeight: '1.8',
          maxWidth: '640px',
          margin: '12px 0'
        }}>
          Sometimes it’s the random conversations, the late-night check-ins, the reels exchanged, the teasing, and the little things nobody else notices.
        </p>

        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(2.4rem, 6vw, 4rem)',
          fontWeight: 900,
          letterSpacing: '2px',
          marginTop: '10px',
          textShadow: '0 0 35px var(--gold-glow)'
        }}>
          “Those count too.” ❤️
        </h2>
      </div>
    </section>
  );
}
