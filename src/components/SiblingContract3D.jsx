import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Award, Check, FileText, RotateCcw } from 'lucide-react';
import { playGavel, playSparkle, playPop } from '../utils/audio';

export default function SiblingContract3D({ onContractSigned }) {
  const [hasSigned, setHasSigned] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const startDrawing = (e) => {
    isDrawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (e) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#9f1239';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasSigned(true);
  };

  const clearSignature = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleApprove = () => {
    playGavel();
    setIsApproved(true);
    playSparkle();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e5c158', '#f43f5e', '#ffffff']
    });
    if (onContractSigned) onContractSigned();
  };

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '720px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <span className="badge-gold">Legally Binding Sibling Treaty</span>
      <h2 className="font-serif text-gold-gradient" style={{
        fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
        fontWeight: 900,
        marginTop: '10px',
        marginBottom: '10px'
      }}>
        THE SIBLING PERPETUAL CONTRACT 📜
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px' }}>
        Read the clauses carefully. Sign below to officially renew your sister status for another lifetime.
      </p>

      {/* 3D Parchment Document */}
      <div style={{
        background: 'linear-gradient(135deg, #fffcf2 0%, #fef3c7 100%)',
        color: '#1a0802',
        borderRadius: '20px',
        padding: 'clamp(24px, 5vw, 44px)',
        border: '3px solid #d4af37',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212, 175, 55, 0.3)',
        textAlign: 'left',
        position: 'relative'
      }}>
        {/* Gold APPROVED Stamp Overlay when signed */}
        {isApproved && (
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-14deg)',
            border: '6px solid #b91c1c',
            color: '#b91c1c',
            padding: '12px 32px',
            borderRadius: '16px',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '6px',
            textTransform: 'uppercase',
            backgroundColor: 'rgba(254, 242, 242, 0.85)',
            boxShadow: '0 0 30px rgba(185, 28, 28, 0.5)',
            zIndex: 10,
            animation: 'screenShake 0.4s ease-out'
          }}>
            APPROVED
          </div>
        )}

        <div style={{ borderBottom: '2px dashed #b45309', paddingBottom: '14px', marginBottom: '20px' }}>
          <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#78350f' }}>
            TERMS & CONDITIONS OF SIBLINGHOOD
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 600 }}>
            Jurisdiction: Universe-Wide • Duration: Perpetual (No Expiry)
          </span>
        </div>

        {/* Clauses */}
        <div style={{ fontSize: '0.9rem', lineHeight: '1.7', color: '#451a03', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p><strong>Clause 1 (Protection Plan):</strong> Brother is permanently bound to protect, support, and look out for Vyshuu across all circumstances.</p>
          <p><strong>Clause 2 (Teasing Rights):</strong> Brother retains full legal rights to tease her about questionable reply times and tiny dramatic sighs.</p>
          <p><strong>Clause 3 (The Remote Waiver):</strong> Television remote disputes shall be resolved through negotiation, or whichever party can reach Mom first.</p>
          <p><strong>Clause 4 (Infinite Sisterhood):</strong> Neither party may resign, cancel, or trade their sibling license. You are stuck with me forever.</p>
        </div>

        {/* Signature Pad */}
        <div style={{ marginTop: '28px', borderTop: '2px dashed #b45309', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#78350f', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Sign with Finger or Mouse:
            </label>
            {!isApproved && (
              <button onClick={clearSignature} style={{ background: 'transparent', border: 'none', color: '#b45309', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                Clear Sign
              </button>
            )}
          </div>

          <canvas
            ref={canvasRef}
            width={340}
            height={100}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            style={{
              width: '100%',
              maxWidth: '340px',
              height: '90px',
              background: '#fff',
              border: '1.5px solid #d97706',
              borderRadius: '10px',
              cursor: isApproved ? 'default' : 'crosshair',
              display: 'block'
            }}
          />
          <span style={{ fontSize: '0.75rem', color: '#92400e', fontStyle: 'italic', marginTop: '4px', display: 'block' }}>
            Sister Signature Pad (Vyshuu)
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ marginTop: '24px' }}>
        {isApproved ? (
          <div style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1.5px solid #22c55e',
            color: '#22c55e',
            padding: '14px 28px',
            borderRadius: '9999px',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Check size={18} />
            Contract Sealed & Archived in Vault Forever! ❤️
          </div>
        ) : (
          <button
            onClick={handleApprove}
            className="btn-gold"
            style={{ padding: '16px 42px', fontSize: '1.05rem', cursor: 'pointer' }}
          >
            <Award size={20} />
            SEAL & APPROVE CONTRACT 🔨
          </button>
        )}
      </div>
    </section>
  );
}
