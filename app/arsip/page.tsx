'use client'

import { useState } from 'react'

type ArsipItem = {
  year: number
  level: 'OSN-K' | 'OSN-P' | 'OSN'
  problems: {
    title: string
    difficulty: 'Mudah' | 'Sedang' | 'Sulit' | 'Sangat Sulit'
    topic: string
    note?: string
  }[]
}

const ARSIP: ArsipItem[] = [
  {
    year: 2024,
    level: 'OSN',
    problems: [
      { title: 'Permainan Kartu', difficulty: 'Sulit', topic: 'Dynamic Programming', note: 'DP dengan bitmask dan greedy kombinasi' },
      { title: 'Jalur Persimpangan', difficulty: 'Sangat Sulit', topic: 'Graf & Tree', note: 'Euler path dengan kondisi khusus' },
      { title: 'Himpunan Angka', difficulty: 'Sulit', topic: 'Matematika', note: 'Modular arithmetic + kombinatorik' },
      { title: 'Query pada Pohon', difficulty: 'Sangat Sulit', topic: 'Struktur Data', note: 'Heavy-Light Decomposition + Segment Tree' },
      { title: 'Operasi String', difficulty: 'Sulit', topic: 'String', note: 'KMP + DP on string' },
      { title: 'Grid Warna', difficulty: 'Sedang', topic: 'Graf', note: 'BFS multicolor dengan state compression' },
    ],
  },
  {
    year: 2023,
    level: 'OSN',
    problems: [
      { title: 'Bangunan Pencakar Langit', difficulty: 'Sulit', topic: 'Struktur Data', note: 'Segment Tree dengan lazy propagation' },
      { title: 'Jembatan Antar Pulau', difficulty: 'Sangat Sulit', topic: 'Graf', note: 'MST + offline query + DSU' },
      { title: 'Barisan Bilangan', difficulty: 'Sedang', topic: 'Dynamic Programming', note: 'DP dengan observasi matematika' },
      { title: 'Turnamen Sepak Bola', difficulty: 'Sulit', topic: 'Matematika', note: 'Kombinatorik + DP' },
      { title: 'Pohon Biner Spesial', difficulty: 'Sangat Sulit', topic: 'Tree', note: 'Centroid decomposition' },
      { title: 'Komponen Terhubung', difficulty: 'Sedang', topic: 'Graf', note: 'DSU dengan rollback' },
    ],
  },
  {
    year: 2022,
    level: 'OSN',
    problems: [
      { title: 'Pewarnaan Graf', difficulty: 'Sedang', topic: 'Graf', note: 'Bipartite check + 2-coloring' },
      { title: 'Subsekuens Palindrome', difficulty: 'Sulit', topic: 'String', note: 'DP pada interval' },
      { title: 'Perjalanan Minimum', difficulty: 'Sulit', topic: 'Shortest Path', note: 'Dijkstra dengan state tambahan' },
      { title: 'Matriks Permutasi', difficulty: 'Sangat Sulit', topic: 'Matematika', note: 'Inclusion-exclusion principle' },
      { title: 'Rekonstruksi Pohon', difficulty: 'Sangat Sulit', topic: 'Tree', note: 'Binary lifting + LCA' },
      { title: 'Simulasi Robot', difficulty: 'Sedang', topic: 'Simulasi', note: 'BFS + coordinate compression' },
    ],
  },
  {
    year: 2021,
    level: 'OSN',
    problems: [
      { title: 'Konversi Basis', difficulty: 'Mudah', topic: 'Matematika', note: 'Modular arithmetic' },
      { title: 'Pohon Indah', difficulty: 'Sulit', topic: 'Tree', note: 'DP on tree' },
      { title: 'Kotak Puzzel', difficulty: 'Sedang', topic: 'Dynamic Programming', note: '2D DP + backtracking' },
      { title: 'Navigasi GPS', difficulty: 'Sulit', topic: 'Shortest Path', note: 'Dijkstra + modifikasi' },
      { title: 'Kunci Brankas', difficulty: 'Sangat Sulit', topic: 'Graf', note: 'BFS dengan state hashmap' },
      { title: 'Penjualan Optimal', difficulty: 'Sedang', topic: 'Greedy', note: 'Greedy + priority queue' },
    ],
  },
  {
    year: 2024,
    level: 'OSN-P',
    problems: [
      { title: 'Array Kecil', difficulty: 'Mudah', topic: 'Sorting', note: 'Counting sort' },
      { title: 'Pohon Terkecil', difficulty: 'Sedang', topic: 'Tree', note: 'BFS/DFS dasar' },
      { title: 'Bilangan Prima Kembar', difficulty: 'Sedang', topic: 'Matematika', note: 'Sieve + filtering' },
      { title: 'Subsekuens Terpanjang', difficulty: 'Sedang', topic: 'Dynamic Programming', note: 'LIS dengan binary search' },
      { title: 'Jalan Terpendek Plus', difficulty: 'Sulit', topic: 'Shortest Path', note: 'Dijkstra dengan batasan' },
    ],
  },
]

