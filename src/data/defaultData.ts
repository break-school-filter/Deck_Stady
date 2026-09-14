import { AppData, Deck, OfficialDeckPreset, RedSheetPresetKey } from '../types';

// Default empty list of official decks per user request (initially none)
export const OFFICIAL_DECKS_PRESETS: OfficialDeckPreset[] = [];

// Optional sample packs for admin to broadcast if needed
export const SAMPLE_OFFICIAL_DECKS_PRESETS: OfficialDeckPreset[] = [
  {
    id: 'official-toeic-adv',
    title: 'TOEIC最頻出ハイスコア英単語',
    category: '英語資格',
    description: 'スコア800点〜900点突破に必要な厳選単語5選',
    cards: [
      { id: 'off-1', front: 'Scrutinize', back: '詳細に調査する、吟味する', mastered: false },
      { id: 'off-2', front: 'Reconcile', back: '和解させる、調和させる', mastered: false },
      { id: 'off-3', front: 'Consensus', back: '合意、意見の一致', mastered: false },
      { id: 'off-4', front: 'Meticulous', back: '細部まで行き届いた、細心な', mastered: false },
      { id: 'off-5', front: 'Formidable', back: '手強い、恐ろしい', mastered: false }
    ]
  },
  {
    id: 'official-fe-exam',
    title: '基本情報技術者・必須用語セット',
    category: 'IT・国家資格',
    description: 'テクノロジ系・マネジメント系用語集',
    cards: [
      { id: 'off-6', front: 'DMA (Direct Memory Access)', back: 'CPUを介さずにメモリと入出力装置間で直接データ転送する方式', mastered: false },
      { id: 'off-7', front: 'マルチパートメール', back: '1つのメール内にテキストや画像などの複数形式データをまとめる方式', mastered: false },
      { id: 'off-8', front: 'アジャイル開発', back: '小単位で実装とテストを繰り返し迅速に開発を進める手法', mastered: false },
      { id: 'off-9', front: 'デッドロック', back: '2つ以上のプロセスが互いに相手の資源確保を待って停止する状態', mastered: false }
    ]
  },
  {
    id: 'official-science-elements',
    title: '化学・周期表主要元素マスター',
    category: '理科・科学',
    description: '高校・中学化学で頻出する元素記号と名称',
    cards: [
      { id: 'off-10', front: 'Na (11)', back: 'ナトリウム (Sodium)', mastered: false },
      { id: 'off-11', front: 'K (19)', back: 'カリウム (Potassium)', mastered: false },
      { id: 'off-12', front: 'Fe (26)', back: '鉄 (Iron)', mastered: false },
      { id: 'off-13', front: 'Cu (29)', back: '銅 (Copper)', mastered: false },
      { id: 'off-14', front: 'Au (79)', back: '金 (Gold)', mastered: false }
    ]
  }
];

export const DEFAULT_DECKS: Deck[] = [];

export const DEFAULT_APP_DATA: AppData = {
  decks: [],
  officialDecks: [],
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
  line: { w: 360, h: 40 },
  sm: { w: 220, h: 140 },
  md: { w: 320, h: 180 },
  lg: { w: 450, h: 260 },
  full: { w: 650, h: 380 }
};

