import React, { useState } from 'react';
import { Flame, Sparkles, RefreshCw } from 'lucide-react';
import { playLaser, playBonk, playPop, playSparkle } from '../../utils/audio';

const VYSHUU_ROASTS = [
  "“CEO of tiny replies: Reads a 4-paragraph story, replies with ‘k’.”",
  "“Professional ‘chaalu’ representative: Uses it to dismiss 100% of arguments.”",
  "“Certified chaos consultant: Can cause domestic panic just by looking for one missing hair tie.”",
  "“Can watch 240 Instagram reels in one sitting, but listening to brother for 30 seconds requires medical oxygen.”"
];

const BROTHER_ROASTS = [
  "“Bro built an entire Three.js universe with 3D galaxies instead of just saying Happy Rakhi normally 😭”",
  "“Will code an interactive 3D physics engine, but asks ‘Where is the ketchup?’ when it’s touching his hand on the shelf.”",
  "“Gives an entire Ted Talk when asked a simple yes/no question.”",
  "“Acts like the mature older brother until someone challenges him in Mario Kart or Ludo.”",
  "“Lectures me on financial discipline, then buys an RGB mechanical keyboard he doesn’t even need.”"
];

export default function GameRoastMachine({ onBack }) {
  const [activeRoast, setActiveRoast] = useState({ target: 'vyshuu', text: VYSHUU_ROASTS[0] });

  const roastVyshuu = () => {
    playLaser();
    const random = VYSHUU_ROASTS[Math.floor(Math.random() * VYSHUU_ROASTS.length)];
    setActiveRoast({ target: 'vyshuu', text: random });
  };

  const roastBrother = () => {
    playBonk();
    const random = BROTHER_ROASTS[Math.floor(Math.random() * BROTHER_ROASTS.length)];
    setActiveRoast({ target: 'brother', text: random });
  };

  return (
    <div className="glass-panel" style={{ padding: '36px 20px', maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Banter Generator</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        SIBLING ROAST MACHINE 🔥
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Fair, safe, and hilarious habit banter for both sides!
      </p>

      {/* Roast Display Box */}
      <div style={{
        background: activeRoast.target === 'vyshuu' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(229, 193, 88, 0.12)',
        border: activeRoast.target === 'vyshuu' ? '1.5px solid var(--rose)' : '1.5px solid var(--gold)',
        borderRadius: '16px',
        padding: '28px 20px',
        minHeight: '130px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        animation: 'floatGentle 3s ease-in-out infinite'
      }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: activeRoast.target === 'vyshuu' ? 'var(--rose-light)' : 'var(--gold)',
          marginBottom: '8px'
        }}>
          {activeRoast.target === 'vyshuu' ? "TARGET: VYSHUU 😈" : "TARGET: BROTHER (SELF-ROAST) 🧑‍💻"}
        </span>
        <p style={{
          color: '#fff',
          fontSize: '1.1rem',
          fontWeight: 600,
          lineHeight: '1.6'
        }}>
          {activeRoast.text}
        </p>
      </div>

      {/* Roast Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button onClick={roastVyshuu} className="btn-rose" style={{ justifyContent: 'center', padding: '14px' }}>
          <Flame size={18} />
          Roast Vyshuu
        </button>
        <button onClick={roastBrother} className="btn-gold" style={{ justifyContent: 'center', padding: '14px' }}>
          <Sparkles size={18} />
          Roast Brother 😂
        </button>
      </div>
    </div>
  );
}
