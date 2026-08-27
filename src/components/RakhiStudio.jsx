import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Check, ArrowRight, RotateCw, Heart, Award } from 'lucide-react';
import { playPop, playSparkle, playChime } from '../utils/audio';

const THREADS = [
  { id: 'crimson', name: 'Red Silk', color: '#dc2626', desc: 'Traditional auspicious red' },
  { id: 'rose', name: 'Pink Satin', color: '#f43f5e', desc: 'Cute and modern rose pink' },
  { id: 'gold', name: 'Gold Zari', color: '#e5c158', desc: 'Shimmering metallic gold' },
  { id: 'purple', name: 'Royal Purple', color: '#9333ea', desc: 'Festive velvet tone' },
  { id: 'dual', name: 'Twisted Gold/Red', color: '#f59e0b', desc: 'Traditional dual twist' }
];

const BASES = [
  { id: 'floral', name: 'Floral Petals', petals: 8, radius: 1.1 },
  { id: 'heart', name: 'Sacred Heart', petals: 6, radius: 1.0 },
  { id: 'pearl_circle', name: 'Pearl Halo', petals: 12, radius: 1.2 },
  { id: 'mandala', name: 'Kundan Mandala', petals: 10, radius: 1.15 }
];

const CENTERS = [
  { id: 'v_monogram', name: '“V ❤️” Monogram', type: 'text', text: 'V' },
  { id: 'ruby', name: 'Royal Ruby Gem', type: 'gem', color: '#e11d48' },
  { id: 'emerald', name: 'Emerald Jewel', type: 'gem', color: '#059669' },
  { id: 'gold_flower', name: 'Golden Bloom', type: 'gem', color: '#e5c158' },
  { id: 'diamond', name: 'Star Crystal', type: 'gem', color: '#f8fafc' }
];

const LATKANS = [
  { id: 'bells', name: 'Golden Bells 🔔', color: '#e5c158' },
  { id: 'heart_drop', name: 'Ruby Heart Drop ❤️', color: '#f43f5e' },
  { id: 'pearl_drop', name: 'Pearl Tassel ⚪', color: '#ffffff' }
];

