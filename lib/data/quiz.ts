export interface QuizQuestion {
  id: string
  topicId: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: 'mudah' | 'sedang' | 'sulit'
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    topicId: 'cpp-basics',
    question: 'Mengapa kita menggunakan ios_base::sync_with_stdio(false) di program kompetisi?',
    options: [
      'Untuk mengkompilasi program lebih cepat',
      'Untuk mempercepat operasi cin/cout dengan memutus sinkronisasi dengan C I/O',
      'Untuk mengaktifkan multi-threading',
      'Untuk menghemat penggunaan memori',
    ],
    correctIndex: 1,
    explanation: 'ios_base::sync_with_stdio(false) memutus sinkronisasi antara C++ streams (cin/cout) dengan C streams (scanf/printf). Ini membuat cin/cout jauh lebih cepat karena tidak perlu sync setiap operasi I/O.',
    difficulty: 'mudah',
  },
  {
    id: 'q2',
    topicId: 'cpp-basics',
    question: 'Berapa nilai maksimum yang bisa disimpan dalam tipe data "int" (32-bit signed)?',
    options: [
      '10^9',
      '2^31 - 1 ≈ 2.1 × 10^9',
      '2^32 - 1 ≈ 4.3 × 10^9',
      '2^63 - 1 ≈ 9.2 × 10^18',
    ],
    correctIndex: 1,
    explanation: 'int 32-bit signed menyimpan nilai dari -2^31 hingga 2^31-1 = 2,147,483,647 ≈ 2.1×10^9. Jika nilai melebihi ini, gunakan long long.',
    difficulty: 'mudah',
  },
  {
    id: 'q3',
    topicId: 'sorting-searching',
    question: 'Berapa kompleksitas waktu Binary Search pada array terurut?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctIndex: 1,
    explanation: 'Binary search membagi search space menjadi dua setiap iterasi. Untuk n elemen, dibutuhkan paling banyak log₂(n) iterasi. Kompleksitas: O(log n).',
    difficulty: 'mudah',
  },
  {
    id: 'q4',
    topicId: 'sorting-searching',
    question: 'Apa yang dikembalikan oleh lower_bound(v.begin(), v.end(), x)?',
    options: [
      'Iterator ke elemen pertama yang lebih besar dari x',
      'Iterator ke elemen pertama yang sama dengan atau lebih besar dari x',
      'Iterator ke elemen terakhir yang lebih kecil dari x',
      'Indeks dari x dalam vector',
    ],
    correctIndex: 1,
    explanation: 'lower_bound mengembalikan iterator ke elemen pertama yang >= target x. upper_bound mengembalikan iterator ke elemen pertama yang > x. Keduanya membutuhkan array terurut.',
    difficulty: 'sedang',
  },
  {
    id: 'q5',
    topicId: 'stack-queue',
    question: 'Apa perbedaan utama antara Stack dan Queue?',
    options: [
      'Stack menggunakan linked list, Queue menggunakan array',
      'Stack LIFO (Last In First Out), Queue FIFO (First In First Out)',
      'Stack untuk integers, Queue untuk strings',
      'Stack O(1) semua operasi, Queue O(n)',
    ],
    correctIndex: 1,
    explanation: 'Stack: elemen terakhir masuk adalah yang pertama keluar (LIFO - seperti tumpukan piring). Queue: elemen pertama masuk adalah yang pertama keluar (FIFO - seperti antrian).',
    difficulty: 'mudah',
  },
  {
    id: 'q6',
    topicId: 'dynamic-programming',
    question: 'Dua syarat utama agar masalah bisa diselesaikan dengan Dynamic Programming adalah...',
    options: [
      'Greedy choice property dan matroids',
      'Optimal substructure dan overlapping subproblems',
      'Binary search dan divide & conquer',
      'Memoization dan tabulation',
    ],
    correctIndex: 1,
    explanation: 'Optimal substructure: solusi optimal masalah mengandung solusi optimal submasalah. Overlapping subproblems: submasalah yang sama dihitung berkali-kali. Tanpa dua properti ini, DP tidak akan efisien.',
    difficulty: 'sedang',
  },
  {
    id: 'q7',
    topicId: 'dynamic-programming',
    question: 'Algoritma apa yang paling efisien untuk menghitung Longest Increasing Subsequence (LIS)?',
    options: [
      'O(n) dengan counting sort',
      'O(n²) dengan DP biasa',
      'O(n log n) dengan binary search + DP',
      'O(n³) dengan interval DP',
    ],
    correctIndex: 2,
    explanation: 'LIS O(n log n) menggunakan "patience sorting": maintain array dp terkecil untuk setiap panjang LIS, gunakan lower_bound untuk mencari posisi insert. Ini lebih efisien dari O(n²) DP standar.',
    difficulty: 'sedang',
  },
  {
    id: 'q8',
    topicId: 'graph-basics',
    question: 'Algoritma mana yang tepat untuk menemukan jarak terpendek dari satu sumber ke semua simpul dalam graf tak berbobot?',
    options: [
      'Dijkstra',
      'DFS (Depth-First Search)',
      'BFS (Breadth-First Search)',
      'Floyd-Warshall',
    ],
    correctIndex: 2,
    explanation: 'BFS menjelajahi graf level by level. Di graf tak berbobot, setiap edge memiliki bobot 1, sehingga BFS secara alami menemukan shortest path. Dijkstra untuk weighted graph, DFS tidak menjamin shortest path.',
    difficulty: 'mudah',
  },
  {
    id: 'q9',
    topicId: 'shortest-path',
    question: 'Kapan Dijkstra tidak bisa digunakan?',
    options: [
      'Ketika graph sangat besar (N > 10^5)',
      'Ketika ada edge dengan bobot negatif',
      'Ketika graph tidak terhubung',
      'Ketika graph berarah (directed)',
    ],
    correctIndex: 1,
    explanation: 'Dijkstra menggunakan asumsi bahwa jarak hanya bisa bertambah. Jika ada edge negatif, asumsi ini tidak berlaku dan Dijkstra memberikan hasil salah. Gunakan Bellman-Ford (atau SPFA) untuk graph dengan edge negatif.',
    difficulty: 'sedang',
  },
  {
    id: 'q10',
    topicId: 'segment-tree',
    question: 'Berapa kompleksitas waktu untuk range sum query dan point update menggunakan Segment Tree?',
    options: [
      'Query O(1), Update O(n)',
      'Query O(n), Update O(1)',
      'Query O(log n), Update O(log n)',
      'Query O(log n), Update O(n)',
    ],
    correctIndex: 2,
    explanation: 'Segment Tree mendukung range query dan point update dalam O(log n) karena tinggi pohon adalah O(log n). Ini jauh lebih efisien dari naive O(n) untuk keduanya.',
    difficulty: 'sedang',
  },
  {
    id: 'q11',
    topicId: 'dsu',
    question: 'Berapa kompleksitas amortized per operasi pada DSU dengan path compression dan union by rank?',
    options: ['O(1)', 'O(log n)', 'O(α(n)) ≈ O(1) praktis', 'O(log log n)'],
    correctIndex: 2,
    explanation: 'Dengan path compression dan union by rank, kompleksitas amortized adalah O(α(n)) di mana α adalah fungsi invers Ackermann. Nilai α(n) ≤ 4 untuk semua nilai n yang praktis dipakai, sehingga dianggap O(1).',
    difficulty: 'sulit',
  },
  {
    id: 'q12',
    topicId: 'math-discrete',
    question: 'Berapa kompleksitas Sieve of Eratosthenes untuk mencari semua bilangan prima ≤ N?',
    options: ['O(n)', 'O(n log n)', 'O(n log log n)', 'O(√n)'],
    correctIndex: 2,
    explanation: 'Sieve of Eratosthenes memiliki kompleksitas O(n log log n). Ini karena jumlah total operasi adalah n/2 + n/3 + n/5 + ... yang konvergen ke O(n log log n) berdasarkan harmonic series bilangan prima.',
    difficulty: 'sulit',
  },
  {
    id: 'q13',
    topicId: 'string-algorithms',
    question: 'Pada algoritma KMP, apa fungsi dari "failure function" (prefix function)?',
    options: [
      'Menyimpan posisi semua kemunculan pattern',
      'Menentukan berapa karakter yang bisa di-skip saat terjadi mismatch',
      'Mengkompress string untuk efisiensi memori',
      'Menghitung hash value dari pattern',
    ],
    correctIndex: 1,
    explanation: 'Failure function kmp[i] = panjang terpanjang proper prefix dari pattern[0..i] yang juga merupakan suffix. Saat terjadi mismatch di posisi j, kita tidak perlu mulai dari awal tapi cukup lanjut dari kmp[j-1], menghemat banyak perbandingan.',
    difficulty: 'sulit',
  },
  {
    id: 'q14',
    topicId: 'recursion',
    question: 'Apa itu backtracking dalam konteks rekursi?',
    options: [
      'Teknik untuk mencegah stack overflow',
      'Memoization hasil rekursi sebelumnya',
      'Mencoba semua kemungkinan secara rekursif, mundur jika gagal',
      'Mengkonversi rekursi ke iterasi',
    ],
    correctIndex: 2,
    explanation: 'Backtracking: (1) Coba pilihan, (2) Rekursi lebih dalam, (3) Jika gagal/solusi tidak valid, undo pilihan dan coba opsi lain. Pattern: make_choice → recurse → undo_choice. Dipakai untuk N-Queens, Sudoku, dll.',
    difficulty: 'mudah',
  },
  {
    id: 'q15',
    topicId: 'dynamic-programming',
    question: 'Pada Bitmask DP untuk TSP dengan N kota, berapa jumlah state-nya?',
    options: ['O(N)', 'O(N²)', 'O(2^N)', 'O(2^N × N)'],
    correctIndex: 3,
    explanation: 'State Bitmask DP TSP adalah (mask, kota_saat_ini). mask bisa 2^N kemungkinan (semua subset kota), dan kota_saat_ini bisa N nilai. Total: O(2^N × N) states. Untuk N=20: 20 × 2^20 ≈ 20 juta state.',
    difficulty: 'sulit',
  },
  {
    id: 'q16',
    topicId: 'greedy',
    question: 'Pada Activity Selection Problem, mengapa kita memilih aktivitas yang selesai paling awal?',
    options: [
      'Karena aktivitas pendek lebih mudah dikerjakan',
      'Agar tersisa banyak waktu untuk aktivitas berikutnya (memaksimalkan peluang)',
      'Karena aktivitas yang mulai lebih awal lebih penting',
      'Untuk meminimalkan waktu tunggu antar aktivitas',
    ],
    correctIndex: 1,
    explanation: 'Dengan memilih aktivitas yang selesai paling awal, kita menyisakan waktu sebanyak mungkin untuk aktivitas berikutnya. Ini terbukti optimal dengan exchange argument: jika kita swap pilihan greedy dengan pilihan lain, jumlah aktivitas tidak bertambah.',
    difficulty: 'sedang',
  },
  {
    id: 'q17',
    topicId: 'two-pointers',
    question: 'Berapa kompleksitas waktu Sliding Window untuk menemukan subarray terpanjang dengan sum ≤ K?',
    options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
    correctIndex: 2,
    explanation: 'Sliding window O(n): pointer kiri dan kanan masing-masing bergerak paling banyak n langkah, sehingga total operasi ≤ 2n = O(n). Jauh lebih efisien dari brute force O(n²).',
    difficulty: 'sedang',
  },
  {
    id: 'q18',
    topicId: 'tree-algorithms',
    question: 'Berapa edge yang dimiliki sebuah tree dengan N simpul?',
    options: ['N', 'N-1', 'N+1', '2N-2'],
    correctIndex: 1,
    explanation: 'Tree dengan N simpul selalu memiliki tepat N-1 edge. Ini adalah definisi fundamental tree: graf terhubung tanpa cycle dengan N-1 edge. Kurang dari N-1 → tidak terhubung. Lebih dari N-1 → ada cycle.',
    difficulty: 'mudah',
  },
  {
    id: 'q19',
    topicId: 'tree-algorithms',
    question: 'Algoritma apa yang paling efisien untuk mencari diameter tree?',
    options: [
      'DP on tree O(n)',
      '2x BFS O(n)',
      'Floyd-Warshall O(n³)',
      'DFS dengan backtracking O(n²)',
    ],
    correctIndex: 1,
    explanation: '2x BFS O(n): BFS dari sembarang node → simpul terjauh A, BFS dari A → jarak terjauh = diameter. Cara ini lebih mudah diimplementasikan dari DP on tree dan sama-sama O(n).',
    difficulty: 'sedang',
  },
  {
    id: 'q20',
    topicId: 'greedy',
    question: 'Mana dari berikut ini yang TIDAK bisa diselesaikan dengan greedy optimal?',
    options: [
      'Activity Selection Problem',
      'Fractional Knapsack',
      '0/1 Knapsack',
      'Kruskal MST',
    ],
    correctIndex: 2,
    explanation: '0/1 Knapsack tidak bisa diselesaikan dengan greedy karena setiap item harus diambil seluruhnya atau tidak sama sekali. Greedy "ratio value/weight" gagal untuk kasus tertentu. Harus diselesaikan dengan Dynamic Programming.',
    difficulty: 'sedang',
  },
]

export function getQuizByTopic(topicId: string): QuizQuestion[] {
  return quizQuestions.filter(q => q.topicId === topicId)
}

export function getAllQuiz(): QuizQuestion[] {
  return quizQuestions
}
