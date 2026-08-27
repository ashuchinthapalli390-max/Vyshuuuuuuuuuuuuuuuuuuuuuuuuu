import React, { useState } from 'react';
import { Swords, ShieldAlert, Sparkles, Volume2, RotateCcw } from 'lucide-react';
import { playLaser, playBonk, playGavel, playPop, playSparkle } from '../../utils/audio';

const TOPICS = [
  "“Who changed the TV channel right when the match was getting good?”",
  "“Whose turn is it to get up and switch off the bedroom light?”",
  "“Why did you leave 2 drops of water in the bottle and put it back?”",
  "“Who ate the Dairy Milk that was hidden behind the frozen peas?”"
];

export default function Game2ArgumentSim({ onBack }) {
  const [topicIdx, setTopicIdx] = useState(0);
  const [actionLog, setActionLog] = useState("Round 1: Staredown initiated.");
  const [momAlert, setMomAlert] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [vyshuuMood, setVyshuuMood] = useState("Neutral 😐");

  const handleAttack = (type) => {
    if (momAlert || isGameOver) return;

    if (type === 'logic') {
      playLaser();
      setActionLog("You used LOGIC! 🤓 Vyshuu countered with 'Chaalu, don't give speeches.' Logic completely deflated.");
      setVyshuuMood("Annoyed 😒");
    } else if (type === 'sarcasm') {
      playPop(850);
      setActionLog("You used SARCASM! 🙄 Vyshuu threw a cushion at your head. Critical hit!");
      setVyshuuMood("Eye-rolling 🙄");
    } else if (type === 'ignore') {
      playBonk();
      setActionLog("You tried to IGNORE her! Vyshuu increased volume by 300%. Sibling peace disrupted.");
      setVyshuuMood("Furious 😤");
    } else if (type === 'mom') {
      playGavel();
      setMomAlert(true);
      setActionLog("🚨 EMERGENCY: MOM HAS BEEN SUMMONED! Both parties immediately retreat to pretend to study!");
      setTimeout(() => {
        setIsGameOver(true);
        playSparkle();
      }, 2500);
    }
  };

  const restart = () => {
    setTopicIdx((prev) => (prev + 1) % TOPICS.length);
    setActionLog("Round began: Silence before the storm.");
    setMomAlert(false);
    setIsGameOver(false);
    setVyshuuMood("Neutral 😐");
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-rose">Arena Battle</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
        SIBLING ARGUMENT SIMULATOR
      </h3>
      <p style={{ color: 'var(--cream-dim)', fontSize: '0.95rem', marginBottom: '20px' }}>
        {TOPICS[topicIdx]}
      </p>

      {/* Arena Fighters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        padding: '16px',
        background: 'rgba(18, 4, 10, 0.7)',
        borderRadius: '16px',
        border: '1px solid var(--gold-border)'
      }}>
        {/* Fighter 1: Brother */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>🧑‍💻</div>
          <strong style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>YOU (BROTHER)</strong>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Defense: 50%</p>
        </div>

        <div style={{ color: 'var(--rose)', fontWeight: 800, fontSize: '1.2rem' }}>
          VS
        </div>

        {/* Fighter 2: Vyshuu */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>👸</div>
          <strong style={{ color: 'var(--rose-light)', fontSize: '0.9rem' }}>VYSHUU</strong>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mood: {vyshuuMood}</p>
        </div>
      </div>

      {/* Action Log Box */}
      <div style={{
        minHeight: '60px',
        background: 'rgba(244, 63, 94, 0.08)',
        border: '1px solid var(--gold-border)',
        borderRadius: '12px',
        padding: '12px',
        fontSize: '0.9rem',
        color: 'var(--text-main)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {actionLog}
      </div>

      {/* Mom Alert Screen Shake Overlay */}
      {momAlert && (
        <div className="animate-shake" style={{
          padding: '16px',
          background: '#dc2626',
          color: '#fff',
          borderRadius: '12px',
          fontWeight: 800,
          fontSize: '1.1rem',
          marginBottom: '20px',
          boxShadow: '0 0 30px #dc2626'
        }}>
          ⚠️ “MOM ENTRIES THE ARENA!” BOTH OF YOU SIT QUIETLY!
        </div>
      )}

      {isGameOver ? (
        <div>
          <div style={{
            background: 'rgba(229, 193, 88, 0.15)',
            border: '2px solid var(--gold)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h4 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '8px' }}>
              BATTLE VERDICT
            </h4>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              🏆 Winner: Mom. Obviously.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Both combatants received equal scolding for wasting electricity.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={restart} className="btn-secondary">
              <RotateCcw size={16} /> New Argument
            </button>
            <button onClick={onBack} className="btn-gold">
              Back to Arcade
            </button>
          </div>
        </div>
      ) : (
        /* Move Selection */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => handleAttack('logic')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            🤓 Use Logic
          </button>
          <button onClick={() => handleAttack('sarcasm')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            😏 Sarcasm Attack
          </button>
          <button onClick={() => handleAttack('ignore')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            🤫 Act Deaf
          </button>
          <button onClick={() => handleAttack('mom')} className="btn-rose" style={{ justifyContent: 'center' }}>
            🚨 Call Mom! 😂
          </button>
        </div>
      )}
    </div>
  );
}
