import React, { useState } from 'react';
import { Sparkles, Info, X, Heart } from 'lucide-react';
import { playPop, playSparkle } from '../utils/audio';

const MATERIALS = [
  {
    id: 'thread',
    name: 'Sacred Silk Thread',
    icon: '🧵',
    tag: 'FOUNDATION',
    desc: 'Soft, vibrant, and unbreakable. Represents the invisible lifelong bond between Ashu and Vyshuu.'
  },
  {
    id: 'center',
    name: 'Golden Medallion',
    icon: '🏵️',
    tag: 'HEART OF RAKHI',
    desc: 'Intricately carved floral brass center reflecting warmth, beauty, and festive dignity.'
  },
  {
    id: 'pearls',
    name: 'Natural Pearls',
    icon: '⚪',
    tag: 'ELEGANCE',
    desc: 'Cool and serene. Brings blessings of peace, happiness, and timeless sisterly grace.'
  },
  {
    id: 'kundans',
    name: 'Kundan Gemstones',
    icon: '💎',
    tag: 'RADIANCE',
    desc: 'Hand-set festive crystals that catch the golden diya light and shine brightly.'
  },
  {
    id: 'charm_v',
    name: '“V ❤️” Signature Charm',
    icon: '✨',
    tag: 'PERSONALIZED',
    desc: 'Custom-crafted monogram exclusively for Vyshuu. Because no ordinary rakhi would do!'
  },
  {
    id: 'latkans',
    name: 'Festive Latkans',
    icon: '🔔',
    tag: 'PLAYFULNESS',
    desc: 'Golden bells and silk tassels that swing happily with every movement.'
  }
];

export default function RakhiMaterialsRoom({ onOpenStudio }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section style={{
      padding: '70px 16px',
      maxWidth: '1080px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="badge-gold">Festive Craft Room</span>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
          fontWeight: 900,
          marginTop: '10px',
          marginBottom: '8px'
        }}>
          THE RAKHI MATERIALS SHELF 🏺
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto 20px auto' }}>
          Every single thread, pearl, and gemstone chosen for this Rakhi carries a special meaning. Tap to explore!
        </p>

        {/* Featured Craft Tray */}
        <div style={{
          position: 'relative',
          maxWidth: '320px',
          margin: '0 auto 28px auto',
          borderRadius: '50%',
          boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 30px var(--gold-glow)',
          border: '3px solid var(--gold)',
          overflow: 'hidden'
        }}>
          <img
            src="/festive_assets/craft_tray_gold.png"
            alt="Rakhi Craft Tray"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'floatGentle 3s ease-in-out infinite' }}
          />
        </div>
      </div>


      {/* Materials Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        {MATERIALS.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              playSparkle();
              setActiveItem(item);
            }}
            className="glass-panel"
            style={{
              padding: '20px',
              border: '1.5px solid var(--gold-border)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--gold-border)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'var(--gold-champagne)',
                  background: 'rgba(229,193,88,0.12)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  border: '1px solid var(--gold-border)'
                }}>
                  {item.tag}
                </span>
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '6px' }}>
                {item.name}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                {item.desc}
              </p>
            </div>
            <div style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700 }}>
              Inspect Meaning →
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(10,2,6,0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '440px',
            width: '100%',
            padding: '30px 24px',
            border: '2px solid var(--gold)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px var(--gold-glow)',
            textAlign: 'center',
            position: 'relative'
          }}>
            <button
              onClick={() => { playPop(400); setActiveItem(null); }}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{activeItem.icon}</div>
            <span className="badge-gold" style={{ marginBottom: '8px', display: 'inline-block' }}>
              {activeItem.tag}
            </span>
            <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
              {activeItem.name}
            </h3>
            <p style={{ color: 'var(--cream)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
              “{activeItem.desc}”
            </p>
            <button
              onClick={() => {
                playSparkle();
                setActiveItem(null);
                if (onOpenStudio) onOpenStudio();
              }}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={16} /> Use In Rakhi Studio
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
