import React, { useState } from 'react';
import { FlaskConical, Trophy } from 'lucide-react';
import { Deck, QuizQuestion } from '../types';

interface QuizTabProps {
  decks: Deck[];
  onFinishQuiz: (accuracy: number) => void;
  showToast: (msg: string, type?: 'info' | 'error' | 'success') => void;
}

export const QuizTab: React.FC<QuizTabProps> = ({
  decks,
  onFinishQuiz,
  showToast
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>(
    decks.length > 0 ? decks[0].id : ''
  );
  const [screen, setScreen] = useState<'start' | 'play' | 'result'>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const shuffleArray = <T,>(arr: T[]): T[] => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleStartQuiz = () => {
    const deck = decks.find((d) => d.id === selectedDeckId) || decks[0];
    if (!deck || deck.cards.length < 2) {
      showToast('クイズを作成するには最低2枚以上のカードが必要です', 'error');
      return;
    }

    // Generate 4-choice questions
    const generated: QuizQuestion[] = deck.cards.map((card) => {
      let distractors = deck.cards
        .filter((c) => c.id !== card.id)
        .map((c) => c.back);
      distractors = shuffleArray(distractors).slice(0, 3);

      let counter = 1;
      while (distractors.length < 3) {
        distractors.push(`ダミー解答 ${counter++}`);
      }

      const choices = shuffleArray([card.back, ...distractors]);
      return {
        question: card.front,
        correct: card.back,
        choices
      };
    });

    setQuestions(shuffleArray(generated));
    setCurrentIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setScreen('play');
  };

  const handleAnswer = (choice: string) => {
    if (selectedChoice !== null) return; // already answered
    setSelectedChoice(choice);

    const q = questions[currentIndex];
    const isCorrect = choice === q.correct;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedChoice(null);
      } else {
        const accuracy = Math.round((newScore / questions.length) * 100);
        onFinishQuiz(accuracy);
        setScreen('result');
      }
    }, 1200);
  };

  const currentQ = questions[currentIndex];
  const progressPct =
    questions.length > 0 ? Math.round((currentIndex / questions.length) * 100) : 0;
  const resultAccuracy =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <section id="tab-quiz" className="space-y-6">
      {/* Quiz Start Screen */}
      {screen === 'start' && (
        <div
          id="quiz-start-screen"
          className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-6"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <FlaskConical className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">知識チェック・クイズ</h2>
            <p className="text-sm text-slate-500 mt-1">
              選択したデッキのカードデータから4択問題を作成します。
            </p>
          </div>

          <div className="text-left space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <label className="block text-xs font-bold text-slate-500 uppercase">
              対象デッキを選択
            </label>
            <select
              id="quiz-deck-select"
              value={selectedDeckId}
              onChange={(e) => setSelectedDeckId(e.target.value)}
              disabled={decks.length === 0}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
            >
              {decks.length === 0 ? (
                <option value="">デッキがありません</option>
              ) : (
                decks.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title} ({d.cards.length}問)
                  </option>
                ))
              )}
            </select>
            {decks.length === 0 && (
              <p className="text-xs text-amber-600 mt-1">
                ※ まだデッキがありません。ダッシュボードまたは暗記カードタブからデッキとカードを作成してください。
              </p>
            )}
          </div>

          <button
            id="start-quiz-submit-btn"
            onClick={handleStartQuiz}
            disabled={decks.length === 0}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            クイズを開始する
          </button>
        </div>
      )}

      {/* Quiz Play View */}
      {screen === 'play' && currentQ && (
        <div id="quiz-play-screen" className="max-w-xl mx-auto space-y-6">
          {/* Progress Bar & Scores */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span id="quiz-progress-text">
                問題 {currentIndex + 1} / {questions.length}
              </span>
              <span id="quiz-score-text" className="text-blue-600">
                スコア: {score}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                id="quiz-progress-bar"
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <h3
              id="quiz-question-text"
              className="text-xl font-bold text-slate-800 text-center py-4 leading-relaxed"
            >
              {currentQ.question}
            </h3>

            {/* Choice Options */}
            <div id="quiz-options-container" className="space-y-3">
              {currentQ.choices.map((choice, i) => {
                let btnStyle =
                  'w-full p-4 text-left rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-500 font-semibold text-slate-700 text-sm transition-all shadow-sm cursor-pointer';

                if (selectedChoice !== null) {
                  if (choice === currentQ.correct) {
                    btnStyle =
                      'w-full p-4 text-left rounded-2xl border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold text-sm shadow-sm';
                  } else if (choice === selectedChoice) {
                    btnStyle =
                      'w-full p-4 text-left rounded-2xl border-2 border-rose-500 bg-rose-50 text-rose-800 font-bold text-sm shadow-sm';
                  } else {
                    btnStyle =
                      'w-full p-4 text-left rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 font-normal text-sm opacity-60';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(choice)}
                    disabled={selectedChoice !== null}
                    className={btnStyle}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Result View */}
      {screen === 'result' && (
        <div
          id="quiz-result-screen"
          className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">テスト完了！</h2>
            <p className="text-slate-500 text-sm mt-1">お疲れ様でした。結果のまとめです。</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 font-semibold">正解率</p>
              <p className="text-3xl font-extrabold text-blue-600" id="quiz-result-accuracy">
                {resultAccuracy}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold">正解数</p>
              <p className="text-3xl font-extrabold text-slate-800" id="quiz-result-score">
                {score} / {questions.length}
              </p>
            </div>
          </div>

          <button
            id="quiz-reset-btn"
            onClick={() => setScreen('start')}
            className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            もう一度挑戦する / 完了
          </button>
        </div>
      )}
    </section>
  );
};
