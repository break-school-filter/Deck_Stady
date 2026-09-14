import { AppData, Deck, OfficialDeckPreset, RedSheetPresetKey } from '../types';

// Default empty list of official decks per user request (initially none)
export const OFFICIAL_DECKS_PRESETS: OfficialDeckPreset[] = [];

// Rich pool of diverse official original decks that can be generated/added
export const OFFICIAL_ORIGINAL_SAMPLE_POOL: OfficialDeckPreset[] = [
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
    description: 'テクノロジ系・マネジメント系の頻出キー概念',
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
    description: '高校・中学化学で頻出する元素記号と日本語名称',
    cards: [
      { id: 'off-10', front: 'Na (11)', back: 'ナトリウム (Sodium)', mastered: false },
      { id: 'off-11', front: 'K (19)', back: 'カリウム (Potassium)', mastered: false },
      { id: 'off-12', front: 'Fe (26)', back: '鉄 (Iron)', mastered: false },
      { id: 'off-13', front: 'Cu (29)', back: '銅 (Copper)', mastered: false },
      { id: 'off-14', front: 'Au (79)', back: '金 (Gold)', mastered: false }
    ]
  },
  {
    id: 'official-english-idioms',
    title: '日常英会話・ネイティブ頻出イディオム',
    category: '英語・英会話',
    description: '映画や日常会話で頻出する定番の慣用表現集',
    cards: [
      { id: 'off-15', front: 'Piece of cake', back: '朝飯前、とても簡単なこと', mastered: false },
      { id: 'off-16', front: 'Once in a blue moon', back: 'ごく稀に、めったにないこと', mastered: false },
      { id: 'off-17', front: 'Bite the bullet', back: '苦境に耐える、思い切って腹を括る', mastered: false },
      { id: 'off-18', front: 'Hit the sack', back: 'ベッドに入る、寝る', mastered: false },
      { id: 'off-19', front: 'Under the weather', back: '体調がすぐれない、風邪気味である', mastered: false }
    ]
  },
  {
    id: 'official-japan-history',
    title: '日本史・年号と重要歴史事件',
    category: '社会・日本史',
    description: '試験や常識として必ず押さえておきたい主要年号',
    cards: [
      { id: 'off-20', front: '794年', back: '平安京遷都（鳴くよウグイス平安京・桓武天皇）', mastered: false },
      { id: 'off-21', front: '1192年', back: '源頼朝が征夷大将軍就任（鎌倉幕府の確立）', mastered: false },
      { id: 'off-22', front: '1582年', back: '本能寺の変（明智光秀が織田信長を討つ）', mastered: false },
      { id: 'off-23', front: '1603年', back: '徳川家康が征夷大将軍に任ぜられ江戸幕府を開く', mastered: false },
      { id: 'off-24', front: '1868年', back: '明治維新（五箇条の御誓文・江戸を東京に改称）', mastered: false }
    ]
  },
  {
    id: 'official-web-tech',
    title: 'Webプログラミング・基礎略語集',
    category: 'テクノロジー',
    description: 'フロントエンド・バックエンドで必須の重要単語',
    cards: [
      { id: 'off-25', front: 'API', back: 'Application Programming Interface（ソフトウェア同士の連携規約）', mastered: false },
      { id: 'off-26', front: 'DOM', back: 'Document Object Model（HTML構造をツリー表現する仕組み）', mastered: false },
      { id: 'off-27', front: 'SSR', back: 'Server-Side Rendering（サーバー側でHTMLを生成して送信）', mastered: false },
      { id: 'off-28', front: 'SPA', back: 'Single Page Application（単一HTMLで高速遷移するWebアプリ）', mastered: false },
      { id: 'off-29', front: 'REST', back: 'Representational State Transfer（Webサービスの設計原則）', mastered: false }
    ]
  },
  {
    id: 'official-world-capitals',
    title: '世界地理・間違えやすい各国の首都',
    category: '社会・地理',
    description: '最大都市と混同しやすい各国の正式な首都',
    cards: [
      { id: 'off-30', front: 'オーストラリアの首都', back: 'キャンベラ (Canberra) ※シドニーではない', mastered: false },
      { id: 'off-31', front: 'カナダの首都', back: 'オタワ (Ottawa) ※トロントやバンクーバーではない', mastered: false },
      { id: 'off-32', front: 'ブラジルの首都', back: 'ブラジリア (Brasília) ※リオデジャネイロではない', mastered: false },
      { id: 'off-33', front: 'トルコの首都', back: 'アンカラ (Ankara) ※イスタンブールではない', mastered: false },
      { id: 'off-34', front: 'スイスの首都', back: 'ベルン (Bern) ※チューリッヒやジュネーヴではない', mastered: false }
    ]
  },
  {
    id: 'official-japanese-literature',
    title: '現代文・最頻出の評論文キーワード',
    category: '国語・現代文',
    description: '大学受験や小論文で問われる重要哲学・社会語彙',
    cards: [
      { id: 'off-35', front: '捨象（しゃしょう）', back: '物事の特定の側面に着目し、他の非本質的属性を切り捨てること', mastered: false },
      { id: 'off-36', front: 'パラダイム', back: '一時代の科学や思考を根本的に規定している支配的枠組み', mastered: false },
      { id: 'off-37', front: 'アイデンティティ', back: '自己同一性。自分が自分であり他者とは異なると確信する感覚', mastered: false },
      { id: 'off-38', front: '形而上学（けいじじょうがく）', back: '感覚できる物質世界を超えた、物事の根本原理や存在を探究する学問', mastered: false }
    ]
  },
  {
    id: 'official-business-economics',
    title: '経済・ビジネスニュース基本用語',
    category: 'ビジネス・経済',
    description: '新聞やビジネスの現場で頻出する指標と概念',
    cards: [
      { id: 'off-39', front: 'インフレーション', back: '物価が持続的に上昇し、貨幣価値が相対的に下落する現象', mastered: false },
      { id: 'off-40', front: 'ROE (自己資本利益率)', back: '株主から預かった自己資本を使ってどれだけ効率的に利益を上げたかを示す指標', mastered: false },
      { id: 'off-41', front: 'プライム市場', back: '東京証券取引所の最上位市場。グローバルな投資家との対話基準を設ける', mastered: false },
      { id: 'off-42', front: 'ポートフォリオ', back: '金融投資においてリスク分散のために保有する多様な資産の組み合わせ', mastered: false }
    ]
  }
];

