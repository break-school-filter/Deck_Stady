import React, { useState, useEffect, useRef } from 'react';
import { GripVertical, X, ArrowUpRight } from 'lucide-react';
import { RedSheetPresetKey } from '../types';
import { RED_SHEET_PRESETS } from '../data/defaultData';

interface RedSheetOverlayProps {
  isActive: boolean;
  onClose: () => void;
  presetKey?: RedSheetPresetKey;
  onSelectPreset?: (key: RedSheetPresetKey) => void;
}

export const RedSheetOverlay: React.FC<RedSheetOverlayProps> = ({
  isActive,
  onClose,
  onSelectPreset
}) => {
  const [pos, setPos] = useState({ x: 100, y: 180 });
  const [size, setSize] = useState({ w: 320, h: 180 });

  const isDraggingRef = useRef(false);
  const isResizingRef = useRef(false);
  const startCoordsRef = useRef({ x: 0, y: 0 });
  const startDimsRef = useRef({ left: 100, top: 180, width: 320, height: 180 });

  // On window resize or initial mount check position
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialLeft = Math.min(Math.max(20, (window.innerWidth - size.w) / 2), window.innerWidth - 80);
      const initialTop = 160;
      setPos({ x: initialLeft, y: initialTop });
    }
  }, []);

  const handleApplyPreset = (key: RedSheetPresetKey) => {
    const preset = RED_SHEET_PRESETS[key];
    if (preset) {
      if (key === 'full') {
        const fullW = Math.min(window.innerWidth - 40, 750);
        const fullH = Math.min(window.innerHeight - 120, 480);
        setSize({ w: fullW, h: fullH });
      } else {
        setSize({ w: preset.w, h: preset.h });
      }
      if (onSelectPreset) onSelectPreset(key);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const dx = e.clientX - startCoordsRef.current.x;
        const dy = e.clientY - startCoordsRef.current.y;
        setPos({
          x: Math.max(10, Math.min(window.innerWidth - 60, startDimsRef.current.left + dx)),
          y: Math.max(60, Math.min(window.innerHeight - 60, startDimsRef.current.top + dy))
        });
      } else if (isResizingRef.current) {
        const dw = e.clientX - startCoordsRef.current.x;
        const dh = e.clientY - startCoordsRef.current.y;
        setSize({
          w: Math.max(120, Math.min(window.innerWidth - 20, startDimsRef.current.width + dw)),
          h: Math.max(40, Math.min(window.innerHeight - 60, startDimsRef.current.height + dh))
        });
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      isResizingRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length > 0) {
        const dx = e.touches[0].clientX - startCoordsRef.current.x;
        const dy = e.touches[0].clientY - startCoordsRef.current.y;
        setPos({
          x: Math.max(10, Math.min(window.innerWidth - 60, startDimsRef.current.left + dx)),
          y: Math.max(60, Math.min(window.innerHeight - 60, startDimsRef.current.top + dy))
        });
        e.preventDefault();
      } else if (isResizingRef.current && e.touches.length > 0) {
        const dw = e.touches[0].clientX - startCoordsRef.current.x;
        const dh = e.touches[0].clientY - startCoordsRef.current.y;
        setSize({
          w: Math.max(120, Math.min(window.innerWidth - 20, startDimsRef.current.width + dw)),
          h: Math.max(40, Math.min(window.innerHeight - 60, startDimsRef.current.height + dh))
        });
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      isResizingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isActive]);

  if (!isActive) return null;

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
      return;
    }
    isDraggingRef.current = true;
    startCoordsRef.current = { x: e.clientX, y: e.clientY };
    startDimsRef.current = { left: pos.x, top: pos.y, width: size.w, height: size.h };
    e.preventDefault();
  };

  const handleHeaderTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
      return;
    }
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      startCoordsRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      startDimsRef.current = { left: pos.x, top: pos.y, width: size.w, height: size.h };
    }
  };

  const handleResizerMouseDown = (e: React.MouseEvent) => {
    isResizingRef.current = true;
    startCoordsRef.current = { x: e.clientX, y: e.clientY };
    startDimsRef.current = { left: pos.x, top: pos.y, width: size.w, height: size.h };
    e.preventDefault();
    e.stopPropagation();
  };

  const handleResizerTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isResizingRef.current = true;
      startCoordsRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      startDimsRef.current = { left: pos.x, top: pos.y, width: size.w, height: size.h };
      e.stopPropagation();
    }
  };

  return (
    <div
      id="red-sheet-container"
      className="fixed z-50 shadow-2xl rounded-2xl overflow-hidden border-2 border-rose-500/80 bg-rose-600/90 select-none flex flex-col"
      style={{
        width: `${size.w}px`,
        height: `${size.h}px`,
        left: `${pos.x}px`,
        top: `${pos.y}px`
      }}
    >
      {/* Header / Drag Bar */}
      <div
        id="red-sheet-header"
        onMouseDown={handleHeaderMouseDown}
        onTouchStart={handleHeaderTouchStart}
        className="bg-rose-700/90 text-white px-3 py-1.5 flex items-center justify-between text-xs font-bold cursor-move border-b border-rose-500/40 select-none shrink-0"
      >
        <div className="flex items-center space-x-1.5 truncate mr-2">
          <GripVertical className="w-3.5 h-3.5 opacity-60 shrink-0" />
          <span className="truncate text-[11px] sm:text-xs">暗記用赤シート (ドラッグ移動可)</span>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Size Presets in Red Sheet Header */}
          <div className="hidden sm:flex space-x-1 text-[10px]">
            <button
              type="button"
              onClick={() => handleApplyPreset('line')}
              className="px-1.5 py-0.5 rounded bg-rose-800/80 hover:bg-rose-900 cursor-pointer text-white"
            >
              一行
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('sm')}
              className="px-1.5 py-0.5 rounded bg-rose-800/80 hover:bg-rose-900 cursor-pointer text-white"
            >
              小
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('md')}
              className="px-1.5 py-0.5 rounded bg-rose-800/80 hover:bg-rose-900 cursor-pointer text-white"
            >
              中
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('lg')}
              className="px-1.5 py-0.5 rounded bg-rose-800/80 hover:bg-rose-900 cursor-pointer text-white"
            >
              大
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('full')}
              className="px-1.5 py-0.5 rounded bg-rose-800/80 hover:bg-rose-900 cursor-pointer text-white"
            >
              全画面
            </button>
          </div>
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="text-rose-200 hover:text-white ml-1 p-0.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body: Optical Red Filter with multiply mix-blend */}
      <div
        className="flex-1 w-full relative"
        style={{ backgroundColor: '#ff0000', mixBlendMode: 'multiply', opacity: 0.85 }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-black font-black text-sm tracking-widest uppercase">
          Red Sheet Filter
        </div>
      </div>

      {/* Resize Handle */}
      <div
        id="red-sheet-resizer"
        onMouseDown={handleResizerMouseDown}
        onTouchStart={handleResizerTouchStart}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-rose-700/80 rounded-tl flex items-center justify-center text-[8px] text-white"
      >
        <ArrowUpRight className="w-2.5 h-2.5 transform -rotate-45" />
      </div>
    </div>
  );
};
