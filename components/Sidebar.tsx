'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getProgress, type UserProgress } from '@/lib/progress'
import VentiCharacter from './VentiCharacter'

const navItems = [
  { href: '/',          icon: '🏔️', label: 'Peta Dunia',      sub: 'Dashboard' },
  { href: '/materi',    icon: '📜', label: 'Akademi',          sub: 'Materi Belajar' },
  { href: '/latihan',   icon: '⚔️', label: 'Latihan Tempur',  sub: 'Soal Latihan' },
  { href: '/simulasi',  icon: '🔮', label: 'Ujian Besar',      sub: 'Simulasi OSN' },
  { href: '/arsip',     icon: '🗝️', label: 'Arsip Legenda',   sub: 'Arsip OSN' },
  { href: '/pustaka',   icon: '📚', label: 'Pustaka TOKI',     sub: 'Sumber Resmi TLX' },
  { href: '/progress',  icon: '📊', label: 'Jurnal Hero',      sub: 'Progress Saya' },
  { href: '/roadmap',   icon: '🗺️', label: 'Peta Perjalanan', sub: 'Roadmap' },
]

const AR_NAMES = [
  'Novice Traveler', 'Adventurer', 'Journeyman',
  'Grand Voyager', 'Elite Voyager', 'Master Traveler',
  'OSN Champion', 'Archon of Code',
]
const AR_COLORS = [
  '#66bb6a', '#64b5f6', '#64b5f6',
  '#ce93d8', '#ce93d8', '#c8a96e',
  '#f0d060', '#f0d060',
]

function getRank(xp: number): { name: string; color: string; level: number } {
  const idx = Math.min(Math.floor(xp / 1000), AR_NAMES.length - 1)
  return { name: AR_NAMES[idx], color: AR_COLORS[idx], level: idx + 1 }
}

