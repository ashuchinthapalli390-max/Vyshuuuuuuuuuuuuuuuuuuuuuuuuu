import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MessageSquare, Sparkles, X, Heart, Smile } from 'lucide-react';
import { playPop, playSparkle } from '../utils/audio';

const CHAT_ORBS = [
  {
    id: 'c1',
    title: 'A Conversation I Still Remember',
    icon: '💬',
    color: '#38bdf8',
    preview: '“One of those rare talks where we both dropped the sarcasm…”',
    full: 'We usually spend 95% of our conversations making fun of each other. But there are a few messages where you shared what was on your mind honestly, and I realized just how thoughtful and strong you really are. I treasure those chats.'
  },
  {
    id: 'c2',
    title: 'Something You Said That Made Me Laugh',
    icon: '😂',
    color: '#fbbf24',
    preview: '“Your completely unhinged reaction to a random situation…”',
    full: 'You have this unique way of giving commentary that makes zero sense scientifically, but is 100% hilarious. Whether it was roasting someone or sending a panic voice note, you always crack me up.'
  },
  {
    id: 'c3',
    title: 'One Random Message I Liked',
    icon: '✨',
    color: '#f43f5e',
    preview: '“A simple out-of-the-blue check-in…”',
    full: 'Just a random “em chestunnav” or an unprovoked meme in the middle of a busy day. It seems tiny, but it always brightens my mood knowing my sister is around.'
  },
  {
    id: 'c4',
    title: 'Something I Never Replied Properly To',
    icon: '📩',
    color: '#a855f7',
    preview: '“Probably left you on ‘hmm’ or a simple like…”',
    full: 'I admit it—sometimes I gave one-word replies when I was busy or exhausted. So here is the proper reply: I read every single message, and having you in my life means everything to me.'
  },
  {
    id: 'c5',
    title: 'The Infinite Reel Exchange',
    icon: '📱',
    color: '#ec4899',
    preview: '“Sending 8 reels in a row without a single word of context…”',
    full: 'No hello. No how are you. Just 8 consecutive Instagram reels about cats, sibling drama, or food. Our modern sibling language is 90% memes and 10% arguments.'
  }
];

export default function ChatUniverse3D() {
  const mountRef = useRef(null);
  const [activeOrb, setActiveOrb] = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0104, 0.04);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Point lights
    const amb = new THREE.AmbientLight(0xfff8eb, 0.9);
    scene.add(amb);
    const point = new THREE.PointLight(0xe5c158, 2.5, 30);
    point.position.set(0, 0, 4);
    scene.add(point);

    // Floating 3D Smartphone Group in Center
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);

    // Phone Body
    const phoneGeo = new THREE.BoxGeometry(1.6, 3.0, 0.14);
    const phoneMat = new THREE.MeshStandardMaterial({
      color: 0x1e0612,
      metalness: 0.8,
      roughness: 0.2
    });
    const phoneMesh = new THREE.Mesh(phoneGeo, phoneMat);
    phoneGroup.add(phoneMesh);

    // Screen
    const screenGeo = new THREE.PlaneGeometry(1.48, 2.85);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x2b0a1a
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.08;
    phoneGroup.add(screenMesh);

    // Floating Chat Bubble Orbs
    const orbs = [];
    CHAT_ORBS.forEach((item, i) => {
      const angle = (i / CHAT_ORBS.length) * Math.PI * 2;
      const radius = 3.2;

      const orbGeo = new THREE.SphereGeometry(0.32, 24, 24);
      const orbMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(item.color),
        emissive: new THREE.Color(item.color),
        emissiveIntensity: 0.5,
        metalness: 0.7,
        roughness: 0.2
      });
      const orbMesh = new THREE.Mesh(orbGeo, orbMat);
      orbMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * 1.5, Math.sin(angle) * radius * 0.4);
      phoneGroup.add(orbMesh);
      orbs.push({ mesh: orbMesh, angle, radius });
    });

    // Cosmic Stars
    const starCount = 450;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 22;
      starPos[i + 1] = (Math.random() - 0.5) * 22;
      starPos[i + 2] = (Math.random() - 0.5) * 14;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.07,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Phone gentle float and tilt
      phoneGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.2;
      phoneGroup.rotation.x = Math.cos(elapsed * 0.3) * 0.1;

      orbs.forEach((o, idx) => {
        const curAngle = o.angle + elapsed * 0.25;
        o.mesh.position.x = Math.cos(curAngle) * o.radius;
        o.mesh.position.z = Math.sin(curAngle) * (o.radius * 0.5);
        o.mesh.position.y = Math.sin(elapsed * 1.5 + idx) * 0.3 + (idx % 2 === 0 ? 0.6 : -0.6);
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
  }, []);

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '1140px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <span className="badge-gold">Digital Universe</span>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          fontWeight: 900,
          marginTop: '10px',
          marginBottom: '10px'
        }}>
          OUR 3D CHAT UNIVERSE 💬
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
          Floating in space: our real conversation lore, late-night check-ins, and unspoken brotherly reflections.
        </p>
      </div>

      {/* 3D Viewport with Floating Phone & Orbiting Chat Orbs */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '360px',
        background: 'radial-gradient(circle at center, #1b0610 0%, #090104 100%)',
        borderRadius: '24px',
        border: '1.5px solid var(--gold-border)',
        boxShadow: 'var(--shadow-glass)',
        overflow: 'hidden',
        marginBottom: '36px'
      }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute',
          bottom: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15, 3, 8, 0.8)',
          backdropFilter: 'blur(8px)',
          padding: '6px 18px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          color: 'var(--gold-champagne)',
          border: '1px solid var(--gold-border)'
        }}>
          ✨ Tap any chat card below to open its memory
        </div>
      </div>

      {/* Chat Memory Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {CHAT_ORBS.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              playSparkle();
              setActiveOrb(item);
            }}
            className="glass-panel"
            style={{
              padding: '22px',
              border: `1.5px solid ${item.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s var(--ease-smooth)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.borderColor = item.color;
              e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.6), 0 0 20px ${item.color}35`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = `${item.color}40`;
              e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
            }}
          >
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.icon}</div>
              <h3 className="font-serif" style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '6px' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                {item.preview}
              </p>
            </div>
            <div style={{ marginTop: '16px', color: item.color, fontWeight: 700, fontSize: '0.85rem' }}>
              Read Reflection →
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Active Chat Memory */}
      {activeOrb && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(10, 2, 6, 0.88)',
          backdropFilter: 'blur(14px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div 
            className="glass-panel"
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '36px 28px',
              border: `2px solid ${activeOrb.color}`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${activeOrb.color}40`,
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <button
              onClick={() => { playPop(400); setActiveOrb(null); }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{activeOrb.icon}</div>
            <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '14px' }}>
              {activeOrb.title}
            </h3>
            <p style={{ color: 'var(--cream)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '24px' }}>
              “{activeOrb.full}”
            </p>
            <button
              onClick={() => { playSparkle(); setActiveOrb(null); }}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Heart size={18} />
              Keep in Sibling Heart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
