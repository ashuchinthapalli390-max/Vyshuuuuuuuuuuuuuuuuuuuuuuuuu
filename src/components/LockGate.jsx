import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Mail, Lock, Heart, ArrowRight } from 'lucide-react';
import { playPop, playBonk, playSparkle, playChime } from '../utils/audio';

export default function LockGate({ onUnlock }) {
  const [step, setStep] = useState('password'); // 'password' | 'email' | 'sending'
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isTooEarly, setIsTooEarly] = useState(false);
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkPassword = async (bypassTime = false) => {
    setMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() || (bypassTime ? '16120311' : ''), bypassTimeCheck: bypassTime })
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        if (data.tooEarly && !bypassTime) {
          setIsTooEarly(true);
          playSparkle();
          setMessage(data.message || 'Password correcttt 😭❤️ But not yet... wait till 12:00 AM!');
          return;
        }
        playBonk();
        setMessage(data.message || 'Nopeee 😭 Wrong password. Check the mail again 👀');
        setShake(true);
        setTimeout(() => setShake(false), 450);
        return;
      }

      playSparkle();
      setMessage('Correcttttt 😭❤️');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

      setTimeout(() => {
        setStep('email');
        setMessage('');
      }, 700);
    } catch (err) {
      setIsLoading(false);
      // Client-side fallback if server fails
      if (password.trim() === '16120311' || bypassTime) {
        playSparkle();
        setMessage('Correcttttt 😭❤️');
        setTimeout(() => {
          setStep('email');
          setMessage('');
        }, 700);
      } else {
        playBonk();
        setMessage('Nopeee 😭 Wrong password. Check the mail again 👀');
        setShake(true);
        setTimeout(() => setShake(false), 450);
      }
    }
  };

  const sendMail = async () => {
    setStep('sending');
    setMessage('Sending teddy mail... 🧸💌');
    playChime();

    try {
      const res = await fetch('/api/complete-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await res.json();

      if (!res.ok) {
        setStep('email');
        playBonk();
        setMessage(data.message || 'Error sending mail 😭');
        return;
      }

      playSparkle();
      setMessage('Mail vellindhiiii ❤️ Opening your surprise...');
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#e5c158', '#f43f5e', '#ffffff', '#fbbf24']
      });

      setTimeout(() => {
        onUnlock();
      }, 1500);
    } catch (err) {
      // Fallback
      playSparkle();
      setMessage('Opening your surprise... ❤️');
      setTimeout(() => {
        onUnlock();
      }, 1200);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999999,
      backgroundImage: 'linear-gradient(rgba(14, 2, 8, 0.82), rgba(8, 1, 4, 0.9)), url(/festive_assets/bg_countdown_clouds.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflowY: 'auto'
    }}>
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '440px',
          borderRadius: '32px',
          border: '1.5px solid var(--gold-border-bright)',
          background: 'rgba(15, 3, 9, 0.78)',
          backdropFilter: 'blur(24px)',
          padding: 'clamp(28px, 6vw, 40px) clamp(20px, 5vw, 32px)',
          textAlign: 'center',
          boxShadow: '0 30px 100px rgba(0,0,0,0.85), 0 0 45px var(--gold-glow)',
          transform: shake ? 'translateX(-6px)' : 'none',
          transition: 'transform 0.1s ease',
          margin: 'auto 0'
        }}
      >
        {/* Animated Teddy Mascot */}
        <img
          src="/cursor.png"
          alt="Teddy Mascot"
          style={{
            width: '84px',
            height: '84px',
            objectFit: 'contain',
            margin: '0 auto 12px auto',
            display: 'block',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))',
            animation: 'floatGentle 3s ease-in-out infinite'
          }}
        />

        <p style={{
          marginBottom: '10px',
          fontSize: '0.74rem',
          letterSpacing: '0.25em',
          color: 'var(--gold-champagne)',
          fontWeight: 800,
          textTransform: 'uppercase'
        }}>
          🧸 PRIVATE RAKHI SURPRISE
        </p>

        {step === 'password' && (
          <>
            <h1 className="font-serif text-gold-gradient" style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: '1.2',
              marginBottom: '6px'
            }}>
              Vyshuu Only ❤️
            </h1>

            <p style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', marginBottom: '22px' }}>
              Teddy says secret password firsttt 👀
            </p>

            <form onSubmit={(e) => { e.preventDefault(); checkPassword(); }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secret password"
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  border: '1.5px solid var(--gold-border)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '14px 20px',
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  color: '#fff',
                  outline: 'none',
                  letterSpacing: '2px',
                  marginBottom: '14px'
                }}
              />

              <button
                type="submit"
                disabled={isLoading || !password.trim()}
                className="btn-gold"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '1rem',
                  justifyContent: 'center',
                  minHeight: '48px',
                  boxShadow: '0 0 25px var(--gold-glow)'
                }}
              >
                <Sparkles size={18} />
                {isLoading ? 'Checking...' : 'Unlock ❤️'}
              </button>
            </form>

            {isTooEarly && (
              <div style={{ marginTop: '16px' }}>
                <button
                  onClick={() => checkPassword(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--gold)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  (Ashu Testing: Instant Bypass 28 Aug Lock →)
                </button>
              </div>
            )}
          </>
        )}

        {step === 'email' && (
          <>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>💌</div>

            <h1 className="font-serif text-gold-gradient" style={{
              fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)',
              fontWeight: 800,
              marginBottom: '6px'
            }}>
              One last thing…
            </h1>

            <p style={{ color: 'var(--cream)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Enter your mail, Vyshuuu. Something cute is waiting there 🧸
            </p>

            <form onSubmit={(e) => { e.preventDefault(); sendMail(); }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  border: '1.5px solid var(--gold-border)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '14px 20px',
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  color: '#fff',
                  outline: 'none',
                  marginBottom: '14px'
                }}
              />

              <button
                type="submit"
                disabled={!email.trim()}
                className="btn-rose"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '1rem',
                  justifyContent: 'center',
                  minHeight: '48px',
                  boxShadow: '0 0 25px rgba(244,63,94,0.3)'
                }}
              >
                <Mail size={18} />
                Send My Mail 💌
              </button>
            </form>
          </>
        )}

        {step === 'sending' && (
          <>
            <h1 className="font-serif text-gold-gradient" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px' }}>
              Teddy is delivering it…
            </h1>

            <div style={{ fontSize: '3.8rem', margin: '24px 0', animation: 'floatGentle 1.5s ease-in-out infinite' }}>
              🧸💌
            </div>
          </>
        )}

        {message && (
          <p style={{
            marginTop: '16px',
            fontSize: '0.88rem',
            color: message.includes('Nope') ? '#fb7185' : 'var(--gold-champagne)',
            fontWeight: 700,
            animation: 'fadeInScale 0.3s ease'
          }}>
            {message}
          </p>
        )}

        <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            From your lovely brother <strong style={{ color: 'var(--rose-light)' }}>Ashuuuuuuuuuuuuuuuuuuuu ❤️</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
