'use client'

import { useState, useEffect, useRef } from 'react'
import { quizQuestions } from '@/lib/data/quiz'
import { saveQuizScore } from '@/lib/progress'
import Link from 'next/link'

const EXAM_CONFIGS = [
  {
    name: 'Seleksi Kota/Kab',
    short: 'OSN-K',
    desc: 'Simulasi Seleksi Tingkat Kota/Kabupaten',
    duration: 30,
    questions: 10,
    difficulty: 'Mix (Mudah-Sedang)',
    element: '🌿',
    color: '#81c784',
    glow: 'rgba(102,187,106,0.15)',
    border: 'rgba(102,187,106,0.35)',
  },
  {
    name: 'Seleksi Provinsi',
    short: 'OSN-P',
    desc: 'Simulasi Seleksi Tingkat Provinsi',
    duration: 45,
    questions: 15,
    difficulty: 'Mix (Sedang-Sulit)',
    element: '💧',
    color: '#64b5f6',
    glow: 'rgba(100,181,246,0.15)',
    border: 'rgba(100,181,246,0.35)',
  },
  {
    name: 'OSN Nasional',
    short: 'OSN',
    desc: 'Simulasi Final Tingkat Nasional',
    duration: 60,
    questions: 20,
    difficulty: 'Sulit-Sangat Sulit',
    element: '👑',
    color: '#f0d060',
    glow: 'rgba(240,208,96,0.12)',
    border: 'rgba(240,208,96,0.4)',
  },
]

type Phase = 'select' | 'running' | 'result'

