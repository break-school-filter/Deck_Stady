import React, { useState, useEffect, useCallback } from 'react';
import {
  AppData,
  TabType,
  RedSheetPresetKey,
  ToastItem,
  Deck
} from './types';
import {
  DEFAULT_APP_DATA,
  RED_SHEET_PRESETS
} from './data/defaultData';
import { Header } from './components/Header';
import { DashboardTab } from './components/DashboardTab';
import { FlashcardsTab } from './components/FlashcardsTab';
import { QuizTab } from './components/QuizTab';
import { PomodoroTab } from './components/PomodoroTab';
import { NotesTab } from './components/NotesTab';
import { RedSheetOverlay } from './components/RedSheetOverlay';
import {
  AddDeckModal,
  AddCardModal,
  DeleteDeckModal
} from './components/Modals';
import { Toast } from './components/Toast';

const STORAGE_KEY = 'deckstudy_data_v3';

export default function App() {
  // Load initial app data from localStorage
  const [appData, setAppData] = useState<AppData>(() => {
    try {
      // Clear legacy storage keys if present
      localStorage.removeItem('deckstudy_data_v2');
      localStorage.removeItem('deckstudy_data_v1');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.decks !== undefined && parsed.stats !== undefined) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_APP_DATA;
  });

  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [currentDeckId, setCurrentDeckId] = useState<string | null>(() => {
    return appData.decks.length > 0 ? appData.decks[0].id : null;
  });

  // Red sheet state
  const [isRedSheetActive, setIsRedSheetActive] = useState<boolean>(false);
  const [redSheetSize, setRedSheetSize] = useState<{ w: number; h: number }>({
    w: RED_SHEET_PRESETS.md.w,
    h: RED_SHEET_PRESETS.md.h
  });
  const [activePreset, setActivePreset] = useState<RedSheetPresetKey | 'custom'>('md');

  // Modal states
  const [isAddDeckOpen, setIsAddDeckOpen] = useState<boolean>(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState<boolean>(false);
  const [deckToDelete, setDeckToDelete] = useState<Deck | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, type: 'info' | 'error' | 'success' = 'info') => {
      const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  // Persist appData to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    } catch {
      // storage full or disabled
    }
  }, [appData]);

  // If currentDeckId is no longer in decks, reset it
  useEffect(() => {
    if (appData.decks.length > 0) {
      if (!currentDeckId || !appData.decks.some((d) => d.id === currentDeckId)) {
        setCurrentDeckId(appData.decks[0].id);
      }
    } else {
      setCurrentDeckId(null);
    }
  }, [appData.decks, currentDeckId]);

  // Handlers
  const handleStartStudy = (deckId?: string) => {
    if (deckId) {
      setCurrentDeckId(deckId);
    } else if (appData.decks.length > 0) {
      setCurrentDeckId(appData.decks[0].id);
    }
    setCurrentTab('cards');
  };

  const handleUpdateCardMastered = (
    deckId: string,
    cardId: string,
    mastered: boolean
  ) => {
    setAppData((prev) => {
      const updatedDecks = prev.decks.map((d) => {
        if (d.id !== deckId) return d;
        return {
          ...d,
          cards: d.cards.map((c) => (c.id === cardId ? { ...c, mastered } : c))
        };
      });

      // Update today's activity count and streak if 0
      const activity = [...prev.stats.dailyActivity];
      if (activity.length > 0) {
        activity[activity.length - 1] = (activity[activity.length - 1] || 0) + 1;
      }
      const streakDays = prev.stats.streakDays === 0 ? 1 : prev.stats.streakDays;

      return {
        ...prev,
        decks: updatedDecks,
        stats: {
          ...prev.stats,
          streakDays,
          dailyActivity: activity
        }
      };
    });
  };

  const handleDeleteCurrentCard = (deckId: string, cardId: string) => {
    setAppData((prev) => ({
      ...prev,
      decks: prev.decks.map((d) => {
        if (d.id !== deckId) return d;
        return {
          ...d,
          cards: d.cards.filter((c) => c.id !== cardId)
        };
      })
    }));
    showToast('カードを削除しました', 'info');
  };

  const handleShuffleDeck = (deckId: string) => {
    setAppData((prev) => ({
      ...prev,
      decks: prev.decks.map((d) => {
        if (d.id !== deckId) return d;
        const shuffled = [...d.cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return {
          ...d,
          cards: shuffled
        };
      })
    }));
  };

  const handleCreateDeck = (title: string, category: string) => {
    const newDeck: Deck = {
      id: 'deck-' + Date.now(),
      title,
      category,
      cards: []
    };
    setAppData((prev) => ({
      ...prev,
      decks: [...prev.decks, newDeck]
    }));
    setCurrentDeckId(newDeck.id);
    showToast('新しいデッキを作成しました', 'success');
  };

  const handleCreateCard = (front: string, back: string) => {
    if (!currentDeckId) {
      showToast('先にデッキを選択してください', 'error');
      return;
    }
    const newCard = {
      id: 'c-' + Date.now(),
      front,
      back,
      mastered: false
    };
    setAppData((prev) => ({
      ...prev,
      decks: prev.decks.map((d) => {
        if (d.id !== currentDeckId) return d;
        return {
          ...d,
          cards: [...d.cards, newCard]
        };
      })
    }));
    showToast('カードを追加しました', 'success');
  };

  const handleConfirmDeleteDeck = (deckId: string) => {
    setAppData((prev) => ({
      ...prev,
      decks: prev.decks.filter((d) => d.id !== deckId)
    }));
    showToast('デッキを削除しました', 'info');
  };

  const handleFinishQuiz = (accuracy: number) => {
    setAppData((prev) => {
      const newAttempted = prev.stats.quizAttempted + 1;
      const newAcc = Math.round(
        (prev.stats.quizAccuracyTotal * prev.stats.quizAttempted + accuracy) /
          newAttempted
      );
      const streakDays = prev.stats.streakDays === 0 ? 1 : prev.stats.streakDays;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          quizAccuracyTotal: newAcc,
          quizAttempted: newAttempted,
          streakDays
        }
      };
    });
  };

  const handleCompletePomodoroSession = () => {
    setAppData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        pomoCompleted: prev.stats.pomoCompleted + 1,
        totalMinutes: prev.stats.totalMinutes + 25,
        streakDays: prev.stats.streakDays === 0 ? 1 : prev.stats.streakDays
      }
    }));
  };

  const handleResetData = () => {
    setAppData(DEFAULT_APP_DATA);
    setCurrentDeckId(null);
    localStorage.removeItem(STORAGE_KEY);
    showToast('学習データを初期化しました', 'info');
  };

  const handleSaveNotes = (html: string) => {
    setAppData((prev) => ({
      ...prev,
      notesHtml: html
    }));
  };

  const handleToggleRedSheet = () => {
    setIsRedSheetActive((prev) => {
      const next = !prev;
      showToast(
        next
          ? '赤シートをオンにしました。マウスを動かして赤文字を隠せます！'
          : '赤シートをオフにしました',
        'info'
      );
      return next;
    });
  };

  const handleSelectPreset = (key: RedSheetPresetKey) => {
    const p = RED_SHEET_PRESETS[key];
    if (!p) return;
    setRedSheetSize({ w: p.w, h: p.h });
    setActivePreset(key);
  };

  const handleCustomResize = (w: number, h: number) => {
    setRedSheetSize({ w, h });
    setActivePreset('custom');
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* App Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        streakDays={appData.stats.streakDays}
        totalMinutes={appData.stats.totalMinutes}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && (
          <DashboardTab
            decks={appData.decks}
            stats={appData.stats}
            onStartStudy={handleStartStudy}
            onOpenAddDeck={() => setIsAddDeckOpen(true)}
            onResetData={handleResetData}
          />
        )}

        {currentTab === 'cards' && (
          <FlashcardsTab
            decks={appData.decks}
            currentDeckId={currentDeckId}
            onSelectDeck={setCurrentDeckId}
            onOpenAddCard={() => setIsAddCardOpen(true)}
            onOpenDeleteDeck={(id) => {
              const deck = appData.decks.find((d) => d.id === id) || null;
              setDeckToDelete(deck);
            }}
            onUpdateCardMastered={handleUpdateCardMastered}
            onDeleteCurrentCard={handleDeleteCurrentCard}
            onShuffleDeck={handleShuffleDeck}
            showToast={showToast}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizTab
            decks={appData.decks}
            onFinishQuiz={handleFinishQuiz}
            showToast={showToast}
          />
        )}

        {currentTab === 'pomodoro' && (
          <PomodoroTab
            pomoCompleted={appData.stats.pomoCompleted}
            onCompleteSession={handleCompletePomodoroSession}
            showToast={showToast}
          />
        )}

        {currentTab === 'notes' && (
          <NotesTab
            notesHtml={appData.notesHtml}
            onSaveNotes={handleSaveNotes}
            isRedSheetActive={isRedSheetActive}
            onToggleRedSheet={handleToggleRedSheet}
            redSheetSize={redSheetSize}
            activePreset={activePreset}
            onSelectPreset={handleSelectPreset}
            onCustomResize={handleCustomResize}
            showToast={showToast}
          />
        )}
      </main>

      {/* Red Sheet Mouse Follower Overlay */}
      <RedSheetOverlay isActive={isRedSheetActive} size={redSheetSize} />

      {/* Modals */}
      <AddDeckModal
        isOpen={isAddDeckOpen}
        onClose={() => setIsAddDeckOpen(false)}
        onCreateDeck={handleCreateDeck}
      />

      <AddCardModal
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        onCreateCard={handleCreateCard}
      />

      <DeleteDeckModal
        isOpen={deckToDelete !== null}
        deck={deckToDelete}
        onClose={() => setDeckToDelete(null)}
        onConfirmDelete={handleConfirmDeleteDeck}
      />

      {/* Toasts */}
      <Toast toasts={toasts} />
    </div>
  );
}
