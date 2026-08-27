import React, { useState } from 'react';
import { Gauge, RotateCcw } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

const SCENARIOS = [
  { text: "Someone says 'Nenu neeku okati cheppali... kani leave it' and walks away.", expected: 95 },
  { text: "Taking 48 photos of you and claiming 'none of them came out nice'.", expected: 88 },
  { text: "Someone borrows your favorite pen and loses the cap.", expected: 82 },
  { text: "Walking into your room and leaving the door wide open when walking out.", expected: 99 }
];

export default function Game5RageMeter({ onBack }) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [sliderVal, setSliderVal] = useState(50);
  const [result, setResult] = useState(null);

  const scenario = SCENARIOS[scenarioIdx];

  const handlePredict = () => {
    playBonk();
    const systemVal = scenario.expected;
    const diff = Math.abs(sliderVal - systemVal);
    let note = "";
    if (diff < 15) {
      note = "Impressive self-awareness! You know your inner volcano well.";
    } else {
      note = `You predicted ${sliderVal}%, but science proves you are actually ${systemVal}% annoyed. Pure denial! 😂`;
    }
    setResult({ systemVal, note });
    playSparkle();
  };

  const nextScenario = () => {
    setResult(null);
    setSliderVal(50);
    setScenarioIdx((prev) => (prev + 1) % SCENARIOS.length);
  };

  const getEmoji = (val) => {
    if (val < 25) return "🙂 Calm";
    if (val < 50) return "😐 Mildly Irritated";
    if (val < 75) return "😑 Deep Disapproval";
    if (val < 90) return "😤 High Voltage Anger";
    return "🤬 Critical Sibling Meltdown";
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Annoyance Forecaster</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
        VYSHUU RAGE METER 🌡️
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Scenario #{scenarioIdx + 1} of {SCENARIOS.length}
      </p>

      {/* Scenario Box */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.8)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '28px',
        minHeight: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.05rem',
        color: '#fff'
      }}>
        “{scenario.text}”
      </div>

      {result ? (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '1.5px solid var(--rose)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>
            {result.systemVal > 85 ? '🌋' : '🌪️'}
          </div>
          <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '4px' }}>
            System Prediction: {result.systemVal}% Annoyed
          </h4>
          <p style={{ color: 'var(--cream-dim)', fontSize: '0.95rem', marginBottom: '16px' }}>
            {result.note}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={nextScenario} className="btn-gold">
              Next Scenario →
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '12px' }}>
              {getEmoji(sliderVal)} ({sliderVal}%)
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => {
                playPop(400 + e.target.value * 5);
                setSliderVal(Number(e.target.value));
              }}
              style={{
                width: '100%',
                accentColor: 'var(--rose)',
                cursor: 'pointer',
                height: '8px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '6px' }}>
              <span>🙂 Zen</span>
              <span>😐 Meh</span>
              <span>😤 Fuming</span>
              <span>🤬 Volcano</span>
            </div>
          </div>

          <button onClick={handlePredict} className="btn-rose" style={{ width: '100%', justifyContent: 'center' }}>
            <Gauge size={18} />
            Test Sibling Rage Level
          </button>
        </div>
      )}
    </div>
  );
}
