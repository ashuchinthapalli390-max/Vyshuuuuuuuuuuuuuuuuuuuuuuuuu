import React, { useEffect, useState } from 'react';
import { Bell, AlertTriangle, Coffee, Sparkles, X, Heart, ShieldAlert } from 'lucide-react';
import { playPop } from '../utils/audio';

const TROLL_MESSAGES = [
  { text: "Vyshuu detected online. Securing all chocolates.", icon: AlertTriangle, type: "warning" },
  { text: "Warning: Sarcasm level rising (currently 99.4%).", icon: Bell, type: "info" },
  { text: "Sibling argument incoming... false alarm, food arrived.", icon: Coffee, type: "success" },
  { text: "Food intake still under official review.", icon: ShieldAlert, type: "warning" },
  { text: "Patience level: 2% (dangerously low).", icon: AlertTriangle, type: "danger" },
  { text: "Vyshuu said 'chaalu' 3 minutes ago.", icon: Sparkles, type: "info" },
  { text: "System note: Remote control remains safely hidden.", icon: ShieldAlert, type: "info" },
  { text: "Sibling love detected behind 47 ridiculous arguments.", icon: Heart, type: "love" }
];

export default function TrollNotifications() {
  const [currentNotif, setCurrentNotif] = useState(null);

  useEffect(() => {
    let timer;
    let dismissTimer;

    const showNext = () => {
      const randomMsg = TROLL_MESSAGES[Math.floor(Math.random() * TROLL_MESSAGES.length)];
      setCurrentNotif(randomMsg);
      playPop(780);

      dismissTimer = setTimeout(() => {
        setCurrentNotif(null);
      }, 5000);

      const nextDelay = 14000 + Math.random() * 12000;
      timer = setTimeout(showNext, nextDelay);
    };

    // First notification appears after 7 seconds
    timer = setTimeout(showNext, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, []);

  if (!currentNotif) return null;

  const Icon = currentNotif.icon;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9990,
      animation: 'floatGentle 4s ease-in-out infinite'
    }}>
      <div 
        className="glass-pill"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 18px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px var(--gold-glow)',
          border: '1px solid var(--gold-border-bright)',
          maxWidth: '360px',
          background: 'rgba(24, 5, 12, 0.92)'
        }}
      >
        <div style={{
          background: 'rgba(229, 193, 88, 0.15)',
          padding: '6px',
          borderRadius: '50%',
          display: 'flex',
          color: 'var(--gold)'
        }}>
          <Icon size={18} />
        </div>
        <div style={{ flex: 1, fontSize: '0.85rem', lineHeight: '1.3', color: 'var(--text-main)' }}>
          <strong style={{ color: 'var(--gold)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Sibling Dispatch
          </strong>
          {currentNotif.text}
        </div>
        <button 
          onClick={() => { playPop(400); setCurrentNotif(null); }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex'
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
