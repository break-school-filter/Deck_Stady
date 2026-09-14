import React, { useState } from 'react';
import { X, AlertTriangle, Lock, Key, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Deck } from '../types';

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

