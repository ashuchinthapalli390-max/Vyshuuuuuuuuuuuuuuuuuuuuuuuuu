import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Feather } from 'lucide-react';
import { playWaxCrack, playPaperSlide, playSparkle } from '../utils/audio';

export default function Letter3D() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    playWaxCrack();
    playPaperSlide();
    playSparkle();
    setIsOpen(true);
  };

  return (
    <section style={{
      padding: '80px 16px',
      maxWidth: '740px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="badge-gold">Personal Parchment</span>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
          fontWeight: 900,
          marginTop: '8px',
          marginBottom: '6px'
        }}>
          A LETTER FROM ASHU ✉️
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Okay… one last thing. No jokes, just honest brother words.
        </p>
      </div>

      {!isOpen ? (
        /* Sealed Envelope on Mahogany Desk */
        <div 
          onClick={handleOpenLetter}
          className="glass-panel"
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            padding: '48px 24px',
            border: '2px solid var(--gold)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px var(--gold-glow)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {/* Wax Seal */}
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #e11d48 0%, #881337 100%)',
            border: '3px solid #fecdd3',
            boxShadow: '0 6px 20px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.4)',
            margin: '0 auto 20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            color: '#fff',
            fontWeight: 900,
            fontFamily: 'var(--font-serif)',
            letterSpacing: '1px'
          }}>
            V❤️
          </div>

          <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
            For Vyshuuuuuuuuuuuuu
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
            Sealed with love & gold wax. Tap to break seal.
          </p>

          <button className="btn-gold" style={{ minHeight: '48px', padding: '12px 32px' }}>
            <Sparkles size={16} /> Break Seal & Read Letter
          </button>
        </div>
      ) : (
        /* Unfolded Warm Parchment Letter with Cute Animals */
        <div style={{
          backgroundImage: 'linear-gradient(rgba(255, 253, 246, 0.86), rgba(254, 243, 199, 0.9)), url(/festive_assets/bg_letter_parchment_animals.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#1a0702',
          borderRadius: '20px',
          padding: 'clamp(28px, 6vw, 48px)',
          border: '3px solid #d4af37',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 45px rgba(212,175,55,0.3)',
          position: 'relative',
          animation: 'floatGentle 4s ease-in-out infinite'
        }}>

          <div style={{ borderBottom: '1px dashed #b45309', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 800, color: '#78350f' }}>
              Raksha Bandhan • 28 August 2026
            </span>
            <Feather size={20} color="#b45309" />
          </div>

          <div className="font-script" style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.55rem)',
            lineHeight: '1.7',
            color: '#3b1404'
          }}>
            <p style={{ marginBottom: '16px' }}>Dear Vyshuu,</p>

            <p style={{ marginBottom: '16px', fontStyle: 'italic', color: '#92400e' }}>
              Okay… no more crack, no more hahaha battle for a minute.
            </p>

            <p style={{ marginBottom: '16px' }}>
              We don't always say emotional things out loud. In fact, most days we spend our energy teasing each other, sending random reels, arguing over silly things, or leaving each other on "hmm".
            </p>


            <p style={{ marginBottom: '16px' }}>
              Maybe we don't have thousands of photos or an epic movie-like childhood story. But the truth is: none of that matters. What matters is our real, genuine bond—the random check-ins, the quiet trust, and knowing that no matter what happens, your brother always has your back.
            </p>

            <p style={{ marginBottom: '16px' }}>
              I wanted to build this entire little world for you because you truly deserve to smile today. Keep being that cheerful, spirited, slightly stubborn sister who makes our family brighter.
            </p>

            <p style={{ marginBottom: '24px' }}>
              Stay happy, stay blessed, and remember that I am always proud to be your brother.
            </p>
          </div>

          {/* Definitive Brother Signature */}
          <div style={{
            borderTop: '2px dashed #b45309',
            paddingTop: '20px',
            textAlign: 'right'
          }}>
            <p style={{ fontSize: '1rem', color: '#78350f', fontWeight: 700, marginBottom: '4px' }}>
              Happy Raksha Bandhan, Vyshuuuuuuuuuuuuu ❤️
            </p>
            <h3 className="font-serif text-gold-gradient" style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
              fontWeight: 900,
              color: '#9f1239'
            }}>
              From your lovely brother Ashuuuuuuuuuuuuuuuuuuuu ❤️
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#92400e', fontStyle: 'italic' }}>
              Made with love, glitter, and unnecessary extra effort 😭✨
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
