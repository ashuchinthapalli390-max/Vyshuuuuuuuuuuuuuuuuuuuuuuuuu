import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Volume2, Play, Pause, Heart, Sparkles } from 'lucide-react';
import { playSparkle, playPop } from '../utils/audio';

export default function VoiceNoteChamber() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [captionIdx, setCaptionIdx] = useState(0);
  const mountRef = useRef(null);

  const CAPTIONS = [
    "“Hey Vyshuu... Happy Raksha Bandhan! ❤️”",
    "“I know we don't say emotional things out loud every day...”",
    "“...and we usually just exchange memes or short replies.”",
    "“But I wanted you to hear this directly: I am so proud to be your brother.”",
    "“Always keep that cheerful spirit shining bright. Love you forever!”"
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCaptionIdx((prev) => {
          if (prev + 1 < CAPTIONS.length) {
            playPop(650);
            return prev + 1;
          } else {
            setIsPlaying(false);
            playSparkle();
            return 0;
          }
        });
      }, 3600);
    } else {
      setCaptionIdx(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Three.js 3D Floating Waveform
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Waveform Bars
    const barCount = 28;
    const bars = [];
    const waveGroup = new THREE.Group();
    scene.add(waveGroup);

    for (let i = 0; i < barCount; i++) {
      const barGeo = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      const barMat = new THREE.MeshStandardMaterial({
        color: 0xe5c158,
        emissive: 0xe5c158,
        emissiveIntensity: 0.4,
        metalness: 0.8,
        roughness: 0.2
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.x = (i - barCount / 2) * 0.16;
      waveGroup.add(bar);
      bars.push(bar);
    }

    const amb = new THREE.AmbientLight(0xfff8eb, 1);
    scene.add(amb);
    const light = new THREE.PointLight(0xf43f5e, 2, 20);
    light.position.set(0, 2, 3);
    scene.add(light);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      waveGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.15;

      bars.forEach((b, idx) => {
        const factor = isPlaying ? Math.sin(elapsed * 4 + idx * 0.5) * 0.8 + 1 : 0.2;
        b.scale.y = THREE.MathUtils.lerp(b.scale.y, factor, 0.1);
        b.material.color.setHex(isPlaying ? 0xf43f5e : 0xe5c158);
      });

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
  }, [isPlaying]);

  const togglePlay = () => {
    playPop(550);
    setIsPlaying(!isPlaying);
  };

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '740px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <span className="badge-rose">Audio Memoir</span>
      <h2 className="font-serif text-gold-gradient" style={{
        fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
        fontWeight: 900,
        marginTop: '10px',
        marginBottom: '8px'
      }}>
        THE VOICE-NOTE CHAMBER 🎙️
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px' }}>
        Press play to hear the unsaid brotherly message across the 3D sound waves.
      </p>

      {/* 3D Waveform Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        background: 'radial-gradient(circle at center, #1c0612 0%, #0c0205 100%)',
        borderRadius: '20px',
        border: '1.5px solid var(--gold-border)',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

        {/* Dynamic Caption Display */}
        {isPlaying && (
          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '90%',
            background: 'rgba(15, 3, 8, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--rose)',
            padding: '8px 24px',
            borderRadius: '9999px',
            color: 'var(--gold-champagne)',
            fontSize: '1rem',
            fontFamily: 'var(--font-serif)',
            animation: 'floatGentle 2.5s ease-in-out infinite'
          }}>
            {CAPTIONS[captionIdx]}
          </div>
        )}
      </div>

      {/* Play / Pause Button */}
      <button
        onClick={togglePlay}
        className={isPlaying ? "btn-rose" : "btn-gold"}
        style={{ padding: '14px 36px', fontSize: '1.05rem', cursor: 'pointer' }}
      >
        {isPlaying ? (
          <>
            <Pause size={20} />
            Pause Audio Memo
          </>
        ) : (
          <>
            <Play size={20} />
            Play Brother’s Voice Message
          </>
        )}
      </button>
    </section>
  );
}