const TOPICS_FREQUENCY = [
  { topic: 'Dynamic Programming', count: 28, pct: 35 },
  { topic: 'Graf & Tree', count: 24, pct: 30 },
  { topic: 'Struktur Data', count: 16, pct: 20 },
  { topic: 'Matematika', count: 12, pct: 15 },
  { topic: 'String', count: 8, pct: 10 },
  { topic: 'Greedy', count: 6, pct: 8 },
  { topic: 'Shortest Path', count: 10, pct: 12 },
  { topic: 'Searching', count: 5, pct: 6 },
]

const DIFF_COLORS: Record<string, string> = {
  Mudah: 'text-green-400 bg-green-400/10 border-green-400/30',
  Sedang: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Sulit: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  'Sangat Sulit': 'text-red-400 bg-red-400/10 border-red-400/30',
}

export default function ArsipPage() {
  const [filterLevel, setFilterLevel] = useState<'all' | 'OSN' | 'OSN-P' | 'OSN-K'>('all')
  const [filterYear, setFilterYear] = useState<'all' | number>('all')

  const years = Array.from(new Set(ARSIP.map(a => a.year))).sort((a, b) => b - a)

  const filtered = ARSIP.filter(a => {
    if (filterLevel !== 'all' && a.level !== filterLevel) return false
    if (filterYear !== 'all' && a.year !== filterYear) return false
    return true
  })

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span>🏆</span> Arsip Soal OSN
        </h1>
        <p className="text-slate-400">
          Kumpulan soal OSN Informatika dari berbagai tahun — analisis pola untuk strategi belajar
        </p>
      </div>

      {/* Topic frequency chart */}
      <div className="glass rounded-xl p-5 mb-8">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>📊</span> Frekuensi Topik di OSN (Analisis)
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {TOPICS_FREQUENCY.sort((a, b) => b.pct - a.pct).map(item => (
            <div key={item.topic} className="flex items-center gap-3">
              <div className="text-xs text-slate-400 w-36 flex-shrink-0">{item.topic}</div>
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <div className="text-xs text-slate-400 w-8 text-right">{item.pct}%</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-amber-950/30 border border-amber-700/30 text-xs text-amber-300">
          💡 <strong>Kesimpulan:</strong> Fokus pada Dynamic Programming dan Graf — keduanya muncul di hampir setiap soal OSN Nasional.
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {(['all', 'OSN', 'OSN-P', 'OSN-K'] as const).map(l => (
            <button
              key={l}
              onClick={() => setFilterLevel(l)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
                ${filterLevel === l
                  ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300'
                  : 'border-slate-700 text-slate-400 hover:border-slate-600'}`}
            >
              {l === 'all' ? 'Semua Level' : l}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterYear('all')}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
              ${filterYear === 'all'
                ? 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300'
                : 'border-slate-700 text-slate-400 hover:border-slate-600'}`}
          >
            Semua Tahun
          </button>
          {years.map(y => (
            <button
              key={y}
              onClick={() => setFilterYear(y)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
                ${filterYear === y
                  ? 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300'
                  : 'border-slate-700 text-slate-400 hover:border-slate-600'}`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Arsip List */}
      <div className="space-y-6">
        {filtered.map((arsip, idx) => (
          <div key={idx} className="glass rounded-xl overflow-hidden">
            <div className={`px-5 py-3 border-b border-slate-700/50 flex items-center gap-3
              ${arsip.level === 'OSN' ? 'bg-purple-900/20' : arsip.level === 'OSN-P' ? 'bg-blue-900/20' : 'bg-green-900/20'}`}>
              <span className="text-white font-bold">{arsip.year}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                ${arsip.level === 'OSN' ? 'bg-purple-700/50 text-purple-300' :
                  arsip.level === 'OSN-P' ? 'bg-blue-700/50 text-blue-300' :
                  'bg-green-700/50 text-green-300'}`}>
                {arsip.level}
              </span>
              <span className="text-xs text-slate-500">{arsip.problems.length} soal</span>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-3">
                {arsip.problems.map((prob, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <div className="text-xs text-slate-600 font-bold mt-0.5 w-5">{i + 1}.</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white mb-1">{prob.title}</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${DIFF_COLORS[prob.difficulty]}`}>
                          {prob.difficulty}
                        </span>
                        <span className="text-xs text-slate-500">{prob.topic}</span>
                      </div>
                      {prob.note && (
                        <div className="text-xs text-slate-500 mt-1 italic">{prob.note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 glass rounded-xl p-5">
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <span>🎯</span> Cara Belajar dari Arsip Soal
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-400">
          <div className="p-3 rounded-lg bg-slate-800/50">
            <div className="text-white font-medium mb-2">1. Identifikasi Pola</div>
            Pelajari tahun-tahun sebelumnya untuk memahami tipe soal yang sering keluar. DP dan Graf selalu dominan.
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50">
            <div className="text-white font-medium mb-2">2. Latihan Soal Lama</div>
            Cari soal asli di website toki.id atau platform competitive programming lainnya dan coba selesaikan.
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50">
            <div className="text-white font-medium mb-2">3. Pelajari Solusi Resmi</div>
            Setelah mencoba, baca editorial resmi untuk memahami pendekatan optimal yang diharapkan juri.
          </div>
        </div>
      </div>
    </div>
  )
}
