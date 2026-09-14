import React from 'react';
import { Check, Download, Boxes, PackageOpen, Plus, Sparkles } from 'lucide-react';
import { Deck, OfficialDeckPreset } from '../types';

interface OfficialDecksTabProps {
  decks: Deck[];
  officialDecks: OfficialDeckPreset[];
  onImportOfficialDeck: (preset: OfficialDeckPreset) => void;
  onOpenAddDeck: () => void;
}

export const OfficialDecksTab: React.FC<OfficialDecksTabProps> = ({
  decks,
  officialDecks,
  onImportOfficialDeck,
  onOpenAddDeck
}) => {
  return (
    <section id="tab-official" className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-2">
            Official Library
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            公式厳選デッキパック
          </h2>
          <p className="text-amber-100 text-sm">
            公式から配信される高品質なプリセット暗記カード集です。「マイデッキに追加」ボタンで自由に使用・編集できます。
          </p>
        </div>
      </div>

      {/* When no official decks exist (Initial state per user request) */}
      {officialDecks.length === 0 ? (
        <div
          id="official-decks-empty"
          className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-sm space-y-4 max-w-xl mx-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <PackageOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-slate-800">
              公開中の公式デッキパックはありません
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              現在は公式デッキパックが一つも配信されていないクリーンな状態です。
              オリジナルデッキを自分で新規作成して学習を始めましょう。
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAddDeck}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>マイデッキを新規作成</span>
            </button>
          </div>
        </div>
      ) : (
        /* Grid of official presets if any are published */
        <div id="official-deck-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {officialDecks.map((preset) => {
            const isAlreadyAdded = decks.some((d) => d.title === preset.title);
            return (
              <div
                key={preset.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      {preset.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {preset.cards.length} 問題
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">{preset.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{preset.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onImportOfficialDeck(preset)}
                  disabled={isAlreadyAdded}
                  className={`w-full py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    isAlreadyAdded
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 font-semibold cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20'
                  }`}
                >
                  {isAlreadyAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>追加済み</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>マイデッキに追加</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
