'use client'

import { useEffect, useState } from 'react'
import { getProgress, HERO_NAME, type UserProgress } from '@/lib/progress'

// Adventure Rank tiers (selaras dengan dashboard)
const AR_TITLES = [
  { min: 0,     name: 'Novice Traveler', emoji: '🌱', color: '#66bb6a' },
  { min: 1000,  name: 'Adventurer',      emoji: '⚔️', color: '#4db6ac' },
  { min: 2500,  name: 'Journeyman',      emoji: '🌿', color: '#4db6ac' },
  { min: 5000,  name: 'Grand Voyager',   emoji: '⭐', color: '#ce93d8' },
  { min: 8000,  name: 'Master Traveler', emoji: '💎', color: '#c8a96e' },
  { min: 12000, name: 'OSN Champion',    emoji: '👑', color: '#f0d060' },
]
const getTitle = (xp: number) => [...AR_TITLES].reverse().find(t => xp >= t.min) ?? AR_TITLES[0]
const getAR = (xp: number) => Math.min(Math.floor(xp / 1000) + 1, 60)

export default function HeroCharacter() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [imgReady, setImgReady] = useState(false)

  useEffect(() => {
    setProgress(getProgress())
    fetch('/hero.png', { method: 'HEAD' })
      .then(r => setImgReady(r.ok))
      .catch(() => setImgReady(false))
    const onUpdate = (e: Event) => setProgress((e as CustomEvent).detail)
    window.addEventListener('ag-progress-update', onUpdate)
    return () => window.removeEventListener('ag-progress-update', onUpdate)
  }, [])

  if (!progress) return null

  const title = getTitle(progress.xp)
  const ar = getAR(progress.xp)
  const nextTitle = AR_TITLES.find(t => t.min > progress.xp)
  const xpInLevel = nextTitle ? progress.xp - title.min : progress.xp
  const xpNeeded = nextTitle ? nextTitle.min - title.min : progress.xp
  const xpPercent = nextTitle ? Math.min(100, (xpInLevel / xpNeeded) * 100) : 100

  return (
    <div className="venti-card p-0 overflow-hidden relative"
      style={{ border: '1px solid rgba(38,166,154,0.35)' }}>

      {/* Dual-element glow background: Anemo (teal) + Pyro (orange) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 60% at 25% 30%, rgba(38,166,154,0.15), transparent 60%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(239,83,80,0.13), transparent 60%)'
      }} />

      <div className="relative flex flex-col sm:flex-row gap-4 p-5">

        {/* ── Character Portrait ── */}
        <div className="flex-shrink-0 relative mx-auto sm:mx-0">
          <div className="relative" style={{ width: 150, height: 190 }}>
            {/* Element ring behind */}
            <div className="absolute inset-0 rounded-2xl animate-glow" style={{
              background: 'conic-gradient(from 0deg, rgba(38,166,154,0.3), rgba(239,83,80,0.3), rgba(38,166,154,0.3))',
              padding: '2px',
            }}>
              <div className="w-full h-full rounded-2xl" style={{ background: 'rgba(6,12,18,0.9)' }} />
            </div>

            {/* Photo */}
            <div className="absolute inset-[3px] rounded-2xl overflow-hidden flex items-end justify-center"
              style={{ background: 'linear-gradient(160deg, rgba(38,166,154,0.08), rgba(239,83,80,0.06))' }}>
              {imgReady ? (
                <img src="/hero.png" alt="Hero" className="object-contain w-full h-full animate-floatSlow"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(38,166,154,0.4))' }} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center px-2">
                  <div className="text-4xl mb-2 animate-floatSlow">🦸‍♀️</div>
                  <div className="text-xs" style={{ color: 'var(--anemo-main)' }}>Foto Hero</div>
                  <div className="text-[0.6rem] mt-1" style={{ color: 'var(--fg-dim)' }}>
                    Simpan hero.png<br />ke folder public/
                  </div>
                </div>
              )}
            </div>

            {/* Vision badge (logo Anemo+Pyro) */}
            <div className="absolute -top-3 -right-3 w-11 h-11 animate-floatSlow"
              title="Vision: Anemo + Pyro">
              <img src="/logo.png" alt="Vision" className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(38,166,154,0.6)) drop-shadow(0 0 10px rgba(239,83,80,0.4))' }} />
            </div>
          </div>
        </div>

        {/* ── Character Info ── */}
        <div className="flex-1 min-w-0">
          {/* Name (locked: AIESHA) */}
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-black truncate gradient-text">
              {HERO_NAME}
            </h2>
            <span className="text-base">🌟</span>
          </div>

          {/* Title + AR */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">{title.emoji}</span>
            <span className="text-sm font-bold" style={{ color: title.color }}>{title.name}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
              style={{ background: 'rgba(38,166,154,0.15)', color: 'var(--anemo-main)', border: '1px solid rgba(38,166,154,0.3)' }}>
              AR {ar}
            </span>
          </div>

          {/* Element Vision (logo Anemo+Pyro) */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg font-semibold"
              style={{ background: 'linear-gradient(135deg, rgba(38,166,154,0.12), rgba(239,83,80,0.12))', border: '1px solid rgba(38,166,154,0.35)' }}>
              <img src="/logo.png" alt="Vision" className="w-5 h-5 object-contain"
                style={{ filter: 'drop-shadow(0 0 4px rgba(38,166,154,0.5))' }} />
              <span className="text-xs" style={{ color: 'var(--anemo-soft)' }}>Anemo</span>
              <span className="text-xs" style={{ color: 'var(--fg-dim)' }}>·</span>
              <span className="text-xs" style={{ color: '#ff8a65' }}>Pyro</span>
              <span className="text-xs" style={{ color: 'var(--fg-dim)' }}>Vision</span>
            </span>
          </div>

          {/* Total EXP */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>Total Experience</span>
              <span className="text-sm font-black gradient-text">{progress.xp.toLocaleString('id-ID')} EXP</span>
            </div>
            <div className="xp-bar" style={{ height: '7px' }}>
              <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
            </div>
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--fg-dim)' }}>
              <span>AR {ar}</span>
              <span>{nextTitle ? `${(nextTitle.min - progress.xp).toLocaleString('id-ID')} EXP → ${nextTitle.name}` : '🏆 Rank Maksimum!'}</span>
            </div>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { icon: '📜', val: progress.completedLessons.length, label: 'Materi' },
              { icon: '⚔️', val: progress.solvedProblems.length, label: 'Soal' },
              { icon: '🔥', val: progress.streak, label: 'Streak' },
            ].map(s => (
              <div key={s.label} className="text-center py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(38,166,154,0.1)' }}>
                <div className="text-xs">{s.icon}</div>
                <div className="text-sm font-black" style={{ color: 'var(--anemo-main)' }}>{s.val}</div>
                <div className="text-[0.6rem]" style={{ color: 'var(--fg-dim)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
