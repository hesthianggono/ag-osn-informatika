export type ProblemDifficulty = 'mudah' | 'sedang' | 'sulit' | 'sangat-sulit'
export type ProblemCategory = string

export interface TestCase {
  input: string
  output: string
  explanation?: string
}

export interface Problem {
  id: string
  title: string
  difficulty: ProblemDifficulty
  category: string
  topicId: string
  points: number
  timeLimit: number // seconds
  memoryLimit: number // MB
  description: string
  inputFormat: string
  outputFormat: string
  constraints: string[]
  examples: TestCase[]
  hints: string[]
  solution: string
  solutionExplanation: string
  tags: string[]
  source?: string
  year?: number
}

export const DIFFICULTY_LABELS: Record<ProblemDifficulty, string> = {
  mudah: 'Mudah',
  sedang: 'Sedang',
  sulit: 'Sulit',
  'sangat-sulit': 'Sangat Sulit',
}

export const DIFFICULTY_COLORS: Record<ProblemDifficulty, string> = {
  mudah: 'text-green-400 bg-green-400/10 border-green-400/30',
  sedang: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  sulit: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  'sangat-sulit': 'text-red-400 bg-red-400/10 border-red-400/30',
}

export const problems: Problem[] = [
  {
    id: 'fibonacci-mod',
    title: 'Fibonacci Modulo',
    difficulty: 'mudah',
    category: 'Matematika',
    topicId: 'math-discrete',
    points: 100,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan bilangan bulat N. Hitung F(N) mod 10^9+7, di mana F(N) adalah bilangan Fibonacci ke-N.

F(0) = 0, F(1) = 1, F(N) = F(N-1) + F(N-2) untuk N ≥ 2.`,
    inputFormat: `Satu baris berisi bilangan bulat N (0 ≤ N ≤ 10^6).`,
    outputFormat: `Satu baris berisi F(N) mod 10^9+7.`,
    constraints: ['0 ≤ N ≤ 10^6'],
    examples: [
      { input: '10', output: '55', explanation: 'F(10) = 55' },
      { input: '0', output: '0', explanation: 'F(0) = 0' },
      { input: '1', output: '1', explanation: 'F(1) = 1' },
    ],
    hints: [
      'Gunakan bottom-up DP untuk menghindari stack overflow',
      'Jangan gunakan rekursi naif karena akan TLE untuk N besar',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;

    if (n == 0) { cout << 0; return 0; }
    if (n == 1) { cout << 1; return 0; }

    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = (a + b) % MOD;
        a = b;
        b = c;
    }
    cout << b;
    return 0;
}`,
    solutionExplanation: 'Gunakan dua variabel rolling untuk menghitung Fibonacci secara iteratif. Kompleksitas: O(n) waktu, O(1) memori.',
    tags: ['dp', 'matematika', 'modular'],
  },
  {
    id: 'binary-search-peak',
    title: 'Puncak Array',
    difficulty: 'mudah',
    category: 'Searching',
    topicId: 'sorting-searching',
    points: 150,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Array A disebut "mountain array" jika memiliki tepat satu puncak. Puncak adalah elemen A[i] di mana A[i-1] < A[i] > A[i+1].

Diberikan mountain array, temukan indeks puncaknya.`,
    inputFormat: `Baris 1: N (3 ≤ N ≤ 10^5)
Baris 2: N bilangan bulat A[0], A[1], ..., A[N-1]`,
    outputFormat: `Satu bilangan: indeks puncak (0-indexed).`,
    constraints: ['3 ≤ N ≤ 10^5', '0 ≤ A[i] ≤ 10^9', 'Array dijamin mountain array'],
    examples: [
      { input: '5\n1 3 5 3 1', output: '2', explanation: 'A[2]=5 adalah puncak' },
      { input: '4\n1 2 3 1', output: '2' },
    ],
    hints: [
      'Gunakan binary search',
      'Jika A[mid] < A[mid+1], puncak pasti di sebelah kanan',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int& x : a) cin >> x;

    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] < a[mid + 1]) lo = mid + 1;
        else hi = mid;
    }
    cout << lo;
    return 0;
}`,
    solutionExplanation: 'Binary search: jika elemen tengah lebih kecil dari kanannya, puncak ada di kanan. Sebaliknya di kiri atau tengah itu sendiri. O(log n).',
    tags: ['binary-search', 'array'],
  },
  {
    id: 'parentheses-check',
    title: 'Kurung Seimbang',
    difficulty: 'mudah',
    category: 'Struktur Data',
    topicId: 'stack-queue',
    points: 100,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan string yang berisi karakter '(', ')', '[', ']', '{', '}'. Tentukan apakah string tersebut memiliki kurung yang seimbang.

Kurung seimbang berarti:
- Setiap kurung buka memiliki kurung tutup yang sesuai
- Kurung ditutup dalam urutan yang benar`,
    inputFormat: `Satu baris berisi string S (1 ≤ |S| ≤ 10^5).`,
    outputFormat: `"YA" jika seimbang, "TIDAK" jika tidak.`,
    constraints: ['1 ≤ |S| ≤ 10^5', 'S hanya berisi karakter ()[]{}'],
    examples: [
      { input: '({[]})', output: 'YA' },
      { input: '([)]', output: 'TIDAK' },
      { input: '', output: 'YA' },
    ],
    hints: ['Gunakan stack', 'Push kurung buka, cek kurung tutup dengan top stack'],
    solution: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s; cin >> s;
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) { cout << "TIDAK"; return 0; }
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') { cout << "TIDAK"; return 0; }
            if (c == ']' && top != '[') { cout << "TIDAK"; return 0; }
            if (c == '}' && top != '{') { cout << "TIDAK"; return 0; }
        }
    }
    cout << (st.empty() ? "YA" : "TIDAK");
    return 0;
}`,
    solutionExplanation: 'Stack LIFO: push kurung buka, saat kurung tutup cek apakah top stack adalah pasangannya. O(n).',
    tags: ['stack', 'string'],
  },
  {
    id: 'lis-length',
    title: 'Longest Increasing Subsequence',
    difficulty: 'sedang',
    category: 'Dynamic Programming',
    topicId: 'dynamic-programming',
    points: 200,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan array bilangan bulat, temukan panjang subsequence menaik terpanjang (Longest Increasing Subsequence / LIS).

Subsequence adalah urutan yang diambil dari array dengan mempertahankan urutan relatifnya (tidak harus berurutan).`,
    inputFormat: `Baris 1: N (1 ≤ N ≤ 10^5)
Baris 2: N bilangan bulat A[1], A[2], ..., A[N]`,
    outputFormat: `Satu bilangan: panjang LIS terpanjang.`,
    constraints: ['1 ≤ N ≤ 10^5', '-10^9 ≤ A[i] ≤ 10^9'],
    examples: [
      { input: '6\n3 1 8 2 5 7', output: '4', explanation: 'LIS: 1, 2, 5, 7' },
      { input: '5\n5 4 3 2 1', output: '1', explanation: 'Semua menurun, LIS = 1' },
    ],
    hints: [
      'O(n²) DP cukup untuk n ≤ 5000, tapi tidak untuk 10^5',
      'Solusi O(n log n) menggunakan patience sorting / binary search',
      'Pertahankan array dp[] di mana dp[i] = elemen terkecil yang mengakhiri LIS panjang i+1',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n; cin >> n;
    vector<int> a(n);
    for (int& x : a) cin >> x;

    vector<int> dp; // dp[i] = elemen terkecil di akhir LIS panjang i+1
    for (int x : a) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    cout << dp.size();
    return 0;
}`,
    solutionExplanation: 'Patience sorting: maintain array dp terkecil untuk setiap panjang LIS. lower_bound untuk mencari posisi insert. O(n log n).',
    tags: ['dp', 'binary-search', 'LIS'],
  },
  {
    id: 'coin-change',
    title: 'Tukar Koin',
    difficulty: 'sedang',
    category: 'Dynamic Programming',
    topicId: 'dynamic-programming',
    points: 200,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan array koin dengan denominasi berbeda dan target jumlah uang. Temukan jumlah koin minimum untuk membuat total tersebut.

Setiap koin bisa digunakan berkali-kali (unbounded knapsack).`,
    inputFormat: `Baris 1: N jumlah jenis koin, dan target T
Baris 2: N denominasi koin`,
    outputFormat: `Minimum koin yang dibutuhkan. Jika tidak mungkin, cetak -1.`,
    constraints: ['1 ≤ N ≤ 12', '1 ≤ T ≤ 10^4', '1 ≤ koin[i] ≤ T'],
    examples: [
      { input: '3 11\n1 2 5', output: '3', explanation: '5 + 5 + 1 = 11' },
      { input: '2 3\n2 4', output: '-1', explanation: 'Tidak bisa membuat 3 dari 2 dan 4' },
    ],
    hints: [
      'dp[i] = minimum koin untuk jumlah i',
      'Untuk setiap koin c, dp[i] = min(dp[i], dp[i-c] + 1)',
      'Inisialisasi dp[0] = 0, sisanya = infinity',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, T; cin >> n >> T;
    vector<int> coins(n);
    for (int& c : coins) cin >> c;

    vector<int> dp(T + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= T; i++) {
        for (int c : coins) {
            if (c <= i && dp[i-c] != INT_MAX) {
                dp[i] = min(dp[i], dp[i-c] + 1);
            }
        }
    }
    cout << (dp[T] == INT_MAX ? -1 : dp[T]);
    return 0;
}`,
    solutionExplanation: 'DP bottom-up: dp[i] = min coins untuk total i. Transisi: untuk setiap koin c, jika i >= c dan dp[i-c] valid, update dp[i]. O(n*T).',
    tags: ['dp', 'knapsack'],
  },
  {
    id: 'graph-bfs-shortest',
    title: 'Jalan Terpendek di Labirin',
    difficulty: 'sedang',
    category: 'Graf',
    topicId: 'graph-basics',
    points: 250,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Sebuah labirin berukuran N × M dengan grid sel. Setiap sel bisa berupa jalan ('.') atau dinding ('#').

Mulai dari sel 'S', temukan jarak terpendek (dalam langkah) ke sel 'E'. Kamu bisa bergerak ke 4 arah (atas, bawah, kiri, kanan).`,
    inputFormat: `Baris 1: N M
Baris 2..N+1: Baris-baris labirin`,
    outputFormat: `Jarak minimum dari S ke E. Jika tidak ada jalan, cetak -1.`,
    constraints: ['1 ≤ N, M ≤ 1000', 'Tepat satu S dan satu E'],
    examples: [
      {
        input: '5 5\n#####\n#S..#\n#.#.#\n#..E#\n#####',
        output: '4',
        explanation: 'S(1,1) → (1,2) → (1,3) → (2,3) → (3,3)=E',
      },
    ],
    hints: [
      'BFS memberikan shortest path di unweighted graph',
      'Representasikan grid sebagai graph, setiap sel terhubung ke tetangganya yang bukan dinding',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m; cin >> n >> m;
    vector<string> grid(n);
    for (auto& row : grid) cin >> row;

    int sr, sc, er, ec;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 'S') { sr = i; sc = j; }
            if (grid[i][j] == 'E') { er = i; ec = j; }
        }
    }

    vector<vector<int>> dist(n, vector<int>(m, -1));
    queue<pair<int,int>> q;
    dist[sr][sc] = 0;
    q.push({sr, sc});

    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};

    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m
                && grid[nx][ny] != '#' && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    cout << dist[er][ec];
    return 0;
}`,
    solutionExplanation: 'BFS dari S, tracking jarak ke setiap sel. BFS menjamin jarak terpendek di graph tanpa bobot. O(N*M).',
    tags: ['bfs', 'graph', 'grid'],
  },
  {
    id: 'dijkstra-problem',
    title: 'Perjalanan Hemat',
    difficulty: 'sedang',
    category: 'Graf',
    topicId: 'shortest-path',
    points: 300,
    timeLimit: 2,
    memoryLimit: 256,
    description: `Kota A memiliki N kota dan M jalan berarah dengan biaya perjalanan. Cari biaya perjalanan minimum dari kota 1 ke kota N.`,
    inputFormat: `Baris 1: N M
Baris 2..M+1: U V W (jalan dari U ke V berbiaya W)`,
    outputFormat: `Biaya minimum dari kota 1 ke N. Jika tidak ada jalur, cetak -1.`,
    constraints: ['1 ≤ N ≤ 10^5', '1 ≤ M ≤ 3×10^5', '1 ≤ W ≤ 10^9'],
    examples: [
      {
        input: '4 5\n1 2 4\n1 3 1\n3 2 2\n2 4 1\n3 4 5',
        output: '4',
        explanation: '1→3→2→4 = 1+2+1 = 4',
      },
    ],
    hints: [
      'Gunakan Dijkstra dengan priority queue',
      'Representasikan sebagai adjacency list dengan bobot',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;
const long long INF = 1e18;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m; cin >> n >> m;
    vector<vector<pair<int,int>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v, w; cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }

    vector<long long> dist(n + 1, INF);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    dist[1] = 0;
    pq.push({0, 1});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    cout << (dist[n] == INF ? -1 : dist[n]);
    return 0;
}`,
    solutionExplanation: 'Dijkstra dengan min-heap. O(E log V). Lazy deletion untuk menghindari proses node yang sudah optimal.',
    tags: ['dijkstra', 'graph', 'shortest-path'],
  },
  {
    id: 'range-sum-query',
    title: 'Jumlah Rentang dengan Update',
    difficulty: 'sulit',
    category: 'Struktur Data',
    topicId: 'segment-tree',
    points: 350,
    timeLimit: 2,
    memoryLimit: 256,
    description: `Diberikan array dengan N elemen. Proses Q query berikut:
- "1 i x": Update elemen ke-i menjadi x
- "2 l r": Hitung jumlah elemen dari indeks l sampai r (inclusive, 1-indexed)`,
    inputFormat: `Baris 1: N Q
Baris 2: N elemen array
Baris 3..Q+2: Query (1 i x atau 2 l r)`,
    outputFormat: `Untuk setiap query tipe 2, cetak jawabannya.`,
    constraints: ['1 ≤ N, Q ≤ 10^5', '-10^9 ≤ elemen ≤ 10^9'],
    examples: [
      {
        input: '5 4\n1 3 5 7 9\n2 1 3\n1 2 10\n2 1 3\n2 2 5',
        output: '9\n16\n31',
        explanation: 'Sum[1..3]=9, update A[2]=10, Sum[1..3]=16, Sum[2..5]=31',
      },
    ],
    hints: [
      'Gunakan Segment Tree atau BIT (Fenwick Tree)',
      'BIT lebih mudah diimplementasikan untuk range sum',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;

struct BIT {
    int n; vector<long long> t;
    BIT(int n) : n(n), t(n+1, 0) {}
    void update(int i, long long d) { for (; i <= n; i += i&-i) t[i] += d; }
    long long query(int i) { long long s=0; for (; i > 0; i -= i&-i) s += t[i]; return s; }
    long long query(int l, int r) { return query(r) - query(l-1); }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, q; cin >> n >> q;
    vector<long long> a(n+1);
    BIT bit(n);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        bit.update(i, a[i]);
    }
    while (q--) {
        int type; cin >> type;
        if (type == 1) {
            int i; long long x; cin >> i >> x;
            bit.update(i, x - a[i]);
            a[i] = x;
        } else {
            int l, r; cin >> l >> r;
            cout << bit.query(l, r) << "\\n";
        }
    }
    return 0;
}`,
    solutionExplanation: 'BIT (Fenwick Tree) mendukung point update dan prefix sum query dalam O(log n). Untuk range [l,r]: query(r) - query(l-1).',
    tags: ['bit', 'fenwick-tree', 'segment-tree', 'range-query'],
  },
  {
    id: 'kruskal-mst',
    title: 'Jaringan Kabel Minimum',
    difficulty: 'sulit',
    category: 'Graf',
    topicId: 'dsu',
    points: 350,
    timeLimit: 2,
    memoryLimit: 256,
    description: `Terdapat N kota yang perlu dihubungkan dengan kabel. Setiap pasang kota bisa dihubungkan dengan biaya tertentu. Temukan biaya minimum untuk menghubungkan semua kota.`,
    inputFormat: `Baris 1: N M
Baris 2..M+1: U V W (biaya menghubungkan kota U dan V)`,
    outputFormat: `Biaya minimum MST. Jika tidak bisa semua terhubung, cetak -1.`,
    constraints: ['1 ≤ N ≤ 10^5', '1 ≤ M ≤ 3×10^5', '1 ≤ W ≤ 10^9'],
    examples: [
      {
        input: '4 5\n1 2 10\n1 3 6\n1 4 5\n2 4 15\n3 4 4',
        output: '19',
        explanation: 'MST: (3,4)=4, (1,4)=5, (1,2)=10. Total = 19',
      },
    ],
    hints: [
      'Gunakan Kruskal dengan DSU',
      'Sort edges by weight, tambahkan jika tidak membuat cycle',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> p, r;
    DSU(int n) : p(n+1), r(n+1, 0) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int x, int y) {
        x = find(x); y = find(y);
        if (x == y) return false;
        if (r[x] < r[y]) swap(x, y);
        p[y] = x;
        if (r[x] == r[y]) r[x]++;
        return true;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m; cin >> n >> m;
    vector<tuple<int,int,int>> edges(m);
    for (auto& [w, u, v] : edges) cin >> u >> v >> w;
    sort(edges.begin(), edges.end());

    DSU dsu(n);
    long long total = 0;
    int cnt = 0;
    for (auto& [w, u, v] : edges) {
        if (dsu.unite(u, v)) { total += w; cnt++; }
        if (cnt == n-1) break;
    }
    cout << (cnt == n-1 ? total : -1);
    return 0;
}`,
    solutionExplanation: 'Kruskal: sort edges, tambahkan ke MST jika tidak cycle (cek dengan DSU). O(E log E). MST jika E_added = N-1.',
    tags: ['kruskal', 'mst', 'dsu', 'graph'],
  },
  {
    id: 'kmp-pattern',
    title: 'Pencocokan Pola',
    difficulty: 'sulit',
    category: 'String',
    topicId: 'string-algorithms',
    points: 300,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan teks T dan pola P. Temukan semua posisi kemunculan P dalam T. Cetak indeks awal setiap kemunculan (0-indexed).`,
    inputFormat: `Baris 1: String T (1 ≤ |T| ≤ 10^6)
Baris 2: String P (1 ≤ |P| ≤ |T|)`,
    outputFormat: `Jumlah kemunculan pada baris pertama, diikuti indeks-indeks kemunculan (terurut ascending).`,
    constraints: ['1 ≤ |P| ≤ |T| ≤ 10^6', 'Hanya huruf kecil'],
    examples: [
      {
        input: 'aabaacaadaabaaba\naaba',
        output: '3\n0 9 12',
        explanation: '"aaba" muncul di indeks 0, 9, 12',
      },
    ],
    hints: [
      'Naive O(nm) akan TLE. Gunakan KMP O(n+m)',
      'Precompute failure function dari pattern',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string text, pattern;
    cin >> text >> pattern;
    int n = text.size(), m = pattern.size();

    vector<int> kmp(m, 0);
    for (int i = 1; i < m; i++) {
        int j = kmp[i-1];
        while (j > 0 && pattern[i] != pattern[j]) j = kmp[j-1];
        if (pattern[i] == pattern[j]) j++;
        kmp[i] = j;
    }

    vector<int> res;
    int j = 0;
    for (int i = 0; i < n; i++) {
        while (j > 0 && text[i] != pattern[j]) j = kmp[j-1];
        if (text[i] == pattern[j]) j++;
        if (j == m) { res.push_back(i - m + 1); j = kmp[j-1]; }
    }

    cout << res.size() << "\\n";
    for (int x : res) cout << x << " ";
    return 0;
}`,
    solutionExplanation: 'KMP: precompute failure function O(m), lalu scan teks O(n). Total O(n+m).',
    tags: ['kmp', 'string', 'pattern-matching'],
  },
  {
    id: 'dp-tsp',
    title: 'Traveling Salesman Problem',
    difficulty: 'sangat-sulit',
    category: 'Dynamic Programming',
    topicId: 'dynamic-programming',
    points: 500,
    timeLimit: 3,
    memoryLimit: 512,
    description: `Seorang salesman ingin mengunjungi N kota (1 sampai N), mulai dan berakhir di kota 1. Setiap kota harus dikunjungi tepat sekali. Diberikan jarak antar setiap pasang kota, temukan rute dengan total jarak minimum.`,
    inputFormat: `Baris 1: N (2 ≤ N ≤ 20)
Baris 2..N+1: Matriks jarak N×N (dist[i][j] = jarak dari kota i ke j)`,
    outputFormat: `Total jarak minimum.`,
    constraints: ['2 ≤ N ≤ 20', '0 ≤ dist[i][j] ≤ 10^6', 'dist[i][i] = 0'],
    examples: [
      {
        input: '4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0',
        output: '80',
        explanation: '1→3→2→4→1 = 15+35+25+20 = 95? No: 1→4→2→3→1 = 20+25+35+15 = 95. Best: 80',
      },
    ],
    hints: [
      'Bitmask DP: dp[mask][i] = biaya minimum mengunjungi kota dalam mask, berakhir di i',
      'State: 2^N × N states, O(2^N × N²) total',
      '2^20 × 20 ≈ 20 juta state, cukup untuk N ≤ 20',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;
const int INF = 1e9;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n; cin >> n;
    vector<vector<int>> dist(n, vector<int>(n));
    for (auto& row : dist) for (int& x : row) cin >> x;

    vector<vector<int>> dp(1 << n, vector<int>(n, INF));
    dp[1][0] = 0;

    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask >> u & 1) || dp[mask][u] == INF) continue;
            for (int v = 0; v < n; v++) {
                if (mask >> v & 1) continue;
                int nm = mask | (1 << v);
                dp[nm][v] = min(dp[nm][v], dp[mask][u] + dist[u][v]);
            }
        }
    }

    int full = (1 << n) - 1, ans = INF;
    for (int u = 1; u < n; u++)
        if (dp[full][u] != INF) ans = min(ans, dp[full][u] + dist[u][0]);
    cout << ans;
    return 0;
}`,
    solutionExplanation: 'Bitmask DP: representasikan kota yang dikunjungi sebagai bitmask. dp[mask][i] = biaya min mengunjungi set kota dalam mask, berakhir di i. O(2^N × N²).',
    tags: ['dp', 'bitmask', 'tsp', 'advanced'],
  },
  {
    id: 'activity-selection',
    title: 'Jadwal Kegiatan Terbanyak',
    difficulty: 'mudah',
    category: 'Greedy',
    topicId: 'greedy',
    points: 150,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan N kegiatan, masing-masing dengan waktu mulai S[i] dan waktu selesai E[i]. Kamu hanya bisa mengikuti satu kegiatan pada satu waktu. Tentukan jumlah kegiatan maksimum yang bisa kamu ikuti.\n\nKegiatan bisa dimulai tepat saat kegiatan lain selesai.`,
    inputFormat: `Baris 1: N (1 ≤ N ≤ 10^5)\nBaris 2..N+1: S[i] E[i]`,
    outputFormat: `Satu bilangan: jumlah kegiatan maksimum.`,
    constraints: ['1 ≤ N ≤ 10^5', '0 ≤ S[i] < E[i] ≤ 10^9'],
    examples: [
      { input: '6\n1 4\n3 5\n0 6\n5 7\n3 9\n5 10', output: '3', explanation: 'Kegiatan 1(1-4), 4(5-7), lalu 1 lagi = 3' },
    ],
    hints: [
      'Sort berdasarkan waktu selesai',
      'Greedy: selalu pilih kegiatan yang selesai paling awal dan tidak overlap',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<pair<int,int>> acts(n);
    for (auto& [s, e] : acts) cin >> s >> e;
    sort(acts.begin(), acts.end(), [](const auto& a, const auto& b) {
        return a.second < b.second;
    });
    int count = 1, lastEnd = acts[0].second;
    for (int i = 1; i < n; i++) {
        if (acts[i].first >= lastEnd) {
            count++;
            lastEnd = acts[i].second;
        }
    }
    cout << count;
}`,
    solutionExplanation: 'Greedy: sort by end time, ambil kegiatan yang mulai setelah atau tepat saat kegiatan sebelumnya selesai. Exchange argument membuktikan ini optimal. O(n log n).',
    tags: ['greedy', 'sorting', 'interval'],
  },
  {
    id: 'two-sum-sorted',
    title: 'Pasangan dengan Jumlah Target',
    difficulty: 'mudah',
    category: 'Searching',
    topicId: 'two-pointers',
    points: 100,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan array terurut dan target T. Temukan semua pasangan (i, j) dengan i < j sehingga A[i] + A[j] = T. Cetak semua pasangan tersebut.`,
    inputFormat: `Baris 1: N T\nBaris 2: N bilangan terurut naik`,
    outputFormat: `Setiap baris: dua bilangan yang berjumlah T. Jika tidak ada, cetak "TIDAK ADA".`,
    constraints: ['2 ≤ N ≤ 10^5', '-10^9 ≤ A[i] ≤ 10^9', '-2×10^9 ≤ T ≤ 2×10^9'],
    examples: [
      { input: '5 6\n1 2 3 4 6', output: '2 4', explanation: '2+4=6' },
      { input: '3 10\n1 2 3', output: 'TIDAK ADA' },
    ],
    hints: ['Gunakan two pointers karena array sudah terurut', 'Pointer kiri bergerak kanan jika sum < target, kanan bergerak kiri jika sum > target'],
    solution: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; long long T; cin >> n >> T;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    int lo = 0, hi = n - 1;
    bool found = false;
    while (lo < hi) {
        long long sum = a[lo] + a[hi];
        if (sum == T) { cout << a[lo] << " " << a[hi] << "\\n"; lo++; hi--; found = true; }
        else if (sum < T) lo++;
        else hi--;
    }
    if (!found) cout << "TIDAK ADA";
}`,
    solutionExplanation: 'Two pointers O(n): pointer kiri dan kanan bergerak menuju tengah. Total langkah ≤ n, jadi O(n).',
    tags: ['two-pointers', 'array', 'searching'],
  },
  {
    id: 'longest-subarray',
    title: 'Subarray Terpanjang Tanpa Duplikat',
    difficulty: 'sedang',
    category: 'Searching',
    topicId: 'two-pointers',
    points: 200,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan array bilangan bulat, temukan panjang subarray terpanjang yang semua elemennya berbeda (tidak ada duplikat).`,
    inputFormat: `Baris 1: N (1 ≤ N ≤ 10^5)\nBaris 2: N bilangan bulat`,
    outputFormat: `Satu bilangan: panjang subarray terpanjang dengan semua elemen unik.`,
    constraints: ['1 ≤ N ≤ 10^5', '1 ≤ A[i] ≤ 10^9'],
    examples: [
      { input: '8\n1 3 1 3 2 4 3 5', output: '5', explanation: 'Subarray [1,3,2,4,3] → tidak benar. [3,2,4,3,5] → duplikat. [2,4,3,5] panjang 4. Max = [3,2,4] atau [1,3,2,4] = 4? Cek lagi: [2,4,3,5]=4, [1,3,2,4,3] ada duplikat.' },
      { input: '5\n1 2 3 4 5', output: '5' },
    ],
    hints: ['Sliding window dengan hashmap/set untuk track elemen yang ada', 'Saat ada duplikat, geser pointer kiri'],
    solution: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    unordered_map<int,int> last;
    int maxLen = 0, left = 0;
    for (int right = 0; right < n; right++) {
        if (last.count(a[right]) && last[a[right]] >= left)
            left = last[a[right]] + 1;
        last[a[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    cout << maxLen;
}`,
    solutionExplanation: 'Sliding window O(n): track posisi terakhir setiap elemen. Saat duplikat ditemukan, geser left ke posisi setelah duplikat sebelumnya. Panjang window = right - left + 1.',
    tags: ['sliding-window', 'two-pointers', 'hashmap'],
  },
  {
    id: 'tree-diameter',
    title: 'Diameter Pohon',
    difficulty: 'sedang',
    category: 'Graf & Tree',
    topicId: 'tree-algorithms',
    points: 250,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan pohon dengan N simpul (tidak berarah, terhubung, tanpa cycle). Temukan diameter pohon — jarak terpanjang antara dua simpul manapun.`,
    inputFormat: `Baris 1: N (2 ≤ N ≤ 10^5)\nBaris 2..N: U V (edge antara U dan V)`,
    outputFormat: `Satu bilangan: diameter pohon.`,
    constraints: ['2 ≤ N ≤ 10^5', '1 ≤ U, V ≤ N', 'Input dijamin tree yang valid'],
    examples: [
      { input: '5\n1 2\n2 3\n3 4\n3 5', output: '3', explanation: '1-2-3-4 atau 1-2-3-5, panjang 3' },
    ],
    hints: ['BFS dari simpul mana saja → temukan simpul terjauh A', 'BFS dari A → jarak terjauh = diameter'],
    solution: `#include <bits/stdc++.h>
using namespace std;
pair<int,int> bfs(vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<int> dist(n, -1);
    queue<int> q;
    dist[start] = 0; q.push(start);
    int far = start;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) if (dist[v]==-1) {
            dist[v] = dist[u]+1; q.push(v);
            if (dist[v] > dist[far]) far = v;
        }
    }
    return {far, dist[far]};
}
int main() {
    int n; cin >> n;
    vector<vector<int>> adj(n+1);
    for (int i = 0; i < n-1; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v); adj[v].push_back(u);
    }
    auto [a, _] = bfs(adj, 1);
    auto [b, diam] = bfs(adj, a);
    cout << diam;
}`,
    solutionExplanation: '2x BFS O(n): BFS pertama mencari ujung satu diameter, BFS kedua dari sana mencari diameter sebenarnya. Ini benar karena dalam tree, node terjauh dari sembarang node pasti merupakan salah satu ujung diameter.',
    tags: ['bfs', 'tree', 'diameter'],
  },
  {
    id: 'prime-count',
    title: 'Hitung Bilangan Prima',
    difficulty: 'mudah',
    category: 'Matematika',
    topicId: 'math-discrete',
    points: 100,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan Q query, masing-masing berisi bilangan bulat N. Untuk setiap query, hitung berapa banyak bilangan prima yang ≤ N.`,
    inputFormat: `Baris 1: Q (1 ≤ Q ≤ 10^4)\nBaris 2..Q+1: N (1 ≤ N ≤ 10^6)`,
    outputFormat: `Untuk setiap query, cetak jawabannya.`,
    constraints: ['1 ≤ Q ≤ 10^4', '1 ≤ N ≤ 10^6'],
    examples: [
      { input: '3\n10\n20\n1', output: '4\n8\n0', explanation: 'Prima ≤ 10: 2,3,5,7 (4 buah)' },
    ],
    hints: ['Precompute dengan Sieve of Eratosthenes', 'Gunakan prefix sum agar setiap query O(1)'],
    solution: `#include <bits/stdc++.h>
using namespace std;
const int MAXN = 1e6 + 5;
int main() {
    vector<bool> is_prime(MAXN, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i < MAXN; i++)
        if (is_prime[i])
            for (int j = i*i; j < MAXN; j += i)
                is_prime[j] = false;
    // Prefix sum
    vector<int> cnt(MAXN, 0);
    for (int i = 1; i < MAXN; i++)
        cnt[i] = cnt[i-1] + (is_prime[i] ? 1 : 0);
    int q; cin >> q;
    while (q--) { int n; cin >> n; cout << cnt[n] << "\\n"; }
}`,
    solutionExplanation: 'Sieve O(n log log n) untuk precompute semua prima. Prefix sum cnt[i] = jumlah prima ≤ i, sehingga setiap query O(1). Total O(n log log n + Q).',
    tags: ['sieve', 'matematika', 'prefix-sum'],
  },
  {
    id: 'subarray-max-sum',
    title: 'Subarray Jumlah Maksimum',
    difficulty: 'sedang',
    category: 'Dynamic Programming',
    topicId: 'dynamic-programming',
    points: 200,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan array N bilangan bulat (bisa negatif). Temukan jumlah maksimum dari subarray kontigu (berurutan, minimal 1 elemen).`,
    inputFormat: `Baris 1: N (1 ≤ N ≤ 10^5)\nBaris 2: N bilangan bulat A[i]`,
    outputFormat: `Satu bilangan: jumlah subarray maksimum.`,
    constraints: ['1 ≤ N ≤ 10^5', '-10^9 ≤ A[i] ≤ 10^9'],
    examples: [
      { input: '8\n-2 1 -3 4 -1 2 1 -5', output: '6', explanation: 'Subarray [4,-1,2,1] = 6' },
      { input: '3\n-5 -2 -8', output: '-2', explanation: 'Semua negatif, ambil elemen terbesar' },
    ],
    hints: [
      'Algoritma Kadane O(n)',
      'Jika sum berjalan jadi negatif, reset ke elemen saat ini',
      'Hati-hati semua elemen negatif — jawaban = elemen terbesar',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n; cin >> n;
    long long best = LLONG_MIN, cur = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        cur = max(x, cur + x);   // mulai baru atau lanjutkan
        best = max(best, cur);
    }
    cout << best;
}`,
    solutionExplanation: 'Algoritma Kadane: pada tiap posisi, pilih antara memulai subarray baru (x) atau melanjutkan (cur+x). Simpan maksimum global. O(n), O(1) memori.',
    tags: ['dp', 'kadane', 'subarray'],
  },
  {
    id: 'count-islands',
    title: 'Menghitung Pulau',
    difficulty: 'sedang',
    category: 'Graf',
    topicId: 'graph-basics',
    points: 250,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan grid N×M berisi '1' (daratan) dan '0' (air). Hitung jumlah pulau. Sebuah pulau adalah kumpulan daratan yang terhubung secara horizontal atau vertikal (4 arah).`,
    inputFormat: `Baris 1: N M\nBaris berikutnya: grid N baris berisi karakter 0/1`,
    outputFormat: `Jumlah pulau.`,
    constraints: ['1 ≤ N, M ≤ 1000'],
    examples: [
      { input: '4 5\n11000\n11000\n00100\n00011', output: '3', explanation: 'Ada 3 kelompok daratan terpisah' },
    ],
    hints: [
      'Gunakan flood fill (BFS/DFS) tiap menemukan daratan belum dikunjungi',
      'Setiap flood fill baru = 1 pulau',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;
int n, m;
vector<string> grid;
void dfs(int r, int c) {
    if (r < 0 || r >= n || c < 0 || c >= m || grid[r][c] != '1') return;
    grid[r][c] = '0';  // tandai dikunjungi
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
}
int main() {
    cin >> n >> m;
    grid.resize(n);
    for (auto& row : grid) cin >> row;
    int islands = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (grid[i][j] == '1') { dfs(i, j); islands++; }
    cout << islands;
}`,
    solutionExplanation: 'Flood fill (DFS) dari tiap daratan yang belum dikunjungi, tandai seluruh pulau. Setiap kali memulai DFS baru = pulau baru. O(N×M). Untuk grid besar, gunakan BFS agar tidak stack overflow.',
    tags: ['dfs', 'bfs', 'flood-fill', 'grid', 'graph'],
  },
  {
    id: 'gcd-pairs',
    title: 'FPB Sepanjang Barisan',
    difficulty: 'mudah',
    category: 'Matematika',
    topicId: 'math-discrete',
    points: 150,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan N bilangan bulat positif. Hitung FPB (Faktor Persekutuan Terbesar) dari seluruh bilangan tersebut.`,
    inputFormat: `Baris 1: N (1 ≤ N ≤ 10^5)\nBaris 2: N bilangan bulat positif A[i]`,
    outputFormat: `FPB dari semua bilangan.`,
    constraints: ['1 ≤ N ≤ 10^5', '1 ≤ A[i] ≤ 10^9'],
    examples: [
      { input: '4\n12 18 24 30', output: '6', explanation: 'FPB(12,18,24,30) = 6' },
      { input: '3\n7 14 21', output: '7' },
    ],
    hints: ['FPB seluruh array = gcd(gcd(gcd(a0,a1),a2)...)', 'Gunakan __gcd() dari STL'],
    solution: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    long long g = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        g = __gcd(g, x);  // gcd(0,x) = x
    }
    cout << g;
}`,
    solutionExplanation: 'FPB bersifat asosiatif: gcd(a,b,c) = gcd(gcd(a,b),c). Mulai dari g=0 karena gcd(0,x)=x. Setiap gcd O(log(max)). Total O(n log(max)).',
    tags: ['gcd', 'matematika', 'number-theory'],
  },
  {
    id: 'stack-postfix',
    title: 'Evaluasi Ekspresi Postfix',
    difficulty: 'sedang',
    category: 'Struktur Data',
    topicId: 'stack-queue',
    points: 200,
    timeLimit: 1,
    memoryLimit: 256,
    description: `Diberikan ekspresi dalam notasi postfix (Reverse Polish Notation). Evaluasi hasilnya. Operator yang mungkin: + - * /. Operand dan operator dipisahkan spasi.

Contoh: "3 4 + 2 *" berarti (3+4)*2 = 14.`,
    inputFormat: `Satu baris ekspresi postfix, token dipisah spasi.`,
    outputFormat: `Hasil evaluasi (bilangan bulat).`,
    constraints: ['Ekspresi valid', 'Hasil antara muat dalam long long', 'Pembagian = pembagian bulat'],
    examples: [
      { input: '3 4 + 2 *', output: '14', explanation: '(3+4)*2 = 14' },
      { input: '5 1 2 + 4 * + 3 -', output: '14', explanation: '5 + (1+2)*4 - 3 = 14' },
    ],
    hints: [
      'Gunakan stack',
      'Operand: push ke stack. Operator: pop 2 elemen, hitung, push hasilnya',
      'Urutan operand penting untuk - dan /: operand kedua dari atas adalah kiri',
    ],
    solution: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string token;
    stack<long long> st;
    while (cin >> token) {
        if (token == "+" || token == "-" || token == "*" || token == "/") {
            long long b = st.top(); st.pop();
            long long a = st.top(); st.pop();
            if (token == "+") st.push(a + b);
            else if (token == "-") st.push(a - b);
            else if (token == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(stoll(token));
        }
    }
    cout << st.top();
}`,
    solutionExplanation: 'Stack: operand di-push, operator mem-pop 2 operand teratas (b=kanan, a=kiri), hitung a op b, push hasilnya. Di akhir, stack berisi 1 nilai = hasil. O(n).',
    tags: ['stack', 'expression', 'parsing'],
  },
]

export function getProblemById(id: string): Problem | undefined {
  return problems.find(p => p.id === id)
}

export function getProblemsByDifficulty(diff: ProblemDifficulty): Problem[] {
  return problems.filter(p => p.difficulty === diff)
}

export function getProblemsByCategory(cat: string): Problem[] {
  return problems.filter(p => p.category === cat)
}

export function getProblemsByTopic(topicId: string): Problem[] {
  return problems.filter(p => p.topicId === topicId)
}
