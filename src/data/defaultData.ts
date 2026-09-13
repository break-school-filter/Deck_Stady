import { AppData, Deck, RedSheetPresetKey } from '../types';

export const DEFAULT_DECKS: Deck[] = [];

export const DEFAULT_APP_DATA: AppData = {
  decks: [],
  stats: {
    totalMinutes: 0,
    streakDays: 0,
    quizAccuracyTotal: 0,
    quizAttempted: 0,
    pomoCompleted: 0,
    dailyActivity: [0, 0, 0, 0, 0, 0, 0]
  },
  notesHtml: ''
};

export const RED_SHEET_PRESETS: Record<RedSheetPresetKey, { w: number; h: number }> = {
  line: { w: 600, h: 36 },
  sm: { w: 220, h: 120 },
  md: { w: 320, h: 180 },
  lg: { w: 480, h: 260 },
  full: { w: 750, h: 420 }
};
