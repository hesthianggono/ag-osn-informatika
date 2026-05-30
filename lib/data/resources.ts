// Kurasi sumber belajar OSN Informatika RESMI
// Semua tautan mengarah ke situs resmi TOKI/TLX dan sumber yang direkomendasikan
// di osn.toki.id/persiapan — agar siswa berlatih langsung di platform aslinya.

export interface ResourceLink {
  title: string
  url: string
  desc: string
  type: 'arsip' | 'materi' | 'judge' | 'buku' | 'video' | 'komunitas' | 'tools'
}

export interface ResourceGroup {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  links: ResourceLink[]
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    id: 'arsip-osn',
    title: 'Arsip Soal OSN (TLX Resmi)',
    subtitle: 'Kerjakan langsung di TLX untuk dapat verdict & ranking nyata',
    icon: '🗝️',
    color: '#c8a96e',
    links: [
      { title: 'OSN Informatika 2025', url: 'https://tlx.toki.id/problems/osn-2025', desc: 'Arsip soal final OSN Nasional 2025', type: 'arsip' },
      { title: 'OSN Informatika 2024', url: 'https://tlx.toki.id/problems/osn-2024', desc: 'Arsip soal final OSN Nasional 2024', type: 'arsip' },
      { title: 'OSN Informatika 2023', url: 'https://tlx.toki.id/problems/osn-2023', desc: 'Arsip soal final OSN Nasional 2023', type: 'arsip' },
      { title: 'OSN Informatika 2022', url: 'https://tlx.toki.id/problems/osn-2022', desc: 'Arsip soal final OSN Nasional 2022', type: 'arsip' },
      { title: 'OSN-P Informatika 2024', url: 'https://tlx.toki.id/problems/osnp-2024', desc: 'Arsip soal tingkat Provinsi 2024', type: 'arsip' },
      { title: 'OSN-P Informatika 2023', url: 'https://tlx.toki.id/problems/osnp-2023', desc: 'Arsip soal tingkat Provinsi 2023', type: 'arsip' },
      { title: 'OSN-P Informatika 2022', url: 'https://tlx.toki.id/problems/osnp-2022', desc: 'Arsip soal tingkat Provinsi 2022', type: 'arsip' },
      { title: 'Semua Arsip OSN', url: 'https://tlx.toki.id/problems/problemsets?archive=osn', desc: 'Daftar lengkap semua problemset OSN di TLX', type: 'arsip' },
    ],
  },
  {
    id: 'materi-resmi',
    title: 'Materi & Kursus Resmi TOKI',
    subtitle: 'Kurikulum disusun langsung oleh Ikatan Alumni TOKI',
    icon: '📜',
    color: '#26a69a',
    links: [
      { title: 'Kursus Pemrograman Kompetitif Dasar (TLX)', url: 'https://tlx.toki.id/courses/competitive-1', desc: 'Kursus terstruktur dengan materi + soal latihan tiap bab', type: 'materi' },
      { title: 'Buku PKD — Pemrograman Kompetitif Dasar (PDF)', url: 'https://osn.toki.id/data/pemrograman-kompetitif-dasar.pdf', desc: 'Buku gratis sesuai silabus OSN terbaru — fokus algoritma', type: 'buku' },
      { title: 'Halaman Persiapan OSN-K / OSN-P', url: 'https://osn.toki.id/persiapan', desc: 'Panduan persiapan bertahap dari TOKI', type: 'materi' },
      { title: 'Persiapan Tingkat Nasional', url: 'https://osn.toki.id/persiapan/nasional', desc: 'Materi algoritma & pemrograman kompetitif lanjutan', type: 'materi' },
    ],
  },
  {
    id: 'silabus',
    title: 'Silabus Resmi OSN',
    subtitle: 'Acuan topik yang diujikan tiap tingkat',
    icon: '📋',
    color: '#4db6ac',
    links: [
      { title: 'Silabus Lengkap OSN', url: 'https://osn.toki.id/silabus', desc: 'Daftar topik yang diujikan, mengacu IOI', type: 'materi' },
      { title: 'Silabus OSN-K (Kota/Kab)', url: 'https://osn.toki.id/silabus/kota', desc: 'Topik untuk seleksi tingkat kota', type: 'materi' },
      { title: 'Silabus OSN-P (Provinsi)', url: 'https://osn.toki.id/silabus/provinsi', desc: 'Topik untuk seleksi tingkat provinsi', type: 'materi' },
    ],
  },
  {
    id: 'latihan-judge',
    title: 'Platform Latihan (Online Judge)',
    subtitle: 'Tempat berlatih coding dengan ribuan soal',
    icon: '⚔️',
    color: '#66bb6a',
    links: [
      { title: 'TLX Training Gate', url: 'https://tlx.toki.id/training', desc: 'Platform latihan resmi TOKI — gerbang utama', type: 'judge' },
      { title: 'TLX Problemset', url: 'https://tlx.toki.id/problems', desc: 'Semua problemset & kontes di TLX', type: 'judge' },
      { title: 'Codeforces', url: 'https://codeforces.com/', desc: 'Platform CP terbesar dunia — mulai dari Div.4', type: 'judge' },
      { title: 'Project Euler', url: 'https://projecteuler.net/', desc: 'Soal matematika-komputasi untuk asah logika', type: 'judge' },
      { title: 'AtCoder', url: 'https://atcoder.jp/', desc: 'Kontes Jepang dengan soal berkualitas tinggi', type: 'judge' },
    ],
  },
  {
    id: 'pembahasan',
    title: 'Pembahasan & Komunitas',
    subtitle: 'Diskusi solusi & belajar bareng',
    icon: '💬',
    color: '#ce93d8',
    links: [
      { title: 'Kujawab.com', url: 'https://www.kujawab.com/', desc: 'Forum diskusi & pembahasan soal OSN (direkomendasikan TOKI)', type: 'komunitas' },
      { title: 'Codeforces Blog (Editorial)', url: 'https://codeforces.com/blog/athin', desc: 'Editorial & catatan dari kontestan Indonesia', type: 'komunitas' },
      { title: 'GitHub IA-TOKI', url: 'https://github.com/ia-toki', desc: 'Repositori Ikatan Alumni TOKI', type: 'komunitas' },
      { title: 'CP-Algorithms', url: 'https://cp-algorithms.com/', desc: 'Referensi algoritma lengkap + implementasi', type: 'komunitas' },
      { title: 'USACO Guide', url: 'https://usaco.guide/', desc: 'Panduan CP terstruktur (Bronze → Platinum)', type: 'komunitas' },
    ],
  },
  {
    id: 'video',
    title: 'Video Pembelajaran',
    subtitle: 'Belajar lewat tutorial visual',
    icon: '🎬',
    color: '#4fc3f7',
    links: [
      { title: 'Seri Persiapan Informatika: Pemrograman Dasar C++', url: 'https://www.youtube.com/results?search_query=seri+persiapan+informatika+pemrograman+dasar+c%2B%2B+toki', desc: 'Playlist YouTube mengikuti kurikulum TLX', type: 'video' },
      { title: 'Sosialisasi OSN Informatika', url: 'https://www.youtube.com/results?search_query=sosialisasi+osn+informatika', desc: 'Video sosialisasi resmi tiap tahun', type: 'video' },
    ],
  },
]

