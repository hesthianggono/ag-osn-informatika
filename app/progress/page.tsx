'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProgress, getLevelName, type UserProgress } from '@/lib/progress'
import { topics } from '@/lib/data/topics'
import { problems } from '@/lib/data/problems'
import { DIFFICULTY_LABELS as PROB_DIFF_LABELS, DIFFICULTY_COLORS as PROB_DIFF_COLORS, type ProblemDifficulty } from '@/lib/data/problems'

const AR_TITLES = [
  { min: 0,     name: 'Novice Traveler',  emoji: '🌱', color: '#81c784', stars: '★☆☆☆☆' },
  { min: 500,   name: 'Adventurer',       emoji: '⚔️', color: '#64b5f6', stars: '★★☆☆☆' },
  { min: 1000,  name: 'Journeyman',       emoji: '🗺️', color: '#64b5f6', stars: '★★☆☆☆' },
  { min: 2000,  name: 'Grand Voyager',    emoji: '⭐', color: '#ce93d8', stars: '★★★☆☆' },
  { min: 3500,  name: 'Elite Voyager',    emoji: '🌟', color: '#ce93d8', stars: '★★★☆☆' },
  { min: 5000,  name: 'Master Traveler',  emoji: '💎', color: '#f0d060', stars: '★★★★☆' },
  { min: 7500,  name: 'OSN Champion',     emoji: '👑', color: '#f0d060', stars: '★★★★★' },
  { min: 10000, name: 'Archon of Code',   emoji: '🏆', color: '#f0d060', stars: '★★★★★' },
]
function getTitle(xp: number) {
  return [...AR_TITLES].reverse().find(t => xp >= t.min) ?? AR_TITLES[0]
}
function getNextTitle(xp: number) {
  return AR_TITLES.find(t => t.min > xp)
}

const BADGES = [
  { id: 'first-lesson',  name: 'Langkah Pertama', icon: '👣', desc: 'Selesaikan 1 pelajaran',          color: '#81c784', req: (p: UserProgress) => p.completedLessons.length >= 1 },
  { id: 'cpp-warrior',   name: 'C++ Warrior',      icon: '⚡', desc: 'Selesaikan 3+ pelajaran',         color: '#ffd54f', req: (p: UserProgress) => p.completedLessons.length >= 3 },
  { id: 'ten-lessons',   name: 'Scholar',          icon: '📜', desc: 'Selesaikan 10+ pelajaran',        color: '#64b5f6', req: (p: UserProgress) => p.completedLessons.length >= 10 },
  { id: 'first-solve',   name: 'Pemecah Masalah',  icon: '💻', desc: 'Selesaikan 1 soal',              color: '#81c784', req: (p: UserProgress) => p.solvedProblems.length >= 1 },
  { id: 'five-solve',    name: 'Code Knight',      icon: '⚔️', desc: 'Selesaikan 5 soal',              color: '#64b5f6', req: (p: UserProgress) => p.solvedProblems.length >= 5 },
  { id: 'ten-solve',     name: 'Arena Master',     icon: '🏆', desc: 'Selesaikan 10 soal',             color: '#ce93d8', req: (p: UserProgress) => p.solvedProblems.length >= 10 },
  { id: 'all-easy',      name: 'Mudah Saja!',      icon: '✅', desc: 'Selesaikan semua soal mudah',    color: '#81c784', req: (p: UserProgress) => problems.filter(x=>x.difficulty==='mudah').every(x=>p.solvedProblems.includes(x.id)) },
  { id: 'streak3',       name: 'Konsisten',        icon: '📅', desc: '3 hari belajar berturut-turut',  color: '#ffd54f', req: (p: UserProgress) => p.streak >= 3 },
  { id: 'streak7',       name: 'Seminggu Penuh',   icon: '🔥', desc: '7 hari belajar berturut-turut',  color: '#ff8a65', req: (p: UserProgress) => p.streak >= 7 },
  { id: 'xp500',         name: 'Penyerap Ilmu',    icon: '💎', desc: 'Kumpulkan 500 Primogems',        color: '#c8a96e', req: (p: UserProgress) => p.xp >= 500 },
  { id: 'xp2000',        name: 'OSN Ready',        icon: '⭐', desc: 'Kumpulkan 2000 Primogems',       color: '#f0d060', req: (p: UserProgress) => p.xp >= 2000 },
  { id: 'xp5000',        name: 'Grand Archon',     icon: '👑', desc: 'Kumpulkan 5000 Primogems',       color: '#f0d060', req: (p: UserProgress) => p.xp >= 5000 },
]

