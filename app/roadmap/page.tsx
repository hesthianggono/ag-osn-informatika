'use client'

import Link from 'next/link'
import { topics } from '@/lib/data/topics'
import { problems } from '@/lib/data/problems'

const ROADMAP_STAGES = [
  {
    id: 'foundation',
    name: 'Fondasi',
    subtitle: 'Sebelum mulai kompetisi',
    color: 'from-slate-500 to-slate-600',
    border: 'border-slate-500/30',
    text: 'text-slate-300',
    bg: 'bg-slate-800/30',
    duration: '2-4 minggu',
    items: [
      { label: 'Kuasai C++ dasar (struct, pointer, reference)', done: false },
      { label: 'Pahami STL: vector, map, set, sort', done: false },
      { label: 'Template I/O kompetisi (ios_base::sync_with_stdio)', done: false },
      { label: 'Latihan di Codeforces Div. 4 atau easier', done: false },
    ],
    resources: ['Topic: Dasar C++ untuk Kompetisi'],
  },
  {
    id: 'osn-k',
    name: 'OSN-K Level',
    subtitle: 'Siap seleksi kota/kabupaten',
    color: 'from-green-500 to-emerald-600',
    border: 'border-green-500/30',
    text: 'text-green-400',
    bg: 'bg-green-900/20',
    duration: '4-8 minggu',
    items: [
      { label: 'Binary Search (termasuk on answer)', done: false },
      { label: 'Sorting & custom comparator', done: false },
      { label: 'Stack & Queue — Monotonic Stack', done: false },
      { label: 'Rekursi & Backtracking dasar', done: false },
      { label: 'Matematika: GCD, LCM, Sieve, Binary Expo', done: false },
      { label: 'Greedy sederhana', done: false },
      { label: 'Selesaikan soal Mudah di halaman Latihan', done: false },
    ],
    resources: ['Topic: Sorting & Searching', 'Topic: Stack & Queue', 'Topic: Rekursi & Backtracking', 'Topic: Matematika Diskrit'],
  },
  {
    id: 'osn-p',
    name: 'OSN-P Level',
    subtitle: 'Siap seleksi provinsi',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    bg: 'bg-blue-900/20',
    duration: '8-16 minggu',
    items: [
      { label: 'Dynamic Programming: DP 1D (LIS, Coin Change, Knapsack)', done: false },
      { label: 'Dynamic Programming: DP 2D (LCS, Edit Distance)', done: false },
      { label: 'Graf: BFS, DFS, Connected Components', done: false },
      { label: 'Shortest Path: Dijkstra, BFS untuk unweighted', done: false },
      { label: 'Tree: DFS tree, LCA dasar', done: false },
      { label: 'Bit Manipulation dasar', done: false },
      { label: 'Selesaikan soal Sedang di halaman Latihan', done: false },
      { label: 'Latihan di Codeforces Div. 3', done: false },
    ],
    resources: ['Topic: Dynamic Programming', 'Topic: Graph - BFS & DFS', 'Topic: Shortest Path'],
  },
  {
    id: 'osn-nasional',
    name: 'OSN Nasional',
    subtitle: 'Siap final OSN tingkat nasional',
    color: 'from-purple-500 to-violet-600',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    bg: 'bg-purple-900/20',
    duration: '4-6 bulan',
    items: [
      { label: 'Segment Tree + Lazy Propagation', done: false },
      { label: 'Binary Indexed Tree (BIT/Fenwick)', done: false },
      { label: 'DSU dengan Path Compression + Kruskal MST', done: false },
      { label: 'Advanced DP: Bitmask DP, Interval DP, DP on Tree', done: false },
      { label: 'Advanced Graph: SCC (Tarjan/Kosaraju), Bridges, Articulation Points', done: false },
      { label: 'String: KMP, Z-Algorithm, Hashing', done: false },
      { label: 'Number Theory: Modular inverse, nCr mod p', done: false },
      { label: 'Latihan di Codeforces Div. 2', done: false },
      { label: 'Pelajari semua arsip soal OSN sebelumnya', done: false },
    ],
    resources: ['Topic: Segment Tree & BIT', 'Topic: DSU', 'Topic: Algoritma String', 'Topic: Graf Lanjutan'],
  },
  {
    id: 'ioi',
    name: 'IOI Level',
    subtitle: 'Representasi Indonesia di olimpiade internasional',
    color: 'from-orange-500 to-red-600',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    bg: 'bg-orange-900/20',
    duration: '6+ bulan',
    items: [
      { label: 'Heavy-Light Decomposition (HLD)', done: false },
      { label: 'Centroid Decomposition', done: false },
      { label: 'Persistent Data Structures', done: false },
      { label: 'Suffix Array + LCP', done: false },
      { label: 'Network Flow: Max Flow, Min Cut', done: false },
      { label: 'Advanced DP: Convex Hull Trick, Divide & Conquer DP', done: false },
      { label: 'Geometry Computational', done: false },
      { label: 'Latihan soal IOI dari tahun-tahun sebelumnya', done: false },
      { label: 'Partisipasi ICPC, Codeforces Div. 1', done: false },
    ],
    resources: [],
  },
]