// Helper to generate the next unique original official deck
export const generateNextOfficialDeck = (
  existingDecks: OfficialDeckPreset[]
): OfficialDeckPreset => {
  const existingTitles = new Set(existingDecks.map((d) => d.title));

  // 1. Find an unused preset from the pool
  const unusedPreset = OFFICIAL_ORIGINAL_SAMPLE_POOL.find(
    (preset) => !existingTitles.has(preset.title)
  );

  if (unusedPreset) {
    return {
      ...unusedPreset,
      id: `official-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      cards: unusedPreset.cards.map((c, i) => ({
        ...c,
        id: `off-${Date.now()}-${i}`
      }))
    };
  }

  // 2. If all predefined pool items are already added, dynamically create a brand new original pack
  const count = existingDecks.length + 1;
  const dynamicThemes = [
    { cat: '思考力・教養', topic: 'クリティカルシンキング基礎概念' },
    { cat: '科学・宇宙', topic: '天文学・太陽系惑星データ' },
    { cat: '言語・語彙', topic: '教養としての四字熟語マスター' },
    { cat: 'ヘルスケア', topic: '栄養学と主要ビタミンの役割' }
  ];
  const theme = dynamicThemes[count % dynamicThemes.length];

  return {
    id: `official-custom-${Date.now()}`,
    title: `公式オリジナル：${theme.topic} (Pack #${count})`,
    category: theme.cat,
    description: `公式が新しく生成・配信したオリジナル暗記学習パックです。`,
    cards: [
      {
        id: `off-dyn-${Date.now()}-1`,
        front: '第1問：基礎概念の定義',
        back: `${theme.topic}における最重要の基本原則と定義`,
        mastered: false
      },
      {
        id: `off-dyn-${Date.now()}-2`,
        front: '第2問：実践的な応用例',
        back: '日常生活や試験において頻出する具体的な活用法',
        mastered: false
      },
      {
        id: `off-dyn-${Date.now()}-3`,
        front: '第3問：混同しやすい注意点',
        back: '類似概念との相違点および注意すべきポイント',
        mastered: false
      }
    ]
  };
};

export const SAMPLE_OFFICIAL_DECKS_PRESETS: OfficialDeckPreset[] = OFFICIAL_ORIGINAL_SAMPLE_POOL.slice(0, 3);

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

