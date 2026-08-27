import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Check, RotateCcw } from 'lucide-react';
import { playPop, playSparkle, playChime } from '../utils/audio';

const THALI_ITEMS = [
  { id: 'diya', name: 'Golden Diya', icon: '🪔', pos: { top: '38%', left: '50%' } },
  { id: 'kumkum', name: 'Red Kumkum', icon: '🔴', pos: { top: '24%', left: '30%' } },
  { id: 'rice', name: 'Sacred Akshata', icon: '🌾', pos: { top: '65%', left: '50%' } },
  { id: 'sweets', name: 'Golden Ladoos', icon: '🟡', pos: { top: '28%', left: '70%' } },
  { id: 'flowers', name: 'Marigold Flowers', icon: '🌼', pos: { top: '55%', left: '26%' } }
];

export default function DecorateThali({ onThaliReady }) {
  const [placedItems, setPlacedItems] = useState({});
  const [isReady, setIsReady] = useState(false);

  const toggleItem = (id) => {
    playPop(600);
    const updated = { ...placedItems, [id]: !placedItems[id] };
    setPlacedItems(updated);

    const count = Object.values(updated).filter(Boolean).length;
    if (count === THALI_ITEMS.length && !isReady) {
      playChime();
      setIsReady(true);
      playSparkle();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e5c158', '#f43f5e', '#ffffff']
      });
    }
  };

  const reset = () => {
    playPop(400);
    setPlacedItems({});
    setIsReady(false);
  };

  return (
    <section style={{
      padding: '70px 16px',
      maxWidth: '740px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <span className="badge-gold">Festive Mini-Game</span>
      <h2 className="font-serif text-gold-gradient" style={{
        fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
        fontWeight: 900,
        marginTop: '8px',
        marginBottom: '6px'
      }}>
        DECORATE THE PUJA THALI 🪔
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 24px auto' }}>
        Arrange the sacred diya, sweets, flowers, and kumkum to prepare the thali for Rakhi tying!
      </p>

      {/* Main Thali Board */}
      <div className="glass-panel" style={{
        padding: '24px 16px',
        border: '1.5px solid var(--gold-border-bright)',
        boxShadow: isReady ? '0 0 40px var(--gold-glow)' : 'var(--shadow-glass)',
        marginBottom: '20px'
      }}>
        {/* Brass Thali Illustration Container */}
        <div style={{
          position: 'relative',
          width: 'min(300px, 80vw)',
          height: 'min(300px, 80vw)',
          margin: '0 auto 24px auto',
          borderRadius: '50%',
          backgroundImage: 'url(/illustrations/festive_puja_thali.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 15px 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)',
          border: '4px solid #d4af37',
          overflow: 'hidden'
        }}>
          {/* Active Overlay Checkmarks */}
          {THALI_ITEMS.map((item) => {
            const isPlaced = placedItems[item.id];
            if (!isPlaced) return null;
            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: item.pos.top,
                  left: item.pos.left,
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(20,5,12,0.85)',
                  border: '1.5px solid #22c55e',
                  color: '#fff',
                  borderRadius: '9999px',
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.7)',
                  animation: 'floatGentle 2s ease-in-out infinite'
                }}
              >
                <span>{item.icon}</span>
                <Check size={12} color="#22c55e" />
              </div>
            );
          })}
        </div>

        {/* Item Selection Buttons (Mobile-first min 44px) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          {THALI_ITEMS.map((item) => {
            const isPlaced = placedItems[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={isPlaced ? "btn-gold" : "btn-secondary"}
                style={{
                  minHeight: '44px',
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                {isPlaced && <Check size={14} />}
              </button>
            );
          })}
        </div>

        {/* Status Box */}
        {isReady ? (
          <div style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1.5px solid #22c55e',
            borderRadius: '14px',
            padding: '16px',
            animation: 'floatGentle 3s ease-in-out infinite'
          }}>
            <h4 style={{ color: '#22c55e', fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
              PUJA THALI IS COMPLETE! 🪔✨
            </h4>
            <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '14px' }}>
              Diya lit, sweets arranged, kumkum ready. Time for the sacred tying ceremony!
            </p>
            <button
              onClick={() => {
                playChime();
                const el = document.getElementById('rakhi');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold"
            >
              Proceed to Rakhi Ceremony →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Items arranged: {Object.values(placedItems).filter(Boolean).length} / {THALI_ITEMS.length}
            </span>
            {Object.values(placedItems).some(Boolean) && (
              <button onClick={reset} style={{ background: 'transparent', border: 'none', color: 'var(--rose-light)', cursor: 'pointer', fontSize: '0.8rem' }}>
                Reset Thali
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
