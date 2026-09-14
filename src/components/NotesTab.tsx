import React, { useRef, useEffect } from 'react';
import {
  Highlighter,
  EyeOff,
  Paintbrush,
  Type,
  Bold,
  Check,
  Maximize2
} from 'lucide-react';
import { RedSheetPresetKey } from '../types';

interface NotesTabProps {
  notesHtml: string;
  onSaveNotes: (html: string) => void;
  isRedSheetActive: boolean;
  onToggleRedSheet: () => void;
  activePreset: RedSheetPresetKey | 'custom';
  onSelectPreset: (key: RedSheetPresetKey) => void;
  showToast: (msg: string, type?: 'info' | 'error' | 'success') => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({
  notesHtml,
  onSaveNotes,
  isRedSheetActive,
  onToggleRedSheet,
  activePreset,
  onSelectPreset,
  showToast
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize content inside editor only on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== notesHtml) {
      editorRef.current.innerHTML = notesHtml;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onSaveNotes(editorRef.current.innerHTML);
    }
  };

  const handleFormatText = (command: 'red' | 'black' | 'bold' | 'highlight') => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    if (command === 'bold') {
      document.execCommand('bold', false);
      handleInput();
      showToast('太字を設定/解除しました', 'info');
      return;
    }

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || selection.isCollapsed) {
      showToast('変更したい文字を選択してください', 'info');
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    if (command === 'red') {
      const span = document.createElement('span');
      span.className = 'red-text';
      span.style.color = '#ff0000';
      span.style.fontWeight = '700';
      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);
      selection.removeAllRanges();
      handleInput();
      showToast('赤文字化しました (赤シートで消えます)', 'success');
    } else if (command === 'black') {
      const textNode = document.createTextNode(selectedText);
      range.deleteContents();
      range.insertNode(textNode);
      selection.removeAllRanges();
      handleInput();
      showToast('通常文字に戻しました', 'info');
    } else if (command === 'highlight') {
      const mark = document.createElement('mark');
      mark.className = 'bg-amber-200 px-1 rounded';
      mark.textContent = selectedText;
      range.deleteContents();
      range.insertNode(mark);
      selection.removeAllRanges();
      handleInput();
      showToast('ハイライトマーカーを適用しました', 'info');
    }
  };

  const handleInsertSample = () => {
    const sampleHtml = `
      <h3 style="font-weight: bold; font-size: 1.1rem; margin-bottom: 0.5rem;">■ 日本史：鎌倉時代〜室町時代の重要語句</h3>
      <p style="margin-bottom: 0.5rem;">1185年に壇ノ浦の戦いで平氏が滅亡し、<span class="red-text" style="color: #ff0000; font-weight: 700;">源頼朝</span>が実権を握った。1192年に征夷大将軍に任ぜられ、鎌倉幕府が成立した。</p>
      <p style="margin-bottom: 0.5rem;">守護・地頭を全国に配置し、土地の給与・安堵を通じて<span class="red-text" style="color: #ff0000; font-weight: 700;">御家人</span>と主従関係を結んだ（御恩と奉公）。</p>
      <p style="margin-bottom: 0.5rem;">室町時代には、<span class="red-text" style="color: #ff0000; font-weight: 700;">足利義満</span>が京都の室町に幕府を移し、<span class="red-text" style="color: #ff0000; font-weight: 700;">金閣</span>（鹿苑寺）を建立して北山文化を開花させた。</p>
    `;
    if (editorRef.current) {
      editorRef.current.innerHTML = sampleHtml;
      onSaveNotes(sampleHtml);
      showToast('例文をノートに挿入しました', 'success');
    }
  };

  const presets: { key: RedSheetPresetKey; label: string }[] = [
    { key: 'line', label: '一行' },
    { key: 'sm', label: '小' },
    { key: 'md', label: '中' },
    { key: 'lg', label: '大' },
    { key: 'full', label: '全画面' }
  ];

  return (
    <section id="tab-notes" className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <Highlighter className="w-5 h-5 text-blue-600" />
              <span>暗記シートノート</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              赤色に指定した文字は、赤シートを重ねることで光学的に完全に隠れ、暗記テストが可能です。
            </p>
          </div>

          {/* Quick Sheet Toggle Button */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="btn-toggle-sheet"
              onClick={onToggleRedSheet}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                isRedSheetActive
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <EyeOff className="w-4 h-4 text-rose-500" />
              <span id="sheet-btn-text">
                赤シート: {isRedSheetActive ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Presets */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 border border-slate-200">
              <span className="px-1.5 text-[11px] text-slate-400">サイズ:</span>
              {presets.map(({ key, label }) => {
                const isSelected = activePreset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      onSelectPreset(key);
                      if (!isRedSheetActive) {
                        onToggleRedSheet();
                      }
                    }}
                    className={`px-2 py-0.5 rounded-md text-[11px] transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-sm text-blue-600 font-bold'
                        : 'hover:bg-white/80 text-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleFormatText('red')}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center space-x-1 transition-colors border border-rose-200 cursor-pointer"
            >
              <Paintbrush className="w-3.5 h-3.5" />
              <span>赤文字化 (隠す)</span>
            </button>
            <button
              type="button"
              onClick={() => handleFormatText('black')}
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold text-xs flex items-center space-x-1 border border-slate-200 cursor-pointer"
            >
              <Type className="w-3.5 h-3.5" />
              <span>通常文字</span>
            </button>
            <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />
            <button
              type="button"
              onClick={() => handleFormatText('bold')}
              className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center justify-center cursor-pointer"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText('highlight')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-xs border border-amber-200 flex items-center space-x-1 cursor-pointer"
            >
              <Highlighter className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleInsertSample}
              className="text-xs text-slate-400 hover:text-blue-600 underline cursor-pointer"
            >
              例文を挿入
            </button>
            <span
              id="note-save-indicator"
              className="text-xs text-slate-400 flex items-center space-x-1"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>自動保存済み</span>
            </span>
          </div>
        </div>

        {/* Note Editor Area */}
        <div className="space-y-2">
          <div
            id="note-editor"
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            placeholder="ここに暗記用ノートを入力してください。重要な語句を選択して「赤文字化」を押すと、赤シートを重ねた際に非表示にできます。"
            className="w-full min-h-[380px] max-h-[600px] p-6 bg-white border border-slate-200 rounded-2xl text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto leading-relaxed font-sans shadow-inner empty:before:content-[attr(placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};
