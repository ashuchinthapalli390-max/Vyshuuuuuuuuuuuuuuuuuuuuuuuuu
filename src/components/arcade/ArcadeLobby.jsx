import React, { useState } from 'react';
import { Gamepad2, Sparkles, Flame, Shield, HelpCircle, Trophy } from 'lucide-react';
import { playPop, playSparkle } from '../../utils/audio';

import GameTypingSim from './GameTypingSim';
import GameHmmBoss from './GameHmmBoss';
import GameSeenZone from './GameSeenZone';
import GameRoastMachine from './GameRoastMachine';
import GameEmojiTranslator from './GameEmojiTranslator';
import Game3CatchChappal from './Game3CatchChappal';
import Game4DontPress from './Game4DontPress';
import Game5RageMeter from './Game5RageMeter';
import Game13MemoryPuzzle from './Game13MemoryPuzzle';
import Game14RakhiBuilder from './Game14RakhiBuilder';
import Game15TrollMaze from './Game15TrollMaze';
import Game16ImpossibleQuiz from './Game16ImpossibleQuiz';
import Game17ButtonChase from './Game17ButtonChase';
import Game18ReactionSpeed from './Game18ReactionSpeed';
import Game19MemoryRoulette from './Game19MemoryRoulette';
import Game20SiblingBingo from './Game20SiblingBingo';

const DIGITAL_GAMES = [
  { id: 1, title: 'Typing… Simulator', desc: '10 seconds of pure typing suspense ending in “hmm”', icon: '💬', cat: 'Chat Chaos', comp: GameTypingSim },
  { id: 2, title: 'The “HMM” Boss Fight', desc: 'Defeat the one-word reply with memes & questions', icon: '👾', cat: 'Battles', comp: GameHmmBoss },
  { id: 3, title: 'Seen-Zone Survival', desc: 'Tactical survival moves when left on double blue ticks', icon: '👁️', cat: 'Chat Chaos', comp: GameSeenZone },
  { id: 4, title: 'Sibling Roast Machine', desc: 'Roast Vyshuu habits vs Brother self-trolls', icon: '🔥', cat: 'Battles', comp: GameRoastMachine },
  { id: 5, title: 'Emoji Translator', desc: 'Decode the secret sibling subtext behind emoji chains', icon: '🔤', cat: 'Chat Chaos', comp: GameEmojiTranslator },
  { id: 6, title: 'Dodge The Chappal 😭', desc: 'Cartoon slipper survival dodging reflex game', icon: '🩴', cat: 'Reflexes', comp: Game3CatchChappal },
  { id: 7, title: 'Don’t Press The Button', desc: 'Reverse psychology button deleting the website', icon: '🚨', cat: 'Trolls', comp: Game4DontPress },
  { id: 8, title: 'Vyshuu Rage Meter', desc: 'Situational annoyance forecaster & reaction gauge', icon: '🌡️', cat: 'Trolls', comp: Game5RageMeter },
  { id: 9, title: 'Photo Memory Puzzle', desc: '3x3 authentic photo tile jigsaw reconstruction', icon: '🖼️', cat: 'Memory', comp: Game13MemoryPuzzle },
  { id: 10, title: '3D Rakhi Customizer', desc: 'Craft your custom 3D Rakhi model for the ceremony', icon: '🪢', cat: 'Crafting', comp: Game14RakhiBuilder },
  { id: 11, title: 'The Troll Maze', desc: 'Reach the gift through tricky dead-ends & black holes', icon: '🌀', cat: 'Reflexes', comp: Game15TrollMaze },
  { id: 12, title: 'The Impossible Quiz', desc: 'Rigged trick questions where Vyshuu is always right', icon: '❓', cat: 'Trolls', comp: Game16ImpossibleQuiz },
  { id: 13, title: 'Button Chase', desc: 'Catch the running button for a secret heart reward', icon: '🏃‍♀️', cat: 'Reflexes', comp: Game17ButtonChase },
  { id: 14, title: 'Reaction Speed Test', desc: 'Tap when the exact target VYSHUUUUUUUUUU appears', icon: '⚡', cat: 'Reflexes', comp: Game18ReactionSpeed },
  { id: 15, title: 'Memory Roulette', desc: 'Spin the wheel for random sibling moments & roasts', icon: '🎡', cat: 'Memory', comp: Game19MemoryRoulette },
  { id: 16, title: 'Sibling Chaos Bingo', desc: '4x4 interactive habit board celebration', icon: '🎯', cat: 'Trolls', comp: Game20SiblingBingo }
];

const CATEGORIES = ['All', 'Chat Chaos', 'Battles', 'Trolls', 'Reflexes', 'Crafting', 'Memory'];

export default function ArcadeLobby({ customRakhi, onSaveRakhi }) {
  const [activeGameId, setActiveGameId] = useState(null);
  const [activeCat, setActiveCat] = useState('All');

  const filteredGames = activeCat === 'All' 
    ? DIGITAL_GAMES 
    : DIGITAL_GAMES.filter(g => g.cat === activeCat);

  if (activeGameId) {
    const gameObj = DIGITAL_GAMES.find(g => g.id === activeGameId);
    if (gameObj) {
      const Component = gameObj.comp;
      return (
        <section style={{ padding: '80px 20px', minHeight: '80vh' }}>
          <Component 
            onBack={() => { playPop(400); setActiveGameId(null); }} 
            customRakhi={customRakhi}
            onSaveRakhi={onSaveRakhi}
          />
        </section>
      );
    }
  }

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span className="badge-gold">Digital Playzone</span>
          <span className="badge-rose">Online Sibling Chaos</span>
        </div>
        <h2 className="font-serif text-gold-gradient" style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          letterSpacing: '1px',
          marginBottom: '10px'
        }}>
          ONLINE CHAOS ARCADE 🕹️
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
          Games built around our actual chatting habits, typing suspense, meme attacks, and sibling banter!
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '36px'
      }}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCat === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                playPop(600);
                setActiveCat(cat);
              }}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: isActive ? 'none' : '1px solid var(--gold-border)',
                background: isActive ? 'linear-gradient(135deg, #e5c158 0%, #caa030 100%)' : 'rgba(24, 6, 14, 0.7)',
                color: isActive ? '#14040a' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 4px 15px var(--gold-glow)' : 'none'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Games Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              playSparkle();
              setActiveGameId(game.id);
            }}
            className="glass-panel"
            style={{
              padding: '24px 20px',
              cursor: 'pointer',
              border: '1px solid var(--gold-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s var(--ease-smooth)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.borderColor = 'var(--gold)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6), 0 0 25px var(--gold-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'var(--gold-border)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '2rem' }}>{game.icon}</span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  background: 'rgba(229, 193, 88, 0.12)',
                  color: 'var(--gold-light)',
                  border: '1px solid rgba(229, 193, 88, 0.25)'
                }}>
                  {game.cat}
                </span>
              </div>

              <h3 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
                {game.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                {game.desc}
              </p>
            </div>

            <div style={{
              marginTop: '18px',
              fontSize: '0.85rem',
              color: 'var(--gold)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              Play Game →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
