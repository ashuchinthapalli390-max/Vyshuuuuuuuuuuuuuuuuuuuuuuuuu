import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Award } from 'lucide-react';
import { playPop, playSparkle } from '../../utils/audio';

// 3x3 Puzzle tiles (0 to 8)
const SOLVED_TILES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function Game13MemoryPuzzle({ onBack }) {
  // Start with a lightly scrambled state that is easy and fun to solve
  const [tiles, setTiles] = useState([1, 0, 2, 3, 5, 4, 6, 7, 8]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  const handleTileClick = (index) => {
    if (isSolved) return;
    playPop(550);

    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else {
      // Swap selected with clicked
      const newTiles = [...tiles];
      const temp = newTiles[selectedIdx];
      newTiles[selectedIdx] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedIdx(null);
      setMoves((m) => m + 1);

      // Check if solved
      const solved = newTiles.every((val, i) => val === i);
      if (solved) {
        setIsSolved(true);
        playSparkle();
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  const restart = () => {
    setTiles([2, 1, 0, 4, 3, 5, 6, 8, 7]);
    setSelectedIdx(null);
    setIsSolved(false);
    setMoves(0);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px 20px', maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge-gold">Photo Jigsaw</span>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
          Exit Game
        </button>
      </div>

      <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
        VYSHUU’S MEMORY PUZZLE 🧩
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
        Tap two tiles to swap their positions and reconstruct the memory! Moves: {moves}
      </p>

      {/* 3x3 Puzzle Container */}
      <div style={{
        width: '300px',
        height: '300px',
        margin: '0 auto 24px auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '4px',
        background: 'rgba(20, 5, 12, 0.9)',
        border: '3px solid var(--gold)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 15px 35px rgba(0,0,0,0.8), 0 0 25px var(--gold-glow)'
      }}>
        {tiles.map((tileVal, idx) => {
          const col = tileVal % 3;
          const row = Math.floor(tileVal / 3);
          const isSelected = selectedIdx === idx;

          return (
            <div
              key={idx}
              onClick={() => handleTileClick(idx)}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/photos/vyshuu_traditional.jpg)',
                backgroundSize: '300px 300px',
                backgroundPosition: `-${col * 100}px -${row * 100}px`,
                cursor: 'pointer',
                border: isSelected ? '2.5px solid #fff' : isSolved ? 'none' : '1px solid rgba(229, 193, 88, 0.3)',
                boxShadow: isSelected ? '0 0 15px #fff' : 'none',
                transition: 'transform 0.15s ease, border-color 0.15s ease'
              }}
            />
          );
        })}
      </div>

      {isSolved ? (
        <div style={{
          background: 'rgba(229, 193, 88, 0.15)',
          border: '2px solid var(--gold)',
          borderRadius: '16px',
          padding: '20px',
          animation: 'floatGentle 3s ease-in-out infinite'
        }}>
          <Award size={36} color="var(--gold)" style={{ margin: '0 auto 8px auto' }} />
          <h4 className="font-serif" style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '6px' }}>
            PUZZLE SOLVED IN {moves} MOVES! 🌟
          </h4>
          <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.5', marginBottom: '16px' }}>
            “One of my favorite photos of you. Always keep this genuine, pure smile shining bright!”
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={restart} className="btn-secondary">
              <RotateCcw size={16} /> Scramble Again
            </button>
            <button onClick={onBack} className="btn-gold">
              Back to Arcade
            </button>
          </div>
        </div>
      ) : (
        <button onClick={restart} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
          <RotateCcw size={14} /> Reset Scramble
        </button>
      )}
    </div>
  );
}
