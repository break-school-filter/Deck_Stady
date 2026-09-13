import React from 'react';
import {
  GraduationCap,
  PieChart,
  Layers,
  HelpCircle,
  Timer,
  Highlighter,
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
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'ダッシュボード', icon: <PieChart className="w-4 h-4" /> },
    { id: 'cards', label: '暗記カード', icon: <Layers className="w-4 h-4" /> },
    { id: 'quiz', label: 'クイズ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'pomodoro', label: 'ポモドーロ', icon: <Timer className="w-4 h-4" /> },
    { id: 'notes', label: '暗記シート', icon: <Highlighter className="w-4 h-4" /> }
  ];

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo & Brand */}
            <div
              id="app-logo-btn"
              className="flex items-center space-x-3 cursor-pointer"
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
              {tabs.map((tab) => {
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`nav-${tab.id}`}
                    onClick={() => onSelectTab(tab.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                      isActive
                        ? 'text-blue-600 bg-white shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Stats Summary Header Widget */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-200/60">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span id="header-streak">{streakDays}日連続</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-200/60">
                <Clock className="w-4 h-4 text-blue-500" />
                <span id="header-time">{totalMinutes}分</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Top Navigation */}
        <div className="md:hidden border-t border-slate-200 bg-white grid grid-cols-5 text-center text-xs text-slate-500">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`mobile-nav-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`py-2.5 flex flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-500'
                }`}
              >
                <div className="text-lg mb-0.5">{tab.icon}</div>
                <span className="text-[11px]">{tab.label.slice(0, 4)}</span>
              </button>
            );
          })}
        </div>
      </header>
    </>
  );
};
