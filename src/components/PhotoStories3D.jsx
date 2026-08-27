import React, { useState } from 'react';
import { Sparkles, Camera, X, Heart } from 'lucide-react';
import { playPaperSlide, playPop } from '../utils/audio';

const PHOTO_CHAPTERS = [
  {
    id: 'photo-1',
    src: '/photos/vyshuu_traditional.jpg',
    title: 'A Rare Peaceful Moment',
    tag: 'PHOTO 01 — THE GRACE',
    quote: '“Looking sweet and calm in photos, but can roast your life choices in 3 seconds flat.”',
    story: 'One of my favorite pictures of you. Even though 95% of our interactions involve teasing and debating, this photo captures your warmth, that radiant smile, and the genuine heart that makes you the best sister in the world.'
  },
  {
    id: 'photo-2',
    src: '/photos/vyshuu_mall.jpg',
    title: 'The Mall Explorer',
    tag: 'PHOTO 02 — THE STYLE',
    quote: '“10/10 elegance. Brother’s card: 0/10 balance remaining.”',
    story: 'That mall visit where you scouted out everything in sight. You have a great sense of style, an infectious energy that makes any place lively, and an uncanny ability to turn your brother into a full-time shopping bag handler!'
  }
];

export default function PhotoStories3D() {
  const [activePhoto, setActivePhoto] = useState(null);

  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };

  const handleMouseLeave = (cardRef) => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '1000px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <span className="badge-gold">Authentic Snapshots</span>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          fontWeight: 900,
          marginTop: '10px',
          marginBottom: '10px'
        }}>
          PIECES OF OUR SIBLING STORY 📸
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
          No fake stock photos. Just genuine moments of the sister who brings color to our family.
        </p>
      </div>

      {/* 2 Featured Photo Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px'
      }}>
        {PHOTO_CHAPTERS.map((item) => {
          const cardRef = React.createRef();
          return (
            <div
              key={item.id}
              ref={cardRef}
              className="glass-panel"
              onMouseMove={(e) => handleMouseMove(e, cardRef)}
              onMouseLeave={() => handleMouseLeave(cardRef)}
              style={{
                padding: '20px',
                border: '1.5px solid var(--gold-border)',
                transition: 'transform 0.15s ease-out, border-color 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Frame */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid var(--gold-border-bright)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.8)',
                marginBottom: '16px'
              }}>
                <img
                  src={item.src}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                <button
                  onClick={() => {
                    playPaperSlide();
                    setActivePhoto(item);
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    background: 'rgba(18, 4, 10, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--gold)',
                    color: 'var(--gold)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
                  }}
                >
                  <Sparkles size={14} /> Read Story →
                </button>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span className="badge-gold" style={{ fontSize: '0.68rem', marginBottom: '6px', display: 'inline-block' }}>
                  {item.tag}
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--rose-light)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  {item.quote}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note Modal */}
      {activePhoto && (
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
          <div style={{
            background: '#fffdf6',
            color: '#261204',
            maxWidth: '460px',
            width: '100%',
            padding: '36px 28px',
            borderRadius: '16px',
            border: '2px solid #d4af37',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
            position: 'relative'
          }}>
            <button
              onClick={() => { playPop(400); setActivePhoto(null); }}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'transparent',
                border: 'none',
                color: '#8c6b1b',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#b45309', display: 'block', marginBottom: '6px' }}>
              Brother’s Reflection
            </span>
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#78350f', marginBottom: '14px' }}>
              {activePhoto.title}
            </h3>
            <p className="font-script" style={{ fontSize: '1.4rem', lineHeight: '1.45', color: '#451a03', marginBottom: '20px' }}>
              “{activePhoto.story}”
            </p>
            <div style={{ borderTop: '1px dashed #d97706', paddingTop: '10px', textAlign: 'right', fontSize: '0.85rem', color: '#92400e', fontWeight: 600 }}>
              — Your proud brother ❤️
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
