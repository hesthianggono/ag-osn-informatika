'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { getProblemById, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/lib/data/problems'
import { getProgress, markProblemSolved } from '@/lib/progress'
import { notFound } from 'next/navigation'
import CodeBlock from '@/components/CodeBlock'

export default function ProblemPage({ params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = use(params)
  const problem = getProblemById(problemId)

  const [activeTab, setActiveTab] = useState<'soal' | 'solusi' | 'penjelasan'>('soal')
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState<number | null>(null)

  useEffect(() => {
    const p = getProgress()
    setSolved(p.solvedProblems.includes(problemId))
  }, [problemId])

  if (!problem) return notFound()

  const handleMarkSolved = () => {
    markProblemSolved(problem.id, problem.points)
    setSolved(true)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/latihan" className="hover:text-slate-300 transition-colors">Latihan Soal</Link>
        <span>›</span>
        <span className="text-slate-300">{problem.title}</span>
      </div>

      {/* Problem Header */}
      <div className="glass rounded-xl p-5 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-xl font-bold text-white">{problem.title}</h1>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[problem.difficulty]}`}>
                {DIFFICULTY_LABELS[problem.difficulty]}
              </span>
              {solved && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/50 text-green-400 border border-green-700/50">
                  ✓ Terpecahkan
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
              <span>⏱ Batas waktu: {problem.timeLimit} detik</span>
              <span>💾 Batas memori: {problem.memoryLimit} MB</span>
              <span>⭐ {problem.points} XP</span>
              <span>📂 {problem.category}</span>
            </div>
          </div>
          {!solved ? (
            <button
              onClick={handleMarkSolved}
              className="text-sm px-4 py-2 rounded-lg bg-green-700/30 text-green-400 border border-green-600/30 hover:bg-green-700/50 transition-colors"
            >
              ✓ Tandai Selesai (+{problem.points} XP)
            </button>
          ) : (
            <div className="text-sm text-green-400">✓ Sudah diselesaikan!</div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {problem.tags.map(tag => (
            <span key={tag} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(['soal', 'solusi', 'penjelasan'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-lg font-medium capitalize transition-all
              ${activeTab === tab
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'}`}
          >
            {tab === 'soal' ? '📋 Soal' : tab === 'solusi' ? '💡 Solusi' : '📖 Penjelasan'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'soal' && (
        <div className="glass rounded-xl p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Deskripsi</h3>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{problem.description}</div>
          </div>

          {/* Input Format */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Format Input</h3>
            <div className="text-sm text-slate-300 whitespace-pre-line">{problem.inputFormat}</div>
          </div>

          {/* Output Format */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Format Output</h3>
            <div className="text-sm text-slate-300 whitespace-pre-line">{problem.outputFormat}</div>
          </div>

          {/* Constraints */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Batasan</h3>
            <ul className="space-y-1">
              {problem.constraints.map((c, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                  <span className="text-indigo-400">·</span> {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Contoh</h3>
            <div className="space-y-4">
              {problem.examples.map((ex, i) => (
                <div key={i} className="grid md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1.5 font-medium">Input {i + 1}</div>
                    <pre className="text-sm p-3 rounded-lg bg-slate-900 border border-slate-700 text-green-300">
                      {ex.input}
                    </pre>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1.5 font-medium">Output {i + 1}</div>
                    <pre className="text-sm p-3 rounded-lg bg-slate-900 border border-slate-700 text-blue-300">
                      {ex.output}
                    </pre>
                  </div>
                  {ex.explanation && (
                    <div className="md:col-span-2 text-xs text-slate-400 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <span className="font-medium text-slate-300">Penjelasan: </span>{ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hints */}
          {problem.hints.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Petunjuk</h3>
              <div className="space-y-2">
                {problem.hints.map((hint, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setShowHint(showHint === i ? null : i)}
                      className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-2 transition-colors"
                    >
                      <span>{showHint === i ? '▼' : '▶'}</span>
                      Petunjuk {i + 1}
                    </button>
                    {showHint === i && (
                      <div className="mt-2 p-3 rounded-lg bg-yellow-950/30 border border-yellow-700/30 text-sm text-slate-300">
                        {hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'solusi' && (
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>💡</span> Solusi C++
            </h3>
            <div className="text-xs text-amber-400/80 bg-amber-900/20 px-2 py-1 rounded border border-amber-700/30">
              ⚠ Coba selesaikan sendiri dulu!
            </div>
          </div>
          <CodeBlock code={problem.solution} title={problem.title} explanation={`Kompleksitas: lihat tab Penjelasan`} />
        </div>
      )}

      {activeTab === 'penjelasan' && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span>📖</span> Penjelasan Solusi
          </h3>
          <div className="text-sm text-slate-300 leading-relaxed">
            {problem.solutionExplanation}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/30">
            <h4 className="text-sm font-bold text-indigo-300 mb-2">Tags Algoritma</h4>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map(tag => (
                <span key={tag} className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {!solved && (
            <div className="mt-6 text-center">
              <button
                onClick={handleMarkSolved}
                className="px-6 py-2.5 rounded-xl bg-green-700/30 text-green-400 border border-green-600/30 hover:bg-green-700/50 transition-colors font-medium"
              >
                ✓ Tandai Soal Ini Selesai (+{problem.points} XP)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
