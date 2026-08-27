import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { playSparkle, playChime } from '../utils/audio';

export default function ConstellationFinale() {
  const mountRef = useRef(null);
  const [clickedFinal, setClickedFinal] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0104, 0.035);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0xfff8eb, 0.9);
    scene.add(amb);
    const point = new THREE.PointLight(0xe5c158, 2.5, 40);
    point.position.set(0, 0, 4);
    scene.add(point);

    const constellation = new THREE.Group();
    scene.add(constellation);

    const starCoords = [
      new THREE.Vector3(0, 1.8, 0),
      new THREE.Vector3(0.8, 2.4, 0),
      new THREE.Vector3(1.8, 2.2, 0),
      new THREE.Vector3(2.4, 1.2, 0),
      new THREE.Vector3(2.0, 0.2, 0),
      new THREE.Vector3(1.2, -1.0, 0),
      new THREE.Vector3(0, -2.2, 0),
      new THREE.Vector3(-1.2, -1.0, 0),
      new THREE.Vector3(-2.0, 0.2, 0),
      new THREE.Vector3(-2.4, 1.2, 0),
      new THREE.Vector3(-1.8, 2.2, 0),
      new THREE.Vector3(-0.8, 2.4, 0),
      new THREE.Vector3(-3.8, 0, 0),
      new THREE.Vector3(-2.6, 0.1, 0),
      new THREE.Vector3(2.6, 0.1, 0),
      new THREE.Vector3(3.8, 0, 0)
    ];

    starCoords.forEach((pt) => {
      const starGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xe5c158,
        emissiveIntensity: 0.9
      });
      const starMesh = new THREE.Mesh(starGeo, starMat);
      starMesh.position.copy(pt);
      constellation.add(starMesh);
    });

    const lineGeo = new THREE.BufferGeometry().setFromPoints(starCoords);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xe5c158,
      transparent: true,
      opacity: 0.45
    });
    const lineMesh = new THREE.LineLoop(lineGeo, lineMat);
    constellation.add(lineMesh);

    // Starfield Background
    const bgStarsCount = 500;
    const bgStarsGeo = new THREE.BufferGeometry();
    const bgStarsPos = new Float32Array(bgStarsCount * 3);
    for (let i = 0; i < bgStarsCount * 3; i += 3) {
      bgStarsPos[i] = (Math.random() - 0.5) * 26;
      bgStarsPos[i + 1] = (Math.random() - 0.5) * 26;
      bgStarsPos[i + 2] = (Math.random() - 0.5) * 16;
    }
    bgStarsGeo.setAttribute('position', new THREE.BufferAttribute(bgStarsPos, 3));
    const bgStarsMat = new THREE.PointsMaterial({
      color: 0xfef3c7,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const bgStars = new THREE.Points(bgStarsGeo, bgStarsMat);
    scene.add(bgStars);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      constellation.rotation.y = Math.sin(elapsed * 0.3) * 0.22;
      constellation.rotation.x = Math.cos(elapsed * 0.25) * 0.12;
      bgStars.rotation.y = elapsed * 0.02;

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

  const handleLastClick = () => {
    playChime();
    setClickedFinal(true);

    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#e5c158', '#f43f5e', '#ffffff', '#fbbf24', '#f472b6']
    });

    setTimeout(() => {
      confetti({
        particleCount: 120,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: ['#e5c158', '#f43f5e']
      });
      confetti({
        particleCount: 120,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: ['#e5c158', '#f43f5e']
      });
    }, 350);
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      padding: '90px 16px 80px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      zIndex: 10
    }}>
      {/* 3D Star Constellation */}
      <div 
        ref={mountRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Finale Foreground */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '760px', width: '100%' }}>
        {/* Journey Reflections */}
        <div style={{ marginBottom: '24px', color: 'var(--cream-dim)', fontSize: '1.05rem', lineHeight: '1.8' }}>
          <div>From random hahahahahas…</div>
          <div>to calling each other crack…</div>
          <div>to this unnecessarily large Rakhi website…</div>
          <div style={{ color: 'var(--gold)', fontWeight: 800, marginTop: '8px', fontSize: '1.15rem' }}>
            I’m glad this little bond exists. ❤️
          </div>
        </div>

        {/* Photo 3: Authentic Photo Reveal */}
        <div style={{
          width: '180px',
          height: '240px',
          margin: '0 auto 16px auto',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '3px solid var(--gold)',
          boxShadow: '0 0 50px var(--gold-glow), 0 0 70px rgba(244,63,94,0.4)',
          position: 'relative',
          animation: 'pulseGoldGlow 3s infinite'
        }}>
          <img 
            src="/photos/vyshuu_mirror.jpg" 
            alt="Best Sister Vyshuu" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Finished Custom Royal Ruby Rakhi */}
        <div style={{ marginBottom: '20px' }}>
          <img
            src="/festive_assets/royal_ruby_rakhi.png"
            alt="Custom Rakhi"
            style={{
              width: '140px',
              height: '140px',
              objectFit: 'contain',
              margin: '0 auto',
              display: 'block',
              filter: 'drop-shadow(0 0 25px var(--gold))',
              animation: 'floatGentle 3s ease-in-out infinite'
            }}
          />
        </div>

        <h1 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(1.9rem, 5vw, 3.8rem)',
          fontWeight: 900,
          letterSpacing: '1px',
          lineHeight: '1.2',
          marginBottom: '8px'
        }}>
          Happy Raksha Bandhan, Vyshuuuuuuuuuuuuu ❤️
        </h1>

        {/* Brother Ashu Definitive Signature */}
        <h2 className="font-serif text-rose-gradient" style={{
          fontSize: 'clamp(1.4rem, 3.8vw, 2.4rem)',
          fontWeight: 900,
          letterSpacing: '1px',
          marginBottom: '8px'
        }}>
          From your lovely brother Ashuuuuuuuuuuuuuuuuuuuu ❤️
        </h2>

        <p style={{
          color: 'var(--gold-champagne)',
          fontSize: '0.92rem',
          fontWeight: 700,
          marginBottom: '28px'
        }}>
          Double crack forever 😂 • Made with love, glitter, and unnecessary extra effort 😭✨
        </p>


        {clickedFinal ? (
          <div 
            className="glass-panel animate-float"
            style={{
              padding: '24px 32px',
              border: '2px solid var(--rose)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 50px var(--rose-glow)',
              display: 'inline-block'
            }}
          >
            <h3 className="font-serif" style={{
              fontSize: '1.6rem',
              color: 'var(--gold)',
              marginBottom: '6px'
            }}>
              FOREVER STUCK WITH ASHU 😂
            </h3>
            <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>
              ❤️ LOVE YOU ALWAYS, VYSHUU! ❤️
            </p>
          </div>
        ) : (
          <button
            onClick={handleLastClick}
            className="btn-rose"
            style={{
              fontSize: '1.1rem',
              padding: '16px 42px',
              boxShadow: '0 0 35px var(--rose-glow)',
              cursor: 'pointer',
              minHeight: '48px'
            }}
          >
            <Sparkles size={20} />
            ONE LAST CELEBRATION 💥
          </button>
        )}
      </div>
    </section>
  );
}
