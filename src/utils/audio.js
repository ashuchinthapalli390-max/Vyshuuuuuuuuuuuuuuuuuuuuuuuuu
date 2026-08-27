// Procedural Web Audio API Sound Engine
// Generates high quality tactile sounds and ambient lofi/celestial music with zero external audio assets

let audioCtx = null;
let bgmGainNode = null;
let isBgmPlaying = false;
let bgmInterval = null;
let isMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(mute) {
  isMuted = mute;
  if (bgmGainNode && audioCtx) {
    bgmGainNode.gain.setValueAtTime(isMuted ? 0 : 0.12, audioCtx.currentTime);
  }
}

export function getIsMuted() {
  return isMuted;
}

// 1. Tactile Click / Pop
export function playPop(freq = 600) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {
    console.error(e);
  }
}

// 2. Chime / Temple Bell
export function playChime() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.06);
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.15 / (i + 1), ctx.currentTime + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.06 + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + i * 0.06 + 1.7);
    });
  } catch (e) {
    console.error(e);
  }
}

export function playBell() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const freqs = [329.63, 659.25, 987.77, 1318.51];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      gain.gain.setValueAtTime(0.25 / (i + 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    });
  } catch (e) {
    console.error(e);
  }
}


// 3. Sparkle / Magic Arpeggio
export function playSparkle() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [587.33, 739.99, 880.00, 1108.73, 1479.98, 1760.00];
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.045);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.045);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.045 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.045 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.045);
      osc.stop(ctx.currentTime + i * 0.045 + 0.45);
    });
  } catch (e) {
    console.error(e);
  }
}

// 4. Comic Bonk / Slipper Hit
export function playBonk() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.19);
  } catch (e) {
    console.error(e);
  }
}

// 5. Laser / Sarcasm Attack
export function playLaser() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(990, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.23);
  } catch (e) {
    console.error(e);
  }
}

// 6. Gavel Slam / Court Decision
export function playGavel() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  } catch (e) {
    console.error(e);
  }
}

// Wax crack sound
export function playWaxCrack() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch (e) {
    console.error(e);
  }
}


// 7. Heartbeat
export function playHeartbeat() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    [0, 0.25].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, ctx.currentTime + offset);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + offset + 0.12);

      gain.gain.setValueAtTime(0.3, ctx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.13);
    });
  } catch (e) {
    console.error(e);
  }
}

// 8. Paper Slide
export function playPaperSlide() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {
    console.error(e);
  }
}

// 9. Procedural Ambient Generative BGM (Celestial Lofi Harps)
const CHORDS = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 392.00], // Am7
  [174.61, 220.00, 261.63, 329.63], // Fmaj7
  [196.00, 246.94, 293.66, 349.23], // G7
  [164.81, 207.65, 246.94, 329.63]  // Em7
];

export function toggleBgm(forceState) {
  const target = forceState !== undefined ? forceState : !isBgmPlaying;
  if (target) {
    startBgm();
  } else {
    stopBgm();
  }
  return isBgmPlaying;
}

export function startBgm() {
  if (isBgmPlaying) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    bgmGainNode = ctx.createGain();
    bgmGainNode.gain.setValueAtTime(isMuted ? 0 : 0.12, ctx.currentTime);
    bgmGainNode.connect(ctx.destination);

    let chordIdx = 0;
    const playChordStep = () => {
      const chord = CHORDS[chordIdx % CHORDS.length];
      chordIdx++;

      chord.forEach((freq, noteIdx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + noteIdx * 0.15);

        // Soft envelope
        const noteStart = ctx.currentTime + noteIdx * 0.15;
        noteGain.gain.setValueAtTime(0.0001, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.08, noteStart + 0.6);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 3.8);

        osc.connect(noteGain);
        noteGain.connect(bgmGainNode);

        osc.start(noteStart);
        osc.stop(noteStart + 4.0);
      });
    };

    playChordStep();
    bgmInterval = setInterval(playChordStep, 4200);
    isBgmPlaying = true;
  } catch (e) {
    console.error(e);
  }
}

export function stopBgm() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
  isBgmPlaying = false;
}

export function getIsBgmPlaying() {
  return isBgmPlaying;
}
