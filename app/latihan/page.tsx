'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { problems, DIFFICULTY_LABELS, DIFFICULTY_COLORS, type ProblemDifficulty } from '@/lib/data/problems'
import { getProgress } from '@/lib/progress'

const ALL_DIFF: Array<'all' | ProblemDifficulty> = ['all', 'mudah', 'sedang', 'sulit', 'sangat-sulit']
const CATEGORIES = ['all', ...Array.from(new Set(problems.map(p => p.category)))]

const DIFF_CONFIG = {
  'all':          { label: 'Semua', color: '#c8a96e', glow: 'rgba(200,169,110,0.15)', border: 'rgba(200,169,110,0.35)', icon: '✦' },
  'mudah':        { label: 'Mudah',  color: '#81c784', glow: 'rgba(102,187,106,0.12)', border: 'rgba(102,187,106,0.35)', icon: '🌿' },
  'sedang':       { label: 'Sedang', color: '#ffd54f', glow: 'rgba(255,213,79,0.12)',  border: 'rgba(255,213,79,0.35)',  icon: '💧' },
  'sulit':        { label: 'Sulit',  color: '#ff8a65', glow: 'rgba(255,138,101,0.12)', border: 'rgba(255,138,101,0.35)', icon: '⚡' },
  'sangat-sulit': { label: 'Sangat Sulit', color: '#ef9a9a', glow: 'rgba(239,154,154,0.12)', border: 'rgba(239,154,154,0.35)', icon: '👑' },
}

export default function LatihanPage() {
  const [filterDiff, setFilterDiff] = useState<'all' | ProblemDifficulty>('all')
  const [filterCat, setFilterCat] = useState<string>('all')
  const [solved, setSolved] = useState<string[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSolved(getProgress().solvedProblems)
    const onUpdate = (e: Event) => setSolved((e as CustomEvent).detail.solvedProblems ?? [])
    window.addEventListener('ag-progress-update', onUpdate)
    return () => window.removeEventListener('ag-progress-update', onUpdate)
  }, [])

  const filtered = problems.filter(p => {
    if (filterDiff !== 'all' && p.difficulty !== filterDiff) return false
    if (filterCat !== 'all' && p.category !== filterCat) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  const byDiff = (d: ProblemDifficulty) => ({
    total: problems.filter(p => p.difficulty === d).length,
    solved: problems.filter(p => p.difficulty === d && solved.includes(p.id)).length,
  })

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <div className="genshin-sep mb-4"><span>⚔️ LATIHAN TEMPUR ⚔️</span></div>
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-text">Arena Pertarungan</span>
        </h1>
        <p className="text-sm" style={{ color: '#a89880' }}>
          {problems.length} misi menanti — dari Mudah hingga Sangat Sulit level IOI. Selesaikan untuk kumpulkan Primogems!
        </p>
      </div>

      {/* Stat cards by difficulty */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(['mudah','sedang','sulit','sangat-sulit'] as ProblemDifficulty[]).map(d => {
          const { total, solved: s } = byDiff(d)
          const cfg = DIFF_CONFIG[d]
          const pct = total > 0 ? (s / total) * 100 : 0
          return (
            <div key={d} className="genshin-card p-4 cursor-pointer" onClick={() => setFilterDiff(filterDiff === d ? 'all' : d)}
              style={{ border: `1px solid ${filterDiff === d ? cfg.border : 'rgba(200,169,110,0.12)'}` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-base">{cfg.icon}</span>
                <span className="text-xs font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
              </div>
              <div className="text-xl font-black" style={{ color: cfg.color }}>
                {s}<span className="text-sm font-normal" style={{ color: '#6b5d4f' }}>/{total}</span>
              </div>
              <div className="xp-bar mt-2">
                <div className="xp-fill" style={{ width: `${pct}%`,
                  background: `linear-gradient(90deg, ${cfg.color}88, ${cfg.color})` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input type="text" placeholder="🔍 Cari soal atau tag..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 text-sm rounded-lg w-full md:w-72 focus:outline-none"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(200,169,110,0.2)',
            color: '#e8dcc8',
          }} />

        <div className="flex flex-wrap gap-2">
          {ALL_DIFF.map(d => {
            const cfg = DIFF_CONFIG[d]
            const active = filterDiff === d
            return (
              <button key={d} onClick={() => setFilterDiff(d)}
                className="text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 transition-all"
                style={{
                  background: active ? cfg.glow : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? cfg.border : 'rgba(200,169,110,0.1)'}`,
                  color: active ? cfg.color : '#6b5d4f',
                }}>
                {cfg.icon} {cfg.label}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilterCat(c)}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
              style={{
                background: filterCat === c ? 'rgba(200,169,110,0.1)' : 'transparent',
                border: `1px solid ${filterCat === c ? 'rgba(200,169,110,0.4)' : 'rgba(200,169,110,0.1)'}`,
                color: filterCat === c ? '#c8a96e' : '#6b5d4f',
              }}>
              {c === 'all' ? '🌟 Semua' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="mb-4 text-xs" style={{ color: '#6b5d4f' }}>
        Menampilkan <span style={{ color: '#c8a96e', fontWeight: 'bold' }}>{filtered.length}</span> misi
      </div>

      {/* Problem list */}
      <div className="space-y-2">
        {filtered.map(problem => {
          const isSolved = solved.includes(problem.id)
          const cfg = DIFF_CONFIG[problem.difficulty]
          return (
            <Link key={problem.id} href={`/latihan/${problem.id}`}>
              <div className="flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer"
                style={{
                  background: isSolved
                    ? 'rgba(102,187,106,0.05)'
                    : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${isSolved ? 'rgba(102,187,106,0.2)' : 'rgba(200,169,110,0.1)'}`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${cfg.border}`
                  ;(e.currentTarget as HTMLElement).style.background = cfg.glow
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${isSolved ? 'rgba(102,187,106,0.2)' : 'rgba(200,169,110,0.1)'}`
                  ;(e.currentTarget as HTMLElement).style.background = isSolved ? 'rgba(102,187,106,0.05)' : 'rgba(255,255,255,0.025)'
                }}
              >
                {/* Status icon */}
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-bold"
                  style={{
                    background: isSolved ? 'rgba(102,187,106,0.3)' : 'rgba(255,255,255,0.05)',
                    color: isSolved ? '#81c784' : '#4a3f35',
                    border: `1px solid ${isSolved ? 'rgba(102,187,106,0.4)' : 'rgba(200,169,110,0.1)'}`,
                  }}>
                  {isSolved ? '✓' : '○'}
                </div>

                {/* Title & tags */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold" style={{ color: '#e8dcc8' }}>{problem.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold"
                      style={{ background: cfg.glow, border: `1px solid ${cfg.border}`, color: cfg.color }}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs" style={{ color: '#6b5d4f' }}>{problem.category}</span>
                    {problem.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(200,169,110,0.06)', color: '#6b5d4f' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* XP + limits */}
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-black gradient-text">{problem.points} 💎</div>
                  <div className="text-xs" style={{ color: '#4a3f35' }}>{problem.timeLimit}s · {problem.memoryLimit}MB</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-3 animate-float">🔍</div>
          <div style={{ color: '#6b5d4f' }}>Tidak ada misi yang sesuai filter</div>
        </div>
      )}
    </div>
  )
}
