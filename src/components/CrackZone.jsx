import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquare, Flame, Zap, Award, Sparkles, Smile, RefreshCw } from 'lucide-react';
import { playPop, playBonk, playLaser, playSparkle, playChime } from '../utils/audio';

export default function CrackZone() {
  // Battle State
  const [battleActive, setBattleActive] = useState(false);
  const [ashuScore, setAshuScore] = useState(42);
  const [vyshuuScore, setVyshuuScore] = useState(51);
  const [tapCount, setTapCount] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'vyshuu', text: 'haha', id: 1 },
    { sender: 'ashu', text: 'hahaha', id: 2 },
    { sender: 'vyshuu', text: 'crack 😂', id: 3 },
    { sender: 'ashu', text: 'me toooooooooooooo crack', id: 4 }
  ]);
  const [multiplier, setMultiplier] = useState(1);
  const [showWarningBoard, setShowWarningBoard] = useState(false);
  const [battleComplete, setBattleComplete] = useState(false);

  // Type Your Laugh Mode
  const [typedLaugh, setTypedLaugh] = useState('');
  const [laughAnalysis, setLaughAnalysis] = useState(null);

  // "Mari nuvuuu?" State
  const [mariNuvuuStep, setMariNuvuuStep] = useState(0);

  // Easter Egg (Click CRACK 5 times)
  const [crackClicks, setCrackClicks] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const multiplierTimerRef = useRef(null);

  const handleTapHaha = () => {
    playPop(440 + tapCount * 30);
    const nextTap = tapCount + 1;
    setTapCount(nextTap);

    // Increase Ashu HA power
    const newAshu = ashuScore + Math.floor(Math.random() * 6) + 4;
    setAshuScore(newAshu);

    // Multiplier increment
    const nextMultiplier = Math.min(10, Math.floor(nextTap / 2) + 1);
    setMultiplier(nextMultiplier);

    // Reset multiplier decay
    clearTimeout(multiplierTimerRef.current);
    multiplierTimerRef.current = setTimeout(() => {
      setMultiplier(1);
    }, 2000);

    if (nextMultiplier >= 10 && !showWarningBoard) {
      playBonk();
      setShowWarningBoard(true);
      setTimeout(() => setShowWarningBoard(false), 3000);
    }

    // Generate longer hahas
    const haCount = Math.min(30, 2 + nextTap * 3);
    const haText = 'ha'.repeat(haCount) + ' 😂';

    const newMsgId = Date.now();
    setChatMessages(prev => [...prev.slice(-6), { sender: 'ashu', text: haText, id: newMsgId }]);

    // Vyshuu AI Counters after 400ms
    setTimeout(() => {
      const vyshuuHaCount = Math.min(35, 3 + nextTap * 3);
      const vyshuuText = 'he'.repeat(vyshuuHaCount) + ' 😭';
      setChatMessages(prev => [...prev.slice(-6), { sender: 'vyshuu', text: vyshuuText, id: Date.now() + 1 }]);
      setVyshuuScore(prev => prev + Math.floor(Math.random() * 8) + 5);

      if (newAshu > 140 && !battleComplete) {
        setBattleComplete(true);
        playChime();
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      }
    }, 450);
  };

  const handleTypeLaugh = (e) => {
    const text = e.target.value;
    setTypedLaugh(text);

    if (text.length > 3) {
      const len = text.length;
      const chaos = Math.min(100, Math.floor((len * 2.8) + (text.includes('😂') ? 20 : 0)));
      let rating = 'Normal Human';
      if (len > 12) rating = 'Slightly Crack';
      if (len > 24) rating = 'Double Crackkk';
      if (len > 36) rating = '3X CRACK';
      if (len > 50) rating = 'CERTIFIED CRACK DUO';

      setLaughAnalysis({ length: len, chaos, rating });
    } else {
      setLaughAnalysis(null);
    }
  };

  const handleCrackWordClick = () => {
    playSparkle();
    const next = crackClicks + 1;
    setCrackClicks(next);
    if (next >= 5) {
      setEasterEggActive(true);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }
  };

  // Determine Level
  const totalPower = ashuScore + vyshuuScore;
  let levelName = 'Normal Human';
  if (totalPower > 130) levelName = 'Slightly Crack';
  if (totalPower > 170) levelName = 'Double Crackkk';
  if (totalPower > 210) levelName = '3X CRACK';
  if (totalPower > 260) levelName = 'CERTIFIED CRACK DUO';

  return (
    <section style={{
      padding: '80px 16px',
      maxWidth: '1100px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span 
          onClick={handleCrackWordClick}
          className="badge-gold" 
          style={{ cursor: 'pointer', userSelect: 'none' }}
          title="Psst... tap 5 times!"
        >
          😂 THE CRACK ARCHIVE
        </span>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 900,
          marginTop: '10px',
          marginBottom: '8px'
        }}>
          THE CRACK ZONE 😂
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto' }}>
          Where “haha” stopped being normal a long time ago. Based on 100% authentic WhatsApp evidence.
        </p>
      </div>

      {/* Main Grid: HAHAHAHA Battle + Type Your Laugh */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '36px'
      }}>
        {/* Box 1: HAHAHAHA BATTLE */}
        <div className="glass-panel" style={{
          padding: '24px',
          border: '1.5px solid var(--gold-border-bright)',
          boxShadow: '0 20px 45px rgba(0,0,0,0.7)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--gold)' }}>
              ⚔️ HAHAHAHA BATTLE
            </span>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '9999px',
              background: 'rgba(244,63,94,0.15)',
              color: 'var(--rose-light)',
              border: '1px solid rgba(244,63,94,0.3)'
            }}>
              Level: {levelName}
            </span>
          </div>

          {/* HA Power Meters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            background: 'rgba(0,0,0,0.35)',
            padding: '12px',
            borderRadius: '12px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ASHUU</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--gold)' }}>{ashuScore}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--gold-champagne)' }}>HA POWER</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>VYSHUUU</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--rose-light)' }}>{vyshuuScore}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--rose-light)' }}>HA POWER</div>
            </div>
          </div>

          {/* Simulated WhatsApp Chat Stream */}
          <div style={{
            height: '210px',
            overflowY: 'auto',
            background: 'rgba(10, 24, 18, 0.65)',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            border: '1px solid rgba(34,197,94,0.2)',
            marginBottom: '16px'
          }}>
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'ashu' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'ashu' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(255,255,255,0.08)',
                  border: msg.sender === 'ashu' ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  maxWidth: '85%',
                  fontSize: '0.88rem',
                  wordBreak: 'break-word',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  animation: 'fadeInScale 0.2s ease forwards'
                }}
              >
                <div style={{ fontSize: '0.65rem', color: msg.sender === 'ashu' ? '#86efac' : '#f9a8d4', fontWeight: 700, marginBottom: '2px' }}>
                  {msg.sender === 'ashu' ? 'Ashu' : 'Vyshuu'}
                </div>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Warning Board Popup (At 10x Multiplier) */}
          {showWarningBoard && (
            <div style={{
              background: '#ef4444',
              color: '#fff',
              fontWeight: 900,
              fontSize: '0.84rem',
              padding: '8px',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '12px',
              boxShadow: '0 0 20px rgba(239,68,68,0.7)',
              animation: 'pulseGoldGlow 1s infinite'
            }}>
              🚨 TEDDY WARNING: TOO MUCH HAHA DETECTED!
            </div>
          )}

          {/* Tap Button & Multiplier */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={handleTapHaha}
              className="btn-rose"
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '0.95rem',
                justifyContent: 'center',
                minHeight: '48px'
              }}
            >
              <Smile size={18} />
              HAHA MORE 😂
            </button>
            <div style={{
              padding: '10px 14px',
              background: multiplier > 1 ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.05)',
              border: multiplier > 1 ? '1.5px solid var(--rose-light)' : '1px solid var(--gold-border)',
              borderRadius: '12px',
              color: multiplier > 1 ? 'var(--rose-light)' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: 800,
              textAlign: 'center',
              minWidth: '90px'
            }}>
              {multiplier}x CRACK
            </div>
          </div>

          {battleComplete && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '10px',
              background: 'rgba(229,193,88,0.15)',
              border: '1.5px solid var(--gold)',
              textAlign: 'center'
            }}>
              <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.92rem' }}>
                🎉 CRACK COMPATIBILITY: 100%
              </div>
              <div style={{ color: 'var(--cream)', fontSize: '0.8rem', marginTop: '4px' }}>
                Medical conclusion: iddharini separate ga test cheyyali 😂
              </div>
            </div>
          )}
        </div>

        {/* Box 2: Type Your Laugh Mode & “Mari nuvuuu?” */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Type Your Laugh */}
          <div className="glass-panel" style={{
            padding: '24px',
            border: '1.5px solid var(--gold-border-bright)',
            flex: 1
          }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--gold)' }}>
              ⌨️ TYPE YOUR BEST LAUGH
            </span>
            <p style={{ color: 'var(--cream-dim)', fontSize: '0.84rem', marginTop: '6px', marginBottom: '14px' }}>
              Type your real-life hahaha below to measure your chaos index:
            </p>

            <input
              type="text"
              value={typedLaugh}
              onChange={handleTypeLaugh}
              placeholder="e.g. hahahahahahahahaha..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(20,5,12,0.85)',
                border: '1.5px solid var(--gold-border)',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                marginBottom: '14px'
              }}
            />

            {laughAnalysis ? (
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--gold-border)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--cream)', marginBottom: '4px' }}>
                  <span>Length: <strong>{laughAnalysis.length} chars</strong></span>
                  <span>Chaos: <strong style={{ color: 'var(--rose-light)' }}>{laughAnalysis.chaos}%</strong></span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--gold)', fontWeight: 700 }}>
                  Rating: {laughAnalysis.rating}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', fontStyle: 'italic' }}>
                  “Good attempt. But Ashuu has historical evidence.”
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Start typing `ha...` above to see your diagnostic breakdown.
              </div>
            )}
          </div>

          {/* Box 3: “Mari nuvuuu?” Interactive Card */}
          <div className="glass-panel" style={{
            padding: '24px',
            border: '1.5px solid var(--gold-border-bright)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '8px' }}>
              🧸 SIBLING VERDICT
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
              Vyshuu = CRACK.
            </div>

            {mariNuvuuStep === 0 ? (
              <button
                onClick={() => {
                  playPop(520);
                  setMariNuvuuStep(1);
                }}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', minHeight: '48px' }}
              >
                Mari nuvuuu? 👀
              </button>
            ) : (
              <div style={{
                background: 'rgba(244,63,94,0.15)',
                padding: '14px',
                borderRadius: '12px',
                border: '1.5px solid var(--rose-light)',
                animation: 'fadeInScale 0.3s ease'
              }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--rose-light)', marginBottom: '6px' }}>
                  Me toooooooooooooo crack 😭❤️
                </div>
                <p style={{ color: 'var(--cream)', fontSize: '0.8rem', margin: 0 }}>
                  Both officially certified. Case closed forever!
                </p>
                <button
                  onClick={() => setMariNuvuuStep(0)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    marginTop: '8px',
                    textDecoration: 'underline'
                  }}
                >
                  Ask again 🔄
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secret Easter Egg Modal (5x clicks on CRACK) */}
      {easterEggActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '420px',
            width: '100%',
            padding: '32px 24px',
            textAlign: 'center',
            border: '2px solid var(--gold)',
            boxShadow: '0 0 50px var(--gold-glow)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🧪😂</div>
            <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>
              SECRET DIAGNOSIS UNLOCKED
            </h3>
            <p style={{ color: 'var(--cream)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Crack detected.<br />
              Scanning chat logs…<br /><br />
              <strong style={{ color: 'var(--gold)', fontSize: '1.05rem' }}>
                Vyshuu + Ashuu = Double Crack Certified 😂
              </strong>
            </p>
            <button
              onClick={() => setEasterEggActive(false)}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center', minHeight: '48px' }}
            >
              Accept Diagnosis ❤️
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
