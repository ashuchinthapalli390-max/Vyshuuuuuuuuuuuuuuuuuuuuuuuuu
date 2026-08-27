import React, { useState } from 'react';
import { Award, Sparkles, CheckCircle2, Lock, Star } from 'lucide-react';
import { playSparkle, playPop } from '../utils/audio';

const ACHIEVEMENTS = [
  {
    id: 'crack_certified',
    title: 'Certified Crack 😂',
    desc: 'Survived the HAHAHAHA Battle without losing sanity.',
    icon: '🧪',
    unlocked: true
  },
  {
    id: 'double_crack',
    title: 'Double Crackkk 💥',
    desc: 'Maintained 5x+ laugh multiplier during chaos.',
    icon: '⚡',
    unlocked: true
  },
  {
    id: 'teddy_hunter',
    title: 'Teddy Hunter 🧸',
    desc: 'Collected floating hearts from the countdown sky.',
    icon: '❤️',
    unlocked: true
  },
  {
    id: 'rakhi_artist',
    title: 'Rakhi Artist 💎',
    desc: 'Crafted a bespoke Rakhi with the “V ❤️” monogram.',
    icon: '🪢',
    unlocked: true
  },
  {
    id: 'master_decorator',
    title: 'Master Decorator 🪔',
    desc: 'Arranged the traditional puja thali with diya & sweets.',
    icon: '✨',
    unlocked: true
  },
  {
    id: 'food_negotiator',
    title: '“Chaalu” Negotiator 🥄',
    desc: 'Defended the plate against “one more bite” attempts.',
    icon: '🍲',
    unlocked: true
  },
  {
    id: 'court_innocent',
    title: 'Court Veteran ⚖️',
    desc: 'Successfully defended leaving brother on “hmm”.',
    icon: '📜',
    unlocked: true
  },
  {
    id: 'ashu_favourite',
    title: 'Ashuu’s Favourite Vyshuu 👑',
    desc: 'Permanent lifetime achievement. Non-negotiable.',
    icon: '⭐',
    unlocked: true
  }
];

export default function VyshuuAchievements() {
  const [selectedBadge, setSelectedBadge] = useState(null);

  return (
    <div style={{ marginTop: '50px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span className="badge-gold">Honorary Sibling Accolades</span>
        <h3 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
          fontWeight: 800,
          marginTop: '8px',
          marginBottom: '6px'
        }}>
          VYSHUU ACHIEVEMENTS 🏆
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto' }}>
          Official badges earned throughout your journey in Vyshuuverse:
        </p>
      </div>

      {/* Grid of Badges */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px'
      }}>
        {ACHIEVEMENTS.map((badge) => (
          <div
            key={badge.id}
            onClick={() => {
              playSparkle();
              setSelectedBadge(badge);
            }}
            className="glass-panel"
            style={{
              padding: '16px 18px',
              borderRadius: '16px',
              border: badge.id === 'ashu_favourite' ? '2px solid var(--gold)' : '1px solid var(--gold-border)',
              background: badge.id === 'ashu_favourite' ? 'rgba(229,193,88,0.12)' : 'rgba(20,5,12,0.7)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              boxShadow: badge.id === 'ashu_favourite' ? '0 0 25px var(--gold-glow)' : 'none'
            }}
          >
            <div style={{
              fontSize: '1.8rem',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '50%',
              flexShrink: 0
            }}>
              {badge.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '0.86rem',
                fontWeight: 800,
                color: badge.id === 'ashu_favourite' ? 'var(--gold)' : '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {badge.title}
                <CheckCircle2 size={13} color="#22c55e" />
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.3' }}>
                {badge.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
