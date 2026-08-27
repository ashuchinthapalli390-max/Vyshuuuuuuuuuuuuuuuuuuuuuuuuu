import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { playPop, playBonk, playSparkle } from '../../utils/audio';

// 5x5 Maze grid
// 0: path, 1: wall, 2: troll dead-end, 3: loopback to start, 4: gift
const MAZE_GRID = [
  [0, 0, 1, 2, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 3],
  [1, 1, 1, 0, 1],
  [2, 0, 0, 0, 4]
];

export default function Game15TrollMaze({ onBack }) {
  const [playerPos, setPlayerPos] = useState({ r: 0, c: 0 });
  const [trollMsg, setTrollMsg] = useState("Find your way to the Rakhi Gift box!");
  const [hasWon, setHasWon] = useState(false);

  const move = (dr, dc) => {
    if (hasWon) return;
    const nr = playerPos.r + dr;
    const nc = playerPos.c + dc;

    if (nr < 0 || nr >= 5 || nc < 0 || nc >= 5) {
      playBonk();
      setTrollMsg("Ouch! That's the edge of the universe, Vyshuu.");
      return;
    }

    const cellType = MAZE_GRID[nr][nc];

    if (cellType === 1) {
      playBonk();
      setTrollMsg("Bonk! Ran straight into a brick wall.");
      return;
    }

    if (cellType === 2) {
      playBonk();
      setTrollMsg("“Wrong way, Vyshuuu! Nice try though 😂”");
      return;
    }

    if (cellType === 3) {
      playBonk();
      setTrollMsg("🌀 SIBLING BLACK HOLE! Teleported straight back to the beginning!");
      setPlayerPos({ r: 0, c: 0 });
      return;
    }

    if (cellType === 4) {
      playSparkle();
      setPlayerPos({ r: nr, c: nc });
      setHasWon(true);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      setTrollMsg("🎁 GIFT UNLOCKED! You survived the brother maze!");
      return;
    }

    // Normal move
    playPop(600);
    setPlayerPos({ r: nr, c: nc });
    setTrollMsg("Stepping through the chaos...");
  };

  const restart = () => {
    setPlayerPos({ r: 0, c: 0 });
    setTrollMsg("Find your way to the Rakhi Gift box!");
    setHasWon(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Labyrinth Challenge</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        THE TROLL MAZE 🌀
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
        Guide the avatar from start to the gift 🎁. Watch out for dead ends & troll portals!
      </p>

      {/* Message Output */}
      <div style={{
        background: 'rgba(20, 5, 12, 0.8)',
        border: '1px solid var(--gold-border)',
        borderRadius: '12px',
        padding: '10px 16px',
        color: hasWon ? '#22c55e' : 'var(--cream)',
        fontSize: '0.9rem',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {trollMsg}
      </div>

      {/* 5x5 Maze Grid */}
      <div style={{
        width: '260px',
        height: '260px',
        margin: '0 auto 24px auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gap: '4px',
        background: '#0a0104',
        padding: '6px',
        borderRadius: '16px',
        border: '2px solid var(--gold)'
      }}>
        {MAZE_GRID.map((row, r) =>
          row.map((cell, c) => {
            const isPlayer = playerPos.r === r && playerPos.c === c;
            const isGift = r === 4 && c === 4;

            let cellBg = 'rgba(255,255,255,0.05)';
            if (cell === 1) cellBg = '#270814'; // wall
            if (cell === 2) cellBg = 'rgba(239, 68, 68, 0.15)'; // deadend
            if (cell === 3) cellBg = 'rgba(168, 85, 247, 0.2)'; // blackhole

            return (
              <div
                key={`${r}-${c}`}
                style={{
                  background: cellBg,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem'
                }}
              >
                {isPlayer ? '🏃‍♀️' : isGift ? '🎁' : cell === 3 ? '🌀' : cell === 1 ? '🧱' : ''}
              </div>
            );
          })
        )}
      </div>

      {/* D-Pad Controls */}
      {hasWon ? (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={restart} className="btn-secondary">
            <RotateCcw size={16} /> Play Again
          </button>
          <button onClick={onBack} className="btn-gold">
            Return to Arcade
          </button>
        </div>
      ) : (
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => move(-1, 0)} className="btn-secondary" style={{ padding: '12px 18px' }}>
            <ArrowUp size={20} />
          </button>
          <div style={{ display: 'flex', gap: '14px' }}>
            <button onClick={() => move(0, -1)} className="btn-secondary" style={{ padding: '12px 18px' }}>
              <ArrowLeft size={20} />
            </button>
            <button onClick={() => move(1, 0)} className="btn-secondary" style={{ padding: '12px 18px' }}>
              <ArrowDown size={20} />
            </button>
            <button onClick={() => move(0, 1)} className="btn-secondary" style={{ padding: '12px 18px' }}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