// Struktur kurikulum PKD (Pemrograman Kompetitif Dasar) TOKI
// Sebagai peta belajar — tiap bab punya padanan topik di app ini
export interface PKDChapter {
  no: number
  title: string
  topics: string[]
  appTopicId?: string  // id topik di app kita untuk cross-link
}

export const PKD_CURRICULUM: PKDChapter[] = [
  { no: 1, title: 'Pengantar Pemrograman C++', topics: ['Struktur program', 'Tipe data', 'Input/Output', 'Operator'], appTopicId: 'cpp-basics' },
  { no: 2, title: 'Matematika Diskrit Dasar', topics: ['Logika', 'Kaidah pencacahan', 'Peluang', 'Modular arithmetic'], appTopicId: 'math-discrete' },
  { no: 3, title: 'Percabangan & Perulangan', topics: ['if-else', 'switch', 'for', 'while', 'nested loops'], appTopicId: 'cpp-basics' },
  { no: 4, title: 'Array & String', topics: ['Array 1D/2D', 'String manipulation', 'STL vector'], appTopicId: 'cpp-basics' },
  { no: 5, title: 'Fungsi & Rekursi', topics: ['Fungsi', 'Parameter', 'Rekursi', 'Backtracking'], appTopicId: 'recursion' },
  { no: 6, title: 'Kompleksitas Algoritma', topics: ['Big-O notation', 'Analisis waktu & memori'], appTopicId: 'sorting-searching' },
  { no: 7, title: 'Sorting & Searching', topics: ['Sorting algorithms', 'Binary search', 'STL sort'], appTopicId: 'sorting-searching' },
  { no: 8, title: 'Struktur Data Dasar', topics: ['Stack', 'Queue', 'Deque', 'Priority Queue'], appTopicId: 'stack-queue' },
  { no: 9, title: 'Greedy & Brute Force', topics: ['Greedy strategy', 'Complete search', 'Pruning'], appTopicId: 'greedy' },
  { no: 10, title: 'Dynamic Programming', topics: ['DP 1D & 2D', 'Knapsack', 'LIS/LCS'], appTopicId: 'dynamic-programming' },
  { no: 11, title: 'Graf', topics: ['Representasi graf', 'BFS', 'DFS', 'Shortest path'], appTopicId: 'graph-basics' },
  { no: 12, title: 'Struktur Data Lanjutan', topics: ['Segment Tree', 'BIT', 'DSU'], appTopicId: 'segment-tree' },
]
