import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';

export default function EmotionalTransition() {
  return (
    <section style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 20px',
      background: 'radial-gradient(circle at center, #14030a 0%, #080103 100%)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '680px',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid var(--rose)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          animation: 'pulseGoldGlow 3s infinite'
        }}>
          <Heart size={20} color="var(--rose)" fill="var(--rose)" />
        </div>

        <h3 className="font-serif" style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          color: 'var(--gold-champagne)',
          fontWeight: 700,
          marginBottom: '16px',
          letterSpacing: '1px'
        }}>
          Okay.
        </h3>

        <h4 className="font-serif text-rose-gradient" style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          fontWeight: 700,
          marginBottom: '20px'
        }}>
          Enough trolling you.
        </h4>

        <p style={{
          color: 'var(--cream-dim)',
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          lineHeight: '1.8',
          fontFamily: 'var(--font-serif)',
          maxWidth: '540px',
          marginBottom: '36px'
        }}>
          “Behind every ridiculous argument, every remote fight, and every joke we threw at each other...
          there is a reason I created this entire universe for you.”
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          <span>Scroll down, Vyshuu</span>
          <ChevronDown size={20} className="animate-float" color="var(--gold)" />
        </div>
      </div>
    </section>
  );
}