export default function Sidebar() {
  const pathname  = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [hasLogo, setHasLogo] = useState(false)

  useEffect(() => {
    setProgress(getProgress())
    fetch('/logo.png', { method: 'HEAD' }).then(r => setHasLogo(r.ok)).catch(() => setHasLogo(false))
    const refresh = () => setProgress(getProgress())
    const onUpdate = (e: Event) => setProgress((e as CustomEvent).detail)
    window.addEventListener('focus', refresh)
    window.addEventListener('ag-progress-update', onUpdate)
    return () => {
      window.removeEventListener('focus', refresh)
      window.removeEventListener('ag-progress-update', onUpdate)
    }
  }, [])

  const rank = progress ? getRank(progress.xp) : { name: 'Novice Traveler', color: '#66bb6a', level: 1 }
  const xpPercent = progress ? Math.min(100, (progress.xp % 1000) / 10) : 0

  const SIDEBAR_BG = 'linear-gradient(180deg, #050d15 0%, #070f18 40%, #050d12 100%)'
  const BORDER_COLOR = 'rgba(38,166,154,0.18)'

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setMobileOpen(v => !v)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg text-sm shadow-xl"
        style={{ background: 'rgba(5,15,25,0.95)', border: '1px solid rgba(38,166,154,0.4)', color: 'var(--anemo-main)' }}>
        {mobileOpen ? '✕' : '☰'}
      </button>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/70 z-30" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 z-40 flex flex-col
          transition-transform duration-300 overflow-hidden
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ background: SIDEBAR_BG, borderRight: `1px solid ${BORDER_COLOR}`, boxShadow: '4px 0 40px rgba(0,0,0,0.7)' }}>

        {/* Top shimmer line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #26a69a, #4fc3f7, #26a69a, transparent)' }} />

        {/* ── Logo ── */}
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}>
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <div className="flex items-center gap-3">
              {hasLogo ? (
                <div className="w-11 h-11 flex items-center justify-center relative animate-floatSlow">
                  <img src="/logo.png" alt="AG Logo" className="w-full h-full object-contain"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(38,166,154,0.5)) drop-shadow(0 0 14px rgba(239,83,80,0.3))' }} />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #26a69a, #00e5d1, #4db6ac)',
                    color: '#050d15',
                    boxShadow: '0 0 18px rgba(38,166,154,0.5)',
                  }}>
                  AG
                  <div className="absolute inset-0 opacity-30"
                    style={{ background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.3), transparent)', backgroundSize: '200% 200%', animation: 'anemoShimmer 2s linear infinite' }} />
                </div>
              )}
              <div>
                <div className="text-xs font-bold tracking-widest" style={{ color: 'var(--anemo-main)', letterSpacing: '0.1em' }}>
                  AKADEMI OSN
                </div>
                <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>
                  Informatika · Mondstadt Ed.
                </div>
              </div>
            </div>
          </Link>
          {/* Anemo stars */}
          <div className="flex gap-1 mt-2" style={{ color: 'var(--anemo-main)', opacity: 0.4, fontSize: '8px' }}>
            ♪ ✦ ♫ ✦ 𝄞 ✦ ♩
          </div>
        </div>

        {/* ── Nav Items ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {navItems.map(item => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl relative transition-all duration-150 group"
                  style={active ? {
                    background: 'linear-gradient(135deg, rgba(38,166,154,0.18), rgba(38,166,154,0.06))',
                    border: '1px solid rgba(38,166,154,0.38)',
                    color: 'var(--anemo-soft)',
                  } : {
                    border: '1px solid transparent',
                    color: 'var(--fg-dim)',
                  }}>
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                      style={{ background: 'var(--anemo-bright)', boxShadow: '0 0 8px var(--anemo-main)' }} />
                  )}
                  <span className="text-base leading-none">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold leading-tight"
                      style={{ color: active ? 'var(--anemo-soft)' : 'var(--fg-muted)' }}>
                      {item.label}
                    </div>
                    <div className="text-xs opacity-50 leading-tight">{item.sub}</div>
                  </div>
                  {active && <span style={{ color: 'var(--anemo-bright)', fontSize: '8px' }}>✦</span>}
                </div>
              </Link>
            )
          })}

          {/* ── Adventure Rank Panel ── */}
          <div className="mt-4 p-3 rounded-xl genshin-corner"
            style={{ background: 'rgba(38,166,154,0.04)', border: '1px solid rgba(38,166,154,0.18)' }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs font-bold" style={{ color: rank.color }}>{rank.name}</div>
                <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>AR {rank.level} · Mondstadt</div>
              </div>
              <div className="text-2xl animate-floatSlow">
                {rank.level >= 7 ? '👑' : rank.level >= 5 ? '⭐' : rank.level >= 3 ? '🌿' : '🎵'}
              </div>
            </div>
            <div className="xp-bar mb-1.5">
              <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
            </div>
            <div className="flex justify-between text-xs" style={{ color: 'var(--fg-dim)' }}>
              <span>{progress?.xp ?? 0} Primogems</span>
              {(progress?.streak ?? 0) > 0 && (
                <span style={{ color: '#ff8a65' }}>🔥 {progress?.streak}hari</span>
              )}
            </div>
            <Link href="/progress" onClick={() => setMobileOpen(false)}>
              <div className="mt-2 text-center text-xs py-1.5 rounded-lg transition-all cursor-pointer"
                style={{ background: 'rgba(38,166,154,0.12)', border: '1px solid rgba(38,166,154,0.25)', color: 'var(--anemo-soft)' }}>
                ♪ Buka Jurnal Hero
              </div>
            </Link>
          </div>
        </nav>

        {/* ── Venti Character Section ── */}
        <div className="flex flex-col items-center pb-2 pt-1"
          style={{ borderTop: `1px solid ${BORDER_COLOR}` }}>
          <VentiCharacter size="sm" showQuote={false} />
          <div className="text-center px-3 py-1">
            <div className="text-xs font-bold" style={{ color: 'var(--anemo-main)' }}>Venti</div>
            <div className="text-xs" style={{ color: 'var(--fg-dim)', fontSize: '0.6rem' }}>
              Bard · Archon Anemo
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="px-3 py-2" style={{ borderTop: `1px solid ${BORDER_COLOR}` }}>
          <div className="text-center text-xs" style={{ color: 'var(--fg-dim)', fontSize: '0.6rem' }}>
            <a href="https://osn.toki.id" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--anemo-main)', opacity: 0.7 }}>
              osn.toki.id ↗
            </a>
          </div>
        </div>

        {/* Bottom shimmer */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #26a69a, transparent)' }} />
      </aside>
    </>
  )
}
