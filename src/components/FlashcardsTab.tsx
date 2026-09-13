import React, { useState } from 'react';
import {
  Trash2,
  Eraser,
  Shuffle,
  Plus,
  RotateCw,
  CheckCircle2,
  X,
  Check
} from 'lucide-react';
import { Deck, Card } from '../types';

interface FlashcardsTabProps {
  decks: Deck[];
  currentDeckId: string | null;
  onSelectDeck: (deckId: string) => void;
  onOpenAddCard: () => void;
  onOpenDeleteDeck: (deckId: string) => void;
  onUpdateCardMastered: (deckId: string, cardId: string, mastered: boolean) => void;
  onDeleteCurrentCard: (deckId: string, cardId: string) => void;
  onShuffleDeck: (deckId: string) => void;
  showToast: (msg: string, type?: 'info' | 'error' | 'success') => void;
}

export const FlashcardsTab: React.FC<FlashcardsTabProps> = ({
  decks,
  currentDeckId,
  onSelectDeck,
  onOpenAddCard,
  onOpenDeleteDeck,
  onUpdateCardMastered,
  onDeleteCurrentCard,
  onShuffleDeck,
  showToast
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const currentDeck = decks.find((d) => d.id === currentDeckId) || decks[0] || null;
  const cards: Card[] = currentDeck ? currentDeck.cards : [];

  const safeIndex =
    cards.length > 0
      ? Math.min(Math.max(0, currentCardIndex), cards.length - 1)
      : 0;
  const currentCard = cards[safeIndex] || null;

  const handleFlip = () => {
    if (!currentCard) return;
    setIsFlipped(!isFlipped);
  };

  const handleRate = (mastered: boolean) => {
    if (!currentDeck || !currentCard) return;

    onUpdateCardMastered(currentDeck.id, currentCard.id, mastered);
    setIsFlipped(false);

    if (cards.length > 0) {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }
    showToast(mastered ? '覚えた！に分類しました' : '要復習に分類しました', 'info');
  };

  const handleDeleteCard = () => {
    if (!currentDeck || !currentCard) return;
    onDeleteCurrentCard(currentDeck.id, currentCard.id);
    setIsFlipped(false);
    if (safeIndex >= cards.length - 1) {
      setCurrentCardIndex(Math.max(0, cards.length - 2));
    }
  };

  const handleShuffle = () => {
    if (!currentDeck || cards.length <= 1) {
      showToast('シャッフルには2枚以上のカードが必要です', 'info');
      return;
    }
    onShuffleDeck(currentDeck.id);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    showToast('カードをシャッフルしました', 'info');
  };

  return (
    <section id="tab-cards" className="space-y-6">
      {/* Deck Selector & Actions Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-400 whitespace-nowrap">
            デッキ選択:
          </label>
          <select
            id="card-deck-select"
            value={currentDeck ? currentDeck.id : ''}
            onChange={(e) => {
              onSelectDeck(e.target.value);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            disabled={decks.length === 0}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 cursor-pointer disabled:opacity-50"
          >
            {decks.length === 0 ? (
              <option value="">デッキがありません</option>
            ) : (
              decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.title} ({deck.cards.length}枚)
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end flex-wrap gap-1">
          <button
            id="card-delete-deck-btn"
            onClick={() => currentDeck && onOpenDeleteDeck(currentDeck.id)}
            disabled={!currentDeck}
            className="px-3 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>デッキ削除</span>
          </button>
          <button
            id="card-delete-card-btn"
            onClick={handleDeleteCard}
            disabled={!currentCard}
            className="px-3 py-2 rounded-xl border border-amber-200 hover:bg-amber-50 text-amber-700 text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer disabled:opacity-50"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>カード削除</span>
          </button>
          <button
            id="card-shuffle-btn"
            onClick={handleShuffle}
            disabled={!currentDeck || cards.length <= 1}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer disabled:opacity-50"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>シャッフル</span>
          </button>
          <button
            id="card-add-btn"
            onClick={onOpenAddCard}
            className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center space-x-1 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>カードを追加</span>
          </button>
        </div>
      </div>

      {/* Card View Area */}
      <div id="flashcard-study-area" className="max-w-xl mx-auto space-y-6">
        {/* Progress Header */}
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 px-1">
          <span id="card-counter">
            カード {cards.length > 0 ? safeIndex + 1 : 0} / {cards.length}
          </span>
          <span
            id="card-status-badge"
            className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
              !currentCard
                ? 'bg-slate-100 text-slate-500'
                : currentCard.mastered
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {!currentCard ? 'なし' : currentCard.mastered ? '暗記済み' : '要復習'}
          </span>
        </div>

        {/* 3D Flip Card */}
        <div
          id="flashcard-click-area"
          className="perspective-1000 w-full h-80 cursor-pointer select-none"
          onClick={handleFlip}
        >
          <div
            id="flashcard-inner"
            className={`relative w-full h-full duration-500 transform-style-3d transition-transform shadow-xl rounded-3xl border border-slate-200/80 bg-white ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Face */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-8 flex flex-col justify-between bg-white">
              <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <span>Question / 質問</span>
                <RotateCw className="w-4 h-4 text-slate-300" />
              </div>
              <div className="my-auto text-center px-4">
                <h2
                  id="card-front-text"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-snug break-words"
                >
                  {currentCard
                    ? currentCard.front
                    : decks.length === 0
                    ? 'デッキがありません。まずはデッキを作成してください'
                    : 'カードがありません。右上の「カードを追加」から作成してください'}
                </h2>
              </div>
              <p className="text-center text-xs text-slate-400 font-medium">
                {currentCard ? 'タップして答えを表示' : ''}
              </p>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-indigo-950 text-white">
              <div className="flex justify-between items-center text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                <span>Answer / 解答</span>
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="my-auto text-center px-4">
                <h3
                  id="card-back-text"
                  className="text-xl sm:text-2xl font-bold text-white leading-relaxed break-words"
                >
                  {currentCard ? currentCard.back : '解答がここに表示されます'}
                </h3>
              </div>
              <p className="text-center text-xs text-indigo-300/60 font-medium">
                タップで質問に戻る
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            id="card-rate-review-btn"
            onClick={() => handleRate(false)}
            disabled={!currentCard}
            className="py-3.5 px-4 rounded-2xl border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
            <span>もう一度 (Review)</span>
          </button>
          <button
            id="card-rate-master-btn"
            onClick={() => handleRate(true)}
            disabled={!currentCard}
            className="py-3.5 px-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Check className="w-5 h-5" />
            <span>覚えた！ (Mastered)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