export default function RakhiStudio({ customRakhi, onSaveRakhi, onProceedToCeremony }) {
  const [activeTab, setActiveTab] = useState('threads'); // threads, base, center, latkans, finish
  const [threadChoice, setThreadChoice] = useState(customRakhi.threadHex || '#dc2626');
  const [baseChoice, setBaseChoice] = useState('floral');
  const [centerChoice, setCenterChoice] = useState('v_monogram');
  const [hasPearls, setHasPearls] = useState(true);
  const [hasKundans, setHasKundans] = useState(true);
  const [latkanChoice, setLatkanChoice] = useState('bells');
  const [isSparkled, setIsSparkled] = useState(false);

  const mountRef = useRef(null);
  const rakhiGroupRef = useRef(null);

  // Synchronize state with parent
  useEffect(() => {
    if (onSaveRakhi) {
      onSaveRakhi({
        threadHex: threadChoice,
        base: baseChoice,
        center: centerChoice,
        hasPearls,
        hasKundans,
        latkan: latkanChoice
      });
    }
  }, [threadChoice, baseChoice, centerChoice, hasPearls, hasKundans, latkanChoice]);

  // Three.js Live Rakhi Preview
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0xfff8eb, 1);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(2, 4, 5);
    scene.add(dir);
    const goldLight = new THREE.PointLight(0xe5c158, 2, 20);
    goldLight.position.set(0, 0, 3);
    scene.add(goldLight);

    const rakhiGroup = new THREE.Group();
    scene.add(rakhiGroup);
    rakhiGroupRef.current = rakhiGroup;

    // Threads extending left & right
    const threadGeo = new THREE.CylinderGeometry(0.04, 0.04, 5.2, 16);
    const threadMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(threadChoice),
      roughness: 0.4
    });
    const threadMesh = new THREE.Mesh(threadGeo, threadMat);
    threadMesh.rotation.z = Math.PI / 2;
    rakhiGroup.add(threadMesh);

    // Rakhi Base Disc
    const baseGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.08, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      metalness: 0.85,
      roughness: 0.2
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    rakhiGroup.add(baseMesh);

    // Petals around base
    const petalCount = baseChoice === 'floral' ? 8 : baseChoice === 'mandala' ? 10 : 12;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petalGeo = new THREE.SphereGeometry(0.16, 12, 12);
      const petalMat = new THREE.MeshStandardMaterial({
        color: 0xbe123c,
        metalness: 0.3,
        roughness: 0.4
      });
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.scale.set(1.5, 0.6, 0.8);
      petal.position.set(Math.cos(angle) * 0.95, Math.sin(angle) * 0.95, 0);
      petal.rotation.z = angle;
      rakhiGroup.add(petal);
    }

    // Pearls ring
    if (hasPearls) {
      const pearlCount = 14;
      for (let i = 0; i < pearlCount; i++) {
        const angle = (i / pearlCount) * Math.PI * 2;
        const pearlGeo = new THREE.SphereGeometry(0.08, 12, 12);
        const pearlMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.1,
          metalness: 0.1
        });
        const pearl = new THREE.Mesh(pearlGeo, pearlMat);
        pearl.position.set(Math.cos(angle) * 0.62, Math.sin(angle) * 0.62, 0.06);
        rakhiGroup.add(pearl);
      }
    }

    // Centerpiece
    const centerGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.14, 24);
    const centerMat = new THREE.MeshStandardMaterial({
      color: centerChoice === 'v_monogram' ? 0x9f1239 : 0xe11d48,
      metalness: 0.7,
      roughness: 0.2
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.position.z = 0.08;
    rakhiGroup.add(centerMesh);

    // Hanging Latkan Tassels below
    const latkanMat = new THREE.MeshStandardMaterial({
      color: latkanChoice === 'heart_drop' ? 0xf43f5e : 0xe5c158,
      metalness: 0.8
    });
    const latkanBall = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), latkanMat);
    latkanBall.position.set(0, -1.2, 0);
    rakhiGroup.add(latkanBall);

    const latkanThread = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8), latkanMat);
    latkanThread.position.set(0, -0.85, 0);
    rakhiGroup.add(latkanThread);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      rakhiGroup.rotation.y += 0.006;
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
  }, [threadChoice, baseChoice, centerChoice, hasPearls, hasKundans, latkanChoice]);

  const handleApplySparkle = () => {
    playChime();
    setIsSparkled(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e5c158', '#f43f5e', '#ffffff']
    });
    playSparkle();
  };

  return (
    <section style={{
      padding: '70px 16px',
      maxWidth: '880px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge-gold">Interactive Workshop</span>
          <span className="badge-rose">Made Specially for Vyshuu</span>
        </div>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
          fontWeight: 900,
          lineHeight: '1.2',
          marginBottom: '6px'
        }}>
          MAKE YOUR OWN RAKHI FOR VYSHUU ❤️
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '560px', margin: '0 auto' }}>
          Customize the sacred thread, filigree base, pearls, and the special “V ❤️” centerpiece!
        </p>
      </div>

      {/* Top 3D Live Rakhi Stage */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '280px',
        background: 'radial-gradient(circle at center, #1b0510 0%, #0a0105 100%)',
        borderRadius: '20px',
        border: '1.5px solid var(--gold-border-bright)',
        boxShadow: isSparkled ? '0 0 40px var(--gold-glow), 0 0 60px rgba(244,63,94,0.3)' : 'var(--shadow-glass)',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

        {/* Live Centerpiece Badge overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(20,5,12,0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--gold-border)',
          borderRadius: '9999px',
          padding: '4px 14px',
          fontSize: '0.75rem',
          color: 'var(--gold-champagne)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Sparkles size={12} />
          Center: {centerChoice === 'v_monogram' ? '“V ❤️” Monogram' : 'Royal Gem'}
        </div>

        {/* Rotate Hint */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <RotateCw size={12} /> Auto 3D Preview
        </div>
      </div>

      {/* Bottom Step-by-Step Tray (Mobile-First Swipeable Tabs) */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        WebkitOverflowScrolling: 'touch'
      }}>
        {[
          { id: 'threads', label: '1. Threads' },
          { id: 'base', label: '2. Base' },
          { id: 'center', label: '3. Centerpiece' },
          { id: 'materials', label: '4. Pearls & Gems' },
          { id: 'latkans', label: '5. Latkans' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { playPop(500); setActiveTab(tab.id); }}
              style={{
                flex: '0 0 auto',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--gold-border)',
                background: isActive ? 'linear-gradient(135deg, #e5c158, #caa030)' : 'rgba(20,5,12,0.8)',
                color: isActive ? '#14040a' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                minHeight: '40px'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Step Options Box */}
      <div className="glass-panel" style={{
        padding: '24px 18px',
        border: '1.5px solid var(--gold-border)',
        marginBottom: '20px'
      }}>
        {activeTab === 'threads' && (
          <div>
            <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '12px' }}>
              Step 1: Select Silk Thread
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {THREADS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { playPop(550); setThreadChoice(t.color); }}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '12px',
                    border: threadChoice === t.color ? '2px solid #fff' : '1px solid var(--gold-border)',
                    background: 'rgba(10,2,6,0.6)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: t.color, border: '2px solid #fff' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'base' && (
          <div>
            <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '12px' }}>
              Step 2: Choose Rakhi Base & Petals
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              {BASES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => { playPop(550); setBaseChoice(b.id); }}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: baseChoice === b.id ? '2px solid var(--gold)' : '1px solid var(--gold-border)',
                    background: baseChoice === b.id ? 'rgba(229,193,88,0.15)' : 'rgba(10,2,6,0.6)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'center' && (
          <div>
            <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '12px' }}>
              Step 3: Pick the Centerpiece (Special: “V ❤️”)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              {CENTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { playSparkle(); setCenterChoice(c.id); }}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: centerChoice === c.id ? '2px solid var(--rose)' : '1px solid var(--gold-border)',
                    background: centerChoice === c.id ? 'rgba(244,63,94,0.18)' : 'rgba(10,2,6,0.6)',
                    color: centerChoice === c.id ? 'var(--rose-light)' : '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div>
            <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '12px' }}>
              Step 4: Decorative Pearls & Kundan Settings
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => { playPop(600); setHasPearls(!hasPearls); }}
                className={hasPearls ? "btn-gold" : "btn-secondary"}
                style={{ flex: '1 1 140px', minHeight: '44px', justifyContent: 'center' }}
              >
                {hasPearls ? "✓ Natural Pearls (Added)" : "+ Add Pearls"}
              </button>
              <button
                onClick={() => { playPop(600); setHasKundans(!hasKundans); }}
                className={hasKundans ? "btn-rose" : "btn-secondary"}
                style={{ flex: '1 1 140px', minHeight: '44px', justifyContent: 'center' }}
              >
                {hasKundans ? "✓ Kundan Stones (Added)" : "+ Add Kundans"}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'latkans' && (
          <div>
            <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '12px' }}>
              Step 5: Hanging Latkans & Charms
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              {LATKANS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => { playSparkle(); setLatkanChoice(l.id); }}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: latkanChoice === l.id ? '2px solid var(--gold)' : '1px solid var(--gold-border)',
                    background: latkanChoice === l.id ? 'rgba(229,193,88,0.15)' : 'rgba(10,2,6,0.6)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer: Sparkle Finish & Proceed to Tie */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center'
      }}>
        <button
          onClick={handleApplySparkle}
          className="btn-rose"
          style={{ minHeight: '48px', padding: '14px 26px', fontSize: '0.95rem', cursor: 'pointer' }}
        >
          <Sparkles size={18} />
          Add Magic Sparkle ✨
        </button>

        <button
          onClick={() => {
            playChime();
            if (onProceedToCeremony) {
              onProceedToCeremony();
            } else {
              const el = document.getElementById('rakhi');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="btn-gold"
          style={{ minHeight: '48px', padding: '14px 32px', fontSize: '1rem', cursor: 'pointer' }}
        >
          <Heart size={18} />
          Tie This Rakhi on Wrist →
        </button>
      </div>
    </section>
  );
}
