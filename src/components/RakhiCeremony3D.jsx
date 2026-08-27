import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';
import { playBell, playChime, playSparkle, playPop } from '../utils/audio';

export default function RakhiCeremony3D({ customRakhi }) {
  const [ceremonyStep, setCeremonyStep] = useState(0); // 0: Tray ready, 1: Tilak applied, 2: Sweet offered, 3: Rakhi tied!
  const [dragProgress, setDragProgress] = useState(0);
  const mountRef = useRef(null);

  // Apply Tilak
  const handleApplyTilak = () => {
    playBell();
    setCeremonyStep(1);
    playSparkle();
  };

  // Offer Sweet
  const handleOfferSweet = () => {
    playPop(650);
    setCeremonyStep(2);
    playSparkle();
  };

  // Tie Rakhi
  const handleTieRakhi = () => {
    playBell();
    setCeremonyStep(3);
    playChime();

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e5c158', '#f43f5e', '#ffffff', '#fbbf24']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e5c158', '#f43f5e']
      });
    }, 400);
  };

  const restartCeremony = () => {
    playPop(400);
    setCeremonyStep(0);
    setDragProgress(0);
  };

  return (
    <section id="rakhi-ceremony" style={{
      padding: '70px 16px',
      maxWidth: '840px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(229,193,88,0.12)',
        border: '1px solid var(--gold-border)',
        padding: '4px 14px',
        borderRadius: '9999px',
        marginBottom: '10px'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--gold-champagne)', fontWeight: 700 }}>
          Sacred Sibling Tradition
        </span>
      </div>

      <h2 className="font-serif text-gold-gradient" style={{
        fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
        fontWeight: 900,
        marginBottom: '6px'
      }}>
        THE RAKHI TYING CEREMONY 🪢
      </h2>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto 28px auto' }}>
        Complete each ritual step in order: apply auspicious tilak, offer sweets, and tie the sacred thread.
      </p>

      {/* Ceremony Step Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        {[
          { step: 1, label: '1. Tilak' },
          { step: 2, label: '2. Sweet' },
          { step: 3, label: '3. Tie Rakhi' }
        ].map((item) => {
          const isDone = ceremonyStep >= item.step;
          return (
            <div
              key={item.step}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: isDone ? '1.5px solid #22c55e' : '1px solid var(--gold-border)',
                background: isDone ? 'rgba(34,197,94,0.15)' : 'rgba(20,5,12,0.7)',
                color: isDone ? '#22c55e' : 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {isDone && <CheckCircle2 size={12} />}
              {item.label}
            </div>
          );
        })}
      </div>

      {/* Main Ceremony Altar Card */}
      <div className="glass-panel" style={{
        padding: '36px 20px',
        border: '2px solid var(--gold-border-bright)',
        boxShadow: ceremonyStep === 3 ? '0 0 50px var(--gold-glow), 0 0 70px rgba(244,63,94,0.3)' : 'var(--shadow-glass)',
        marginBottom: '20px'
      }}>
        {/* Stage Graphic */}
        <div style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          margin: '0 auto 24px auto',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #2a0818 0%, #100208 100%)',
          border: '3px solid var(--gold)',
          boxShadow: '0 12px 35px rgba(0,0,0,0.8), inset 0 0 30px rgba(229,193,88,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {ceremonyStep === 0 && (
            <img 
              src="/festive_assets/mascot_bunny_thali.png" 
              alt="Bunny with Thali" 
              style={{ width: '170px', height: '170px', objectFit: 'contain', animation: 'floatGentle 3s ease-in-out infinite' }} 
            />
          )}
          {ceremonyStep === 1 && (
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 0 15px #ef4444)' }}>🔴✨</span>
              <div style={{ color: 'var(--gold-champagne)', fontSize: '0.8rem', fontWeight: 700 }}>Kumkum Tilak</div>
            </div>
          )}
          {ceremonyStep === 2 && (
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '4.5rem' }}>🟡🍬</span>
              <div style={{ color: 'var(--gold-champagne)', fontSize: '0.8rem', fontWeight: 700 }}>Sweet Ladoo</div>
            </div>
          )}
          {ceremonyStep === 3 && (
            <img 
              src="/festive_assets/royal_ruby_rakhi.png" 
              alt="Royal Ruby Rakhi" 
              style={{ width: '180px', height: '180px', objectFit: 'contain', filter: 'drop-shadow(0 0 25px var(--gold))', animation: 'pulseGoldGlow 2s infinite' }} 
            />
          )}
        </div>


        {/* Step Instructions & Action Buttons */}
        {ceremonyStep === 0 && (
          <div>
            <h3 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '8px' }}>
              Step 1: Apply Auspicious Tilak
            </h3>
            <p style={{ color: 'var(--cream)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Tap below to apply red kumkum and sacred rice grains for long life and happiness.
            </p>
            <button onClick={handleApplyTilak} className="btn-rose" style={{ minHeight: '48px', padding: '12px 32px' }}>
              Apply Tilak 🔴
            </button>
          </div>
        )}

        {ceremonyStep === 1 && (
          <div>
            <h3 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '8px' }}>
              Step 2: Offer Sweet (Ladoo)
            </h3>
            <p style={{ color: 'var(--cream)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Tilak blessed! Now feed a golden sweet to celebrate sibling sweetness.
            </p>
            <button onClick={handleOfferSweet} className="btn-gold" style={{ minHeight: '48px', padding: '12px 32px' }}>
              Offer Sweet Ladoo 🟡
            </button>
          </div>
        )}

        {ceremonyStep === 2 && (
          <div>
            <h3 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '8px' }}>
              Step 3: Tie the Custom Rakhi
            </h3>
            <p style={{ color: 'var(--cream)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Ready to tie the custom “V ❤️” Rakhi on brother Ashu’s wrist!
            </p>
            <button onClick={handleTieRakhi} className="btn-gold" style={{ minHeight: '48px', padding: '14px 36px', fontSize: '1.05rem' }}>
              <Heart size={18} /> Tie Rakhi on Wrist ❤️
            </button>
          </div>
        )}

        {ceremonyStep === 3 && (
          <div style={{ animation: 'floatGentle 3s ease-in-out infinite' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(34,197,94,0.15)',
              border: '2px solid #22c55e',
              color: '#22c55e',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '1rem',
              marginBottom: '16px'
            }}>
              <ShieldCheck size={20} />
              RAKHI TIED SUCCESSFULLY ❤️
            </div>

            <h3 className="font-serif text-gold-gradient" style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              fontWeight: 900,
              marginBottom: '8px'
            }}>
              “A Little Thread. A Lot of Love.”
            </h3>

            <p style={{ color: 'var(--cream)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
              The sacred bond is officially renewed for another lifetime. Brother Ashu is now under full contract to protect, support, and tease you forever!
            </p>

            <button onClick={restartCeremony} className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              <RotateCcw size={14} /> Replay Ceremony
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
