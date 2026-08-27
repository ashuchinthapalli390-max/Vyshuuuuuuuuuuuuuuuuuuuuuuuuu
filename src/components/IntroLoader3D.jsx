import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles } from 'lucide-react';
import { playSparkle, playPop, startBgm } from '../utils/audio';

const FLOATING_WORDS = ["Memories", "Fights", "Chaos", "Laughs", "Secrets", "Love"];

export default function IntroLoader3D({ onComplete }) {
  const mountRef = useRef(null);
  const [phase, setPhase] = useState(0); // 0: Dot, 1: Bead + Init, 2: Floating Words, 3: Big Title & Button
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Stage sequence
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 3400);
    const t3 = setTimeout(() => setPhase(3), 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Cycle floating words during phase 2
  useEffect(() => {
    if (phase === 2) {
      const interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % FLOATING_WORDS.length);
        playPop(600 + Math.random() * 200);
      }, 700);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Three.js Scene for 3D Rakhi Bead & Cosmic Dust
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0205, 0.035);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3c7, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xe5c158, 2.5, 50);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    const pinkLight = new THREE.PointLight(0xf43f5e, 2, 40);
    pinkLight.position.set(-4, -3, 3);
    scene.add(pinkLight);

    // 3D Rakhi Central Medallion / Bead
    const beadGroup = new THREE.Group();

    // Center Gold Core
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x543806,
      emissiveIntensity: 0.3
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    beadGroup.add(coreMesh);

    // Gemstone Center
    const gemGeo = new THREE.OctahedronGeometry(0.45, 2);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x9f1239,
      emissiveIntensity: 0.6
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    beadGroup.add(gemMesh);

    // Surrounding Gold Filigree Petals
    const petalCount = 8;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petalGeo = new THREE.TorusGeometry(0.35, 0.08, 12, 24);
      const petalMat = new THREE.MeshStandardMaterial({
        color: 0xf3e5ab,
        metalness: 0.9,
        roughness: 0.25
      });
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.set(Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0);
      petal.rotation.z = angle;
      beadGroup.add(petal);
    }

    // Sacred Threads extending out
    const threadMat = new THREE.MeshStandardMaterial({
      color: 0xbe123c,
      roughness: 0.7
    });
    const threadGeoLeft = new THREE.CylinderGeometry(0.06, 0.06, 6, 12);
    const threadLeft = new THREE.Mesh(threadGeoLeft, threadMat);
    threadLeft.rotation.z = Math.PI / 2;
    threadLeft.position.x = -3.8;
    beadGroup.add(threadLeft);

    const threadRight = new THREE.Mesh(threadGeoLeft, threadMat);
    threadRight.rotation.z = Math.PI / 2;
    threadRight.position.x = 3.8;
    beadGroup.add(threadRight);

    scene.add(beadGroup);

    // Floating Golden Dust Particles
    const dustCount = 450;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 18;
      dustPos[i + 1] = (Math.random() - 0.5) * 18;
      dustPos[i + 2] = (Math.random() - 0.5) * 14;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xe5c158,
      size: 0.07,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      beadGroup.rotation.y = elapsed * 0.45;
      beadGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
      dustPoints.rotation.y = elapsed * 0.05;

      // Slight camera gentle float
      camera.position.x = Math.sin(elapsed * 0.4) * 0.2;
      camera.position.y = Math.cos(elapsed * 0.3) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleEnterUniverse = () => {
    playSparkle();
    startBgm();
    setIsExiting(true);

    // Trigger golden confetti burst
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e5c158', '#f43f5e', '#fffdf8', '#fef08a']
    });

    setTimeout(() => {
      onComplete();
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(circle at center, #1a050d 0%, #0c0205 100%)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isExiting ? 0 : 1,
      transform: isExiting ? 'scale(1.2)' : 'scale(1)',
      transition: 'opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1), transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
      overflow: 'hidden'
    }}>
      {/* 3D Canvas Background */}
      <div 
        ref={mountRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out'
        }} 
      />

      {/* Phase 0: The Initial Golden Dot */}
      {phase === 0 && (
        <div style={{
          width: '8px',
          height: '8px',
          background: 'var(--gold)',
          borderRadius: '50%',
          boxShadow: '0 0 30px 10px var(--gold)',
          animation: 'pulseGoldGlow 1.2s infinite'
        }} />
      )}

      {/* Phase 1: Initializing text */}
      {phase === 1 && (
        <div style={{
          position: 'absolute',
          bottom: '22%',
          textAlign: 'center',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <p style={{
            fontSize: '1rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--gold-champagne)',
            fontFamily: 'var(--font-ui)',
            fontWeight: 600
          }}>
            Initializing Vyshuuverse...
          </p>
        </div>
      )}

      {/* Phase 2: Floating Cosmic Words */}
      {phase === 2 && (
        <div style={{
          position: 'absolute',
          textAlign: 'center',
          zIndex: 10
        }}>
          <h2 className="font-serif" style={{
            fontSize: '3.5rem',
            letterSpacing: '8px',
            color: 'var(--gold)',
            textShadow: '0 0 40px rgba(229, 193, 88, 0.6)',
            textTransform: 'uppercase',
            transition: 'all 0.4s ease'
          }}>
            {FLOATING_WORDS[wordIndex]}
          </h2>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '3px',
            color: 'var(--text-muted)',
            marginTop: '8px',
            textTransform: 'uppercase'
          }}>
            Synchronizing Sibling Memories...
          </p>
        </div>
      )}

      {/* Phase 3: Grand Title Entrance & Enter Chaos Button */}
      {phase >= 3 && (
        <div style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          padding: '0 20px',
          maxWidth: '900px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <span className="badge-gold">Raksha Bandhan 2026</span>
            <span className="badge-rose">One Human Only</span>
          </div>

          <h1 className="font-serif text-gold-gradient" style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: 'clamp(4px, 1.5vw, 12px)',
            lineHeight: 1.1,
            marginBottom: '18px',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 50px var(--gold-glow)'
          }}>
            VYSHUUUUUUUUUUUUU
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: 'var(--cream-dim)',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '1px',
            marginBottom: '12px'
          }}>
            “One sister. Unlimited chaos. Too many memories.”
          </p>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            marginBottom: '36px',
            maxWidth: '540px',
            margin: '0 auto 36px auto',
            lineHeight: 1.5
          }}>
            A Raksha Bandhan experience crafted for exactly one human. <br />
            Warning: High sarcasm levels, unfiltered arguments, and pure love ahead.
          </p>

          <button
            onClick={handleEnterUniverse}
            className="btn-gold"
            style={{
              fontSize: '1.1rem',
              padding: '16px 42px',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={20} />
            ENTER THE CHAOS
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