export default function ProgressPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    setProgress(getProgress())
    const onUpdate = (e: Event) => setProgress((e as CustomEvent).detail)
    window.addEventListener('ag-progress-update', onUpdate)
    return () => window.removeEventListener('ag-progress-update', onUpdate)
  }, [])

  if (!progress) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-sparkle text-2xl">✦</div>
    </div>
  )

  const title = getTitle(progress.xp)
  const nextTitle = getNextTitle(progress.xp)
  const xpToNext = nextTitle?.min ?? (progress.xp + 1)
  const prevMin = title.min
  const xpPercent = Math.min(100, ((progress.xp - prevMin) / (xpToNext - prevMin)) * 100)

  const topicsProgress = topics.map(topic => {
    const done = topic.lessons.filter(l => progress.completedLessons.includes(l.id)).length
    return { topic, done, total: topic.lessons.length, pct: Math.round((done / topic.lessons.length) * 100) }
  }).sort((a, b) => b.pct - a.pct)

  const earnedBadges = BADGES.filter(b => b.req(progress))
  const lockedBadges = BADGES.filter(b => !b.req(progress))

  const diffStats = (['mudah', 'sedang', 'sulit', 'sangat-sulit'] as const).map(d => ({
    label: PROB_DIFF_LABELS[d as ProblemDifficulty] || d,
    color: d === 'mudah' ? '#81c784' : d === 'sedang' ? '#ffd54f' : d === 'sulit' ? '#ff8a65' : '#ef9a9a',
    total: problems.filter(p => p.difficulty === d).length,
    solved: problems.filter(p => p.difficulty === d && progress.solvedProblems.includes(p.id)).length,
  }))

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fadeIn">

      {/* Header */}
      <div className="mb-8">
        <div className="genshin-sep mb-4"><span>📊 JURNAL HERO 📊</span></div>
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-text">Buku Petualangan</span>
        </h1>
        <p className="text-sm" style={{ color: '#a89880' }}>
          Pantau perjalananmu menuju puncak OSN Informatika
        </p>
      </div>

      {/* Adventure Rank Card */}
      <div className="genshin-card p-6 mb-6 genshin-corner" style={{ border: `1px solid ${title.color}40` }}>
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <div className="text-xs tracking-widest uppercase font-bold mb-1" style={{ color: '#6b5d4f' }}>
              Tingkat Petualangan
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-float">{title.emoji}</span>
              <div>
                <div className="text-2xl font-black" style={{ color: title.color }}>{title.name}</div>
                <div className="text-sm" style={{ color: '#6b5d4f' }}>
                  {nextTitle ? `Menuju → ${nextTitle.name}` : '🏆 Tingkat Tertinggi!'}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black gradient-text">{progress.xp}</div>
            <div className="text-xs" style={{ color: '#6b5d4f' }}>Primogems Total</div>
          </div>
        </div>
        <div className="xp-bar mb-2" style={{ height: '8px' }}>
          <div className="xp-fill" style={{ width: `${xpPercent}%`,
            background: `linear-gradient(90deg, ${title.color}88, ${title.color}, #f0d060)` }} />
        </div>
        <div className="flex justify-between text-xs" style={{ color: '#6b5d4f' }}>
          <span>{progress.xp} XP</span>
          <span>{nextTitle ? `${xpToNext} XP untuk ${nextTitle.name}` : 'MAX RANK!'}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Primogems', value: progress.xp, icon: '💎', color: '#f0d060' },
          { label: 'Pelajaran Selesai', value: `${progress.completedLessons.length}/${topics.reduce((s,t)=>s+t.lessons.length,0)}`, icon: '📜', color: '#64b5f6' },
          { label: 'Soal Terpecahkan', value: `${progress.solvedProblems.length}/${problems.length}`, icon: '⚔️', color: '#81c784' },
          { label: 'Streak Belajar', value: `${progress.streak} hari`, icon: '🔥', color: '#ff8a65' },
        ].map(s => (
          <div key={s.label} className="genshin-card p-4 text-center">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#6b5d4f' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Problem Progress by Difficulty */}
      <div className="genshin-card p-5 mb-6">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: '#c8a96e' }}>
          <span>⚔️</span> Progress Arena Pertarungan
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {diffStats.map(d => (
            <div key={d.label} className="p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,169,110,0.08)' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold" style={{ color: d.color }}>{d.label}</span>
                <span className="text-sm font-bold" style={{ color: '#e8dcc8' }}>{d.solved}/{d.total}</span>
              </div>
              <div className="xp-bar">
                <div className="xp-fill" style={{
                  width: `${d.total > 0 ? (d.solved/d.total)*100 : 0}%`,
                  background: `linear-gradient(90deg, ${d.color}88, ${d.color})`,
                }} />
              </div>
            </div>
          ))}
        </div>
        {progress.solvedProblems.length === 0 && (
          <div className="mt-4 text-center">
            <Link href="/latihan">
              <div className="inline-block btn-genshin">⚔️ Mulai Arena Pertarungan →</div>
            </Link>
          </div>
        )}
      </div>

      {/* Topic Progress */}
      <div className="genshin-card p-5 mb-6">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: '#c8a96e' }}>
          <span>📜</span> Progress Akademi Materi
        </h2>
        <div className="space-y-3">
          {topicsProgress.map(({ topic, done, total, pct }) => (
            <Link key={topic.id} href={`/materi/${topic.id}`} className="block group">
              <div className="flex items-center gap-3">
                <span className="text-base w-6 flex-shrink-0 text-center">{topic.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium transition-colors" style={{ color: '#a89880' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#c8a96e')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#a89880')}>
                      {topic.title}
                    </span>
                    <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#6b5d4f' }}>{done}/{total}</span>
                  </div>
                  <div className="xp-bar" style={{ height: '4px' }}>
                    <div className="xp-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="text-xs w-10 text-right flex-shrink-0" style={{ color: pct > 0 ? '#c8a96e' : '#4a3f35' }}>
                  {pct}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="genshin-card p-5">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: '#c8a96e' }}>
          <span>🎖️</span> Koleksi Pencapaian
          <span className="text-xs ml-2 px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(200,169,110,0.15)', color: '#c8a96e', border: '1px solid rgba(200,169,110,0.3)' }}>
            {earnedBadges.length}/{BADGES.length}
          </span>
        </h2>

        {earnedBadges.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-bold mb-2" style={{ color: '#6b5d4f' }}>✦ SUDAH DIRAIH</div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {earnedBadges.map(badge => (
                <div key={badge.id} className="p-3 rounded-xl text-center animate-glow"
                  style={{ background: `${badge.color}10`, border: `1px solid ${badge.color}40` }}>
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-bold leading-tight" style={{ color: badge.color }}>{badge.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#6b5d4f' }}>{badge.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="text-xs font-bold mb-2" style={{ color: '#4a3f35' }}>🔒 BELUM DIRAIH</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {lockedBadges.map(badge => (
              <div key={badge.id} className="p-3 rounded-xl text-center opacity-40"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,169,110,0.08)' }}>
                <div className="text-2xl mb-1 grayscale">{badge.icon}</div>
                <div className="text-xs font-bold leading-tight" style={{ color: '#6b5d4f' }}>{badge.name}</div>
                <div className="text-xs mt-0.5" style={{ color: '#4a3f35' }}>{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
