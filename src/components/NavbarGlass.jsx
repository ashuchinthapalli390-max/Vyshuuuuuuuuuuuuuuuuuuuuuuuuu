import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Heart, Sparkles, X, BookOpen, Compass, Gamepad2, Gift, Mail } from 'lucide-react';
import { playPop, playSparkle, setMuted, toggleBgm, getIsMuted, getIsBgmPlaying } from '../utils/audio';

const NAV_ITEMS = [
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'crack', label: 'Crack Zone', icon: Sparkles },
  { id: 'world', label: 'Our World', icon: Compass },
  { id: 'arcade', label: 'Games', icon: Gamepad2 },
  { id: 'rakhi', label: 'Rakhi', icon: Gift },
  { id: 'letter', label: 'Letter', icon: Mail }
];

export default function NavbarGlass({ activeSection, onNavigate }) {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showTrollModal, setShowTrollModal] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(getIsMuted());
  const [bgmActive, setBgmActive] = useState(getIsBgmPlaying());

  const handleLogoClick = () => {
    const nextClicks = logoClicks + 1;
    setLogoClicks(nextClicks);
    playPop(500 + nextClicks * 50);

    if (nextClicks >= 5) {
      playSparkle();
      setShowTrollModal(true);
      setLogoClicks(0);
    }
  };

  const handleMuteToggle = () => {
    const nextMute = !isAudioMuted;
    setIsAudioMuted(nextMute);
    setMuted(nextMute);
    playPop(nextMute ? 300 : 600);
  };

  const handleBgmToggle = () => {
    const playing = toggleBgm();
    setBgmActive(playing);
    playPop(700);
  };

  return (
    <>
      {/* Desktop / Tablet Top Header */}
      <header className="desktop-nav" style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9900,
        width: 'calc(100% - 32px)',
        maxWidth: '820px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none'
      }}>
        {/* Left: Logo with secret troll counter */}
        <div 
          onClick={handleLogoClick}
          className="glass-pill"
          title="Secret: Click multiple times!"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.95rem',
            letterSpacing: '1px',
            color: 'var(--gold)',
            boxShadow: logoClicks > 0 ? `0 0 ${logoClicks * 6}px var(--rose-glow)` : 'var(--shadow-glass)',
            transition: 'all 0.3s var(--ease-smooth)'
          }}
        >
          <span style={{ fontFamily: 'var(--font-serif)', color: '#fff' }}>V</span>
          <Heart size={15} fill="var(--rose)" color="var(--rose)" />
          {logoClicks > 1 && (
            <span style={{ fontSize: '0.65rem', color: 'var(--rose-light)', marginLeft: '2px' }}>
              ({logoClicks}/5)
            </span>
          )}
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav 
          className="glass-pill"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            padding: '4px 6px',
            gap: '4px',
            background: 'rgba(20, 5, 12, 0.82)'
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playPop(550);
                  onNavigate(item.id);
                }}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #e5c158 0%, #caa030 100%)' : 'transparent',
                  color: isActive ? '#14040a' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.82rem',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px var(--gold-glow)' : 'none'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Audio Controls */}
        <div style={{ pointerEvents: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={handleBgmToggle}
            className="glass-pill"
            title={bgmActive ? "Pause BGM" : "Play BGM"}
            style={{
              padding: '8px 12px',
              border: bgmActive ? '1px solid var(--gold)' : '1px solid var(--gold-border)',
              background: bgmActive ? 'rgba(229, 193, 88, 0.18)' : 'rgba(20, 5, 12, 0.75)',
              color: bgmActive ? 'var(--gold)' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: bgmActive ? '0 0 12px var(--gold-glow)' : 'none'
            }}
          >
            <Music size={15} className={bgmActive ? 'animate-float' : ''} />
          </button>

          <button
            onClick={handleMuteToggle}
            className="glass-pill"
            title={isAudioMuted ? "Unmute Sound" : "Mute Sound"}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--gold-border)',
              background: 'rgba(20, 5, 12, 0.75)',
              color: isAudioMuted ? 'var(--rose-light)' : 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="mobile-nav" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 9900,
        background: 'rgba(18, 4, 10, 0.94)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--gold-border)',
        padding: '8px 12px calc(8px + env(safe-area-inset-bottom, 0px)) 12px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playPop(550);
                onNavigate(item.id);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                padding: '6px 8px',
                cursor: 'pointer',
                minWidth: '48px',
                minHeight: '48px',
                justifyContent: 'center'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--gold)' : 'var(--text-muted)'} />
              <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 700 : 500 }}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Mobile Audio Quick Toggle */}
        <button
          onClick={handleBgmToggle}
          style={{
            background: 'transparent',
            border: 'none',
            color: bgmActive ? 'var(--gold)' : 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '6px 8px',
            cursor: 'pointer',
            minWidth: '48px',
            minHeight: '48px',
            justifyContent: 'center'
          }}
        >
          <Music size={18} />
          <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>Music</span>
        </button>
      </div>

      {/* Secret Logo Troll Modal */}
      {showTrollModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(10, 2, 6, 0.88)',
          backdropFilter: 'blur(12px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div 
            className="glass-panel"
            style={{
              maxWidth: '440px',
              width: '100%',
              padding: '30px 20px',
              textAlign: 'center',
              border: '1.5px solid var(--gold-border-bright)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => { playPop(400); setShowTrollModal(false); }}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🤨🤌</div>
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '10px' }}>
              SECRET TROLL UNLOCKED!
            </h3>
            <p style={{ color: 'var(--cream)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '18px' }}>
              “Arey Vyshuu! Entha sarlu aa logo ni nokkuthaav?! <br />
              Ashu daggariki direct bill vasthundi anukuntunnava enti? 😂<br />
              <span style={{ color: 'var(--rose-light)', fontWeight: 600 }}>
                Only pure sibling banter available here.
              </span>”
            </p>
            <button
              onClick={() => { playSparkle(); setShowTrollModal(false); }}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center', minHeight: '44px' }}
            >
              <Sparkles size={16} /> Chaalu le, continue!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
