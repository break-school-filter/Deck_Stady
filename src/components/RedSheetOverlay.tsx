import React, { useEffect, useState } from 'react';
import { EyeOff } from 'lucide-react';

interface RedSheetOverlayProps {
  isActive: boolean;
  size: { w: number; h: number };
}

export const RedSheetOverlay: React.FC<RedSheetOverlayProps> = ({ isActive, size }) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!isActive) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      setPos({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      id="red-sheet-overlay"
      className="fixed pointer-events-none z-50 rounded-2xl border border-red-400/30 shadow-2xl transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white/50 font-bold text-xs uppercase tracking-widest select-none transition-opacity duration-150"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${size.w}px`,
        height: `${size.h}px`,
        backgroundColor: '#ff0000',
        mixBlendMode: 'multiply'
      }}
    >
      <div className="flex flex-col items-center pointer-events-none opacity-60">
        <EyeOff className="w-6 h-6 mb-1" />
        <span>赤シート (REDSHEET)</span>
      </div>
    </div>
  );
};
