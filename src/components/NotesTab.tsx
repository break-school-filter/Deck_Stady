import React, { useRef, useEffect } from 'react';
import {
  Highlighter,
  Sliders,
  Eraser,
  Type,
  Maximize2
} from 'lucide-react';
import { RedSheetPresetKey } from '../types';
import { RED_SHEET_PRESETS } from '../data/defaultData';

interface NotesTabProps {
  notesHtml: string;
  onSaveNotes: (html: string) => void;
  isRedSheetActive: boolean;
  onToggleRedSheet: () => void;
  redSheetSize: { w: number; h: number };
  activePreset: RedSheetPresetKey | 'custom';
  onSelectPreset: (key: RedSheetPresetKey) => void;
  onCustomResize: (w: number, h: number) => void;
  showToast: (msg: string, type?: 'info' | 'error' | 'success') => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({
  notesHtml,
  onSaveNotes,
  isRedSheetActive,
  onToggleRedSheet,
  redSheetSize,
  activePreset,
  onSelectPreset,
  onCustomResize,
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

  const handleFormatText = (color: 'red' | 'black') => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || selection.isCollapsed) {
      showToast('変更したい文字を選択してください', 'info');
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const span = document.createElement('span');
    if (color === 'red') {
      span.className = 'red-text';
      span.style.color = '#ff0000';
      span.style.fontWeight = '700';
    } else {
      span.style.color = '#1e293b';
      span.style.fontWeight = 'normal';
    }
    span.textContent = selectedText;

    range.deleteContents();
    range.insertNode(span);

    selection.removeAllRanges();
    handleInput();
    showToast(color === 'red' ? '赤文字を設定しました' : '黒文字を設定しました', 'success');
  };

  const handleClearFormat = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || selection.isCollapsed) {
      showToast('解除したい文字を選択してください', 'info');
      return;
    }

    const range = selection.getRangeAt(0);
    const text = range.toString();

    const textNode = document.createTextNode(text);
    range.deleteContents();
    range.insertNode(textNode);

    selection.removeAllRanges();
    handleInput();
    showToast('フォーマットを解除しました', 'info');
  };

  const presets: { key: RedSheetPresetKey; label: string }[] = [
    { key: 'line', label: '1行' },
    { key: 'sm', label: '小' },
    { key: 'md', label: '中' },
    { key: 'lg', label: '大' },
    { key: 'full', label: '最大' }
  ];

  return (
    <section id="tab-notes" className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        {/* Header and Red Sheet Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <Highlighter className="w-5 h-5 text-blue-600" />
              <span>暗記シートノート</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              テキストを選択して赤文字・黒文字を設定できます。赤シートをONにするとマウス上に赤シートが出現し暗記学習が行えます。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Red Sheet ON/OFF Button */}
            <button
              id="red-sheet-toggle-btn"
              onClick={onToggleRedSheet}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border cursor-pointer ${
                isRedSheetActive
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md animate-pulse'
                  : 'bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 border-slate-200'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block border border-white" />
              <span id="red-sheet-btn-text">
                {isRedSheetActive ? '赤シート ON' : '赤シート OFF'}
              </span>
            </button>

            {/* Red Sheet Size Presets */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 border border-slate-200">
              <span className="px-2 text-[11px] text-slate-400 whitespace-nowrap">
                サイズ:
              </span>
              {presets.map(({ key, label }) => {
                const isSelected = activePreset === key;
                return (
                  <button
                    key={key}
                    id={`red-size-${key}`}
                    onClick={() => onSelectPreset(key)}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-sm text-blue-600 font-bold'
                        : 'hover:bg-white text-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Formatting Toolbar & Custom Size Sliders */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="format-red-btn"
              onClick={() => handleFormatText('red')}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center space-x-1.5 border border-rose-200 transition-colors cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span>赤文字に設定</span>
            </button>
            <button
              id="format-black-btn"
              onClick={() => handleFormatText('black')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center space-x-1.5 border border-slate-200 transition-colors cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" />
              <span>黒文字に設定</span>
            </button>
            <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />
            <button
              id="format-clear-btn"
              onClick={handleClearFormat}
              className="px-3 py-1.5 rounded-xl bg-slate-200/70 hover:bg-slate-200 text-slate-600 font-semibold text-xs flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>フォーマット解除</span>
            </button>
          </div>

          {/* Custom Size Adjustment Sliders */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] text-slate-400">幅:</span>
            <input
              type="range"
              id="red-sheet-width-slider"
              min="100"
              max="800"
              value={redSheetSize.w}
              onChange={(e) =>
                onCustomResize(parseInt(e.target.value, 10), redSheetSize.h)
              }
              className="w-16 sm:w-20 accent-blue-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 ml-1">高:</span>
            <input
              type="range"
              id="red-sheet-height-slider"
              min="30"
              max="500"
              value={redSheetSize.h}
              onChange={(e) =>
                onCustomResize(redSheetSize.w, parseInt(e.target.value, 10))
              }
              className="w-16 sm:w-20 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Rich Text Editor Area */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500">
            ノート編集 (テキストを選択して色を設定)
          </label>
          <div
            id="note-editor"
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            placeholder="ここに暗記用ノートを入力してください。重要な語句を選択して「赤文字に設定」を押すと暗記用赤文字になり、赤シートで隠せるようになります。"
            className="w-full min-h-[360px] max-h-[600px] p-5 bg-white border border-slate-200 rounded-2xl text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto leading-relaxed font-sans shadow-inner empty:before:content-[attr(placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};
