'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { getTopicById, DIFFICULTY_LABELS, DIFFICULTY_COLORS, topics } from '@/lib/data/topics'
import { getQuizByTopic } from '@/lib/data/quiz'
import { getProgress, markLessonComplete, saveQuizScore } from '@/lib/progress'
import { notFound } from 'next/navigation'
import CodeBlock from '@/components/CodeBlock'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = use(params)
  const topic = getTopicById(topicId)

  const [activeLesson, setActiveLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const quizQuestions = getQuizByTopic(topicId)

  useEffect(() => {
    const p = getProgress()
    setCompletedLessons(p.completedLessons)
  }, [])

  if (!topic) return notFound()

  const lesson = topic.lessons[activeLesson]

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id)
    setCompletedLessons(prev => [...prev, lesson.id])
  }

  const handleQuizSubmit = () => {
    const correct = quizQuestions.filter((q, i) => quizAnswers[q.id] === q.correctIndex).length
    const score = Math.round((correct / quizQuestions.length) * 100)
    saveQuizScore(`quiz-${topicId}-${Date.now()}`, score)
    setQuizSubmitted(true)
  }

  const isLessonDone = completedLessons.includes(lesson.id)
  const topicProgress = Math.round(
    (topic.lessons.filter(l => completedLessons.includes(l.id)).length / topic.lessons.length) * 100
  )

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/materi" className="hover:text-slate-300 transition-colors">Materi</Link>
        <span>›</span>
        <span className="text-slate-300">{topic.title}</span>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left: Lessons List */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-4 sticky top-4">
            <div className="text-sm font-bold text-white mb-1">{topic.title}</div>
            <div className={`text-xs inline-flex items-center gap-1 px-2 py-0.5 rounded-full border mb-3 ${DIFFICULTY_COLORS[topic.difficulty]}`}>
              {DIFFICULTY_LABELS[topic.difficulty]}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span><span>{topicProgress}%</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${topic.color} rounded-full transition-all`}
                  style={{ width: `${topicProgress}%` }}
                />
              </div>
            </div>

            {/* Lesson list */}
            <div className="space-y-1">
              {topic.lessons.map((l, i) => {
                const done = completedLessons.includes(l.id)
                return (
                  <button
                    key={l.id}
                    onClick={() => { setActiveLesson(i); setShowCode(false) }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2
                      ${activeLesson === i
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs
                      ${done ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-500'}`}>
                      {done ? '✓' : i + 1}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </button>
                )
              })}

              {quizQuestions.length > 0 && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-purple-400 hover:bg-purple-900/30 flex items-center gap-2 mt-2 border border-purple-700/30"
                >
                  <span>🧪</span> Kuis Topik ({quizQuestions.length} soal)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Lesson Content */}
        <div className="lg:col-span-3">
          {showQuiz ? (
            <QuizSection
              questions={quizQuestions}
              answers={quizAnswers}
              setAnswers={setQuizAnswers}
              submitted={quizSubmitted}
              onSubmit={handleQuizSubmit}
              onBack={() => { setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            />
          ) : (
            <div className="glass rounded-xl p-6">
              {/* Lesson header */}
              <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                    Pelajaran {activeLesson + 1} dari {topic.lessons.length}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">{lesson.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">⏱ {lesson.duration} menit</span>
                  {isLessonDone ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-900/50 text-green-400 border border-green-700/50">
                      ✓ Selesai
                    </span>
                  ) : (
                    <button
                      onClick={handleMarkComplete}
                      className="text-xs px-3 py-1.5 rounded-lg bg-green-700/30 text-green-400 border border-green-600/30 hover:bg-green-700/50 transition-colors"
                    >
                      Tandai Selesai
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <MarkdownRenderer content={lesson.content} />
              </div>

              {/* Key Points */}
              {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-indigo-950/50 border border-indigo-800/30">
                  <h3 className="text-sm font-bold text-indigo-300 mb-3 flex items-center gap-2">
                    <span>💡</span> Poin Penting
                  </h3>
                  <ul className="space-y-2">
                    {lesson.keyPoints.map((kp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-indigo-400 mt-0.5 flex-shrink-0">▸</span>
                        {kp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Code example */}
              {lesson.code && (
                <div className="mb-6">
                  <CodeBlock
                    code={lesson.code}
                    title="Contoh Kode C++"
                    explanation={lesson.codeExplanation}
                    collapsible={true}
                  />
                </div>
              )}

              {/* Practice */}
              {lesson.practice && (
                <PracticeSection practice={lesson.practice} />
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-700/50">
                <button
                  onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
                  disabled={activeLesson === 0}
                  className="text-sm px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Sebelumnya
                </button>
                {activeLesson < topic.lessons.length - 1 ? (
                  <button
                    onClick={() => { setActiveLesson(activeLesson + 1); setShowCode(false) }}
                    className="text-sm px-4 py-2 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 transition-colors"
                  >
                    Selanjutnya →
                  </button>
                ) : quizQuestions.length > 0 ? (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="text-sm px-4 py-2 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30 hover:bg-purple-600/50 transition-colors"
                  >
                    Ikuti Kuis →
                  </button>
                ) : (
                  <Link
                    href="/materi"
                    className="text-sm px-4 py-2 rounded-lg bg-green-600/30 text-green-300 border border-green-500/30 hover:bg-green-600/50 transition-colors"
                  >
                    Kembali ke Materi ✓
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PracticeSection({ practice }: { practice: { question: string; hint: string; answer: string } }) {
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="p-4 rounded-xl bg-green-950/30 border border-green-700/30">
      <h3 className="text-sm font-bold text-green-300 mb-3 flex items-center gap-2">
        <span>✏️</span> Latihan Mandiri
      </h3>
      <p className="text-sm text-slate-300 mb-4">{practice.question}</p>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs px-3 py-1.5 rounded-lg bg-yellow-900/30 text-yellow-400 border border-yellow-700/30 hover:bg-yellow-900/50 transition-colors"
        >
          {showHint ? 'Sembunyikan' : 'Lihat'} Hint
        </button>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="text-xs px-3 py-1.5 rounded-lg bg-green-900/30 text-green-400 border border-green-700/30 hover:bg-green-900/50 transition-colors"
        >
          {showAnswer ? 'Sembunyikan' : 'Lihat'} Jawaban
        </button>
      </div>
      {showHint && (
        <div className="mt-3 p-3 rounded-lg bg-yellow-950/40 border border-yellow-700/30">
          <span className="text-xs font-semibold text-yellow-400">💡 Hint: </span>
          <span className="text-xs text-slate-300">{practice.hint}</span>
        </div>
      )}
      {showAnswer && (
        <div className="mt-3">
          <pre className="text-xs overflow-x-auto">
            <code className="text-slate-200">{practice.answer}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

function QuizSection({
  questions,
  answers,
  setAnswers,
  submitted,
  onSubmit,
  onBack,
}: {
  questions: ReturnType<typeof getQuizByTopic>
  answers: Record<string, number>
  setAnswers: (a: Record<string, number>) => void
  submitted: boolean
  onSubmit: () => void
  onBack: () => void
}) {
  const correct = questions.filter(q => answers[q.id] === q.correctIndex).length
  const score = submitted ? Math.round((correct / questions.length) * 100) : 0

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🧪</span> Kuis Topik
        </h2>
        <button onClick={onBack} className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
          ← Kembali ke Materi
        </button>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <div className={`text-6xl font-bold mb-3 ${score >= 70 ? 'text-green-400' : 'text-red-400'}`}>
            {score}%
          </div>
          <div className="text-slate-400 mb-6">
            {correct} dari {questions.length} soal benar
          </div>
          <div className="space-y-4 text-left">
            {questions.map((q, i) => {
              const isCorrect = answers[q.id] === q.correctIndex
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'border-green-700/30 bg-green-950/30' : 'border-red-700/30 bg-red-950/30'}`}>
                  <div className="text-sm font-medium text-white mb-2">{i + 1}. {q.question}</div>
                  {!isCorrect && (
                    <div className="text-xs text-red-400 mb-2">
                      Jawabanmu: {answers[q.id] !== undefined ? q.options[answers[q.id]] : '(tidak dijawab)'}
                    </div>
                  )}
                  <div className="text-xs text-green-400 mb-2">Jawaban benar: {q.options[q.correctIndex]}</div>
                  <div className="text-xs text-slate-400">{q.explanation}</div>
                </div>
              )
            })}
          </div>
          <button onClick={onBack} className="mt-6 px-6 py-2.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 transition-colors">
            Lanjut Belajar
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={q.id} className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="text-sm font-medium text-white mb-4">
                <span className="text-slate-500 mr-2">{i + 1}.</span>{q.question}
              </div>
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <button
                    key={j}
                    onClick={() => setAnswers({ ...answers, [q.id]: j })}
                    className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-all
                      ${answers[q.id] === j
                        ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'}`}
                  >
                    <span className="text-slate-500 mr-2">{String.fromCharCode(65 + j)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={onSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Submit Jawaban ({Object.keys(answers).length}/{questions.length} dijawab)
          </button>
        </div>
      )}
    </div>
  )
}
