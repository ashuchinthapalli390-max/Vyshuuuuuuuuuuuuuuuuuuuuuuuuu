import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Skull, Sparkles, Utensils, RotateCcw } from 'lucide-react';
import { playLaser, playBonk, playSparkle } from '../../utils/audio';

export default function Game10BossFight({ onBack }) {
  const [bossHp, setBossHp] = useState(100);
  const [battleLog, setBattleLog] = useState("A wild ridiculous argument has appeared!");
  const [isVictory, setIsVictory] = useState(false);

  const handleMove = (type) => {
    if (isVictory) return;

    if (type === 'sorry') {
      playLaser();
      setBossHp((hp) => Math.max(0, hp - 20));
      setBattleLog("You said 'Sorry'. Boss was skeptical: 'Did you actually mean it though?' (-20 HP)");
    } else if (type === 'chocolate') {
      playSparkle();
      setBossHp((hp) => Math.max(0, hp - 35));
      setBattleLog("You offered 5-Star Chocolate! The Boss hesitated and took a bite! (-35 HP)");
    } else if (type === 'meme') {
      playBonk();
      setBossHp((hp) => Math.max(0, hp - 25));
      setBattleLog("You sent an Instagram reel! Boss suppressed a chuckle! (-25 HP)");
    } else if (type === 'food') {
      playSparkle();
      setBossHp(0);
      setIsVictory(true);
      setBattleLog("💥 ULTIMATE MOVE: 'ANYWAY, WHAT ARE WE EATING?!' Deals 99,999 CRITICAL DAMAGE!");
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const restart = () => {
    setBossHp(100);
    setBattleLog("The argument resets! Prepare your peacemaking moves.");
    setIsVictory(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Epic Sibling Raid</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        SIBLING BOSS FIGHT 👾
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Defeat the final boss to restore household serenity.
      </p>

      {/* Boss Display */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.8)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '8px', animation: isVictory ? 'none' : 'floatGentle 2s ease-in-out infinite' }}>
          {isVictory ? '🕊️' : '🗯️'}
        </div>

        <h4 className="font-serif" style={{ fontSize: '1.3rem', color: isVictory ? '#22c55e' : 'var(--rose)', marginBottom: '8px' }}>
          {isVictory ? "THE ARGUMENT IS DEFEATED!" : "BOSS: THE GREAT ARGUMENT"}
        </h4>

        {/* HP Bar */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>“WHY ARE WE EVEN FIGHTING?”</span>
            <span>{bossHp} / 100 HP</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              width: `${bossHp}%`,
              height: '100%',
              background: bossHp > 40 ? 'linear-gradient(90deg, #ef4444, #f43f5e)' : '#22c55e',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Battle Log */}
      <div style={{
        minHeight: '60px',
        background: 'rgba(229, 193, 88, 0.08)',
        border: '1px solid var(--gold-border)',
        borderRadius: '12px',
        padding: '12px',
        fontSize: '0.9rem',
        color: 'var(--cream)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {battleLog}
      </div>

      {isVictory ? (
        <div style={{
          background: 'rgba(34, 197, 94, 0.15)',
          border: '2px solid #22c55e',
          borderRadius: '16px',
          padding: '20px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <h4 style={{ color: '#22c55e', fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
            VICTORY ACHIEVED! 🏆
          </h4>
          <p style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '16px' }}>
            The argument was forgotten immediately the moment food was mentioned.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={restart} className="btn-secondary">
              <RotateCcw size={16} /> Rematch
            </button>
            <button onClick={onBack} className="btn-gold">
              Return to Arcade
            </button>
          </div>
        </div>
      ) : (
        /* Action Moves */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => handleMove('sorry')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            Say 'Sorry' (-20)
          </button>
          <button onClick={() => handleMove('chocolate')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            Offer Chocolate (-35)
          </button>
          <button onClick={() => handleMove('meme')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            Send Meme (-25)
          </button>
          <button onClick={() => handleMove('food')} className="btn-rose" style={{ justifyContent: 'center', gridColumn: 'span 2' }}>
            <Utensils size={18} />
            “ANYWAY, WHAT ARE WE EATING?” (99999 DMG)
          </button>
        </div>
      )}
    </div>
  );
}
