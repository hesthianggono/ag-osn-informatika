'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RESOURCE_GROUPS, PKD_CURRICULUM } from '@/lib/data/resources'
import { topics } from '@/lib/data/topics'

const TYPE_BADGE: Record<string, { label: string; color: string }> = {
  arsip:     { label: 'Arsip',      color: '#c8a96e' },
  materi:    { label: 'Materi',     color: '#26a69a' },
  judge:     { label: 'Judge',      color: '#66bb6a' },
  buku:      { label: 'Buku',       color: '#ce93d8' },
  video:     { label: 'Video',      color: '#4fc3f7' },
  komunitas: { label: 'Komunitas',  color: '#ff8a65' },
  tools:     { label: 'Tools',      color: '#ffd54f' },
}

export default function PustakaPage() {
  const [activeGroup, setActiveGroup] = useState<string>('all')

  const groups = activeGroup === 'all'
    ? RESOURCE_GROUPS
    : RESOURCE_GROUPS.filter(g => g.id === activeGroup)

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fadeIn">

      {/* Header */}
      <div className="mb-8">
        <div className="genshin-sep mb-4"><span>📚 PUSTAKA TOKI 📚</span></div>
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-text">Gerbang Sumber Resmi</span>
        </h1>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
          Tautan langsung ke semua arsip soal, materi, dan platform latihan <b>resmi TOKI/TLX</b> —
          tempat berlatih sesungguhnya untuk OSN Informatika 🎵
        </p>
      </div>

      {/* Info banner — kenapa link ke situs resmi */}
      <div className="venti-card p-4 mb-6" style={{ borderColor: 'rgba(38,166,154,0.3)' }}>
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🌿</span>
          <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            <span className="font-bold" style={{ color: 'var(--anemo-main)' }}>Tips dari Venti: </span>
            Latihan soal OSN paling baik dikerjakan <b>langsung di TLX</b> agar dapat verdict
            (Accepted / Wrong Answer) dan ranking nyata. Halaman ini menghubungkanmu ke
            semua sumber resmi. Untuk latihan terstruktur dengan pembahasan, gunakan tab{' '}
            <Link href="/latihan" className="underline" style={{ color: 'var(--anemo-bright)' }}>Latihan Tempur</Link>{' '}
            di app ini dulu, lalu naik level ke soal asli OSN di TLX!
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveGroup('all')}
          className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
          style={{
            background: activeGroup === 'all' ? 'rgba(38,166,154,0.15)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${activeGroup === 'all' ? 'rgba(38,166,154,0.4)' : 'rgba(38,166,154,0.12)'}`,
            color: activeGroup === 'all' ? 'var(--anemo-soft)' : 'var(--fg-dim)',
          }}>
          🌟 Semua
        </button>
        {RESOURCE_GROUPS.map(g => (
          <button key={g.id} onClick={() => setActiveGroup(g.id)}
            className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1"
            style={{
              background: activeGroup === g.id ? `${g.color}18` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeGroup === g.id ? `${g.color}66` : 'rgba(38,166,154,0.12)'}`,
              color: activeGroup === g.id ? g.color : 'var(--fg-dim)',
            }}>
            {g.icon} {g.title.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>

      {/* Resource groups */}
      <div className="space-y-6 mb-10">
        {groups.map(group => (
          <div key={group.id} className="venti-card p-5" style={{ borderColor: `${group.color}30` }}>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{group.icon}</span>
              <div>
                <h2 className="text-base font-bold" style={{ color: group.color }}>{group.title}</h2>
                <p className="text-xs" style={{ color: 'var(--fg-dim)' }}>{group.subtitle}</p>
              </div>
            </div>
            <div className="gold-divider" />
            <div className="grid md:grid-cols-2 gap-3">
              {group.links.map(link => {
                const badge = TYPE_BADGE[link.type]
                return (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-xl transition-all group"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(38,166,154,0.1)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${group.color}55`; e.currentTarget.style.background = `${group.color}0d` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(38,166,154,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)' }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{link.title}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded font-medium"
                          style={{ background: `${badge.color}18`, color: badge.color }}>{badge.label}</span>
                      </div>
                      <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>{link.desc}</div>
                    </div>
                    <span className="flex-shrink-0 text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: group.color }}>↗</span>
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* PKD Curriculum Map */}
      {activeGroup === 'all' && (
        <div className="venti-card p-5 mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">🗺️</span>
            <div>
              <h2 className="text-base font-bold" style={{ color: 'var(--anemo-main)' }}>
                Peta Kurikulum PKD (Pemrograman Kompetitif Dasar)
              </h2>
              <p className="text-xs" style={{ color: 'var(--fg-dim)' }}>
                Struktur belajar resmi TOKI — tiap bab terhubung ke materi di app ini
              </p>
            </div>
          </div>
          <div className="gold-divider" />
          <div className="grid md:grid-cols-2 gap-2">
            {PKD_CURRICULUM.map(chap => {
              const appTopic = chap.appTopicId ? topics.find(t => t.id === chap.appTopicId) : null
              return (
                <div key={chap.no} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(38,166,154,0.1)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ background: 'rgba(38,166,154,0.15)', color: 'var(--anemo-main)', border: '1px solid rgba(38,166,154,0.3)' }}>
                    {chap.no}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold mb-0.5" style={{ color: 'var(--fg)' }}>{chap.title}</div>
                    <div className="text-xs mb-1" style={{ color: 'var(--fg-dim)' }}>
                      {chap.topics.join(' · ')}
                    </div>
                    {appTopic && (
                      <Link href={`/materi/${appTopic.id}`}
                        className="text-xs font-medium inline-flex items-center gap-1"
                        style={{ color: 'var(--anemo-main)' }}>
                        {appTopic.icon} Pelajari di app →
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="venti-card p-6 text-center mb-8" style={{ background: 'rgba(38,166,154,0.05)' }}>
        <div className="text-3xl mb-2">🎵</div>
        <h3 className="text-base font-bold mb-2" style={{ color: 'var(--anemo-main)' }}>
          Strategi Belajar yang Disarankan
        </h3>
        <div className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
          <span className="font-bold" style={{ color: 'var(--anemo-soft)' }}>1.</span> Pelajari konsep di{' '}
          <Link href="/materi" className="underline" style={{ color: 'var(--anemo-bright)' }}>Akademi</Link> →{' '}
          <span className="font-bold" style={{ color: 'var(--anemo-soft)' }}>2.</span> Latihan terbimbing di{' '}
          <Link href="/latihan" className="underline" style={{ color: 'var(--anemo-bright)' }}>Latihan Tempur</Link> →{' '}
          <span className="font-bold" style={{ color: 'var(--anemo-soft)' }}>3.</span> Naik level ke soal asli OSN di{' '}
          <a href="https://tlx.toki.id/problems/problemsets?archive=osn" target="_blank" rel="noopener noreferrer"
            className="underline" style={{ color: 'var(--anemo-bright)' }}>TLX ↗</a> →{' '}
          <span className="font-bold" style={{ color: 'var(--anemo-soft)' }}>4.</span> Diskusi pembahasan di{' '}
          <a href="https://www.kujawab.com/" target="_blank" rel="noopener noreferrer"
            className="underline" style={{ color: 'var(--anemo-bright)' }}>Kujawab ↗</a>
        </div>
      </div>

      <div className="text-center py-4">
        <div className="genshin-sep"><span>𝄞 ♪ ♫</span></div>
        <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>
          Semua tautan mengarah ke sumber resmi TOKI/TLX & yang direkomendasikan di osn.toki.id/persiapan
        </div>
      </div>
    </div>
  )
}
