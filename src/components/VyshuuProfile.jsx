import React, { useState } from 'react';
import { Award, Zap, Heart, Shield, MessageSquare, Sparkles, Flame } from 'lucide-react';
import { playPop, playBonk, playLaser, playSparkle } from '../utils/audio';
import VyshuuAchievements from './VyshuuAchievements';


const SOUNDBOARD_ITEMS = [
  { id: 'chaalu', phrase: '“Chaalu!”', context: 'When brother talks for more than 4 seconds straight.', sound: playBonk },
  { id: 'emo', phrase: '“Emo...”', context: 'Universal reply when caught red-handed.', sound: playPop },
  { id: 'poo', phrase: '“Poo!”', context: 'Standard defense mechanism when losing an argument.', sound: playLaser },
  { id: 'aapu', phrase: '“Aapu inka!”', context: 'Triggered when brother makes a totally valid point.', sound: playBonk },
  { id: 'nenekkada', phrase: '“Nenekkada cheppa?!”', context: 'Gaslighting at PhD levels.', sound: playPop },
  { id: 'remote', phrase: '“Remote ivvu mundhu!”', context: 'The most sacred sibling battle cry.', sound: playLaser },
  { id: 'full', phrase: '“Nenu full... kani daantlo koncham ivvu.”', context: 'Rules of appetite don’t apply to brother’s plate.', sound: playSparkle },
  { id: 'mom', phrase: '“MOMMMMMMM! 🗣️”', context: 'The ultimate trump card that ends all logic.', sound: playBonk }
];

export default function VyshuuProfile() {
  const [activeSpeech, setActiveSpeech] = useState(null);

  const handlePhraseClick = (item) => {
    item.sound();
    setActiveSpeech(item);
  };

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '1100px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="badge-gold">Subject Dossier #001</span>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          marginTop: '10px',
          marginBottom: '10px'
        }}>
          MEET VYSHUU (THE SISTER)
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
          Certified remote stealer, professional eye-roller, and the best sister in the universe.
        </p>
      </div>

      {/* Profile Card & Sibling Analytics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px',
        marginBottom: '60px'
      }}>
        {/* Left: 3D Photo Profile Card */}
        <div 
          className="glass-panel"
          style={{
            padding: '24px',
            textAlign: 'center',
            border: '1.5px solid var(--gold-border-bright)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px var(--gold-glow)',
            position: 'relative'
          }}
        >
          {/* Cute Corner Mascot */}
          <img 
            src="/festive_assets/mascot_teddy_rakhi.png" 
            alt="Teddy Badge" 
            style={{ 
              width: '54px', 
              height: '54px', 
              objectFit: 'contain', 
              position: 'absolute', 
              top: '-16px', 
              right: '-16px', 
              zIndex: 10,
              filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))',
              animation: 'floatGentle 3s ease-in-out infinite' 
            }} 
          />

          <div style={{
            width: '180px',
            height: '240px',
            borderRadius: '20px',
            margin: '0 auto 20px auto',
            overflow: 'hidden',
            border: '3px solid var(--gold)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 25px var(--gold-glow)',
            position: 'relative'
          }}>
            <img 
              src="/photos/vyshuu_traditional.jpg" 
              alt="Vyshuu" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(12, 2, 5, 0.85)',
              backdropFilter: 'blur(6px)',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              color: 'var(--gold)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              border: '1px solid var(--gold-border)'
            }}>
              ⭐ The Real Troublemaker
            </div>
          </div>

          <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>
            Vyshuu
          </h3>
          <p style={{ color: 'var(--rose-light)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>
            Alias: “Chaalu Queen” & Chief Argument Officer
          </p>

          <div style={{
            background: 'rgba(229, 193, 88, 0.05)',
            border: '1px solid var(--gold-border)',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '0.85rem',
            color: 'var(--cream-dim)',
            lineHeight: '1.5'
          }}>
            “Appears sweet and innocent in photos, but can destroy your peace of mind in 3.2 seconds if you touch the remote.”
          </div>
        </div>

        {/* Right: Sibling Analytics Radar */}
        <div 
          className="glass-panel"
          style={{
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Flame size={20} color="var(--rose)" />
            <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--gold)' }}>
              SIBLING ANALYTICS DASHBOARD
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Stat 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-main)' }}>Sarcasm & Eyeball Rolling</span>
                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>99.8% (Dangerous)</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '99.8%', height: '100%', background: 'linear-gradient(90deg, #e5c158, #f43f5e)' }} />
              </div>
            </div>

            {/* Stat 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-main)' }}>Food Stealing Capacity</span>
                <span style={{ color: 'var(--rose-light)', fontWeight: 700 }}>100% (“Just one bite”)</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f43f5e, #be123c)' }} />
              </div>
            </div>

            {/* Stat 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-main)' }}>WhatsApp Reply Speed</span>
                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>12% (Planetary Dependent)</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '12%', height: '100%', background: '#e5c158' }} />
              </div>
            </div>

            {/* Stat 4 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-main)' }}>Admitting Brother was Right</span>
                <span style={{ color: '#94a3b8', fontWeight: 700 }}>0.00% (Never in history)</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '0.5%', height: '100%', background: '#ef4444' }} />
              </div>
            </div>

            {/* Stat 5 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-main)' }}>Secret Brother Love</span>
                <span style={{ color: 'var(--rose-light)', fontWeight: 700 }}>Infinite ❤️</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f43f5e, #e5c158)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* “Things Vyshuu Says” Soundboard */}
      <div 
        className="glass-panel"
        style={{
          padding: '36px 28px',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <MessageSquare size={18} color="var(--gold)" />
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--gold)' }}>
              “THINGS VYSHUU SAYS” SOUNDBOARD
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Tap any signature phrase to hear the sibling commentary!
          </p>
        </div>

        {/* Soundboard Buttons Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px'
        }}>
          {SOUNDBOARD_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePhraseClick(item)}
              className="glass-pill"
              style={{
                padding: '16px 20px',
                border: activeSpeech?.id === item.id ? '1.5px solid var(--rose)' : '1px solid var(--gold-border)',
                background: activeSpeech?.id === item.id ? 'rgba(244, 63, 94, 0.2)' : 'rgba(22, 5, 13, 0.7)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.25s var(--ease-smooth)',
                color: 'var(--text-main)',
                fontSize: '1rem',
                fontWeight: 700
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                if (activeSpeech?.id !== item.id) {
                  e.currentTarget.style.borderColor = 'var(--gold-border)';
                }
              }}
            >
              {item.phrase}
            </button>
          ))}
        </div>

        {/* Interactive Speech Bubble Commentary Output */}
        {activeSpeech && (
          <div style={{
            marginTop: '28px',
            padding: '16px 24px',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid var(--rose)',
            borderRadius: '16px',
            textAlign: 'center',
            animation: 'floatGentle 3s ease-in-out infinite'
          }}>
            <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>
              {activeSpeech.phrase}
            </p>
            <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
              <strong style={{ color: 'var(--rose-light)' }}>Translator Note: </strong>
              {activeSpeech.context}
            </p>
          </div>
        )}
      </div>

      {/* Sibling Accolades & Badges */}
      <VyshuuAchievements />
    </section>
  );
}

