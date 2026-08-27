import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, Clock, ArrowRight } from 'lucide-react';
import { playPop, playBonk, playSparkle, playChime } from '../utils/audio';

export default function CountdownHero({ onUnlockComplete, isLockedByDefault = true }) {
  // Target: 28 August 2026, 12:00 AM IST (Asia/Kolkata)
  const targetDate = new Date('2026-08-28T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
  const [isUnlocked, setIsUnlocked] = useState(!isLockedByDefault);
  const [giftClicks, setGiftClicks] = useState(0);
  const [giftTease, setGiftTease] = useState(null);
  const [heartsCount, setHeartsCount] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const mountRef = useRef(null);
  const giftGroupRef = useRef(null);

  // Live countdown calculation to 28 August 12:00 AM IST
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
        if (!isUnlocked && !isTransitioning) {
          triggerUnlock();
        }
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, totalMs: diff });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate, isUnlocked, isTransitioning]);

  // 3D Gift Box
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0xfff8eb, 0.9);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const goldLight = new THREE.PointLight(0xe5c158, 2.5, 20);
    goldLight.position.set(0, 0, 3);
    scene.add(goldLight);

    const giftGroup = new THREE.Group();
    scene.add(giftGroup);
    giftGroupRef.current = giftGroup;

    // Box body
    const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x9f1239,
      metalness: 0.3,
      roughness: 0.3
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    giftGroup.add(boxMesh);

    // Ribbons
    const ribMat = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      metalness: 0.9,
      roughness: 0.2
    });
    const ribV = new THREE.Mesh(new THREE.BoxGeometry(1.42, 1.42, 0.28), ribMat);
    giftGroup.add(ribV);
    const ribH = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.42, 1.42), ribMat);
    giftGroup.add(ribH);

    // Top bow
    const bowGeo = new THREE.TorusGeometry(0.26, 0.08, 12, 24);
    const bowL = new THREE.Mesh(bowGeo, ribMat);
    bowL.position.set(-0.18, 0.85, 0);
    bowL.rotation.y = Math.PI / 4;
    giftGroup.add(bowL);
    const bowR = new THREE.Mesh(bowGeo, ribMat);
    bowR.position.set(0.18, 0.85, 0);
    bowR.rotation.y = -Math.PI / 4;
    giftGroup.add(bowR);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onDown = (e) => {
      isDragging = true;
      prevX = e.clientX || (e.touches && e.touches[0].clientX);
      prevY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const curX = e.clientX || (e.touches && e.touches[0].clientX);
      const curY = e.clientY || (e.touches && e.touches[0].clientY);
      giftGroup.rotation.y += (curX - prevX) * 0.01;
      giftGroup.rotation.x += (curY - prevY) * 0.01;
      prevX = curX;
      prevY = curY;
    };

    const onUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    container.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        giftGroup.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleGiftClick = () => {
    const nextCount = giftClicks + 1;
    setGiftClicks(nextCount);

    if (giftGroupRef.current) {
      giftGroupRef.current.position.y = 0.18;
      setTimeout(() => {
        if (giftGroupRef.current) giftGroupRef.current.position.y = 0;
      }, 150);
    }

    if (nextCount === 1) {
      playBonk();
      setGiftTease("“Not yet Vyshuu! 😭”");
    } else if (nextCount === 2) {
      playBonk();
      setGiftTease("“Ashu told me not to open until midnight!”");
    } else if (nextCount === 5) {
      playBonk();
      setGiftTease("“Patience is a virtue, sister! 😂”");
    } else if (nextCount >= 10) {
      playSparkle();
      setGiftTease("Almost opened... then snapped shut! 🔒");
    } else {
      playPop(500 + nextCount * 40);
    }
  };

  const handleCollectHeart = () => {
    playSparkle();
    const next = heartsCount + 1;
    setHeartsCount(next);

    if (next >= 5 && !secretUnlocked) {
      setSecretUnlocked(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const triggerUnlock = () => {
    playChime();
    setIsTransitioning(true);

    setTimeout(() => {
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#e5c158', '#f43f5e', '#ffffff', '#fbbf24']
      });
      setIsUnlocked(true);
      setIsTransitioning(false);
      onUnlockComplete();
    }, 1800);
  };

  if (isUnlocked) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: 'linear-gradient(rgba(14, 2, 8, 0.78), rgba(8, 1, 4, 0.88)), url(/festive_assets/bg_countdown_clouds.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflowY: 'auto'
    }}>
      {/* Floating Collectable Hearts */}
      {[...Array(6)].map((_, i) => (
        <button
          key={i}
          onClick={handleCollectHeart}
          style={{
            position: 'absolute',
            top: `${12 + (i * 15)}%`,
            left: `${6 + (i * 16)}%`,
            background: 'transparent',
            border: 'none',
            fontSize: '1.6rem',
            cursor: 'pointer',
            animation: `floatGentle ${3 + i}s ease-in-out infinite`,
            opacity: 0.65,
            transition: 'transform 0.2s ease',
            zIndex: 1
          }}
        >
          ❤️
        </button>
      ))}

      {/* Main Countdown Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '780px',
        width: '100%',
        textAlign: 'center',
        margin: 'auto 0'
      }}>
        {/* Cute Mascot Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid var(--gold-border)',
          padding: '6px 18px',
          borderRadius: '9999px',
          marginBottom: '14px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
        }}>
          <img
            src="/festive_assets/mascot_teddy_rakhi.png"
            alt="Mascot Teddy"
            style={{ width: '32px', height: '32px', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '0.82rem', color: 'var(--gold-champagne)', fontWeight: 700 }}>
            Raksha Bandhan • 28 Aug 2026
          </span>
        </div>


        <h1 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(1.8rem, 5.5vw, 3.8rem)',
          fontWeight: 900,
          letterSpacing: '1px',
          lineHeight: '1.2',
          marginBottom: '6px'
        }}>
          For Vyshuuuuuuuuuuuuu ❤️
        </h1>

        <p style={{
          color: 'var(--cream-dim)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)',
          marginBottom: '24px'
        }}>
          Your Rakhi surprise opens in…
        </p>

        {/* Live Timer Grid (Responsive: 4 cols on desktop, 2x2 on narrow mobile) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
          gap: '12px',
          maxWidth: '480px',
          margin: '0 auto 24px auto'
        }}>
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINUTES', val: timeLeft.minutes },
            { label: 'SECONDS', val: timeLeft.seconds }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '14px 6px',
                border: '1.5px solid var(--gold-border-bright)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.7), 0 0 16px var(--gold-glow)',
                textAlign: 'center'
              }}
            >
              <div className="font-serif text-gold-gradient" style={{
                fontSize: 'clamp(1.7rem, 4.5vw, 2.8rem)',
                fontWeight: 800
              }}>
                {String(item.val).padStart(2, '0')}
              </div>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '1.2px',
                marginTop: '4px'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <p style={{
          color: 'var(--gold-champagne)',
          fontSize: '0.85rem',
          letterSpacing: '1px',
          marginBottom: '16px'
        }}>
          ✨ Target: 28 Aug 12:00 AM IST ✨
        </p>

        {/* 3D Mystery Gift Box */}
        <div style={{
          position: 'relative',
          width: '160px',
          height: '160px',
          margin: '0 auto 12px auto',
          cursor: 'grab'
        }}>
          <div ref={mountRef} style={{ width: '100%', height: '100%' }} onClick={handleGiftClick} />
          {giftTease && (
            <div style={{
              position: 'absolute',
              bottom: '-32px',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              background: 'rgba(20,5,12,0.92)',
              border: '1px solid var(--rose)',
              color: 'var(--rose-light)',
              padding: '4px 14px',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              boxShadow: '0 0 15px rgba(244,63,94,0.4)',
              zIndex: 20
            }}>
              {giftTease}
            </div>
          )}
        </div>

        {/* Heart Collection Counter */}
        <div style={{ marginTop: '24px', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Catch floating hearts: <strong style={{ color: 'var(--rose-light)' }}>{heartsCount} / 5</strong>
          </span>
          {secretUnlocked && (
            <div style={{
              marginTop: '4px',
              color: 'var(--gold)',
              fontSize: '0.82rem',
              fontWeight: 700,
              animation: 'floatGentle 2s ease-in-out infinite'
            }}>
              ⭐ Secret: “Specially crafted for Vyshuu by brother Ashu!”
            </div>
          )}
        </div>

        {/* Immediate Unlock Bypass Button */}
        <div>
          <button
            onClick={triggerUnlock}
            className="btn-gold"
            style={{
              padding: '14px 28px',
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 0 25px var(--gold-glow)',
              minHeight: '48px',
              width: '100%',
              maxWidth: '420px',
              justifyContent: 'center'
            }}
          >
            <Sparkles size={18} />
            ENTER VYSHUU’S WORLD (ASHU ACCESS)
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Transition Screen Overlay */}
      {isTransitioning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#090105',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulseGoldGlow 1s infinite',
          padding: '20px',
          textAlign: 'center'
        }}>
          <img
            src="/festive_assets/royal_ruby_rakhi.png"
            alt="Royal Ruby Rakhi"
            style={{
              width: 'clamp(140px, 30vw, 220px)',
              height: 'clamp(140px, 30vw, 220px)',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 35px var(--gold))',
              marginBottom: '16px',
              animation: 'floatGentle 2s ease-in-out infinite'
            }}
          />
          <h2 className="font-serif text-gold-gradient" style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            letterSpacing: '3px',
            marginBottom: '10px'
          }}>
            THE SURPRISE IS NOW OPEN ✨
          </h2>
          <p style={{
            color: 'var(--cream)',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem'
          }}>
            Happy Raksha Bandhan, Vyshuuuuuuuuuuuuu! ❤️
          </p>

        </div>
      )}
    </div>
  );
}
