import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Check, RotateCcw } from 'lucide-react';
import { playPop, playSparkle } from '../../utils/audio';

const BEAD_STYLES = [
  { id: 'floral', name: 'Gold Floral', petalCount: 8 },
  { id: 'sun', name: 'Celestial Sun', petalCount: 12 },
  { id: 'mandala', name: 'Royal Mandala', petalCount: 16 }
];

const GEM_COLORS = [
  { id: 'ruby', name: 'Ruby Pink', hex: '#f43f5e', num: 0xf43f5e },
  { id: 'emerald', name: 'Emerald', hex: '#10b981', num: 0x10b981 },
  { id: 'sapphire', name: 'Sapphire', hex: '#3b82f6', num: 0x3b82f6 },
  { id: 'gold', name: 'Topaz Gold', hex: '#e5c158', num: 0xe5c158 }
];

const THREAD_COLORS = [
  { id: 'crimson', name: 'Sacred Crimson', hex: '#be123c', num: 0xbe123c },
  { id: 'gold', name: 'Golden Silk', hex: '#d97706', num: 0xd97706 },
  { id: 'rose', name: 'Rose Petal', hex: '#e11d48', num: 0xe11d48 }
];

export default function Game14RakhiBuilder({ customRakhi, onSaveRakhi, onBack }) {
  const mountRef = useRef(null);
  const [selectedBead, setSelectedBead] = useState(customRakhi?.bead || 'floral');
  const [selectedGem, setSelectedGem] = useState(customRakhi?.gem || 'ruby');
  const [selectedThread, setSelectedThread] = useState(customRakhi?.thread || 'crimson');
  const [isSaved, setIsSaved] = useState(false);

  const sceneObjects = useRef({});

  // Three.js 3D Rakhi Live Preview Canvas
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const amb = new THREE.AmbientLight(0xfff8eb, 1);
    scene.add(amb);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xe5c158, 2, 20);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Rakhi Group
    const rakhiGroup = new THREE.Group();
    scene.add(rakhiGroup);
    sceneObjects.current.rakhiGroup = rakhiGroup;

    // Center Core Gold
    const coreGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.2, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      metalness: 0.85,
      roughness: 0.2
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.rotation.x = Math.PI / 2;
    rakhiGroup.add(coreMesh);

    // Gemstone Mesh
    const gemGeo = new THREE.OctahedronGeometry(0.4, 2);
    const gemColorObj = GEM_COLORS.find(g => g.id === selectedGem) || GEM_COLORS[0];
    const gemMat = new THREE.MeshStandardMaterial({
      color: gemColorObj.num,
      emissive: gemColorObj.num,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.z = 0.15;
    rakhiGroup.add(gemMesh);
    sceneObjects.current.gemMesh = gemMesh;

    // Petals Group
    const petalsGroup = new THREE.Group();
    rakhiGroup.add(petalsGroup);
    sceneObjects.current.petalsGroup = petalsGroup;

    // Threads Group
    const threadColorObj = THREAD_COLORS.find(t => t.id === selectedThread) || THREAD_COLORS[0];
    const threadMat = new THREE.MeshStandardMaterial({
      color: threadColorObj.num,
      roughness: 0.6
    });
    const threadGeo = new THREE.CylinderGeometry(0.05, 0.05, 5, 16);
    
    const threadLeft = new THREE.Mesh(threadGeo, threadMat);
    threadLeft.rotation.z = Math.PI / 2;
    threadLeft.position.x = -3.0;
    rakhiGroup.add(threadLeft);

    const threadRight = new THREE.Mesh(threadGeo, threadMat);
    threadRight.rotation.z = Math.PI / 2;
    threadRight.position.x = 3.0;
    rakhiGroup.add(threadRight);

    sceneObjects.current.threads = [threadLeft, threadRight];

    // Build Petals
    const rebuildPetals = (beadId) => {
      while (petalsGroup.children.length > 0) {
        petalsGroup.remove(petalsGroup.children[0]);
      }
      const bead = BEAD_STYLES.find(b => b.id === beadId) || BEAD_STYLES[0];
      for (let i = 0; i < bead.petalCount; i++) {
        const angle = (i / bead.petalCount) * Math.PI * 2;
        const petalGeo = new THREE.SphereGeometry(0.18, 16, 16);
        petalGeo.scale(1, 1.8, 0.5);
        const petalMat = new THREE.MeshStandardMaterial({
          color: 0xfef08a,
          metalness: 0.85,
          roughness: 0.3
        });
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.position.set(Math.cos(angle) * 0.95, Math.sin(angle) * 0.95, 0);
        petal.rotation.z = angle + Math.PI / 2;
        petalsGroup.add(petal);
      }
    };
    rebuildPetals(selectedBead);
    sceneObjects.current.rebuildPetals = rebuildPetals;

    // Animation & Interactive Drag Rotation
    let animId;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const curX = e.clientX || (e.touches && e.touches[0].clientX);
      const curY = e.clientY || (e.touches && e.touches[0].clientY);
      const deltaX = curX - prevMouseX;
      const deltaY = curY - prevMouseY;
      rakhiGroup.rotation.y += deltaX * 0.01;
      rakhiGroup.rotation.x += deltaY * 0.01;
      prevMouseX = curX;
      prevMouseY = curY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleMouseDown);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);

    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        rakhiGroup.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update 3D Gemstone Color
  useEffect(() => {
    if (sceneObjects.current.gemMesh) {
      const gemColorObj = GEM_COLORS.find(g => g.id === selectedGem);
      if (gemColorObj) {
        sceneObjects.current.gemMesh.material.color.setHex(gemColorObj.num);
        sceneObjects.current.gemMesh.material.emissive.setHex(gemColorObj.num);
      }
    }
  }, [selectedGem]);

  // Update 3D Thread Color
  useEffect(() => {
    if (sceneObjects.current.threads) {
      const threadColorObj = THREAD_COLORS.find(t => t.id === selectedThread);
      if (threadColorObj) {
        sceneObjects.current.threads.forEach(t => t.material.color.setHex(threadColorObj.num));
      }
    }
  }, [selectedThread]);

  // Update 3D Petals
  useEffect(() => {
    if (sceneObjects.current.rebuildPetals) {
      sceneObjects.current.rebuildPetals(selectedBead);
    }
  }, [selectedBead]);

  const handleSave = () => {
    playSparkle();
    setIsSaved(true);
    const design = {
      bead: selectedBead,
      gem: selectedGem,
      gemHex: GEM_COLORS.find(g => g.id === selectedGem)?.hex,
      thread: selectedThread,
      threadHex: THREAD_COLORS.find(t => t.id === selectedThread)?.hex
    };
    onSaveRakhi(design);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Custom 3D Workshop</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        3D RAKHI CUSTOMIZER 🪢
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
        Design your custom Rakhi in 3D space. Drag to rotate! It will be used in the sacred tying ceremony.
      </p>

      {/* 3D Preview Viewport */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        background: 'radial-gradient(circle at center, #1b0610 0%, #0c0205 100%)',
        borderRadius: '16px',
        border: '1.5px solid var(--gold-border)',
        overflow: 'hidden',
        marginBottom: '20px',
        cursor: 'grab'
      }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.7rem',
          color: 'var(--gold-champagne)',
          background: 'rgba(10,2,5,0.7)',
          padding: '2px 10px',
          borderRadius: '9999px'
        }}>
          ✋ Drag to rotate in 3D
        </div>
      </div>

      {/* Customization Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', textAlign: 'left' }}>
        {/* Center Bead Style */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            1. Center Filigree Style
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '6px' }}>
            {BEAD_STYLES.map((b) => (
              <button
                key={b.id}
                onClick={() => { playPop(500); setSelectedBead(b.id); setIsSaved(false); }}
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedBead === b.id ? '1.5px solid var(--gold)' : '1px solid var(--gold-border)',
                  background: selectedBead === b.id ? 'rgba(229, 193, 88, 0.2)' : 'rgba(20,5,12,0.7)',
                  color: selectedBead === b.id ? '#fff' : 'var(--text-muted)'
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Center Gemstone */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            2. Precious Gemstone
          </label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            {GEM_COLORS.map((g) => (
              <button
                key={g.id}
                onClick={() => { playPop(600); setSelectedGem(g.id); setIsSaved(false); }}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedGem === g.id ? '2px solid #fff' : `1px solid ${g.hex}60`,
                  background: `${g.hex}25`,
                  color: '#fff'
                }}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Silk Thread Color */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            3. Sacred Silk Thread
          </label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            {THREAD_COLORS.map((t) => (
              <button
                key={t.id}
                onClick={() => { playPop(700); setSelectedThread(t.id); setIsSaved(false); }}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedThread === t.id ? '2px solid #fff' : `1px solid ${t.hex}60`,
                  background: `${t.hex}25`,
                  color: '#fff'
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isSaved ? (
        <div style={{
          background: 'rgba(34, 197, 94, 0.15)',
          border: '1.5px solid #22c55e',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ color: '#22c55e', fontWeight: 800, fontSize: '1.05rem', marginBottom: '4px' }}>
            ✨ RAKHI CRAFTED & SAVED!
          </p>
          <p style={{ color: 'var(--cream)', fontSize: '0.85rem' }}>
            “Made by Vyshuu. Approved by brother. Ready for the sacred tying ritual.”
          </p>
        </div>
      ) : (
        <button onClick={handleSave} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
          <Sparkles size={18} />
          Lock Design & Save for Rakhi Ceremony
        </button>
      )}
    </div>
  );
}
