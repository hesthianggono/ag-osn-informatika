'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProgress, type UserProgress } from '@/lib/progress'
import { topics } from '@/lib/data/topics'
import { problems } from '@/lib/data/problems'
import VentiCharacter from '@/components/VentiCharacter'
import HeroCharacter from '@/components/HeroCharacter'
import AieshaPortrait from '@/components/AieshaPortrait'

const STAGES = [
  {
    short: 'OSN-K', name: 'OSN Kota/Kab',
    element: '🌿', color: '#66bb6a', border: 'rgba(102,187,106,0.35)',
    bg: 'rgba(102,187,106,0.06)', desc: 'Pilihan ganda · 2.5 jam',
    topics: ['Dasar C++', 'Sorting & Searching', 'Stack & Queue', 'Rekursi', 'Matematika', 'Greedy'],
  },
  {
    short: 'OSN-P', name: 'OSN Provinsi',
    element: '💧', color: '#4db6ac', border: 'rgba(77,182,172,0.35)',
    bg: 'rgba(77,182,172,0.06)', desc: '20-32 soal C++ · 3 jam',
    topics: ['Dynamic Programming', 'Graf BFS/DFS', 'Shortest Path', 'Tree', 'Divide & Conquer', 'Bit Manipulation'],
  },
  {
    short: 'OSN', name: 'OSN Nasional',
    element: '⚡', color: '#ce93d8', border: 'rgba(206,147,216,0.35)',
    bg: 'rgba(206,147,216,0.06)', desc: '2 hari × 3 soal × 5 jam',
    topics: ['Segment Tree', 'DSU', 'KMP / Z-Algo', 'Advanced DP', 'Graf Lanjutan', 'Trie'],
  },
  {
    short: 'IOI', name: 'Level IOI',
    element: '👑', color: '#c8a96e', border: 'rgba(200,169,110,0.4)',
    bg: 'rgba(200,169,110,0.06)', desc: 'Olimpiade Internasional',
    topics: ['HLD', 'Centroid Decomp', 'Persistent DS', 'Suffix Array', 'Network Flow', 'Geometry'],
  },
]

const TIPS = [
  '♪ Mulai dari C++ dasar meski sudah merasa bisa — fondasi kuat = perjalanan lancar!',
  '🌿 Latihan 1 soal tiap hari lebih efektif dari 10 soal seminggu sekali.',
  '⟡ Saat baca soal, tanyakan: ini DP, Graf, Greedy, atau Struktur Data?',
  '🎵 Implementasikan setiap algoritma dari nol minimal satu kali.',
  '💧 Di kompetisi, mulai dari soal termudah untuk kumpulkan poin.',
  '✦ Pahami proof correctness setiap greedy yang kamu pakai.',
  '♫ Codeforces Div.4 → Div.3 → Div.2 adalah jalur latihan terbaik.',
]

