import React, { useState } from 'react';
import { X, AlertTriangle, Lock, Key, AlertCircle, Eye, EyeOff, Plus, Trash2, Sparkles } from 'lucide-react';
import { Deck, OfficialDeckPreset } from '../types';

interface AddDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDeck: (title: string, category: string) => void;
}

export const AddDeckModal: React.FC<AddDeckModalProps> = ({
  isOpen,
  onClose,
  onCreateDeck
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateDeck(title.trim(), category.trim() || '全般');
    setTitle('');
    setCategory('');
    onClose();
  };

  return (
    <div
      id="modal-add-deck"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">新規デッキの作成</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              デッキ名
            </label>
            <input
              type="text"
              id="new-deck-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 英単語 (TOEIC 800)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              カテゴリ/説明
            </label>
            <input
              type="text"
              id="new-deck-desc"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="例: 重要語彙100選"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm cursor-pointer hover:bg-slate-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm cursor-pointer disabled:opacity-50"
            >
              作成する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCard: (front: string, back: string) => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onCreateCard
}) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    onCreateCard(front.trim(), back.trim());
    setFront('');
    setBack('');
    onClose();
  };

  return (
    <div
      id="modal-add-card"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">
            新しい単語・カードの追加
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              表面 (質問 / 表面)
            </label>
            <input
              type="text"
              id="new-card-front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="例: Resilient"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              裏面 (解答 / 意味)
            </label>
            <input
              type="text"
              id="new-card-back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="例: 立ち直りが早い、回復力のある"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm cursor-pointer hover:bg-slate-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={!front.trim() || !back.trim()}
              className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm cursor-pointer disabled:opacity-50"
            >
              追加する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteDeckModalProps {
  isOpen: boolean;
  deck: Deck | null;
  onClose: () => void;
  onConfirmDelete: (deckId: string) => void;
}

export const DeleteDeckModal: React.FC<DeleteDeckModalProps> = ({
  isOpen,
  deck,
  onClose,
  onConfirmDelete
}) => {
  if (!isOpen || !deck) return null;

  return (
    <div
      id="modal-delete-deck"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6 text-center">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">デッキを削除しますか？</h3>
          <p className="text-xs text-slate-500 mt-1" id="delete-deck-name">
            「{deck.title}」と含まれる全カードを削除します。
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm cursor-pointer hover:bg-slate-50"
          >
            キャンセル
          </button>
          <button
            onClick={() => {
              onConfirmDelete(deck.id);
              onClose();
            }}
            className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm cursor-pointer"
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  );
};

interface AdminAuthModalProps {
  isOpen: boolean;
  adminPassword?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  adminPassword = 'shibaurafzk',
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (password === adminPassword) {
      setPassword('');
      setHasError(false);
      setShowPassword(false);
      onSuccess();
    } else {
      setHasError(true);
    }
  };

  const handleClose = () => {
    setPassword('');
    setHasError(false);
    setShowPassword(false);
    onClose();
  };

  return (
    <div
      id="modal-admin-auth"
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2 text-rose-600 font-bold">
            <Lock className="w-5 h-5" />
            <h3 className="text-base font-extrabold text-slate-800">管理者認証</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500">
          管理者パネルにアクセスするにはパスワードを入力してください。
        </p>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-600">
            管理者パスワード
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="admin-pass-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (hasError) setHasError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleVerify();
              }}
              placeholder="パスワードを入力"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              title={showPassword ? '非表示' : '表示'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {hasError && (
            <p
              id="admin-auth-error"
              className="text-xs font-bold text-rose-600 flex items-center space-x-1 pt-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>パスワードが正しくありません</span>
            </p>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleClose}
            className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm cursor-pointer hover:bg-slate-50"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleVerify}
            className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Key className="w-4 h-4" />
            <span>ログイン</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface CreateOfficialDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOfficialDeck: (preset: OfficialDeckPreset) => void;
}

export const CreateOfficialDeckModal: React.FC<CreateOfficialDeckModalProps> = ({
  isOpen,
  onClose,
  onCreateOfficialDeck
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<Array<{ front: string; back: string }>>([
    { front: '', back: '' },
    { front: '', back: '' }
  ]);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddCardRow = () => {
    setCards((prev) => [...prev, { front: '', back: '' }]);
  };

  const handleRemoveCardRow = (index: number) => {
    if (cards.length <= 1) return;
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCardChange = (index: number, field: 'front' | 'back', value: string) => {
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('公式パックのタイトルを入力してください');
      return;
    }

    const validCards = cards
      .map((c) => ({ front: c.front.trim(), back: c.back.trim() }))
      .filter((c) => c.front && c.back);

    if (validCards.length === 0) {
      setError('少なくとも1組以上の問題（表面）と解答（裏面）を入力してください');
      return;
    }

    const newPreset: OfficialDeckPreset = {
      id: `official-custom-${Date.now()}`,
      title: trimmedTitle,
      category: category.trim() || '公式オリジナル',
      description: description.trim() || '公式オリジナル作成パック',
      cards: validCards.map((c, idx) => ({
        id: `off-card-${Date.now()}-${idx}`,
        front: c.front,
        back: c.back,
        mastered: false
      }))
    };

    onCreateOfficialDeck(newPreset);
    setTitle('');
    setCategory('');
    setDescription('');
    setCards([
      { front: '', back: '' },
      { front: '', back: '' }
    ]);
    onClose();
  };

  const handleCloseModal = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setCards([
      { front: '', back: '' },
      { front: '', back: '' }
    ]);
    setError(null);
    onClose();
  };

  return (
    <div
      id="modal-create-official-deck"
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-black text-slate-800">
                公式オリジナルパックの新規作成
              </h3>
              <p className="text-xs text-slate-400">
                公式デッキライブラリに新規配信するオリジナル教材を作成
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              パックタイトル <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="official-pack-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: ビジネス交渉必須フレーズ、高校世界史年号"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                カテゴリー
              </label>
              <input
                type="text"
                id="official-pack-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="例: 英語資格、社会、IT"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                説明（概要）
              </label>
              <input
                type="text"
                id="official-pack-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="例: 初級から中級向け必須10選"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Cards input section */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700">
                収録問題カード ({cards.length}問)
              </label>
              <button
                type="button"
                onClick={handleAddCardRow}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>問題を追加</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto p-1">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 space-y-2 relative group"
                >
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span>カード #{idx + 1}</span>
                    {cards.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCardRow(idx)}
                        className="text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer"
                        title="カードを削除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        placeholder="表面（問題・単語）"
                        value={card.front}
                        onChange={(e) => handleCardChange(idx, 'front', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="裏面（解答・解説）"
                        value={card.back}
                        onChange={(e) => handleCardChange(idx, 'back', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex space-x-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="w-1/3 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>公式パックを公開配信</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

