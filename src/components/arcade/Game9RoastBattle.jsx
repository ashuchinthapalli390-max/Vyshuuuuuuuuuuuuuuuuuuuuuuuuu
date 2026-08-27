import React, { useState } from 'react';
import { Flame, Sparkles, RefreshCw } from 'lucide-react';
import { playBonk, playLaser, playSparkle } from '../../utils/audio';

const SISTER_ROASTS = [
  { title: "CEO of 'Chaalu'", desc: "Uses 'Chaalu' to dismiss 100% of brother's logical arguments." },
  { title: "Professional Overreactor", desc: "A tiny spider across the room gets treated like Godzilla attacking Tokyo." },
  { title: "Selective Deafness Champion", desc: "Can hear a chocolate wrapper from 3 rooms away, but can't hear someone calling her name from 3 feet away." },
  { title: "Planetary Alignment Reply System", desc: "Reads message at 2:00 PM. Replies at 11:45 PM with 'k'." }
];

const BROTHER_COMEBACKS = [
  "“Built an entire high-tech interactive 3D universe website instead of just saying Happy Rakhi like a normal person 😭”",
  "“Will code a complex 3D engine in 2 hours, but can't find the tomato ketchup sitting directly in front of his nose on the top fridge shelf.”",
  "“Says ‘I am leaving in 5 minutes’ when he literally hasn't even chosen which shirt to wear.”",
  "“Acts like the CEO of the house until Mom asks who forgot to turn off the bathroom geyser.”",
  "“Lectures me on saving money, then orders 3 random tech gadgets from Amazon at 2 AM.”"
];

export default function Game9RoastBattle({ onBack }) {
  const [sisterIdx, setSisterIdx] = useState(0);
  const [comeback, setComeback] = useState(null);

  const handleRoastHim = () => {
    playLaser();
    const randomRoast = BROTHER_COMEBACKS[Math.floor(Math.random() * BROTHER_COMEBACKS.length)];
    setComeback(randomRoast);
  };

  const nextSisterRoast = () => {
    playBonk();
    setComeback(null);
    setSisterIdx((prev) => (prev + 1) % SISTER_ROASTS.length);
  };

  const roast = SISTER_ROASTS[sisterIdx];

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Sibling Roast Club</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
        THE SIBLING ROAST BATTLE 🔥
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Harmless habit roasts only. Click "Roast Him Back" to let Vyshuu hit back!
      </p>

      {/* Brother Roasting Vyshuu Card */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.85)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        position: 'relative'
      }}>
        <span style={{
          position: 'absolute',
          top: '-12px',
          left: '20px',
          background: 'var(--gold)',
          color: '#1a0802',
          padding: '2px 10px',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 800
        }}>
          BROTHER'S ROAST FOR VYSHUU
        </span>

        <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '8px', marginTop: '6px' }}>
          {roast.title}
        </h4>
        <p style={{ color: 'var(--cream)', fontSize: '1rem', lineHeight: '1.5' }}>
          “{roast.desc}”
        </p>

        <button onClick={nextSisterRoast} className="btn-secondary" style={{ marginTop: '16px', fontSize: '0.8rem', padding: '6px 16px' }}>
          <RefreshCw size={14} /> Next Sister Habit
        </button>
      </div>

      {/* Vyshuu's Comeback Section */}
      {comeback ? (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '2px solid var(--rose)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <span className="badge-rose" style={{ marginBottom: '8px', display: 'inline-block' }}>
            VYSHUU’S COUNTER-ATTACK! 💥
          </span>
          <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, lineHeight: '1.5', margin: '10px 0 16px 0' }}>
            {comeback}
          </p>
          <button onClick={handleRoastHim} className="btn-rose" style={{ justifyContent: 'center' }}>
            Generate Another Brother Roast! 😈
          </button>
        </div>
      ) : (
        <button onClick={handleRoastHim} className="btn-rose" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
          <Flame size={20} />
          ROAST HIM BACK (DESTROY BROTHER) 💥
        </button>
      )}
    </div>
  );
}
