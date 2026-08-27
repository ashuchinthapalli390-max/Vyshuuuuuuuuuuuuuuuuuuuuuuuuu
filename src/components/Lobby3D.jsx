import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass, Flame, Gamepad2, Heart, Award, Mail } from 'lucide-react';
import { playPop, playSparkle } from '../utils/audio';

const PORTALS = [
  { id: 'story', title: 'This Is For You', subtitle: 'Honest Bond & Cute Facts', icon: Heart, color: '#f43f5e' },
  { id: 'world', title: 'Our World', subtitle: '3D Chat & Real Photos', icon: Compass, color: '#e5c158' },
  { id: 'food', title: 'Vyshuu vs Food', subtitle: '3 Bites Later: “Chaalu” 😭', icon: Sparkles, color: '#fb923c' },
  { id: 'studio', title: 'Rakhi Studio', subtitle: 'Craft Custom “V ❤️” Rakhi', icon: Award, color: '#e5c158' },
  { id: 'rakhi', title: 'Tying Ceremony', subtitle: 'Tilak, Sweets & Wrist Wrap', icon: Sparkles, color: '#22c55e' },
  { id: 'letter', title: 'Ashu’s Letter', subtitle: 'From Your Lovely Brother', icon: Mail, color: '#f43f5e' }
];

export default function Lobby3D({ onSelectPortal }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d0205, 0.04);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.9);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xe5c158, 3, 50);
    goldLight.position.set(0, 2, 4);
    scene.add(goldLight);

    const pinkLight = new THREE.PointLight(0xf43f5e, 2, 40);
    pinkLight.position.set(0, -3, 3);
    scene.add(pinkLight);

    // Center Glowing 3D Sacred Rakhi
    const centerGroup = new THREE.Group();

    const torusGeo = new THREE.TorusGeometry(1.4, 0.1, 16, 60);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x614207,
      emissiveIntensity: 0.3
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    centerGroup.add(torusMesh);

    const coreGeo = new THREE.DodecahedronGeometry(0.7, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0x881337,
      emissiveIntensity: 0.5
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    centerGroup.add(coreMesh);

    // Orbiting Rings
    const ringGeo = new THREE.RingGeometry(1.8, 1.85, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    centerGroup.add(ringMesh);

    scene.add(centerGroup);

    // Cosmic Particles
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 30;
      particlePos[i + 1] = (Math.random() - 0.5) * 30;
      particlePos[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe5c158,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      centerGroup.rotation.y = elapsed * 0.4;
      centerGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.25;
      ringMesh.rotation.z = elapsed * 0.2;
      particleSystem.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '90px 16px 60px 16px',
      overflow: 'hidden'
    }}>
      {/* Three.js Canvas Background */}
      <div 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }} 
      />

      {/* Hero Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        marginBottom: '36px',
        maxWidth: '720px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <span className="badge-gold">Cute • Funny • Personal • Festive</span>
        </div>

        <h1 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(2rem, 5.5vw, 4rem)',
          fontWeight: 900,
          letterSpacing: '1px',
          lineHeight: '1.15',
          marginBottom: '10px'
        }}>
          VYSHUU’S RAKHI WORLD ❤️
        </h1>

        <p style={{
          color: 'var(--cream)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
          marginBottom: '8px'
        }}>
          A tiny festive universe made specially for you.
        </p>

        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          maxWidth: '540px',
          margin: '0 auto 24px auto',
          lineHeight: '1.6'
        }}>
          Cute things, little surprises, and one Rakhi made with love by brother Ashu.
        </p>

        {/* Hero Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onSelectPortal('story')}
            className="btn-gold"
            style={{ minHeight: '48px', padding: '12px 28px', fontSize: '0.95rem', cursor: 'pointer' }}
          >
            <Sparkles size={16} /> Start the Surprise
          </button>
          <button
            onClick={() => onSelectPortal('studio')}
            className="btn-rose"
            style={{ minHeight: '48px', padding: '12px 28px', fontSize: '0.95rem', cursor: 'pointer' }}
          >
            <Heart size={16} /> Go to Rakhi Making 🪢
          </button>
        </div>
      </div>

      {/* Floating Portals Grid */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1000px'
      }}>
        {PORTALS.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.id}
              onClick={() => {
                playSparkle();
                onSelectPortal(portal.id);
              }}
              className="glass-panel"
              style={{
                padding: '24px 20px',
                cursor: 'pointer',
                transition: 'all 0.35s var(--ease-smooth)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                e.currentTarget.style.borderColor = portal.color;
                e.currentTarget.style.boxShadow = `0 15px 35px rgba(0,0,0,0.6), 0 0 25px ${portal.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'var(--gold-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: `${portal.color}18`,
                border: `1px solid ${portal.color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: portal.color,
                flexShrink: 0
              }}>
                <Icon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-serif" style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-main)',
                  marginBottom: '4px'
                }}>
                  {portal.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)'
                }}>
                  {portal.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