const WEEKLY_PLAN = [
  { day: 'Senin', activity: 'Pelajari 1 konsep baru dari materi', duration: '60 menit' },
  { day: 'Selasa', activity: 'Implementasi konsep dengan contoh kode', duration: '45 menit' },
  { day: 'Rabu', activity: 'Selesaikan 2-3 soal terkait konsep', duration: '90 menit' },
  { day: 'Kamis', activity: 'Review dan perkuat pemahaman konsep lemah', duration: '45 menit' },
  { day: "Jum'at", activity: 'Latihan soal campuran (beda topik)', duration: '90 menit' },
  { day: 'Sabtu', activity: 'Simulasi ujian + review hasil', duration: '120 menit' },
  { day: 'Minggu', activity: 'Review materi + persiapan minggu depan', duration: '30 menit' },
]

export default function RoadmapPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span>🗺️</span> Roadmap Belajar OSN
        </h1>
        <p className="text-slate-400">
          Jalur belajar terstruktur dari pemula hingga level IOI
        </p>
      </div>

      {/* Quick stats */}
      <div className="glass rounded-xl p-5 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">📌</span>
          <h2 className="text-base font-bold text-white">Strategi Utama</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-400">
          <div className="p-3 rounded-xl bg-indigo-900/20 border border-indigo-700/30">
            <div className="text-indigo-300 font-semibold mb-1">Fokus & Konsisten</div>
            Belajar 1-2 jam setiap hari jauh lebih efektif dari 10 jam sekali seminggu
          </div>
          <div className="p-3 rounded-xl bg-green-900/20 border border-green-700/30">
            <div className="text-green-300 font-semibold mb-1">Implementasi Sendiri</div>
            Jangan hanya baca — tulis kode sendiri untuk setiap algoritma yang dipelajari
          </div>
          <div className="p-3 rounded-xl bg-purple-900/20 border border-purple-700/30">
            <div className="text-purple-300 font-semibold mb-1">Problem Solving</div>
            Satu soal yang dipecahkan sendiri = 10 soal yang dilihat solusinya
          </div>
        </div>
      </div>

      {/* Roadmap Stages */}
      <div className="space-y-6 mb-10">
        {ROADMAP_STAGES.map((stage, idx) => (
          <div key={stage.id} className="relative">
            {/* Connector line */}
            {idx < ROADMAP_STAGES.length - 1 && (
              <div className="absolute left-6 top-full w-0.5 h-6 bg-slate-700" />
            )}

            <div className={`rounded-xl border ${stage.border} ${stage.bg} overflow-hidden`}>
              {/* Stage Header */}
              <div className={`px-5 py-4 bg-gradient-to-r ${stage.color} bg-opacity-20 flex items-center justify-between flex-wrap gap-3`}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-white font-bold">{stage.name}</div>
                    <div className="text-white/70 text-xs">{stage.subtitle}</div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full bg-white/10 ${stage.text} font-medium`}>
                  ⏱ {stage.duration}
                </div>
              </div>

              {/* Stage Content */}
              <div className="p-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Checklist</div>
                    <div className="space-y-2">
                      {stage.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-slate-600 mt-0.5 flex-shrink-0">☐</span>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {stage.resources.length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Materi Terkait</div>
                      <div className="space-y-2">
                        {stage.resources.map((res, i) => {
                          const topicTitle = res.replace('Topic: ', '')
                          const topic = topics.find(t => t.title === topicTitle)
                          return (
                            <div key={i}>
                              {topic ? (
                                <Link
                                  href={`/materi/${topic.id}`}
                                  className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                  <span>{topic.icon}</span>
                                  <span>{topic.title}</span>
                                  <span className="text-slate-600">→</span>
                                </Link>
                              ) : (
                                <div className="text-sm text-slate-500">{res}</div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Plan */}
      <div className="glass rounded-xl p-5 mb-8">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>📅</span> Rencana Belajar Mingguan (Rekomendasi)
        </h2>
        <div className="space-y-2">
          {WEEKLY_PLAN.map(item => (
            <div key={item.day} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50">
              <div className="w-16 text-xs font-bold text-indigo-400 flex-shrink-0">{item.day}</div>
              <div className="flex-1 text-sm text-slate-300">{item.activity}</div>
              <div className="text-xs text-slate-500 flex-shrink-0">{item.duration}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-slate-400">
          Total: ~8 jam/minggu. Sesuaikan dengan kemampuan dan jadwal sekolah.
        </div>
      </div>

      {/* Resources */}
      <div className="glass rounded-xl p-5">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>🔗</span> Sumber Belajar Eksternal
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'osn.toki.id', desc: 'Situs resmi TOKI — silabus, arsip soal, materi', type: 'Resmi' },
            { name: 'Codeforces', desc: 'Platform kompetisi terbesar, banyak educational round', type: 'Platform' },
            { name: 'USACO Guide', desc: 'Panduan kompetisi terstruktur dengan problem set', type: 'Buku' },
            { name: 'CP-Algorithms', desc: 'Referensi algoritma dengan proof dan implementasi', type: 'Referensi' },
            { name: 'AtCoder', desc: 'Kompetisi Jepang dengan soal berkualitas tinggi', type: 'Platform' },
            { name: 'Competitive Programming 3', desc: 'Buku Steven Halim — referensi lengkap CP', type: 'Buku' },
          ].map(r => (
            <div key={r.name} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50">
              <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 font-medium ${
                r.type === 'Resmi' ? 'bg-green-900/50 text-green-400' :
                r.type === 'Platform' ? 'bg-blue-900/50 text-blue-400' :
                r.type === 'Buku' ? 'bg-purple-900/50 text-purple-400' :
                'bg-orange-900/50 text-orange-400'
              }`}>{r.type}</span>
              <div>
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs text-slate-400">{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
