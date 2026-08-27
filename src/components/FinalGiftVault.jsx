import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Gift, Check, Sparkles, Heart } from 'lucide-react';
import { playSparkle, playPop, playChime } from '../utils/audio';

export default function FinalGiftVault() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    playChime();
    setIsOpen(true);
    playSparkle();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e5c158', '#f43f5e', '#ffffff', '#fbbf24']
    });
  };

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '720px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <span className="badge-gold">Exclusive Sibling Treasury</span>
      <h2 className="font-serif text-gold-gradient" style={{
        fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
        fontWeight: 900,
        marginTop: '10px',
        marginBottom: '10px'
      }}>
        THE FINAL SIBLING VAULT 🎁
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px' }}>
        A personal surprise vault locked until Raksha Bandhan rituals are explored.
      </p>

      {/* Vault Status Requirements */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '28px'
      }}>
        <div style={{
          background: 'rgba(34, 197, 94, 0.12)',
          border: '1px solid #22c55e',
          color: '#22c55e',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Check size={14} /> Rakhi Ritual Ready
        </div>
        <div style={{
          background: 'rgba(34, 197, 94, 0.12)',
          border: '1px solid #22c55e',
          color: '#22c55e',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Check size={14} /> Chaos Games Survived
        </div>
        <div style={{
          background: 'rgba(34, 197, 94, 0.12)',
          border: '1px solid #22c55e',
          color: '#22c55e',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Check size={14} /> Contract Verified
        </div>
      </div>

      {isOpen ? (
        /* Unlocked Vault Gift */
        <div 
          className="glass-panel animate-float"
          style={{
            padding: '40px 30px',
            border: '2px solid var(--gold)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 50px var(--gold-glow)'
          }}
        >
          <div style={{ marginBottom: '14px' }}>
            <img
              src="/festive_assets/mascot_cat_gift.png"
              alt="Cute Cat with Gift"
              style={{
                width: '160px',
                height: '160px',
                objectFit: 'contain',
                margin: '0 auto',
                display: 'block',
                filter: 'drop-shadow(0 10px 25px rgba(244,63,94,0.4))',
                animation: 'floatGentle 2.5s ease-in-out infinite'
              }}
            />
          </div>

          <h3 className="font-serif text-gold-gradient" style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: '10px'
          }}>
            VAULT UNLOCKED: SIBLING TREAT VOUCHER!
          </h3>
          <div style={{
            background: 'rgba(20, 5, 12, 0.85)',
            border: '1.5px solid var(--gold-border-bright)',
            borderRadius: '16px',
            padding: '20px',
            margin: '20px auto',
            maxWidth: '480px',
            textAlign: 'left'
          }}>
            <p style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              Official Brother Voucher #2026
            </p>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>
              One Unlimited Food & Shopping Day
            </h4>
            <p style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Redeemable anytime: Brother will take you to your favorite cafe or shopping spot, carry the bags, and pay the bill with zero complaints!
            </p>
          </div>
          <p style={{ color: 'var(--rose-light)', fontWeight: 700, fontSize: '1rem' }}>
            Happy Raksha Bandhan, Vyshuu! ❤️
          </p>
        </div>
      ) : (
        /* Locked Vault Door */
        <div 
          className="glass-panel"
          style={{
            padding: '48px 30px',
            border: '2px solid var(--gold-border)',
            boxShadow: 'var(--shadow-glass)'
          }}
        >
          <Lock size={54} color="var(--gold)" style={{ margin: '0 auto 16px auto' }} />
          <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
            The Treasury is Sealed
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px', maxWidth: '440px', margin: '0 auto 28px auto' }}>
            All prerequisites have been met. Click below to crack the safe and reveal your Rakhi gift!
          </p>
          <button
            onClick={handleOpen}
            className="btn-gold"
            style={{ padding: '16px 40px', fontSize: '1.1rem', cursor: 'pointer' }}
          >
            <Unlock size={20} />
            CRACK & OPEN THE VAULT 🔓
          </button>
        </div>
      )}
    </section>
  );
}
