import React, { useEffect, useState } from 'react';

export default function CustomCursor({ cursorMode }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animFrame;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      setIsVisible(true);

      const target = e.target;
      const isClickable = target.closest('button') || target.closest('a') || target.closest('[data-cursor]');
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateRing = () => {
      // Smooth lerp
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setRingPos({ x: currentX, y: currentY });
      animFrame = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animFrame = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!isVisible) return null;

  let labelText = '';
  let ringScale = isHovering ? 1.5 : 1;
  let ringColor = 'rgba(229, 193, 88, 0.6)';

  if (cursorMode === 'view') {
    labelText = 'VIEW';
    ringScale = 2.2;
    ringColor = 'rgba(244, 63, 94, 0.8)';
  } else if (cursorMode === 'heart') {
    labelText = '❤️';
    ringScale = 1.8;
  } else if (cursorMode === 'thread') {
    labelText = '🪢 TIE';
    ringScale = 2.0;
    ringColor = 'rgba(229, 193, 88, 0.9)';
  } else if (cursorMode === 'secret') {
    labelText = '???';
    ringScale = 1.6;
    ringColor = '#a855f7';
  }

  return (
    <>
      <div 
        className="custom-cursor-dot" 
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }} 
      />
      <div 
        className="custom-cursor-ring" 
        style={{ 
          transform: `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${ringScale})`,
          borderColor: ringColor
        }} 
      />
      {labelText && (
        <div 
          className="custom-cursor-label"
          style={{ transform: `translate(${pos.x + 14}px, ${pos.y - 14}px)` }}
        >
          {labelText}
        </div>
      )}
    </>
  );
}