const AR_TITLES = [
  { min: 0,     name: 'Novice Traveler', emoji: '🌱', color: '#66bb6a' },
  { min: 1000,  name: 'Adventurer',      emoji: '⚔️', color: '#4db6ac' },
  { min: 2500,  name: 'Journeyman',      emoji: '🌿', color: '#4db6ac' },
  { min: 5000,  name: 'Grand Voyager',   emoji: '⭐', color: '#ce93d8' },
  { min: 8000,  name: 'Master Traveler', emoji: '💎', color: '#c8a96e' },
  { min: 12000, name: 'OSN Champion',    emoji: '👑', color: '#f0d060' },
]
const getTitle = (xp: number) => [...AR_TITLES].reverse().find(t => xp >= t.min) ?? AR_TITLES[0]

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [tipIdx, setTipIdx] = useState(0)

  useEffect(() => {
    setProgress(getProgress())
    const onUpdate = (e: Event) => setProgress((e as CustomEvent).detail)
    window.addEventListener('ag-progress-update', onUpdate)
    const iv = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 5000)
    return () => { window.removeEventListener('ag-progress-update', onUpdate); clearInterval(iv) }
  }, [])

  const title = progress ? getTitle(progress.xp) : AR_TITLES[0]
  const nextTitle = AR_TITLES.find(t => t.min > (progress?.xp ?? 0))
  const xpPercent = progress && nextTitle
    ? Math.min(100, ((progress.xp - title.min) / (nextTitle.min - title.min)) * 100)
    : 95

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fadeIn">

      {/* ══════════════════════════════
          HERO SECTION with Venti
          ══════════════════════════════ */}
      <div className="mb-8 relative">
        {/* Anemo background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div style={{
            position: 'absolute', top: '-40px', right: '-20px',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(38,166,154,0.08), transparent 70%)',
          }} />
        </div>

        {/* Welcome text + Venti companion */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-5">
          <div className="flex-1">
            <div className="text-xs tracking-widest font-bold mb-2" style={{ color: 'var(--fg-dim)' }}>
              ♪ AG · AKADEMI INFORMATIKA OSN · MONDSTADT EDITION
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
              <span className="gradient-text">Selamat Datang,</span>
              <br />
              <span className="gradient-text-gold">AIESHA</span>
              <span style={{ color: 'var(--fg)' }}>! 🌿🔥</span>
            </h1>
            <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
              Kuasai algoritma, taklukkan OSN —<br />
              dengan angin Mondstadt & semangat api yang membara ✨
            </p>
          </div>

          {/* AIESHA Portrait (close-up) + Venti companion */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <AieshaPortrait size={170} />
            <div className="scale-90 origin-top">
              <VentiCharacter size="sm" showQuote={true} />
            </div>
          </div>
        </div>

        {/* ── Hero Character Card (putri pengguna) ── */}
        <HeroCharacter />
      </div>

      {/* ── Rotating Tip ── */}
      <div className="mb-6 px-4 py-3 rounded-xl flex items-center gap-3 animate-glow"
        style={{ background: 'rgba(38,166,154,0.06)', border: '1px solid rgba(38,166,154,0.2)' }}>
        <span className="text-base flex-shrink-0">🎵</span>
        <p className="text-sm" style={{ color: 'var(--anemo-soft)' }}>{TIPS[tipIdx]}</p>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Materi',    value: topics.length,   icon: '📜', color: 'var(--anemo-main)' },
          { label: 'Total Soal',      value: problems.length, icon: '⚔️', color: 'var(--venti-green)' },
          { label: 'Tingkat Seleksi', value: 4,               icon: '🏆', color: 'var(--venti-gold)' },
          { label: 'Bahasa C++',      value: '⚡',             icon: '💻', color: 'var(--venti-sky)' },
        ].map(s => (
          <div key={s.label} className="venti-card p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--fg-dim)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Progress (jika ada) ── */}
      {progress && (
        <div className="venti-card p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span>📊</span>
            <h2 className="text-sm font-bold" style={{ color: 'var(--anemo-main)' }}>
              Jurnal Petualanganmu — Mondstadt
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Pelajaran', val: progress.completedLessons.length,
                total: topics.reduce((s,t)=>s+t.lessons.length,0), icon: '📜', c: 'var(--anemo-main)' },
              { label: 'Soal Selesai', val: progress.solvedProblems.length,
                total: problems.length, icon: '⚔️', c: 'var(--venti-green)' },
              { label: 'Primogems', val: progress.xp, total: null, icon: '💎', c: 'var(--venti-gold)' },
              { label: 'Streak', val: progress.streak, total: null, icon: '🔥', c: '#ff8a65', suffix: ' hari' },
            ].map(item => (
              <div key={item.label} className="text-center p-3 rounded-xl"
                style={{ background: 'rgba(38,166,154,0.04)', border: '1px solid rgba(38,166,154,0.1)' }}>
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="text-xl font-black" style={{ color: item.c }}>
                  {item.val}{item.suffix ?? ''}
                  {item.total ? <span className="text-xs font-normal" style={{ color: 'var(--fg-dim)' }}>/{item.total}</span> : null}
                </div>
                <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="gold-divider" />
          <div className="flex gap-3 flex-wrap">
            <Link href="/progress"><div className="btn-venti">📊 Jurnal Lengkap →</div></Link>
            <Link href="/simulasi"><div className="btn-venti">🔮 Simulasi Ujian →</div></Link>
          </div>
        </div>
      )}

      {/* ── Jalur OSN ── */}
      <div className="mb-8">
        <div className="genshin-sep mb-5"><span>♪ JALUR MENUJU OSN NASIONAL ♪</span></div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STAGES.map((stage, i) => (
            <div key={stage.short} className="venti-card p-5 relative overflow-hidden"
              style={{ border: `1px solid ${stage.border}`, background: stage.bg }}>
              <div className="absolute top-0 right-0 w-16 h-16 opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${stage.color}, transparent)` }} />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{stage.element}</span>
                <div>
                  <div className="text-xs font-black tracking-wider" style={{ color: stage.color }}>{stage.short}</div>
                  <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>Tahap #{i+1}</div>
                </div>
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: 'var(--fg)' }}>{stage.name}</div>
              <div className="text-xs mb-3" style={{ color: 'var(--fg-dim)' }}>{stage.desc}</div>
              <div className="space-y-1">
                {stage.topics.map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--fg-muted)' }}>
                    <span style={{ color: stage.color }}>▸</span> {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div className="mb-8">
        <div className="genshin-sep mb-5"><span>♫ MULAI PETUALANGAN ♫</span></div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: '/materi', icon: '📜', title: 'Pustaka Pengetahuan',
              desc: 'Pelajari dari C++ dasar hingga advanced IOI', sub: `${topics.length} topik`, c: 'var(--anemo-main)', bg: 'rgba(38,166,154,0.06)' },
            { href: '/latihan', icon: '⚔️', title: 'Arena Pertarungan',
              desc: 'Soal OSN dari Mudah hingga Level IOI', sub: `${problems.length} soal + solusi`, c: 'var(--venti-green)', bg: 'rgba(102,187,106,0.06)' },
            { href: '/simulasi', icon: '🔮', title: 'Ruang Ujian Teyvat',
              desc: 'Simulasi ujian OSN dengan timer nyata', sub: 'OSN-K / OSN-P / Nasional', c: '#ce93d8', bg: 'rgba(206,147,216,0.06)' },
          ].map(item => (
            <Link key={item.href} href={item.href}>
              <div className="venti-card p-6 h-full cursor-pointer" style={{ background: item.bg }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-base font-black mb-1" style={{ color: item.c }}>{item.title}</div>
                <div className="text-xs mb-3" style={{ color: 'var(--fg-muted)' }}>{item.desc}</div>
                <div className="text-xs font-bold" style={{ color: item.c }}>{item.sub} →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Info Format OSN ── */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="venti-card p-5">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--anemo-main)' }}>
            <span>📋</span> Format Seleksi OSN Informatika
          </h3>
          <div className="space-y-2.5">
            {[
              { stage: 'OSN-K', c: '#66bb6a', info: 'Pilihan ganda + isian singkat', time: '2,5 jam' },
              { stage: 'OSN-P', c: 'var(--anemo-main)', info: '20-32 soal pemrograman', time: '3 jam' },
              { stage: 'Semi-Final', c: '#ce93d8', info: '100 peserta terbaik nasional', time: '5 jam/hari' },
              { stage: 'Final', c: '#c8a96e', info: '60 peserta, 2 hari, format IOI', time: '5 jam/hari' },
            ].map(item => (
              <div key={item.stage} className="flex items-start gap-3 p-2.5 rounded-lg"
                style={{ background: 'rgba(38,166,154,0.03)' }}>
                <span className="text-xs font-black px-2 py-0.5 rounded"
                  style={{ background: `${item.c}18`, color: item.c }}>{item.stage}</span>
                <div>
                  <div className="text-xs" style={{ color: 'var(--fg)' }}>{item.info}</div>
                  <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>{item.time} · C++</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="venti-card p-5">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--anemo-main)' }}>
            <span>🌿</span> Tips Belajar ala Mondstadt
          </h3>
          <div className="space-y-2">
            {[
              { tip: 'Kuasai C++ STL dengan sangat mendalam', tag: 'Wajib',   tc: '#ef9a9a' },
              { tip: 'Hafalkan Big-O setiap algoritma',         tag: 'Wajib',   tc: '#ef9a9a' },
              { tip: 'Latihan Codeforces setiap hari',          tag: 'Penting', tc: '#ffd54f' },
              { tip: 'Pelajari soal OSN tahun sebelumnya',      tag: 'Penting', tc: '#ffd54f' },
              { tip: 'Bergabung komunitas TOKI / Discord CP',   tag: 'Saran',   tc: 'var(--anemo-main)' },
              { tip: 'Baca CP3 – Steven Halim',                 tag: 'Bonus',   tc: 'var(--fg-muted)' },
            ].map(item => (
              <div key={item.tip} className="flex items-start gap-2 text-xs">
                <span className="px-1.5 py-0.5 rounded font-bold flex-shrink-0 mt-0.5"
                  style={{ background: `${item.tc}18`, color: item.tc }}>{item.tag}</span>
                <span style={{ color: 'var(--fg-muted)' }}>{item.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <div className="genshin-sep"><span>𝄞 ♪ ♫ ♩ ♬</span></div>
        <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>
          AG Akademi OSN Informatika · Venti Edition · osn.toki.id · IOI Syllabus 2026 🌿
        </div>
      </div>
    </div>
  )
}
