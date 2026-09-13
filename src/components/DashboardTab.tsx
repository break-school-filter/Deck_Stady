import React from 'react';
import {
  Brain,
  Play,
  Plus,
  CheckCheck,
  Target,
  Zap,
  Clock,
  BookOpen,
  LineChart,
  FolderOpen
} from 'lucide-react';
import { Deck, AppStats } from '../types';

interface DashboardTabProps {
  decks: Deck[];
  stats: AppStats;
  onStartStudy: (deckId?: string) => void;
  onOpenAddDeck: () => void;
  onResetData?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  decks,
  stats,
  onStartStudy,
  onOpenAddDeck,
  onResetData
}) => {
  const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0);
  const totalMastered = decks.reduce(
    (acc, d) => acc + d.cards.filter((c) => c.mastered).length,
    0
  );
  const goalPercentage =
    totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0;

  const maxActivity = Math.max(...stats.dailyActivity, 1);
  const weekDays = ['月', '火', '水', '木', '金', '土', '日'];

  return (
    <section id="tab-dashboard" className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <Brain className="w-56 h-56" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-3">
            Today's Goal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            おかえりなさい！効率的に学習を進めましょう。
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mb-6">
            暗記カードやクイズで知識を定着させましょう。新機能の赤シートノートも活用できます。
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              id="dashboard-start-study-btn"
              onClick={() => {
                if (decks.length === 0) {
                  onOpenAddDeck();
                } else {
                  onStartStudy();
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition-colors shadow-md flex items-center space-x-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-blue-700" />
              <span>{decks.length === 0 ? '最初のデッキを作成' : '学習を開始する'}</span>
            </button>
            <button
              id="dashboard-add-deck-btn"
              onClick={onOpenAddDeck}
              className="px-5 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold backdrop-blur-md transition-colors flex items-center space-x-2 text-sm border border-white/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>新しいデッキ作成</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">暗記済みカード</p>
            <h3 className="text-2xl font-bold text-slate-800" id="stat-mastered">
              {totalMastered}{' '}
              <span className="text-xs font-normal text-slate-400">
                / {totalCards} 枚
              </span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">クイズ平均正解率</p>
            <h3 className="text-2xl font-bold text-slate-800" id="stat-quiz-acc">
              {stats.quizAccuracyTotal}%
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">学習ストリーク</p>
            <h3 className="text-2xl font-bold text-slate-800" id="stat-streak">
              {stats.streakDays}{' '}
              <span className="text-xs font-normal text-slate-400">日</span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">総学習時間</p>
            <h3 className="text-2xl font-bold text-slate-800" id="stat-total-time">
              {stats.totalMinutes}{' '}
              <span className="text-xs font-normal text-slate-400">分</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Area: Decks & Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Decks Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>マイ学習デッキ</span>
            </h2>
            <button
              id="deck-add-btn-dash"
              onClick={onOpenAddDeck}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新規追加</span>
            </button>
          </div>

          <div id="deck-list-container" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {decks.length === 0 ? (
              <div className="col-span-2 text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300">
                <FolderOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-500">デッキがありません</p>
                <p className="text-xs text-slate-400 mt-1">
                  「新規追加」ボタンからデッキを作成してください。
                </p>
              </div>
            ) : (
              decks.map((deck) => {
                const masteredCount = deck.cards.filter((c) => c.mastered).length;
                const percent =
                  deck.cards.length > 0
                    ? Math.round((masteredCount / deck.cards.length) * 100)
                    : 0;

                return (
                  <div
                    key={deck.id}
                    id={`deck-card-${deck.id}`}
                    className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {deck.category || '全般'}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {deck.cards.length} 枚
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-base mt-2">
                        {deck.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-500 font-medium">
                        <span>習熟度</span>
                        <span className="font-bold text-slate-700">{percent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex space-x-2">
                      <button
                        onClick={() => onStartStudy(deck.id)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>暗記開始</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Learning Analytics */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <LineChart className="w-5 h-5 text-blue-600" />
            <span>習熟度アクティビティ</span>
          </h2>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <p className="text-xs text-slate-500">直近7日間の学習カード枚数</p>
            <div
              className="h-44 w-full flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-100"
              id="chart-bars"
            >
              {stats.dailyActivity.map((val, idx) => {
                const heightPct =
                  val > 0 ? Math.max(12, Math.round((val / maxActivity) * 100)) : 4;
                return (
                  <div
                    key={idx}
                    className="w-full flex flex-col items-center group relative h-full justify-end"
                  >
                    <div
                      className={`w-full rounded-t-md transition-colors ${
                        val > 0
                          ? 'bg-blue-200 group-hover:bg-blue-600'
                          : 'bg-slate-100'
                      }`}
                      style={{ height: `${heightPct}%` }}
                      title={`${weekDays[idx]}: ${val}枚`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
              {weekDays.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">目標達成率 (習得済)</span>
              <span className="font-bold text-emerald-600" id="goal-percentage">
                {goalPercentage}%
              </span>
            </div>
          </div>

          {onResetData && (
            <div className="text-right">
              <button
                type="button"
                id="reset-all-data-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      '学習記録や作成したカードをすべてリセット（初期化）しますか？'
                    )
                  ) {
                    onResetData();
                  }
                }}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors underline cursor-pointer"
              >
                学習データを初期化する
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
