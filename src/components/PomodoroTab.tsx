import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PomodoroTabProps {
  pomoCompleted: number;
  onCompleteSession: () => void;
  showToast: (msg: string, type?: 'info' | 'error' | 'success') => void;
}

export const PomodoroTab: React.FC<PomodoroTabProps> = ({
  pomoCompleted,
  onCompleteSession,
  showToast
}) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSec = (mode === 'work' ? 25 : 5) * 60;
  const currentSec = minutes * 60 + seconds;
  const circumference = 276.46;
  const offset = circumference * (1 - currentSec / totalSec);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec === 0) {
            setMinutes((prevMin) => {
              if (prevMin === 0) {
                // Timer completed!
                setIsRunning(false);
                if (timerRef.current) clearInterval(timerRef.current);

                if (mode === 'work') {
                  onCompleteSession();
                  showToast('ポモドーロセッション完了！休憩しましょう。', 'success');
                } else {
                  showToast('休憩時間終了です！集中セッションを開始しましょう。', 'info');
                }
                return 0;
              }
              return prevMin - 1;
            });
            return 59;
          }
          return prevSec - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, onCompleteSession, showToast]);

  const handleModeChange = (newMode: 'work' | 'break') => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setMode(newMode);
    setMinutes(newMode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setMinutes(mode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  const minStr = String(minutes).padStart(2, '0');
  const secStr = String(seconds).padStart(2, '0');

  return (
    <section id="tab-pomodoro" className="space-y-6">
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-8">
        {/* Timer Mode Switcher */}
        <div className="flex justify-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-500">
          <button
            id="pomo-mode-work"
            onClick={() => handleModeChange('work')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'work'
                ? 'bg-white text-blue-600 shadow-sm font-bold'
                : 'hover:text-slate-800'
            }`}
          >
            集中 (25分)
          </button>
          <button
            id="pomo-mode-break"
            onClick={() => handleModeChange('break')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'break'
                ? 'bg-white text-blue-600 shadow-sm font-bold'
                : 'hover:text-slate-800'
            }`}
          >
            休憩 (5分)
          </button>
        </div>

        {/* Timer Circle Display */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="currentColor"
              strokeWidth="6"
              className="text-slate-100"
              fill="transparent"
            />
            <circle
              id="pomo-progress-circle"
              cx="50"
              cy="50"
              r="44"
              stroke="currentColor"
              strokeWidth="6"
              className="text-blue-600 transition-all duration-1000"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span
              id="pomo-display"
              className="text-5xl font-black tracking-tight text-slate-800 font-mono"
            >
              {minStr}:{secStr}
            </span>
            <span
              id="pomo-status-text"
              className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest"
            >
              {mode === 'work' ? 'Focus Session' : 'Short Break'}
            </span>
          </div>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex justify-center items-center space-x-4">
          <button
            id="pomo-toggle-btn"
            onClick={handleToggle}
            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform active:scale-95 cursor-pointer"
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 fill-white ml-0.5" />
            )}
          </button>
          <button
            id="pomo-reset-btn"
            onClick={handleReset}
            className="w-12 h-12 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-base flex items-center justify-center transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Pomodoro Stats */}
        <div className="pt-4 border-t border-slate-100 flex justify-around text-xs text-slate-500 font-semibold">
          <div>
            <span className="block text-slate-400">本日の完了</span>
            <span id="pomo-completed-count" className="text-lg font-bold text-slate-800">
              {pomoCompleted} 回
            </span>
          </div>
          <div className="border-r border-slate-100" />
          <div>
            <span className="block text-slate-400">集中時間</span>
            <span id="pomo-total-focus" className="text-lg font-bold text-slate-800">
              {pomoCompleted * 25} 分
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
