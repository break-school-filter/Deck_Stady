import React, { useState } from 'react';
import {
  ShieldCheck,
  LogOut,
  Database,
  Zap,
  Plus,
  RotateCcw,
  KeyRound,
  CheckCircle,
  Boxes,
  Trash2,
  Download,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  Lock
} from 'lucide-react';
import { Deck, OfficialDeckPreset } from '../types';

interface AdminTabProps {
  decks: Deck[];
  officialDecks: OfficialDeckPreset[];
  notesHtml: string;
  adminPassword: string;
  onLogoutAdmin: () => void;
  onOpenAddDeck: () => void;
  onResetAppToDefault: () => void;
  onLoadSampleOfficialDecks: () => void;
  onClearOfficialDecks: () => void;
  onChangeAdminPassword: (newPassword: string) => void;
  onResetAdminPassword: () => void;
}

export const AdminTab: React.FC<AdminTabProps> = ({
  decks,
  officialDecks,
  notesHtml,
  adminPassword,
  onLogoutAdmin,
  onOpenAddDeck,
  onResetAppToDefault,
  onLoadSampleOfficialDecks,
  onClearOfficialDecks,
  onChangeAdminPassword,
  onResetAdminPassword
}) => {
  const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0);
  const noteTextLength = notesHtml.replace(/<[^>]*>/g, '').trim().length;

  // Password change form state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const isDefaultPassword = adminPassword === 'shibaurafzk';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    const trimmed = newPassword.trim();
    if (!trimmed) {
      setPasswordError('新しいパスワードを入力してください');
      return;
    }
    if (trimmed.length < 4) {
      setPasswordError('パスワードは4文字以上で設定してください');
      return;
    }
    if (trimmed !== confirmPassword.trim()) {
      setPasswordError('確認用パスワードと一致しません');
      return;
    }

    onChangeAdminPassword(trimmed);
    setNewPassword('');
    setConfirmPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setPasswordSuccess('管理者パスワードを正常に変更しました');

    setTimeout(() => {
      setPasswordSuccess(null);
    }, 4000);
  };

  const handleResetPassword = () => {
    if (window.confirm('管理者パスワードを初期パスワード「shibaurafzk」にリセットしますか？')) {
      onResetAdminPassword();
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError(null);
      setPasswordSuccess('初期パスワードにリセットしました');
      setTimeout(() => {
        setPasswordSuccess(null);
      }, 4000);
    }
  };

  return (
    <section id="tab-admin" className="space-y-6">
      {/* Header card */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>System Administration</span>
          </div>
          <h2 className="text-2xl font-black">管理者管理パネル</h2>
          <p className="text-slate-400 text-xs mt-1">
            認証済み管理者モードでログイン中 (パスワード保護エリア)
          </p>
        </div>
        <button
          type="button"
          onClick={onLogoutAdmin}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors flex items-center space-x-1.5 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>管理者ログアウト</span>
        </button>
      </div>

      {/* Admin Action Cards Grid (2x2 layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Data Overview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center space-x-2">
            <Database className="w-4 h-4 text-blue-600" />
            <span>システムデータ状態</span>
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">マイデッキ総数:</span>
              <span className="font-bold text-slate-800" id="admin-stat-decks">
                {decks.length} 件
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">公開公式デッキパック:</span>
              <span
                className={`font-bold ${
                  officialDecks.length === 0 ? 'text-amber-600' : 'text-emerald-600'
                }`}
                id="admin-stat-official"
              >
                {officialDecks.length} 件 (初期0件設定)
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">登録カード総数:</span>
              <span className="font-bold text-slate-800" id="admin-stat-cards">
                {totalCards} 枚
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">暗記シート文字数:</span>
              <span className="font-bold text-slate-800" id="admin-stat-notes">
                {noteTextLength} 文字
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">パスワード設定状況:</span>
              <span
                className={`font-bold text-xs ${
                  isDefaultPassword ? 'text-slate-500' : 'text-emerald-600'
                }`}
              >
                {isDefaultPassword ? '初期パスワード (shibaurafzk)' : 'カスタム設定済み'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Admin Password Management */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center space-x-2">
              <KeyRound className="w-4 h-4 text-rose-600" />
              <span>管理者パスワード変更</span>
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isDefaultPassword
                  ? 'bg-slate-100 text-slate-600'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {isDefaultPassword ? '初期値' : 'カスタム'}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            次回以降の管理者パネルログイン時に使用するパスワードを更新します。
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                新しいパスワード (4文字以上)
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="admin-new-password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (passwordError) setPasswordError(null);
                  }}
                  placeholder="新しいパスワードを入力"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title={showNewPassword ? '非表示' : '表示'}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                新しいパスワード (確認)
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="admin-confirm-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (passwordError) setPasswordError(null);
                  }}
                  placeholder="同じパスワードを再入力"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title={showConfirmPassword ? '非表示' : '表示'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {passwordError && (
              <p className="text-xs font-bold text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{passwordError}</span>
              </p>
            )}

            {passwordSuccess && (
              <p className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{passwordSuccess}</span>
              </p>
            )}

            <div className="flex items-center space-x-2 pt-1">
              <button
                type="submit"
                disabled={!newPassword.trim() || !confirmPassword.trim()}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>パスワードを更新</span>
              </button>

              {!isDefaultPassword && (
                <button
                  type="button"
                  onClick={handleResetPassword}
                  title="初期値「shibaurafzk」にリセット"
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                >
                  初期化
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 3. Official Decks Distribution Control */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center space-x-2">
            <Boxes className="w-4 h-4 text-amber-500" />
            <span>公式デッキパック配信管理</span>
          </h3>
          <p className="text-xs text-slate-500">
            初期状態ではユーザー向けに公式パックは一切配信されていません。必要に応じて配信や削除を行えます。
          </p>
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={onLoadSampleOfficialDecks}
              className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>公式サンプルパックを配信 (3件)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('公開中の公式デッキパックをすべて削除（0件）にしますか？')) {
                  onClearOfficialDecks();
                }
              }}
              disabled={officialDecks.length === 0}
              className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer ${
                officialDecks.length === 0
                  ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>公式パックを全消去 (0件に戻す)</span>
            </button>
          </div>
        </div>

        {/* 4. Admin App Actions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>システム操作</span>
          </h3>
          <p className="text-xs text-slate-500">
            通常デッキの作成や、全データを初期未作成状態にリセットします。
          </p>
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={onOpenAddDeck}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>新規デッキ作成</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    'アプリデータを初期（未作成・公式デッキ0件）状態にリセットしますか？この操作は取り消せません。'
                  )
                ) {
                  onResetAppToDefault();
                }
              }}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>全データを完全初期化 (0件)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