export default function SimulasiPage() {
  const [phase, setPhase] = useState<Phase>('select')
  const [selectedConfig, setSelectedConfig] = useState<number>(0)
  const [examQuestions, setExamQuestions] = useState<typeof quizQuestions>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const startExam = (configIdx: number) => {
    const config = EXAM_CONFIGS[configIdx]
    // Shuffle and pick questions
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(config.questions, quizQuestions.length))
    setExamQuestions(selected)
    setAnswers({})
    setCurrentQ(0)
    setTimeLeft(config.duration * 60)
    setSelectedConfig(configIdx)
    setFinished(false)
    setPhase('running')

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const submitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setFinished(true)
    const correct = examQuestions.filter(q => answers[q.id] === q.correctIndex).length
    const score = Math.round((correct / examQuestions.length) * 100)
    saveQuizScore(`simulasi-${Date.now()}`, score)
    setPhase('result')
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (phase === 'select') {
    return (
      <div className="min-h-screen p-4 md:p-8 animate-fadeIn">
        <div className="mb-8">
          <div className="genshin-sep mb-4"><span>🔮 UJIAN BESAR 🔮</span></div>
          <h1 className="text-3xl font-black mb-2">
            <span className="gradient-text">Ruang Ujian Teyvat</span>
          </h1>
          <p className="text-sm" style={{ color: '#a89880' }}>
            Simulasikan kondisi ujian OSN sebenarnya. Timer berjalan, buktikan kemampuanmu!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {EXAM_CONFIGS.map((config, i) => (
            <div key={i} className="genshin-card p-6 cursor-pointer relative overflow-hidden"
              style={{ border: `1px solid ${config.border}` }}
              onClick={() => startExam(i)}>
              {/* Element glow */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${config.color}, transparent)` }} />
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }} />

              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl animate-float">{config.element}</span>
                <div>
                  <div className="text-lg font-black" style={{ color: config.color }}>{config.short}</div>
                  <div className="text-xs" style={{ color: '#6b5d4f' }}>{config.name}</div>
                </div>
              </div>

              <div className="text-sm mb-4" style={{ color: '#a89880' }}>{config.desc}</div>

              <div className="space-y-2 mb-5">
                {[
                  ['⏱ Durasi', `${config.duration} menit`],
                  ['📝 Soal', `${Math.min(config.questions, quizQuestions.length)} soal`],
                  ['⚡ Tingkat', config.difficulty],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span style={{ color: '#6b5d4f' }}>{label}</span>
                    <span className="font-bold" style={{ color: '#e8dcc8' }}>{val}</span>
                  </div>
                ))}
              </div>

              <div className="w-full py-2.5 rounded-xl text-center text-sm font-black transition-all"
                style={{
                  background: `linear-gradient(135deg, ${config.color}30, ${config.color}15)`,
                  border: `1px solid ${config.border}`,
                  color: config.color,
                }}>
                ✦ Masuk Ruang Ujian
              </div>
            </div>
          ))}
        </div>

        <div className="genshin-card p-5">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: '#c8a96e' }}>
            <span>📜</span> Peraturan Ujian
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ color: '#a89880' }}>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="font-black flex-shrink-0" style={{ color: '#c8a96e' }}>1.</span>
                Timer berjalan otomatis setelah ujian dimulai
              </div>
              <div className="flex items-start gap-2">
                <span className="font-black flex-shrink-0" style={{ color: '#c8a96e' }}>2.</span>
                Navigasi bebas antar soal, jawaban tersimpan otomatis
              </div>
              <div className="flex items-start gap-2">
                <span className="font-black flex-shrink-0" style={{ color: '#c8a96e' }}>3.</span>
                Ujian otomatis berakhir saat waktu habis
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">4.</span>
                Hasil & pembahasan lengkap setelah ujian selesai
              </div>
              <div className="flex items-start gap-2">
                <span className="font-black flex-shrink-0" style={{ color: '#c8a96e' }}>5.</span>
                Primogems (XP) diberikan berdasarkan skor yang dicapai
              </div>
              <div className="flex items-start gap-2">
                <span className="font-black flex-shrink-0" style={{ color: '#c8a96e' }}>6.</span>
                Bisa diulangi berkali-kali untuk latihan!
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'running' && !finished) {
    const question = examQuestions[currentQ]
    const answered = Object.keys(answers).length
    const isLow = timeLeft < 300 // 5 minutes

    return (
      <div className="min-h-screen p-4 md:p-8">
        {/* Exam header */}
        <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold text-white">{EXAM_CONFIGS[selectedConfig].name}</div>
            <div className="text-xs text-slate-500">{answered}/{examQuestions.length} dijawab</div>
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isLow ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
          <button
            onClick={submitExam}
            className="text-sm px-4 py-2 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 transition-colors"
          >
            Submit Sekarang
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex flex-wrap gap-2 mb-6">
          {examQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all
                ${i === currentQ
                  ? 'bg-indigo-600 text-white'
                  : answers[q.id] !== undefined
                    ? 'bg-green-700 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question */}
        <div className="glass rounded-xl p-6 mb-4">
          <div className="text-xs text-slate-500 mb-3 font-medium">
            SOAL {currentQ + 1} dari {examQuestions.length}
          </div>
          <div className="text-base font-medium text-white mb-6 leading-relaxed">
            {question.question}
          </div>
          <div className="space-y-3">
            {question.options.map((opt, j) => (
              <button
                key={j}
                onClick={() => setAnswers(prev => ({ ...prev, [question.id]: j }))}
                className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all
                  ${answers[question.id] === j
                    ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200'
                    : 'border-slate-700 text-slate-400 hover:border-indigo-600/30 hover:text-slate-200'}`}
              >
                <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + j)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="text-sm px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Sebelumnya
          </button>
          {currentQ < examQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentQ(currentQ + 1)}
              className="text-sm px-4 py-2 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 transition-colors"
            >
              Selanjutnya →
            </button>
          ) : (
            <button
              onClick={submitExam}
              className="text-sm px-4 py-2 rounded-lg bg-green-600/30 text-green-300 border border-green-500/30 hover:bg-green-600/50 transition-colors"
            >
              Selesai & Submit ✓
            </button>
          )}
        </div>
      </div>
    )
  }

  // Result phase
  const correct = examQuestions.filter(q => answers[q.id] === q.correctIndex).length
  const score = Math.round((correct / examQuestions.length) * 100)
  const grade = score >= 90 ? 'Luar Biasa! 🏆' : score >= 75 ? 'Bagus! 🌟' : score >= 60 ? 'Cukup Baik 👍' : 'Perlu Latihan Lagi 💪'

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="glass rounded-xl p-6 mb-6 text-center">
        <div className={`text-6xl font-bold mb-2 ${score >= 75 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          {score}
        </div>
        <div className="text-xl text-white mb-1">{grade}</div>
        <div className="text-slate-400 text-sm mb-4">
          {correct} dari {examQuestions.length} soal benar
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setPhase('select')}
            className="text-sm px-5 py-2.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 transition-colors"
          >
            Simulasi Lagi
          </button>
          <Link
            href="/latihan"
            className="text-sm px-5 py-2.5 rounded-lg bg-green-600/30 text-green-300 border border-green-500/30 hover:bg-green-600/50 transition-colors"
          >
            Latihan Soal
          </Link>
        </div>
      </div>

      {/* Detailed review */}
      <h2 className="text-lg font-bold text-white mb-4">Pembahasan Jawaban</h2>
      <div className="space-y-4">
        {examQuestions.map((q, i) => {
          const isCorrect = answers[q.id] === q.correctIndex
          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border ${isCorrect ? 'border-green-700/30 bg-green-950/20' : 'border-red-700/30 bg-red-950/20'}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className={`text-xl flex-shrink-0 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
                <div className="text-sm font-medium text-white">{i + 1}. {q.question}</div>
              </div>
              {!isCorrect && answers[q.id] !== undefined && (
                <div className="text-xs text-red-400 mb-2 ml-8">
                  Jawabanmu: {q.options[answers[q.id]]}
                </div>
              )}
              <div className="text-xs text-green-400 mb-2 ml-8">
                Jawaban benar: {q.options[q.correctIndex]}
              </div>
              <div className="text-xs text-slate-400 ml-8 leading-relaxed">{q.explanation}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
