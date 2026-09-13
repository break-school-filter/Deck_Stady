export interface Card {
  id: string;
  front: string;
  back: string;
  mastered: boolean;
}

export interface Deck {
  id: string;
  title: string;
  category: string;
  cards: Card[];
}

export interface AppStats {
  totalMinutes: number;
  streakDays: number;
  quizAccuracyTotal: number;
  quizAttempted: number;
  pomoCompleted: number;
  dailyActivity: number[];
}

export interface AppData {
  decks: Deck[];
  stats: AppStats;
  notesHtml: string;
}

export type TabType = 'dashboard' | 'cards' | 'quiz' | 'pomodoro' | 'notes';

export type RedSheetPresetKey = 'line' | 'sm' | 'md' | 'lg' | 'full';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'error' | 'success';
}

export interface QuizQuestion {
  question: string;
  correct: string;
  choices: string[];
}
