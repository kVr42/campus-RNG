
import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Trophy,
  Zap,
  RotateCcw,
  ArrowRight,
  GraduationCap,
  BarChart3,
  Target,
  History,
  Medal,
} from 'lucide-react';

import { useGame } from '../context/GameContext';

import {
  QUIZ_CATEGORIES,
  QUIZ_QUESTIONS,
} from '../data/quizQuestions';

const EXP_VALUES = {
  Easy: 10,
  Medium: 20,
  Hard: 30,
};

const INITIAL_STATS = {
  sessions: 0,
  totalQuestions: 0,
  correct: 0,
  wrong: 0,
  byCategory: {},
  history: [],
};

function shuffle(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

function loadQuizStats() {
  try {
    const saved = localStorage.getItem(
      'campus-rng-quiz-stats'
    );

    if (!saved) return INITIAL_STATS;

    const parsed = JSON.parse(saved);

    return {
      ...INITIAL_STATS,
      ...parsed,
      byCategory: parsed.byCategory || {},
      history: parsed.history || [],
    };
  } catch {
    return INITIAL_STATS;
  }
}

export default function Quiz() {
  const {
    awardExp,
    recordQuizResult,
  } = useGame();

  const [category, setCategory] = useState('html');
  const [mode, setMode] = useState('challenge');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState(0);
  const [started, setStarted] = useState(false);

  // Statistik kuis
  const [stats, setStats] = useState(loadQuizStats);

  useEffect(() => {
    localStorage.setItem(
      'campus-rng-quiz-stats',
      JSON.stringify(stats)
    );
  }, [stats]);

  const selectedCategory = QUIZ_CATEGORIES.find(
    (item) => item.id === category
  );

  const score = questions.reduce(
    (total, question, index) =>
      total +
      (answers[index] === question.answer ? 1 : 0),
    0
  );

  const overallAccuracy =
    stats.totalQuestions > 0
      ? Math.round(
          (stats.correct / stats.totalQuestions) * 100
        )
      : 0;

  const bestCategory = Object.values(stats.byCategory)
    .filter((item) => item.questions > 0)
    .sort((a, b) => {
      const accuracyA = a.correct / a.questions;
      const accuracyB = b.correct / b.questions;

      return (
        accuracyB - accuracyA ||
        b.questions - a.questions
      );
    })[0];

  // Memulai kuis
  function startQuiz() {
    const pool = QUIZ_QUESTIONS.filter(
      (question) => question.category === category
    );

    const selected = shuffle(pool).slice(0, 5);

    if (selected.length === 0) {
      alert('Belum ada pertanyaan untuk kategori ini.');
      return;
    }

    setQuestions(selected);
    setAnswers({});
    setCurrent(0);
    setFinished(false);
    setReward(0);
    setStarted(true);
  }

  // Memilih jawaban
  function chooseAnswer(optionIndex) {
    if (answers[current] !== undefined) return;

    setAnswers((previous) => ({
      ...previous,
      [current]: optionIndex,
    }));
  }

  // Menyelesaikan kuis
  function finishQuiz() {
    if (finished) return;

    const totalCorrect = questions.reduce(
      (total, question, index) =>
        total +
        (answers[index] === question.answer ? 1 : 0),
      0
    );

    const totalWrong =
      questions.length - totalCorrect;

    // Perhitungan EXP
    const baseExp = questions.reduce(
      (total, question, index) =>
        total +
        (answers[index] === question.answer
          ? EXP_VALUES[question.difficulty] || 0
          : 0),
      0
    );

    const completionBonus = 20;

    const perfectBonus =
      totalCorrect === questions.length ? 30 : 0;

    const totalReward =
      mode === 'challenge'
        ? baseExp + completionBonus + perfectBonus
        : 0;

    const accuracy = Math.round(
      (totalCorrect / questions.length) * 100
    );

    // Data hasil kuis
    const result = {
      id: Date.now(),
      category,
      categoryName: selectedCategory.name,
      mode,
      score: totalCorrect,
      total: questions.length,
      correct: totalCorrect,
      wrong: totalWrong,
      accuracy,
      reward: totalReward,
      date: new Date().toISOString(),
    };

    // Simpan statistik
    setStats((previous) => {
      const previousCategory =
        previous.byCategory[category] || {
          name: selectedCategory.name,
          correct: 0,
          questions: 0,
        };

      return {
        sessions: previous.sessions + 1,

        totalQuestions:
          previous.totalQuestions + questions.length,

        correct:
          previous.correct + totalCorrect,

        wrong:
          previous.wrong + totalWrong,

        byCategory: {
          ...previous.byCategory,

          [category]: {
            name: selectedCategory.name,

            correct:
              previousCategory.correct + totalCorrect,

            questions:
              previousCategory.questions + questions.length,
          },
        },

        history: [
          result,
          ...previous.history,
        ].slice(0, 20),
      };
    });

    // Catat hasil untuk Achievement
    recordQuizResult(totalCorrect, questions.length);

    setReward(totalReward);
    setFinished(true);

    // EXP hanya diberikan pada Challenge Mode
    if (mode === 'challenge' && totalReward > 0) {
      awardExp(totalReward);
    }
  }

  // Pertanyaan berikutnya
  function nextQuestion() {
    if (answers[current] === undefined) return;

    if (current === questions.length - 1) {
      finishQuiz();
    } else {
      setCurrent((value) => value + 1);
    }
  }

  // Kembali ke halaman setup
  function backToSetup() {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setAnswers({});
    setCurrent(0);
  }

  // =================================
  // HALAMAN SETUP DAN STATISTIK
  // =================================

  if (!started) {
    return (
      <div className="stack">

        {/* HERO */}
        <section className="paper quiz-hero">
          <div>
            <small className="hand">
              CAMPUS RNG ACADEMY
            </small>

            <h2>
              DPW <em>Quiz</em>
            </h2>

            <p>
              Uji pemahamanmu tentang pengembangan web.
              Jawab pertanyaan dan kumpulkan EXP untuk
              meningkatkan level pemain.
            </p>
          </div>

          <div className="quiz-hero-icon">
            <GraduationCap size={75} />
          </div>
        </section>

        {/* STATISTIK */}
        <section className="paper quiz-statistics">
          <div className="section-title">
            <div>
              <small className="hand">
                PLAYER PERFORMANCE
              </small>

              <h2>Statistik Belajar</h2>
            </div>

            <BarChart3 size={25} />
          </div>

          <div className="quiz-stat-grid">

            <div className="quiz-stat-card">
              <History size={20} />
              <strong>{stats.sessions}</strong>
              <small>Total Kuis</small>
            </div>

            <div className="quiz-stat-card">
              <Target size={20} />
              <strong>{overallAccuracy}%</strong>
              <small>Akurasi</small>
            </div>

            <div className="quiz-stat-card">
              <CheckCircle2 size={20} />
              <strong>{stats.correct}</strong>
              <small>Jawaban Benar</small>
            </div>

            <div className="quiz-stat-card">
              <XCircle size={20} />
              <strong>{stats.wrong}</strong>
              <small>Jawaban Salah</small>
            </div>

          </div>

          {/* KATEGORI TERBAIK */}
          <div className="quiz-best-category">
            <Medal size={22} />

            <div>
              <small>KATEGORI TERBAIK</small>

              <strong>
                {bestCategory
                  ? bestCategory.name
                  : 'Belum tersedia'}
              </strong>

              {bestCategory && (
                <span>
                  {Math.round(
                    (bestCategory.correct /
                      bestCategory.questions) *
                      100
                  )}
                  % akurasi · {bestCategory.questions} soal
                </span>
              )}
            </div>
          </div>

          {/* RIWAYAT KUIS */}
          <div className="quiz-history">
            <h3>Riwayat Kuis Terakhir</h3>

            {stats.history.length === 0 ? (
              <p className="quiz-empty-history">
                Belum ada riwayat kuis.
                Selesaikan kuis pertamamu!
              </p>
            ) : (
              stats.history.slice(0, 5).map((item) => (
                <div
                  className="quiz-history-item"
                  key={item.id}
                >
                  <div>
                    <strong>{item.categoryName}</strong>

                    <small>
                      {item.mode === 'challenge'
                        ? 'Challenge Mode'
                        : 'Practice Mode'}
                      {' · '}
                      {new Date(item.date).toLocaleDateString(
                        'id-ID'
                      )}
                    </small>
                  </div>

                  <div className="quiz-history-score">
                    <strong>
                      {item.score}/{item.total}
                    </strong>

                    <small>{item.accuracy}%</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* PILIH KATEGORI DAN MODE */}
        <section className="paper quiz-setup">

          <div className="section-title">
            <div>
              <small className="hand">LANGKAH 01</small>
              <h2>Pilih Kategori</h2>
            </div>
          </div>

          <div className="quiz-category-grid">
            {QUIZ_CATEGORIES.map((item) => (
              <button
                key={item.id}
                className={
                  category === item.id
                    ? 'quiz-category selected'
                    : 'quiz-category'
                }
                onClick={() => setCategory(item.id)}
              >
                <span className="quiz-category-icon">
                  {item.icon}
                </span>

                <b>{item.name}</b>
                <small>{item.description}</small>
              </button>
            ))}
          </div>

          <div className="section-title quiz-mode-title">
            <div>
              <small className="hand">LANGKAH 02</small>
              <h2>Pilih Mode</h2>
            </div>
          </div>

          <div className="quiz-mode-grid">

            <button
              className={
                mode === 'practice'
                  ? 'quiz-mode selected'
                  : 'quiz-mode'
              }
              onClick={() => setMode('practice')}
            >
              <BookOpen size={25} />

              <b>Practice Mode</b>

              <p>
                Latihan bebas tanpa mendapatkan EXP.
              </p>

              <span>GRATIS</span>
            </button>

            <button
              className={
                mode === 'challenge'
                  ? 'quiz-mode selected'
                  : 'quiz-mode'
              }
              onClick={() => setMode('challenge')}
            >
              <Trophy size={25} />

              <b>Challenge Mode</b>

              <p>
                Uji kemampuan dan dapatkan EXP.
              </p>

              <span>EXP REWARD</span>
            </button>

          </div>

          <div className="quiz-rules">
            <div>
              <Zap size={18} />
              <b>5 Pertanyaan</b>
              <small>
                Dipilih secara acak dari kategori
              </small>
            </div>

            <div>
              <Trophy size={18} />
              <b>Bonus Selesai</b>
              <small>
                +20 EXP dan +30 EXP jika sempurna
              </small>
            </div>
          </div>

          <button
            className="btn dark quiz-start-btn"
            onClick={startQuiz}
          >
            MULAI QUIZ
            <ArrowRight size={16} />
          </button>

        </section>
      </div>
    );
  }

  // =================================
  // HALAMAN HASIL KUIS
  // =================================

  if (finished) {
    const accuracy = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="stack">

        <section className="paper quiz-result">

          <div className="result-trophy">
            <Trophy size={48} />
          </div>

          <small className="hand">
            QUIZ SELESAI
          </small>

          <h2>
            {score === questions.length
              ? 'Luar Biasa!'
              : 'Kerja Bagus!'}
          </h2>

          <p>
            Kamu telah menyelesaikan {selectedCategory.name} Quiz.
          </p>

          <div className="quiz-score">
            <strong>
              {score}/{questions.length}
            </strong>

            <span>Jawaban benar</span>
          </div>

          <div className="quiz-result-stats">

            <div>
              <CheckCircle2 size={19} />
              <b>{score}</b>
              <small>Benar</small>
            </div>

            <div>
              <XCircle size={19} />
              <b>{questions.length - score}</b>
              <small>Salah</small>
            </div>

            <div>
              <GraduationCap size={19} />
              <b>{accuracy}%</b>
              <small>Akurasi</small>
            </div>

          </div>

          <div className="quiz-exp-result">
            <Zap size={21} />

            <div>
              <small>EXP DIDAPATKAN</small>

              <strong>
                {mode === 'challenge'
                  ? `+${reward} EXP`
                  : '0 EXP'}
              </strong>
            </div>
          </div>

          {mode === 'practice' && (
            <p className="practice-note">
              Practice Mode tidak memberikan EXP.
              Coba Challenge Mode untuk meningkatkan
              level pemain.
            </p>
          )}

        </section>

        {/* PEMBAHASAN */}
        <section className="paper quiz-review">

          <div className="section-title">
            <div>
              <small className="hand">
                EVALUASI PEMBELAJARAN
              </small>

              <h2>Pembahasan Jawaban</h2>
            </div>
          </div>

          {questions.map((question, index) => {
            const isCorrect =
              answers[index] === question.answer;

            return (
              <article
                className="review-item"
                key={question.id}
              >
                <div className="review-heading">
                  <b>Soal {index + 1}</b>

                  <span
                    className={
                      isCorrect
                        ? 'review-correct'
                        : 'review-wrong'
                    }
                  >
                    {isCorrect ? 'BENAR' : 'SALAH'}
                  </span>
                </div>

                <h3>{question.question}</h3>

                <div className="review-answers">
                  {question.options.map(
                    (option, optionIndex) => {
                      const isAnswer =
                        optionIndex === question.answer;

                      const isChosen =
                        optionIndex === answers[index];

                      return (
                        <div
                          key={optionIndex}
                          className={[
                            'review-option',
                            isAnswer ? 'right-answer' : '',
                            isChosen && !isAnswer
                              ? 'wrong-answer'
                              : '',
                          ].join(' ')}
                        >
                          <span>
                            {String.fromCharCode(
                              65 + optionIndex
                            )}
                            .
                          </span>

                          {option}

                          {isAnswer && (
                            <CheckCircle2 size={15} />
                          )}

                          {isChosen && !isAnswer && (
                            <XCircle size={15} />
                          )}
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="review-explanation">
                  <b>Pembahasan</b>
                  <p>{question.explanation}</p>
                </div>

              </article>
            );
          })}

        </section>

        {/* TOMBOL HASIL */}
        <div className="quiz-result-actions">

          <button
            className="btn"
            onClick={backToSetup}
          >
            <RotateCcw size={15} />
            KEMBALI KE QUIZ
          </button>

          <button
            className="btn dark"
            onClick={startQuiz}
          >
            COBA LAGI
            <ArrowRight size={15} />
          </button>

        </div>

      </div>
    );
  }

  // =================================
  // HALAMAN PERTANYAAN
  // =================================

  const question = questions[current];
  const selectedAnswer = answers[current];

  return (
    <div className="stack">

      <section className="paper quiz-question-panel">

        <div className="quiz-question-top">
          <div>
            <small className="hand">
              {selectedCategory.name.toUpperCase()} QUIZ
            </small>

            <h2>
              Pertanyaan {current + 1} dari {questions.length}
            </h2>
          </div>

          <button
            className="btn"
            onClick={backToSetup}
          >
            Keluar
          </button>
        </div>

        <div className="quiz-question-progress">
          <div
            style={{
              width: `${
                ((current + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>

        <div className="quiz-question-meta">

          <span>
            SOAL {String(current + 1).padStart(2, '0')}
          </span>

          <span
            className={`difficulty ${question.difficulty.toLowerCase()}`}
          >
            {question.difficulty}
          </span>

          <span>
            {mode === 'challenge'
              ? `+${EXP_VALUES[question.difficulty]} EXP`
              : 'PRACTICE'}
          </span>

        </div>

        <h2 className="quiz-question-text">
          {question.question}
        </h2>

        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={
                selectedAnswer === index
                  ? 'quiz-option selected'
                  : 'quiz-option'
              }
              onClick={() => chooseAnswer(index)}
              disabled={selectedAnswer !== undefined}
            >
              <span>
                {String.fromCharCode(65 + index)}
              </span>

              {option}

              {selectedAnswer === index && (
                <CheckCircle2 size={17} />
              )}
            </button>
          ))}
        </div>

        <div className="quiz-navigation">

          <small>
            {selectedAnswer === undefined
              ? 'Pilih salah satu jawaban untuk melanjutkan.'
              : 'Jawaban sudah dipilih.'}
          </small>

          <button
            className="btn dark"
            disabled={selectedAnswer === undefined}
            onClick={nextQuestion}
          >
            {current === questions.length - 1
              ? 'SELESAIKAN'
              : 'BERIKUTNYA'}

            <ArrowRight size={15} />
          </button>

        </div>

      </section>
    </div>
  );
}
