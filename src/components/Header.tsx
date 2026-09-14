import React from 'react';
import {
  GraduationCap,
  PieChart,
  Layers,
  HelpCircle,
  Timer,
  Highlighter,
  Boxes,
  ShieldCheck,
  Flame,
  Clock
} from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  streakDays: number;
  totalMinutes: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  streakDays,
  totalMinutes
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand */}
          <div
            id="app-logo-btn"
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => onSelectTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                DeckStudy
              </span>
              <span className="hidden sm:inline-block text-xs text-slate-400 ml-2 font-medium px-2 py-0.5 bg-slate-100 rounded-full">
                v2.6
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex space-x-1 bg-slate-100/80 p-1 rounded-xl text-sm font-medium">
            <button
              onClick={() => onSelectTab('dashboard')}
              id="nav-dashboard"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'text-blue-600 bg-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>ダッシュボード</span>
            </button>
            <button
              onClick={() => onSelectTab('cards')}
              id="nav-cards"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'cards'
                  ? 'text-blue-600 bg-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>暗記カード</span>
            </button>
            <button
              onClick={() => onSelectTab('quiz')}
              id="nav-quiz"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'quiz'
                  ? 'text-blue-600 bg-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>クイズ</span>
            </button>
            <button
              onClick={() => onSelectTab('pomodoro')}
              id="nav-pomodoro"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'pomodoro'
                  ? 'text-blue-600 bg-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>ポモドーロ</span>
            </button>
            <button
              onClick={() => onSelectTab('notes')}
              id="nav-notes"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'notes'
                  ? 'text-blue-600 bg-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Highlighter className="w-4 h-4" />
              <span>暗記シート</span>
            </button>
            <button
              onClick={() => onSelectTab('official')}
              id="nav-official"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'official'
                  ? 'text-blue-600 bg-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>公式デッキパック</span>
            </button>
            <button
              onClick={() => onSelectTab('admin')}
              id="nav-admin"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200/60 cursor-pointer ${
                currentTab === 'admin' ? 'bg-rose-50 font-bold shadow-sm' : ''
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>管理者パネル</span>
            </button>
          </nav>

          {/* Stats Summary Header Widget */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-200/60">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span id="header-streak">{streakDays}日連続</span>
            </div>
            <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-200/60">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span id="header-time">{totalMinutes}分</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (7 columns) */}
      <div className="md:hidden border-t border-slate-200 bg-white grid grid-cols-7 text-center text-[10px] text-slate-500 overflow-x-auto">
        <button
          onClick={() => onSelectTab('dashboard')}
          id="mobile-nav-dashboard"
          className={`py-2 flex flex-col items-center justify-center cursor-pointer ${
            currentTab === 'dashboard' ? 'text-blue-600 font-semibold' : ''
          }`}
        >
          <PieChart className="w-4 h-4 mb-0.5" />
          <span>概要</span>
        </button>
        <button
          onClick={() => onSelectTab('cards')}
          id="mobile-nav-cards"
          className={`py-2 flex flex-col items-center justify-center cursor-pointer ${
            currentTab === 'cards' ? 'text-blue-600 font-semibold' : ''
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>カード</span>
        </button>
        <button
          onClick={() => onSelectTab('quiz')}
          id="mobile-nav-quiz"
          className={`py-2 flex flex-col items-center justify-center cursor-pointer ${
            currentTab === 'quiz' ? 'text-blue-600 font-semibold' : ''
          }`}
        >
          <HelpCircle className="w-4 h-4 mb-0.5" />
          <span>テスト</span>
        </button>
        <button
          onClick={() => onSelectTab('pomodoro')}
          id="mobile-nav-pomodoro"
          className={`py-2 flex flex-col items-center justify-center cursor-pointer ${
            currentTab === 'pomodoro' ? 'text-blue-600 font-semibold' : ''
          }`}
        >
          <Timer className="w-4 h-4 mb-0.5" />
          <span>集中</span>
        </button>
        <button
          onClick={() => onSelectTab('notes')}
          id="mobile-nav-notes"
          className={`py-2 flex flex-col items-center justify-center cursor-pointer ${
            currentTab === 'notes' ? 'text-blue-600 font-semibold' : ''
          }`}
        >
          <Highlighter className="w-4 h-4 mb-0.5" />
          <span>シート</span>
        </button>
        <button
          onClick={() => onSelectTab('official')}
          id="mobile-nav-official"
          className={`py-2 flex flex-col items-center justify-center cursor-pointer ${
            currentTab === 'official' ? 'text-blue-600 font-semibold' : ''
          }`}
        >
          <Boxes className="w-4 h-4 mb-0.5" />
          <span>公式</span>
        </button>
        <button
          onClick={() => onSelectTab('admin')}
          id="mobile-nav-admin"
          className={`py-2 flex flex-col items-center justify-center text-rose-600 cursor-pointer ${
            currentTab === 'admin' ? 'font-bold' : ''
          }`}
        >
          <ShieldCheck className="w-4 h-4 mb-0.5" />
          <span>管理</span>
        </button>
      </div>
    </header>
  );
};
