import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Skull, Sparkles, MessageCircle, RotateCcw } from 'lucide-react';
import { playLaser, playBonk, playSparkle, playPop } from '../../utils/audio';

export default function GameHmmBoss({ onBack }) {
  const [bossHp, setBossHp] = useState(100);
  const [battleLog, setBattleLog] = useState("The Dreaded 'HMM' has entered the arena! Conversation flatlining.");
  const [isVictory, setIsVictory] = useState(false);

  const handleAttack = (type) => {
    if (isVictory) return;

    if (type === 'meme') {
      playLaser();
      setBossHp((hp) => {
        const next = Math.max(0, hp - 25);
        if (next === 0) triggerVictory();
        return next;
      });
      setBattleLog("You sent a hilarious cat reel! 'HMM' takes 25 DMG and cracks a smile.");
    } else if (type === 'question') {
      playPop(700);
      setBossHp((hp) => {
        const next = Math.max(0, hp - 20);
        if (next === 0) triggerVictory();
        return next;
      });
      setBattleLog("You asked: 'Who do you think wore it better?' 'HMM' takes 20 DMG trying to decide.");
    } else if (type === 'topic') {
      playSparkle();
      setBossHp((hp) => {
        const next = Math.max(0, hp - 30);
        if (next === 0) triggerVictory();
        return next;
      });
      setBattleLog("You changed the topic to food! 'HMM' takes 30 critical damage!");
    } else if (type === 'counter_hmm') {
      playBonk();
      setBossHp((hp) => Math.min(100, hp + 35));
      setBattleLog("You replied with another 'hmm'! Mutual standoff! 'HMM' HEALED +35 HP! 😂");
    }
  };

  const triggerVictory = () => {
    setIsVictory(true);
    playSparkle();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setBattleLog("🎉 'HMM' DEFEATED! CONVERSATION SUCCESSFULLY REVIVED!");
  };

  const restart = () => {
    setBossHp(100);
    setBattleLog("A wild 'HMM' appears. Revive the chat!");
    setIsVictory(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Digital Boss Raid</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        THE “HMM” BOSS FIGHT 👾
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Defeat the one-word reply to revive normal sibling conversation!
      </p>

      {/* Boss Display Box */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.8)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 900,
          color: isVictory ? '#22c55e' : 'var(--rose)',
          letterSpacing: '4px',
          marginBottom: '8px',
          animation: isVictory ? 'none' : 'floatGentle 2s ease-in-out infinite'
        }}>
          {isVictory ? "REVIVED! 🥳" : "“ HMM ”"}
        </div>

        {/* Boss HP Bar */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>CONVERSATION STAMINA</span>
            <span>{bossHp} / 100 HP</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              width: `${bossHp}%`,
              height: '100%',
              background: bossHp > 35 ? 'linear-gradient(90deg, #ef4444, #f43f5e)' : '#22c55e',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Battle Log Box */}
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
            CONVERSATION SAVED! 🏆
          </h4>
          <p style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '16px' }}>
            Vyshuu finally typed more than 4 letters in a row. Sibling victory achieved!
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
        /* Player Attacks */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => handleAttack('meme')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            Send Meme (-25)
          </button>
          <button onClick={() => handleAttack('question')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            Random Question (-20)
          </button>
          <button onClick={() => handleAttack('topic')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            Change Topic (-30)
          </button>
          <button onClick={() => handleAttack('counter_hmm')} className="btn-rose" style={{ justifyContent: 'center' }}>
            Reply with “hmm” (+35 HP) 😭
          </button>
        </div>
      )}
    </div>
  );
}
