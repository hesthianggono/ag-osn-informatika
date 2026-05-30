'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { topics, DIFFICULTY_LABELS, CATEGORIES, type Difficulty } from '@/lib/data/topics'
import { getProgress } from '@/lib/progress'

const ALL_DIFF: Array<'all' | Difficulty> = ['all', 'osn-k', 'osn-p', 'osn-nasional', 'ioi']

const DIFF_STYLE: Record<string, { label: string; color: string; bg: string; border: string; element: string }> = {
  'all':          { label: 'Semua Level',   color: '#c8a96e', bg: 'rgba(200,169,110,0.1)', border: 'rgba(200,169,110,0.3)', element: '✦' },
  'osn-k':        { label: 'OSN Kota/Kab',  color: '#81c784', bg: 'rgba(102,187,106,0.1)', border: 'rgba(102,187,106,0.3)', element: '🌿' },
  'osn-p':        { label: 'OSN Provinsi',  color: '#64b5f6', bg: 'rgba(100,181,246,0.1)', border: 'rgba(100,181,246,0.3)', element: '💧' },
  'osn-nasional': { label: 'OSN Nasional',  color: '#ce93d8', bg: 'rgba(206,147,216,0.1)', border: 'rgba(206,147,216,0.3)', element: '⚡' },
  'ioi':          { label: 'IOI Level',     color: '#f0d060', bg: 'rgba(240,208,96,0.1)',  border: 'rgba(240,208,96,0.3)',  element: '👑' },
}

export default function MateriPage() {
  const [filterDiff, setFilterDiff] = useState<'all' | Difficulty>('all')
  const [filterCat, setFilterCat] = useState<string>('all')
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  useEffect(() => {
    setCompletedLessons(getProgress().completedLessons)
    const onUpdate = (e: Event) => setCompletedLessons((e as CustomEvent).detail.completedLessons)
    window.addEventListener('ag-progress-update', onUpdate)
    return () => window.removeEventListener('ag-progress-update', onUpdate)
  }, [])

  const filtered = topics.filter(t => {
    if (filterDiff !== 'all' && t.difficulty !== filterDiff) return false
    if (filterCat !== 'all' && t.category !== filterCat) return false
    return true
  })

  const getTopicProgress = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId)
    if (!topic) return 0
    const done = topic.lessons.filter(l => completedLessons.includes(l.id)).length
    return Math.round((done / topic.lessons.length) * 100)
  }

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fadeIn">

      {/* Header */}
      <div className="mb-8">
        <div className="genshin-sep mb-4"><span>✦ AKADEMI MATERI ✦</span></div>
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-text">Pustaka Pengetahuan</span>
        </h1>
        <p className="text-sm" style={{ color: '#a89880' }}>
          {topics.length} topik — dari fondasi C++ hingga algoritma level Archon · Klik topik untuk mulai belajar
        </p>
      </div>

      {/* Difficulty filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {ALL_DIFF.map(d => {
          const s = DIFF_STYLE[d]
          const active = filterDiff === d
          return (
            <button key={d} onClick={() => setFilterDiff(d)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
              style={{
                background: active ? s.bg : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? s.border : 'rgba(200,169,110,0.12)'}`,
                color: active ? s.color : '#6b5d4f',
              }}>
              <span>{s.element}</span> {s.label}
            </button>
          )
        })}
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['all', ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setFilterCat(c)}
            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
            style={{
              background: filterCat === c ? 'rgba(200,169,110,0.12)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${filterCat === c ? 'rgba(200,169,110,0.4)' : 'rgba(255,255,255,0.06)'}`,
              color: filterCat === c ? '#c8a96e' : '#6b5d4f',
            }}>
            {c === 'all' ? '🌟 Semua Kategori' : c}
          </button>
        ))}
      </div>

      {/* Result count */}
      <div className="mb-4 text-xs" style={{ color: '#6b5d4f' }}>
        Menampilkan <span style={{ color: '#c8a96e', fontWeight: 'bold' }}>{filtered.length}</span> dari {topics.length} topik
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((topic) => {
          const prog = getTopicProgress(topic.id)
          const diffInfo = DIFF_STYLE[topic.difficulty]
          const lessonsDone = topic.lessons.filter(l => completedLessons.includes(l.id)).length
          return (
            <Link key={topic.id} href={`/materi/${topic.id}`}>
              <div className="genshin-card p-5 h-full flex flex-col relative overflow-hidden cursor-pointer"
                style={{ border: `1px solid ${diffInfo.border}40` }}>

                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${diffInfo.color}, transparent)` }} />

                {/* Corner decorative glow */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-15"
                  style={{ background: `radial-gradient(circle at top right, ${diffInfo.color}, transparent)` }} />

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl animate-float" style={{ animationDelay: `${(filtered.indexOf(topic) % 5) * 0.4}s` }}>
                    {topic.icon}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background: diffInfo.bg, border: `1px solid ${diffInfo.border}`, color: diffInfo.color }}>
                    {diffInfo.element} {diffInfo.label}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-base font-bold mb-1 transition-colors"
                  style={{ color: '#e8dcc8' }}>
                  {topic.title}
                </h3>
                <p className="text-xs mb-3 flex-1" style={{ color: '#6b5d4f' }}>
                  {topic.subtitle}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-3 text-xs mb-3" style={{ color: '#6b5d4f' }}>
                  <span>📂 {topic.category}</span>
                  <span>⏱ ~{topic.estimatedHours}j</span>
                  <span>📖 {topic.lessons.length} lessons</span>
                </div>

                {/* Progress */}
                {prog > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1" style={{ color: '#6b5d4f' }}>
                      <span>{lessonsDone}/{topic.lessons.length} selesai</span>
                      <span style={{ color: diffInfo.color }}>{prog}%</span>
                    </div>
                    <div className="xp-bar">
                      <div className="xp-fill" style={{ width: `${prog}%`,
                        background: `linear-gradient(90deg, ${diffInfo.color}aa, ${diffInfo.color})` }} />
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                <div className="pt-2" style={{ borderTop: '1px solid rgba(200,169,110,0.08)' }}>
                  {topic.prerequisites.length === 0 ? (
                    <div className="text-xs" style={{ color: '#66bb6a80' }}>✓ Tidak ada prasyarat</div>
                  ) : (
                    <div className="text-xs" style={{ color: '#6b5d4f' }}>
                      Prasyarat: {topic.prerequisites.map(p => topics.find(x => x.id === p)?.title || p).join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-3 animate-float">🔍</div>
          <div style={{ color: '#6b5d4f' }}>Tidak ada topik yang sesuai filter</div>
        </div>
      )}
    </div>
  )
}
