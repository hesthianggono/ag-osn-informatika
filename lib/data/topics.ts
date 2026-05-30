export type Difficulty = 'osn-k' | 'osn-p' | 'osn-nasional' | 'ioi'
export type LessonType = 'concept' | 'code' | 'exercise'

export interface LessonStep {
  title: string
  content: string
  code?: string
  language?: string
}

export interface Lesson {
  id: string
  title: string
  duration: number
  type: LessonType
  content: string
  keyPoints: string[]
  code?: string
  codeExplanation?: string
  practice?: {
    question: string
    hint: string
    answer: string
  }
}

export interface Topic {
  id: string
  title: string
  subtitle: string
  difficulty: Difficulty
  category: string
  icon: string
  color: string
  estimatedHours: number
  prerequisites: string[]
  description: string
  whatYouLearn: string[]
  lessons: Lesson[]
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  'osn-k': 'OSN Kota/Kab',
  'osn-p': 'OSN Provinsi',
  'osn-nasional': 'OSN Nasional',
  'ioi': 'IOI Level',
}

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  'osn-k': 'text-green-400 bg-green-400/10 border-green-400/30',
  'osn-p': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  'osn-nasional': 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  'ioi': 'text-orange-400 bg-orange-400/10 border-orange-400/30',
}

export const CATEGORIES = [
  'Pemrograman Dasar',
  'Struktur Data',
  'Algoritma',
  'Matematika',
  'Graf & Tree',
  'String',
  'Lanjutan',
]

export const topics: Topic[] = [
  {
    id: 'cpp-basics',
    title: 'Dasar C++ untuk Kompetisi',
    subtitle: 'Fondasi wajib sebelum masuk ke algoritma',
    difficulty: 'osn-k',
    category: 'Pemrograman Dasar',
    icon: '⚡',
    color: 'from-green-500 to-emerald-600',
    estimatedHours: 4,
    prerequisites: [],
    description: 'Kuasai C++ khusus untuk competitive programming. Mulai dari sintaks dasar, tipe data, I/O cepat, hingga STL yang sering dipakai di OSN.',
    whatYouLearn: [
      'Sintaks dan struktur program C++',
      'Tipe data dan konversi',
      'I/O cepat dengan ios_base::sync_with_stdio',
      'Fungsi dan parameter',
      'Template dasar STL',
    ],
    lessons: [
      {
        id: 'cpp-structure',
        title: 'Struktur Program C++ Kompetisi',
        duration: 20,
        type: 'concept',
        content: `Setiap program C++ untuk kompetisi memiliki struktur standar yang harus kamu hafal. Berbeda dengan C++ untuk development biasa, program kompetisi dioptimalkan untuk kecepatan dan keringkasan.\n\nStruktur dasar yang selalu dipakai di OSN:\n\n1. **Include headers** - Kita pakai \`#include <bits/stdc++.h>\` yang menggabungkan semua header sekaligus\n2. **Using namespace std** - Agar tidak perlu menulis \`std::\` setiap saat\n3. **Fungsi main** - Titik masuk program\n4. **I/O optimization** - Wajib untuk soal dengan input besar`,
        keyPoints: [
          'bits/stdc++.h menyertakan semua header C++ sekaligus',
          'ios_base::sync_with_stdio(false) mempercepat cin/cout',
          'cin.tie(NULL) memisahkan sinkronisasi cin dengan cout',
          'Gunakan \\n bukan endl agar lebih cepat',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Wajib untuk I/O cepat di kompetisi
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        cout << i << "\\n";  // Pakai \\n bukan endl
    }

    return 0;
}`,
        codeExplanation: 'Template standar ini WAJIB dipakai di semua program kompetisi. Optimasi I/O bisa menghemat 3-5x waktu eksekusi.',
        practice: {
          question: 'Tulis program yang membaca angka N, lalu mencetak N, N*2, N*3 dalam baris terpisah.',
          hint: 'Gunakan template standar di atas, lalu gunakan loop for.',
          answer: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    cout << n << "\\n" << n*2 << "\\n" << n*3 << "\\n";
    return 0;
}`,
        },
      },
      {
        id: 'data-types',
        title: 'Tipe Data & Batas Nilai',
        duration: 25,
        type: 'concept',
        content: `Salah satu sumber error yang paling sering di kompetisi adalah **integer overflow** — nilai yang melebihi kapasitas tipe data. Di OSN, soal sering melibatkan angka hingga 10^18, sehingga kamu HARUS tahu batas setiap tipe data.\n\n**Tipe integer yang perlu dihafalkan:**\n\n| Tipe | Ukuran | Nilai Maksimum | Kapan Dipakai |\n|------|--------|----------------|---------------|\n| int | 32-bit | ~2.1 × 10⁹ | Soal biasa, indeks array |\n| long long | 64-bit | ~9.2 × 10¹⁸ | Hasil perkalian besar |\n| unsigned int | 32-bit | ~4.3 × 10⁹ | Jarang dipakai |\n\n**Aturan emas:** Jika soal melibatkan nilai > 10⁸, langsung pakai **long long**.`,
        keyPoints: [
          'int maksimal ~2×10⁹, long long ~9×10¹⁸',
          'Gunakan 1LL * a * b untuk perkalian long long',
          'Konstanta LLONG_MAX untuk nilai maksimum long long',
          'Hati-hati overflow saat penjumlahan: pakai (long long)a + b',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // SALAH - overflow!
    int a = 1000000, b = 1000000;
    int hasil_salah = a * b;  // Overflow! Hasil negatif

    // BENAR
    long long hasil_benar = (long long)a * b;  // 10^12

    // Atau cast salah satunya dulu
    long long hasil2 = 1LL * a * b;

    cout << hasil_salah << "\\n";   // -727379968 (SALAH)
    cout << hasil_benar << "\\n";   // 1000000000000 (BENAR)

    // Cek batas
    cout << INT_MAX << "\\n";       // 2147483647
    cout << LLONG_MAX << "\\n";     // 9223372036854775807

    return 0;
}`,
        codeExplanation: 'Contoh nyata overflow yang sering jadi bug. Selalu gunakan long long jika ragu!',
        practice: {
          question: 'Diberikan dua bilangan a dan b (masing-masing hingga 10^9). Hitung a × b. Apa tipe data yang tepat?',
          hint: 'a×b bisa mencapai 10^18, gunakan long long.',
          answer: 'long long hasil = 1LL * a * b; // atau (long long)a * b',
        },
      },
      {
        id: 'stl-basics',
        title: 'STL Wajib untuk Kompetisi',
        duration: 35,
        type: 'code',
        content: `**Standard Template Library (STL)** adalah senjata utama dalam competitive programming. Dengan STL, kamu bisa fokus pada logika algoritma tanpa harus implementasi struktur data dari nol.\n\n**STL yang WAJIB dikuasai untuk OSN:**\n\n1. **vector** - Array dinamis, paling sering dipakai\n2. **pair** - Menyimpan pasangan nilai\n3. **sort()** - Pengurutan built-in O(n log n)\n4. **map** - Dictionary/kamus\n5. **set** - Himpunan unik terurut\n6. **queue/stack** - Antrian dan tumpukan\n7. **priority_queue** - Antrian prioritas (heap)`,
        keyPoints: [
          'vector<int> v(n) membuat vector isi n elemen',
          'sort(v.begin(), v.end()) untuk sort ascending',
          'sort(v.begin(), v.end(), greater<int>()) untuk sort descending',
          'map dan set beroperasi dalam O(log n)',
          'unordered_map lebih cepat O(1) rata-rata',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // === VECTOR ===
    vector<int> v = {5, 3, 8, 1, 9, 2};
    sort(v.begin(), v.end());  // {1, 2, 3, 5, 8, 9}
    v.push_back(7);            // tambah di akhir
    cout << v.size() << "\\n"; // 7

    // === PAIR ===
    vector<pair<int,int>> edges;
    edges.push_back({3, 1});  // atau make_pair(3, 1)
    edges.push_back({1, 5});
    sort(edges.begin(), edges.end()); // sort by first, then second

    // === MAP ===
    map<string, int> freq;
    freq["apel"]++;
    freq["jeruk"] = 5;
    cout << freq["apel"] << "\\n";  // 1

    // === SET ===
    set<int> s = {1, 2, 3, 2, 1};  // {1, 2, 3} - unik!
    s.insert(4);
    cout << s.count(2) << "\\n";    // 1 (ada)

    // === PRIORITY QUEUE (Max-Heap) ===
    priority_queue<int> pq;
    pq.push(5); pq.push(2); pq.push(8);
    cout << pq.top() << "\\n";  // 8 (terbesar)
    pq.pop();

    // Min-Heap
    priority_queue<int, vector<int>, greater<int>> minpq;
    minpq.push(5); minpq.push(2); minpq.push(8);
    cout << minpq.top() << "\\n";  // 2 (terkecil)

    return 0;
}`,
        codeExplanation: 'Hafalkanlah semua operasi STL ini. Di kompetisi, waktu sangat berharga dan STL menghemat banyak waktu implementasi.',
      },
    ],
  },
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    subtitle: 'Fondasi algoritma yang selalu muncul di soal',
    difficulty: 'osn-k',
    category: 'Algoritma',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    estimatedHours: 5,
    prerequisites: ['cpp-basics'],
    description: 'Sorting dan searching adalah dasar dari hampir semua algoritma. Pahami bukan hanya cara menggunakannya, tapi juga kompleksitas dan kapan memilih algoritma yang tepat.',
    whatYouLearn: [
      'Bubble, Selection, Insertion Sort - O(n²)',
      'Merge Sort & Quick Sort - O(n log n)',
      'Binary Search & variasinya',
      'Sort custom dengan comparator',
      'Counting sort untuk data terbatas',
    ],
    lessons: [
      {
        id: 'binary-search',
        title: 'Binary Search - Lebih Dari Sekedar Mencari',
        duration: 45,
        type: 'concept',
        content: `Binary Search adalah salah satu algoritma yang paling sering muncul di OSN. Bukan hanya untuk mencari elemen di array terurut, tapi juga dipakai sebagai **teknik untuk mencari jawaban (binary search on answer)**.\n\n**Konsep Dasar:**\nJika array terurut, kita bisa membagi dua search space setiap iterasi. Dari O(n) menjadi O(log n)!\n\n**Pola Binary Search on Answer:**\nKapan sebuah nilai x memenuhi kondisi? Jika nilai x memenuhi kondisi, apakah x+1 juga memenuhi? Jika ya, kita bisa binary search pada jawabannya!\n\nContoh: "Berapa kecepatan minimum agar pekerjaan selesai dalam waktu T?"`,
        keyPoints: [
          'Binary search klasik: O(log n), array harus terurut',
          'lower_bound: iterator ke elemen pertama >= target',
          'upper_bound: iterator ke elemen pertama > target',
          'Binary search on answer: cari nilai minimum/maksimum yang memenuhi kondisi',
          'Hati-hati off-by-one error di kondisi while loop',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// Binary Search Manual
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;  // Hindari overflow
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;  // Tidak ditemukan
}

// Binary Search on Answer
// Soal: n buku dengan halaman berbeda, k orang.
// Berapa maksimum halaman per orang jika dibagi rata (minimize maximum)?
bool canFinish(vector<int>& books, int k, int maxPages) {
    int people = 1, pages = 0;
    for (int b : books) {
        if (b > maxPages) return false;  // Satu buku sudah melebihi
        if (pages + b > maxPages) {
            people++;
            pages = b;
        } else {
            pages += b;
        }
    }
    return people <= k;
}

int minMaxPages(vector<int>& books, int k) {
    int lo = *max_element(books.begin(), books.end());
    int hi = accumulate(books.begin(), books.end(), 0);

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (canFinish(books, k, mid)) hi = mid;  // Coba lebih kecil
        else lo = mid + 1;
    }
    return lo;
}

int main() {
    // STL lower_bound & upper_bound
    vector<int> v = {1, 3, 3, 5, 7, 9};

    auto it1 = lower_bound(v.begin(), v.end(), 3);
    cout << (it1 - v.begin()) << "\\n";  // 1 (index pertama >= 3)

    auto it2 = upper_bound(v.begin(), v.end(), 3);
    cout << (it2 - v.begin()) << "\\n";  // 3 (index pertama > 3)

    // Jumlah elemen = 3
    cout << (it2 - it1) << "\\n";  // 2

    // Binary search on answer
    vector<int> books = {10, 20, 30, 40};
    cout << minMaxPages(books, 2) << "\\n";  // 60

    return 0;
}`,
        codeExplanation: 'Binary search on answer adalah teknik powerful untuk soal optimization. Kuncinya: definisikan fungsi check() yang O(n), lalu binary search jawabannya.',
      },
      {
        id: 'sorting-algorithms',
        title: 'Sorting - Dari Dasar hingga Trik Kompetisi',
        duration: 40,
        type: 'code',
        content: `Di kompetisi, kita hampir selalu pakai \`sort()\` dari STL. Tapi memahami algoritma sorting dari dalam penting untuk dua hal:\n1. Memahami kompleksitas dan trade-off\n2. Mengimplementasikan Merge Sort untuk soal yang butuh "inversion count" atau offline query\n\n**Merge Sort** sangat berguna karena:\n- Stable sort (urutan elemen sama tidak berubah)\n- Bisa diadaptasi untuk menghitung **inversion count**\n- Kompleksitas O(n log n) dijamin (beda dengan Quick Sort yang worst-case O(n²))`,
        keyPoints: [
          'Selalu pakai sort() STL di kompetisi, O(n log n)',
          'Merge Sort berguna untuk inversion count',
          'Counting Sort O(n+k) untuk data dalam range kecil',
          'sort() dengan custom comparator untuk sort kompleks',
          'stable_sort() untuk mempertahankan urutan relatif',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// Merge Sort + Inversion Count
long long merge_count(vector<int>& arr, int l, int r) {
    if (r - l <= 1) return 0;
    int mid = (l + r) / 2;
    long long cnt = 0;
    cnt += merge_count(arr, l, mid);
    cnt += merge_count(arr, mid, r);

    vector<int> tmp;
    int i = l, j = mid;
    while (i < mid && j < r) {
        if (arr[i] <= arr[j]) {
            tmp.push_back(arr[i++]);
        } else {
            cnt += mid - i;  // Hitung inversi
            tmp.push_back(arr[j++]);
        }
    }
    while (i < mid) tmp.push_back(arr[i++]);
    while (j < r) tmp.push_back(arr[j++]);

    for (int k = l; k < r; k++) arr[k] = tmp[k - l];
    return cnt;
}

int main() {
    // Sort custom - sort berdasarkan nilai kedua (descending)
    vector<pair<string, int>> data = {{"Alice", 90}, {"Bob", 75}, {"Charlie", 85}};
    sort(data.begin(), data.end(), [](const auto& a, const auto& b) {
        return a.second > b.second;  // sort by score descending
    });
    for (auto [name, score] : data) {
        cout << name << ": " << score << "\\n";
    }
    // Output: Alice: 90, Charlie: 85, Bob: 75

    // Sort struct custom
    struct Student {
        string name;
        int score, id;
    };
    vector<Student> students = {{"Alice", 90, 3}, {"Bob", 90, 1}, {"Charlie", 85, 2}};
    sort(students.begin(), students.end(), [](const Student& a, const Student& b) {
        if (a.score != b.score) return a.score > b.score;  // Score desc
        return a.id < b.id;  // Jika sama, ID asc
    });

    // Inversion count
    vector<int> arr = {3, 1, 2, 4};
    cout << merge_count(arr, 0, arr.size()) << "\\n";  // 2

    return 0;
}`,
      },
    ],
  },
  {
    id: 'stack-queue',
    title: 'Stack & Queue',
    subtitle: 'Struktur data linier fundamental',
    difficulty: 'osn-k',
    category: 'Struktur Data',
    icon: '📚',
    color: 'from-yellow-500 to-orange-600',
    estimatedHours: 4,
    prerequisites: ['cpp-basics'],
    description: 'Stack (LIFO) dan Queue (FIFO) adalah fondasi dari banyak algoritma. Kuasai implementasi dan aplikasinya untuk soal-soal OSN.',
    whatYouLearn: [
      'Implementasi Stack dan Queue dengan STL',
      'Balanced Parentheses dengan Stack',
      'Monotonic Stack untuk Next Greater Element',
      'BFS menggunakan Queue',
      'Deque untuk sliding window',
    ],
    lessons: [
      {
        id: 'stack-applications',
        title: 'Stack & Monotonic Stack',
        duration: 45,
        type: 'code',
        content: `Stack adalah struktur data LIFO (Last In, First Out). Di kompetisi, Stack paling sering dipakai untuk:\n1. **Validasi ekspresi** - Cek kurung seimbang\n2. **Monotonic Stack** - Next Greater Element, largest rectangle in histogram\n3. **Evaluasi ekspresi** - Parsing matematika\n\n**Monotonic Stack** adalah teknik powerful yang mengkonversi O(n²) menjadi O(n) untuk banyak soal!`,
        keyPoints: [
          'Stack STL: push(), pop(), top(), empty()',
          'Monotonic stack menjaga elemen terurut (naik/turun)',
          'Next Greater Element: scan dari kiri, pakai stack',
          'Largest Rectangle in Histogram: monotonic stack O(n)',
          'Stack bisa diimplementasi dengan vector juga',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// Cek kurung seimbang
bool isBalanced(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') return false;
            if (c == ']' && top != '[') return false;
            if (c == '}' && top != '{') return false;
        }
    }
    return st.empty();
}

// Next Greater Element - O(n) dengan Monotonic Stack
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;  // Stack of indices

    for (int i = 0; i < n; i++) {
        // Pop semua elemen yang lebih kecil dari arr[i]
        while (!st.empty() && arr[st.top()] < arr[i]) {
            result[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}

// Largest Rectangle in Histogram - O(n)
int largestRectangle(vector<int>& heights) {
    int n = heights.size();
    stack<int> st;
    int maxArea = 0;

    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && heights[st.top()] > h) {
            int height = heights[st.top()]; st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}

int main() {
    cout << isBalanced("({[]})") << "\\n";    // 1 (true)
    cout << isBalanced("({[})") << "\\n";     // 0 (false)

    vector<int> arr = {4, 5, 2, 25};
    auto ng = nextGreater(arr);
    // Output: 5 25 25 -1
    for (int x : ng) cout << x << " ";
    cout << "\\n";

    vector<int> hist = {2, 1, 5, 6, 2, 3};
    cout << largestRectangle(hist) << "\\n";  // 10

    return 0;
}`,
      },
    ],
  },
  {
    id: 'recursion',
    title: 'Rekursi & Backtracking',
    subtitle: 'Berpikir rekursif untuk soal kombinatorial',
    difficulty: 'osn-k',
    category: 'Algoritma',
    icon: '🔄',
    color: 'from-pink-500 to-rose-600',
    estimatedHours: 6,
    prerequisites: ['cpp-basics'],
    description: 'Rekursi adalah cara berpikir yang sangat powerful. Kuasai rekursi untuk menyelesaikan soal kombinatorial, permutasi, dan backtracking di OSN.',
    whatYouLearn: [
      'Pola dasar rekursi',
      'Rekursi dengan memoization',
      'Backtracking untuk soal kombinatorial',
      'Permutasi dan kombinasi',
      'Generate semua subset',
    ],
    lessons: [
      {
        id: 'recursion-basics',
        title: 'Rekursi - Berpikir dari Kasus Sederhana',
        duration: 40,
        type: 'concept',
        content: `Rekursi adalah fungsi yang memanggil dirinya sendiri. Di kompetisi, rekursi dipakai untuk:\n1. **Divide & Conquer** - Pecah masalah jadi submasalah kecil\n2. **Backtracking** - Coba semua kemungkinan, mundur jika gagal\n3. **Tree/Graph traversal** - DFS rekursif\n\n**Dua komponen wajib rekursi:**\n1. **Base case** - Kondisi berhenti\n2. **Recursive case** - Panggil diri sendiri dengan input lebih kecil\n\nTanpa base case yang benar → Stack Overflow!`,
        keyPoints: [
          'Selalu definisikan base case sebelum recursive case',
          'Rekursi bisa dikonversi ke iterasi dengan stack eksplisit',
          'Memoization = rekursi + cache hasil (DP top-down)',
          'Depth rekursi terbatas (~10^5), untuk lebih dalam gunakan iterasi',
          'Backtracking: try → recurse → undo',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// Fibonacci dengan memoization
map<int, long long> memo;
long long fib(int n) {
    if (n <= 1) return n;  // Base case
    if (memo.count(n)) return memo[n];  // Cache hit
    return memo[n] = fib(n-1) + fib(n-2);  // Cache miss
}

// Generate semua subset (2^n subset)
void generateSubsets(vector<int>& arr, int idx, vector<int>& current) {
    if (idx == arr.size()) {
        // Cetak subset saat ini
        cout << "{ ";
        for (int x : current) cout << x << " ";
        cout << "}\\n";
        return;
    }
    // Pilihan 1: Tidak masukkan arr[idx]
    generateSubsets(arr, idx + 1, current);
    // Pilihan 2: Masukkan arr[idx]
    current.push_back(arr[idx]);
    generateSubsets(arr, idx + 1, current);
    current.pop_back();  // Undo (backtrack)
}

// N-Queens - Backtracking klasik
int n;
vector<vector<string>> solutions;
bool isSafe(vector<string>& board, int row, int col) {
    // Cek kolom
    for (int i = 0; i < row; i++)
        if (board[i][col] == 'Q') return false;
    // Cek diagonal kiri atas
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
        if (board[i][j] == 'Q') return false;
    // Cek diagonal kanan atas
    for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
        if (board[i][j] == 'Q') return false;
    return true;
}

void solveNQueens(vector<string>& board, int row) {
    if (row == n) {
        solutions.push_back(board);
        return;
    }
    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col)) {
            board[row][col] = 'Q';
            solveNQueens(board, row + 1);
            board[row][col] = '.';  // Backtrack
        }
    }
}

int main() {
    cout << fib(50) << "\\n";  // 12586269025

    vector<int> arr = {1, 2, 3};
    vector<int> current;
    generateSubsets(arr, 0, current);  // 8 subset

    n = 4;
    vector<string> board(n, string(n, '.'));
    solveNQueens(board, 0);
    cout << solutions.size() << " solusi N-Queens untuk n=4\\n";  // 2

    return 0;
}`,
      },
    ],
  },
  {
    id: 'math-discrete',
    title: 'Matematika Diskrit untuk OSN',
    subtitle: 'Number theory, kombinatorik, dan modular arithmetic',
    difficulty: 'osn-k',
    category: 'Matematika',
    icon: '🔢',
    color: 'from-indigo-500 to-violet-600',
    estimatedHours: 7,
    prerequisites: ['cpp-basics'],
    description: 'Matematika diskrit adalah tulang punggung informatika. Kuasai materi ini untuk menyelesaikan soal-soal matematika di OSN yang sering berkaitan dengan bilangan prima, modular arithmetic, dan kombinatorik.',
    whatYouLearn: [
      'GCD, LCM, dan Extended Euclidean',
      'Bilangan Prima & Sieve of Eratosthenes',
      'Modular Arithmetic & Fermat\'s Little Theorem',
      'Modular Inverse & Kombinatorik',
      'Fast Power (Binary Exponentiation)',
    ],
    lessons: [
      {
        id: 'number-theory',
        title: 'Number Theory Dasar',
        duration: 50,
        type: 'concept',
        content: `**Number Theory** adalah fondasi matematika untuk competitive programming. Topik-topik yang PASTI muncul di OSN:\n\n1. **GCD/LCM** - Algoritma Euclidean, sangat cepat O(log n)\n2. **Bilangan Prima** - Sieve of Eratosthenes untuk banyak prima sekaligus\n3. **Modular Arithmetic** - Operasi dengan mod, hindari overflow\n4. **Binary Exponentiation** - Pangkat dengan mod dalam O(log n)\n5. **Modular Inverse** - Pembagian dalam mod`,
        keyPoints: [
          'gcd(a,b) = gcd(b, a%b), berhenti saat b=0',
          'lcm(a,b) = a/gcd(a,b)*b (hindari overflow dengan urutan ini)',
          'Sieve of Eratosthenes: O(n log log n) untuk semua prima ≤ n',
          'a^b mod m = binary exponentiation O(log b)',
          'Modular inverse: a^(m-2) mod m jika m prima',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1e9 + 7;

// GCD - Euclidean Algorithm
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}
// C++17: __gcd() atau gcd() from <numeric>

// LCM
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;  // Bagi dulu baru kali untuk hindari overflow
}

// Sieve of Eratosthenes
vector<bool> sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (is_prime[i]) {
            for (int j = i * i; j <= n; j += i) {
                is_prime[j] = false;
            }
        }
    }
    return is_prime;
}

// Binary Exponentiation - a^b mod m dalam O(log b)
long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 == 1) result = result * base % mod;
        base = base * base % mod;
        exp /= 2;
    }
    return result;
}

// Modular Inverse (m harus prima)
long long modInverse(long long a, long long mod) {
    return power(a, mod - 2, mod);  // Fermat's Little Theorem
}

// nCr mod p
long long nCr(int n, int r, int mod) {
    if (r > n) return 0;
    vector<long long> fact(n + 1);
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i-1] * i % mod;

    return fact[n] * modInverse(fact[r], mod) % mod
                   * modInverse(fact[n-r], mod) % mod;
}

int main() {
    cout << gcd(48, 18) << "\\n";   // 6
    cout << lcm(4, 6) << "\\n";    // 12

    auto primes = sieve(20);
    for (int i = 2; i <= 20; i++)
        if (primes[i]) cout << i << " ";
    cout << "\\n";  // 2 3 5 7 11 13 17 19

    cout << power(2, 10, MOD) << "\\n";  // 1024
    cout << power(2, 30, MOD) << "\\n";  // 1073741824

    cout << nCr(5, 2, MOD) << "\\n";  // 10 (C(5,2))

    return 0;
}`,
      },
    ],
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    subtitle: 'Teknik optimasi terpenting di kompetisi',
    difficulty: 'osn-p',
    category: 'Algoritma',
    icon: '🧩',
    color: 'from-blue-500 to-indigo-600',
    estimatedHours: 12,
    prerequisites: ['recursion', 'math-discrete'],
    description: 'Dynamic Programming (DP) adalah inti dari competitive programming. Hampir setiap soal OSN tingkat provinsi ke atas melibatkan DP. Pelajari dari DP dasar hingga teknik-teknik lanjutan.',
    whatYouLearn: [
      'Pola DP: Optimal Substructure & Overlapping Subproblems',
      'DP 1D: Fibonacci, LIS, Coin Change',
      'DP 2D: LCS, Edit Distance, Knapsack 0/1',
      'DP on Intervals: Matrix Chain, Optimal BST',
      'DP on Trees dan Bitmask DP (intro)',
    ],
    lessons: [
      {
        id: 'dp-introduction',
        title: 'Mengenal DP - Cara Berpikir yang Benar',
        duration: 45,
        type: 'concept',
        content: `**Dynamic Programming** bukan sekedar "optimasi rekursi dengan cache". DP adalah cara **mendefinisikan state** dan **transisi** yang benar.\n\n**Dua syarat masalah bisa DP:**\n1. **Optimal Substructure** - Solusi optimal masalah besar terdiri dari solusi optimal submasalah\n2. **Overlapping Subproblems** - Submasalah yang sama dihitung berkali-kali\n\n**Cara pendekatan DP:**\n1. Tentukan **state** - Apa yang mendeskripsikan posisi saat ini?\n2. Tentukan **transisi** - Bagaimana pindah dari satu state ke state berikutnya?\n3. Tentukan **base case** - State awal yang jawabannya diketahui\n4. Tentukan **urutan komputasi** - Bottom-up atau Top-down`,
        keyPoints: [
          'State = apa yang perlu kita ketahui untuk membuat keputusan',
          'Transisi = bagaimana state berubah',
          'Bottom-up (tabulation) lebih cepat, Top-down (memoization) lebih mudah',
          'Optimasi memory: sering bisa kurangi dimensi array DP',
          'Identifikasi pola: knapsack, LIS, LCS, interval DP',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// === Knapsack 0/1 ===
// n item dengan weight[i] dan value[i], kapasitas W
// Maksimalkan value total
int knapsack01(vector<int>& weight, vector<int>& value, int W) {
    int n = weight.size();
    // dp[i][w] = nilai max menggunakan item 0..i-1 dengan kapasitas w
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w];  // Tidak ambil item i
            if (weight[i-1] <= w) {
                dp[i][w] = max(dp[i][w], dp[i-1][w - weight[i-1]] + value[i-1]);
            }
        }
    }
    return dp[n][W];
}

// === LIS (Longest Increasing Subsequence) - O(n log n) ===
int lis(vector<int>& arr) {
    vector<int> dp;  // dp[i] = elemen terkecil di akhir LIS panjang i+1
    for (int x : arr) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}

// === LCS (Longest Common Subsequence) ===
int lcs(string& s, string& t) {
    int n = s.size(), m = t.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (s[i-1] == t[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[n][m];
}

// === Coin Change (Minimum Coins) ===
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (c <= i && dp[i-c] != INT_MAX) {
                dp[i] = min(dp[i], dp[i-c] + 1);
            }
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

int main() {
    vector<int> w = {2, 3, 4, 5}, v = {3, 4, 5, 6};
    cout << knapsack01(w, v, 5) << "\\n";  // 7 (item 0 + item 1)

    vector<int> arr = {3, 1, 8, 2, 5};
    cout << lis(arr) << "\\n";  // 3 (1, 2, 5)

    string s = "ABCBDAB", t = "BDCAB";
    cout << lcs(s, t) << "\\n";  // 4

    vector<int> coins = {1, 2, 5};
    cout << coinChange(coins, 11) << "\\n";  // 3 (5+5+1)

    return 0;
}`,
      },
      {
        id: 'dp-advanced',
        title: 'DP Lanjutan - Bitmask & Interval DP',
        duration: 60,
        type: 'code',
        content: `Dua teknik DP lanjutan yang sering muncul di OSN Nasional:\n\n**Bitmask DP** - Ketika state melibatkan himpunan, representasikan sebagai bitmask (integer). Contoh: Travelling Salesman Problem, Assignment Problem.\n\n**Interval DP** - Masalah yang bisa dipecah menjadi subinterval. Contoh: Matrix Chain Multiplication, Burst Balloons, Optimal BST.`,
        keyPoints: [
          'Bitmask DP: state = (current, visited), kompleksitas O(2^n × n)',
          'i << j = i × 2^j, mask >> j & 1 = bit ke-j dari mask',
          'Interval DP: for length 2..n, for i 0..n-length, j = i+length-1',
          'Interval DP biasa O(n³)',
          'Traveling Salesman Problem (TSP) dengan Bitmask DP: O(2^n × n²)',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;
const int INF = 1e9;

// Bitmask DP - TSP (Traveling Salesman Problem)
// Berapa jarak minimum untuk mengunjungi semua kota tepat sekali?
int tsp(vector<vector<int>>& dist) {
    int n = dist.size();
    // dp[mask][i] = biaya minimum mengunjungi kota dalam mask, berakhir di i
    vector<vector<int>> dp(1 << n, vector<int>(n, INF));
    dp[1][0] = 0;  // Mulai dari kota 0, hanya kota 0 dikunjungi

    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask >> u & 1)) continue;  // u tidak dalam mask
            if (dp[mask][u] == INF) continue;
            for (int v = 0; v < n; v++) {
                if (mask >> v & 1) continue;  // v sudah dikunjungi
                int newMask = mask | (1 << v);
                dp[newMask][v] = min(dp[newMask][v], dp[mask][u] + dist[u][v]);
            }
        }
    }

    int fullMask = (1 << n) - 1;
    int ans = INF;
    for (int u = 1; u < n; u++) {
        ans = min(ans, dp[fullMask][u] + dist[u][0]);  // Kembali ke kota 0
    }
    return ans;
}

// Interval DP - Matrix Chain Multiplication
// Berapa minimum operasi perkalian untuk A1×A2×...×An?
int matrixChain(vector<int>& dims) {
    int n = dims.size() - 1;  // n matriks
    // dp[i][j] = biaya minimum perkalian matriks i sampai j
    vector<vector<int>> dp(n, vector<int>(n, 0));

    // length = jumlah matriks dalam subchain
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = INF;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}

int main() {
    // TSP dengan 4 kota
    vector<vector<int>> dist = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };
    cout << tsp(dist) << "\\n";  // 80

    // Matrix Chain: (30×35), (35×15), (15×5), (5×10), (10×20), (20×25)
    vector<int> dims = {30, 35, 15, 5, 10, 20, 25};
    cout << matrixChain(dims) << "\\n";  // 15125

    return 0;
}`,
      },
    ],
  },
  {
    id: 'graph-basics',
    title: 'Graph - BFS & DFS',
    subtitle: 'Representasi dan traversal graf',
    difficulty: 'osn-p',
    category: 'Graf & Tree',
    icon: '🕸️',
    color: 'from-teal-500 to-cyan-600',
    estimatedHours: 8,
    prerequisites: ['recursion', 'stack-queue'],
    description: 'Graf adalah struktur data paling universal di competitive programming. Hampir semua masalah dunia nyata bisa dimodelkan sebagai graf. Kuasai representasi, BFS, DFS, dan algoritma dasar graf.',
    whatYouLearn: [
      'Representasi graf: Adjacency List vs Matrix',
      'BFS untuk shortest path (unweighted)',
      'DFS untuk connected components dan cycle detection',
      'Bipartite graph check',
      'Topological Sort',
    ],
    lessons: [
      {
        id: 'graph-representation',
        title: 'Representasi Graf & BFS/DFS',
        duration: 55,
        type: 'code',
        content: `**Graf** terdiri dari **simpul (vertex)** dan **sisi (edge)**. Ada dua cara utama merepresentasikan graf:\n\n1. **Adjacency List** - \`vector<vector<int>>\` - Efisien untuk graf sparse, O(V+E)\n2. **Adjacency Matrix** - \`bool adj[N][N]\` - Mudah cek edge, O(V²) memory\n\n**Di kompetisi, selalu gunakan Adjacency List** kecuali V sangat kecil (<500).\n\n**BFS** (Breadth-First Search) = level by level, gunakan queue. Sempurna untuk shortest path di unweighted graph.\n\n**DFS** (Depth-First Search) = explore sedalam mungkin, gunakan stack/rekursi. Sempurna untuk connected components, cycle detection, topological sort.`,
        keyPoints: [
          'Adjacency list: vector<vector<pair<int,int>>> adj(n) untuk weighted graph',
          'BFS: queue, tandai visited sebelum push ke queue',
          'DFS: rekursi atau stack, hati-hati stack overflow untuk n besar',
          'Topological sort: DFS + post-order push ke stack, lalu reverse',
          'Bipartite check: 2-coloring dengan BFS/DFS',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// BFS - Shortest Path (Unweighted)
vector<int> bfs(vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<int> dist(n, -1);
    queue<int> q;
    dist[start] = 0;
    q.push(start);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

// DFS - Connected Components
int componentId[100005];
void dfs(vector<vector<int>>& adj, int u, int id) {
    componentId[u] = id;
    for (int v : adj[u]) {
        if (componentId[v] == -1) {
            dfs(adj, v, id);
        }
    }
}

int countComponents(vector<vector<int>>& adj, int n) {
    fill(componentId, componentId + n, -1);
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (componentId[i] == -1) {
            dfs(adj, i, count++);
        }
    }
    return count;
}

// Topological Sort (Kahn's Algorithm - BFS based)
vector<int> topoSort(vector<vector<int>>& adj, int n) {
    vector<int> indegree(n, 0);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) indegree[v]++;

    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indegree[i] == 0) q.push(i);

    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--indegree[v] == 0) q.push(v);
        }
    }
    return order;  // Kosong jika ada cycle
}

int main() {
    // Graf: 0-1, 0-2, 1-3, 2-3, 3-4
    int n = 5;
    vector<vector<int>> adj(n);
    auto addEdge = [&](int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    };
    addEdge(0, 1); addEdge(0, 2);
    addEdge(1, 3); addEdge(2, 3);
    addEdge(3, 4);

    auto dist = bfs(adj, 0);
    for (int i = 0; i < n; i++) cout << dist[i] << " ";
    cout << "\\n";  // 0 1 1 2 3

    cout << countComponents(adj, n) << "\\n";  // 1

    // DAG untuk topological sort
    vector<vector<int>> dag(6);
    dag[5].push_back(2); dag[5].push_back(0);
    dag[4].push_back(0); dag[4].push_back(1);
    dag[2].push_back(3); dag[3].push_back(1);

    auto order = topoSort(dag, 6);
    for (int x : order) cout << x << " ";
    cout << "\\n";  // 4 5 2 0 3 1 (salah satu urutan valid)

    return 0;
}`,
      },
    ],
  },
  {
    id: 'shortest-path',
    title: 'Shortest Path',
    subtitle: 'Dijkstra, Bellman-Ford, Floyd-Warshall',
    difficulty: 'osn-p',
    category: 'Graf & Tree',
    icon: '🗺️',
    color: 'from-emerald-500 to-green-600',
    estimatedHours: 8,
    prerequisites: ['graph-basics'],
    description: 'Algoritma shortest path adalah salah satu topik paling klasik dan sering muncul di OSN. Kuasai Dijkstra untuk single-source, Floyd-Warshall untuk all-pairs, dan Bellman-Ford untuk negative edges.',
    whatYouLearn: [
      'Dijkstra O(E log V) dengan Priority Queue',
      'Bellman-Ford O(VE) untuk negative edges',
      'Floyd-Warshall O(V³) untuk all-pairs',
      '0-1 BFS untuk edge weight 0 atau 1',
      'Variasi Dijkstra untuk soal kreatif',
    ],
    lessons: [
      {
        id: 'dijkstra',
        title: 'Dijkstra - Algoritma Wajib OSN',
        duration: 55,
        type: 'code',
        content: `**Dijkstra** adalah algoritma shortest path paling penting untuk kompetisi. Prinsipnya:\n1. Mulai dari source dengan jarak 0\n2. Selalu proses simpul dengan jarak terkecil yang belum diproses (greedy)\n3. Update jarak tetangga jika ditemukan jalur lebih pendek (relaksasi)\n\n**Implementasi efisien** menggunakan **priority_queue** (min-heap): O(E log V)\n\nCatatan: Dijkstra hanya berlaku untuk **bobot non-negatif**. Untuk bobot negatif, gunakan Bellman-Ford.`,
        keyPoints: [
          'Kompleksitas dengan priority_queue: O(E log V)',
          'Priority queue menyimpan {dist, node}',
          'Skip jika dist[u] > cost yang diambil dari heap (lazy deletion)',
          'Untuk bobot 0/1, gunakan deque (0-1 BFS), O(V+E)',
          'Tidak berlaku untuk graph dengan cycle negatif',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;
const long long INF = 1e18;

typedef pair<long long, int> pli;

// Dijkstra - O(E log V)
vector<long long> dijkstra(vector<vector<pair<int,int>>>& adj, int start) {
    int n = adj.size();
    vector<long long> dist(n, INF);
    priority_queue<pli, vector<pli>, greater<pli>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();

        if (d > dist[u]) continue;  // Lazy deletion

        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

// Floyd-Warshall - All Pairs Shortest Path O(V³)
void floydWarshall(vector<vector<long long>>& dist) {
    int n = dist.size();
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    // Deteksi negative cycle: jika dist[i][i] < 0
}

// 0-1 BFS - Edge weight 0 atau 1
vector<int> bfs01(vector<vector<pair<int,int>>>& adj, int start) {
    int n = adj.size();
    vector<int> dist(n, INT_MAX);
    deque<int> dq;
    dist[start] = 0;
    dq.push_back(start);

    while (!dq.empty()) {
        int u = dq.front(); dq.pop_front();
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w == 0) dq.push_front(v);  // Bobot 0: prioritas
                else dq.push_back(v);           // Bobot 1: normal
            }
        }
    }
    return dist;
}

int main() {
    int n = 5;
    vector<vector<pair<int,int>>> adj(n);
    auto addEdge = [&](int u, int v, int w) {
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    };
    addEdge(0, 1, 4); addEdge(0, 2, 1);
    addEdge(2, 1, 2); addEdge(1, 3, 1);
    addEdge(2, 3, 5); addEdge(3, 4, 3);

    auto dist = dijkstra(adj, 0);
    for (int i = 0; i < n; i++) {
        cout << "dist[" << i << "] = " << dist[i] << "\\n";
    }
    // 0: 0, 1: 3, 2: 1, 3: 4, 4: 7

    return 0;
}`,
      },
    ],
  },
  {
    id: 'segment-tree',
    title: 'Segment Tree & BIT',
    subtitle: 'Range query dan point update efisien',
    difficulty: 'osn-nasional',
    category: 'Struktur Data',
    icon: '🌳',
    color: 'from-purple-500 to-violet-600',
    estimatedHours: 10,
    prerequisites: ['dynamic-programming', 'recursion'],
    description: 'Segment Tree dan Binary Indexed Tree (BIT/Fenwick Tree) adalah struktur data yang memungkinkan range query dan update dalam O(log n). Ini adalah topik wajib untuk OSN Nasional.',
    whatYouLearn: [
      'Segment Tree untuk range sum/min/max query',
      'Lazy Propagation untuk range update',
      'Binary Indexed Tree (Fenwick Tree)',
      'BIT untuk Inversion Count',
      'Merge Sort Tree dan Persistent Segment Tree (intro)',
    ],
    lessons: [
      {
        id: 'segment-tree-basic',
        title: 'Segment Tree - Range Query O(log n)',
        duration: 60,
        type: 'code',
        content: `**Segment Tree** adalah struktur data berbasis pohon yang memungkinkan:\n- **Range Query**: Hitung sum/min/max pada interval [l, r] dalam O(log n)\n- **Point Update**: Update nilai di posisi i dalam O(log n)\n\nTanpa Segment Tree, kedua operasi di atas membutuhkan O(n). Dengan Segment Tree, keduanya O(log n)!\n\n**Struktur:** Pohon biner di mana setiap simpul menyimpan informasi tentang subarray. Daun = elemen individual, simpul internal = gabungan anak-anaknya.\n\n**Lazy Propagation** memungkinkan **range update** juga dalam O(log n) dengan menunda pembaruan.`,
        keyPoints: [
          'Segment tree dengan array 1-indexed: node i, anak kiri 2i, kanan 2i+1',
          'Ukuran array tree: 4 × n untuk keamanan',
          'Range query O(log n), point update O(log n)',
          'Lazy propagation untuk range update O(log n)',
          'BIT lebih simple untuk range sum saja',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// === SEGMENT TREE (Range Sum + Point Update) ===
struct SegTree {
    int n;
    vector<long long> tree;

    SegTree(int n) : n(n), tree(4 * n, 0) {}

    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, 2*node, start, mid);
            build(arr, 2*node+1, mid+1, end);
            tree[node] = tree[2*node] + tree[2*node+1];
        }
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) update(2*node, start, mid, idx, val);
            else update(2*node+1, mid+1, end, idx, val);
            tree[node] = tree[2*node] + tree[2*node+1];
        }
    }

    long long query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;  // Out of range
        if (l <= start && end <= r) return tree[node];  // Full overlap
        int mid = (start + end) / 2;
        return query(2*node, start, mid, l, r) +
               query(2*node+1, mid+1, end, l, r);
    }

    void update(int idx, int val) { update(1, 0, n-1, idx, val); }
    long long query(int l, int r) { return query(1, 0, n-1, l, r); }
};

// === BINARY INDEXED TREE / FENWICK TREE ===
struct BIT {
    int n;
    vector<long long> tree;
    BIT(int n) : n(n), tree(n + 1, 0) {}

    void update(int i, long long delta) {
        for (i++; i <= n; i += i & (-i))
            tree[i] += delta;
    }

    long long query(int i) {  // Prefix sum [0, i]
        long long sum = 0;
        for (i++; i > 0; i -= i & (-i))
            sum += tree[i];
        return sum;
    }

    long long query(int l, int r) {  // Range sum [l, r]
        return query(r) - (l > 0 ? query(l - 1) : 0);
    }
};

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    int n = arr.size();

    SegTree st(n);
    st.build(arr, 1, 0, n - 1);

    cout << st.query(1, 4) << "\\n";  // 3+5+7+9 = 24
    st.update(2, 10);                 // arr[2] = 10
    cout << st.query(1, 4) << "\\n";  // 3+10+7+9 = 29

    BIT bit(n);
    for (int i = 0; i < n; i++) bit.update(i, arr[i]);
    cout << bit.query(1, 4) << "\\n";  // 24

    return 0;
}`,
      },
    ],
  },
  {
    id: 'dsu',
    title: 'Disjoint Set Union (Union-Find)',
    subtitle: 'Manajemen himpunan disjoint secara efisien',
    difficulty: 'osn-nasional',
    category: 'Struktur Data',
    icon: '🔗',
    color: 'from-amber-500 to-yellow-600',
    estimatedHours: 5,
    prerequisites: ['graph-basics'],
    description: 'DSU (Disjoint Set Union) atau Union-Find adalah struktur data yang memungkinkan penggabungan himpunan dan pengecekan keanggotaan dalam hampir O(1). Digunakan di Kruskal MST, connectivity, dan banyak soal lainnya.',
    whatYouLearn: [
      'Implementasi DSU dengan path compression',
      'Union by rank untuk efisiensi',
      'Kruskal Minimum Spanning Tree',
      'Deteksi cycle dalam graf',
      'DSU dengan rollback untuk offline queries',
    ],
    lessons: [
      {
        id: 'dsu-kruskal',
        title: 'DSU & Minimum Spanning Tree',
        duration: 45,
        type: 'code',
        content: `**DSU** mendukung dua operasi:\n1. **Find(x)** - Temukan root/representatif dari himpunan yang mengandung x\n2. **Union(x, y)** - Gabungkan himpunan yang mengandung x dan y\n\nDengan **path compression** dan **union by rank**, kompleksitas hampir O(1) per operasi (sebenarnya O(α(n)) di mana α adalah invers Ackermann, praktis konstan).\n\n**Kruskal MST** menggunakan DSU: sort semua edge by weight, tambahkan edge jika tidak membuat cycle (cek dengan DSU).`,
        keyPoints: [
          'Path compression: setiap find langsung tunjuk ke root',
          'Union by rank: gabung tree lebih pendek ke lebih tinggi',
          'Kompleksitas: O(α(n)) per operasi ≈ O(1) praktis',
          'Kruskal: sort edges O(E log E), proses O(E α(V))',
          'Deteksi cycle: Union(u,v) return false jika Find(u)==Find(v)',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> parent, rank_;
    int components;

    DSU(int n) : parent(n), rank_(n, 0), components(n) {
        iota(parent.begin(), parent.end(), 0);  // parent[i] = i
    }

    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);  // Path compression
        return parent[x];
    }

    bool unite(int x, int y) {
        x = find(x); y = find(y);
        if (x == y) return false;  // Sudah satu komponen

        // Union by rank
        if (rank_[x] < rank_[y]) swap(x, y);
        parent[y] = x;
        if (rank_[x] == rank_[y]) rank_[x]++;
        components--;
        return true;
    }

    bool connected(int x, int y) { return find(x) == find(y); }
};

// Kruskal - Minimum Spanning Tree
struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const { return weight < other.weight; }
};

long long kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    long long mstWeight = 0;
    int edgesAdded = 0;

    for (auto& [u, v, w] : edges) {
        if (dsu.unite(u, v)) {
            mstWeight += w;
            edgesAdded++;
            if (edgesAdded == n - 1) break;  // MST complete
        }
    }

    if (edgesAdded < n - 1) return -1;  // Graf tidak connected
    return mstWeight;
}

int main() {
    DSU dsu(5);
    dsu.unite(0, 1);
    dsu.unite(2, 3);
    cout << dsu.connected(0, 1) << "\\n";  // 1 (connected)
    cout << dsu.connected(0, 2) << "\\n";  // 0 (not connected)
    cout << dsu.components << "\\n";       // 3

    dsu.unite(1, 2);
    cout << dsu.components << "\\n";       // 2

    // Kruskal MST
    int n = 4;
    vector<Edge> edges = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},
        {1, 3, 15}, {2, 3, 4}
    };
    cout << kruskal(n, edges) << "\\n";  // 19 (5+4+10)

    return 0;
}`,
      },
    ],
  },
  {
    id: 'string-algorithms',
    title: 'Algoritma String',
    subtitle: 'KMP, Z-Algorithm, dan Hashing',
    difficulty: 'osn-nasional',
    category: 'String',
    icon: '📝',
    color: 'from-rose-500 to-pink-600',
    estimatedHours: 8,
    prerequisites: ['cpp-basics', 'math-discrete'],
    description: 'Soal string sangat umum di OSN tingkat nasional. Kuasai KMP untuk pattern matching, Z-Algorithm untuk string searching, dan Hashing untuk perbandingan substring cepat.',
    whatYouLearn: [
      'KMP Algorithm - Pattern Matching O(n+m)',
      'Z-Algorithm - String Analysis O(n)',
      'Polynomial String Hashing',
      'Rolling Hash untuk substring comparison',
      'Trie untuk prefix/suffix matching',
    ],
    lessons: [
      {
        id: 'kmp-hashing',
        title: 'KMP & String Hashing',
        duration: 60,
        type: 'code',
        content: `**KMP (Knuth-Morris-Pratt)** menyelesaikan string matching (cari pattern P dalam teks T) dalam O(n+m) alih-alih O(nm) naive.\n\nKunci KMP adalah **failure function (prefix function)**: panjang proper prefix dari P[0..i] yang juga merupakan suffix.\n\n**String Hashing** memungkinkan perbandingan dua substring dalam O(1) setelah preprocessing O(n). Gunakan untuk soal yang butuh banyak substring comparison.`,
        keyPoints: [
          'KMP failure function: O(m) preprocessing, O(n) matching',
          'Failure function: kmp[i] = panjang terpanjang proper prefix = suffix dari P[0..i]',
          'Hashing: H(s) = s[0]×p^0 + s[1]×p^1 + ... mod m',
          'Gunakan dua hash sekaligus untuk mengurangi collision',
          'Rolling hash: H(s[l..r]) = (H[r] - H[l-1]×p^(r-l+1)) mod m',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// KMP Algorithm
vector<int> computeKMP(const string& pattern) {
    int m = pattern.size();
    vector<int> kmp(m, 0);
    for (int i = 1; i < m; i++) {
        int j = kmp[i - 1];
        while (j > 0 && pattern[i] != pattern[j]) j = kmp[j - 1];
        if (pattern[i] == pattern[j]) j++;
        kmp[i] = j;
    }
    return kmp;
}

vector<int> kmpSearch(const string& text, const string& pattern) {
    auto kmp = computeKMP(pattern);
    vector<int> matches;
    int j = 0;
    for (int i = 0; i < (int)text.size(); i++) {
        while (j > 0 && text[i] != pattern[j]) j = kmp[j - 1];
        if (text[i] == pattern[j]) j++;
        if (j == (int)pattern.size()) {
            matches.push_back(i - j + 1);  // Match dimulai di indeks ini
            j = kmp[j - 1];
        }
    }
    return matches;
}

// Z-Algorithm
vector<int> zFunction(const string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    z[0] = n;
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}

// String Hashing
struct StringHash {
    static const long long MOD1 = 1e9 + 7, MOD2 = 1e9 + 9;
    static const long long BASE1 = 31, BASE2 = 37;
    vector<long long> h1, h2, p1, p2;

    StringHash(const string& s) {
        int n = s.size();
        h1.assign(n + 1, 0); h2.assign(n + 1, 0);
        p1.assign(n + 1, 1); p2.assign(n + 1, 1);
        for (int i = 0; i < n; i++) {
            h1[i+1] = (h1[i] * BASE1 + s[i]) % MOD1;
            h2[i+1] = (h2[i] * BASE2 + s[i]) % MOD2;
            p1[i+1] = p1[i] * BASE1 % MOD1;
            p2[i+1] = p2[i] * BASE2 % MOD2;
        }
    }

    pair<long long,long long> get(int l, int r) {  // [l, r] inclusive
        long long v1 = (h1[r+1] - h1[l] * p1[r-l+1] % MOD1 + MOD1 * 2) % MOD1;
        long long v2 = (h2[r+1] - h2[l] * p2[r-l+1] % MOD2 + MOD2 * 2) % MOD2;
        return {v1, v2};
    }
};

int main() {
    // KMP
    string text = "aabaacaadaabaaba", pattern = "aaba";
    auto matches = kmpSearch(text, pattern);
    for (int m : matches) cout << m << " ";  // 0 9 12
    cout << "\\n";

    // Z-Function
    string s = "aabxaa";
    auto z = zFunction(s);
    for (int zi : z) cout << zi << " ";  // 6 1 0 0 2 1
    cout << "\\n";

    // Hashing
    StringHash sh("abcabc");
    cout << (sh.get(0, 2) == sh.get(3, 5)) << "\\n";  // 1 (sama)
    cout << (sh.get(0, 1) == sh.get(3, 4)) << "\\n";  // 1 (sama)

    return 0;
}`,
      },
    ],
  },
  {
    id: 'advanced-graph',
    title: 'Graf Lanjutan',
    subtitle: 'SCC, Bridges, Articulation Points',
    difficulty: 'osn-nasional',
    category: 'Graf & Tree',
    icon: '🔮',
    color: 'from-violet-500 to-purple-600',
    estimatedHours: 10,
    prerequisites: ['graph-basics', 'dynamic-programming'],
    description: 'Topik graf lanjutan yang sering muncul di OSN Nasional: Strongly Connected Components, Bridges, Articulation Points, dan Minimum Spanning Tree.',
    whatYouLearn: [
      'Tarjan\'s SCC Algorithm',
      'Bridges & Articulation Points',
      'Biconnected Components',
      'Prim\'s Algorithm untuk MST',
      'Network Flow dasar (opsional)',
    ],
    lessons: [
      {
        id: 'scc-bridges',
        title: 'SCC, Bridges & Articulation Points',
        duration: 65,
        type: 'code',
        content: `**Strongly Connected Component (SCC):** Subgraf terbesar di mana setiap simpul dapat mencapai semua simpul lain. Penting untuk analisis dependency graph, 2-SAT, dll.\n\n**Bridge:** Edge yang jika dihapus, membuat graf tidak terhubung.\n\n**Articulation Point:** Simpul yang jika dihapus, membuat graf tidak terhubung.\n\nSemua menggunakan **Tarjan's Algorithm** berbasis DFS dengan **discovery time** dan **low values**.`,
        keyPoints: [
          'SCC dengan Tarjan: O(V+E), satu DFS',
          'Kosaraju: dua DFS, lebih mudah diimplementasikan',
          'Bridge: edge (u,v) adalah bridge jika low[v] > disc[u]',
          'Articulation point: root jika >1 anak DFS, non-root jika ada anak v dengan low[v] >= disc[u]',
          'SCC Condensation: compress SCC menjadi DAG',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// Tarjan's Bridge Finding
int n, timer_ = 0;
vector<int> disc, low;
vector<pair<int,int>> bridges;

void dfsBridge(vector<vector<int>>& adj, int u, int parent) {
    disc[u] = low[u] = timer_++;
    for (int v : adj[u]) {
        if (v == parent) continue;
        if (disc[v] == -1) {
            dfsBridge(adj, v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] > disc[u]) {
                bridges.push_back({u, v});  // Bridge ditemukan!
            }
        } else {
            low[u] = min(low[u], disc[v]);
        }
    }
}

// Kosaraju's SCC Algorithm
void dfs1(vector<vector<int>>& adj, int u, vector<bool>& visited, stack<int>& st) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs1(adj, v, visited, st);
    st.push(u);
}

void dfs2(vector<vector<int>>& radj, int u, vector<bool>& visited, vector<int>& comp, int id) {
    visited[u] = true;
    comp[u] = id;
    for (int v : radj[u])
        if (!visited[v]) dfs2(radj, v, visited, comp, id);
}

vector<int> kosaraju(vector<vector<int>>& adj, int n) {
    stack<int> st;
    vector<bool> visited(n, false);
    for (int i = 0; i < n; i++)
        if (!visited[i]) dfs1(adj, i, visited, st);

    vector<vector<int>> radj(n);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) radj[v].push_back(u);

    fill(visited.begin(), visited.end(), false);
    vector<int> comp(n, -1);
    int numSCC = 0;
    while (!st.empty()) {
        int u = st.top(); st.pop();
        if (!visited[u]) dfs2(radj, u, visited, comp, numSCC++);
    }
    return comp;  // comp[i] = ID SCC untuk simpul i
}

int main() {
    // Graf untuk bridge finding
    int vertices = 5;
    vector<vector<int>> adj(vertices);
    auto addEdge = [&](int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    };
    addEdge(1, 0); addEdge(0, 2); addEdge(2, 1);
    addEdge(0, 3); addEdge(3, 4);

    disc.assign(vertices, -1); low.assign(vertices, 0);
    for (int i = 0; i < vertices; i++)
        if (disc[i] == -1) dfsBridge(adj, i, -1);

    cout << "Bridges:\\n";
    for (auto [u, v] : bridges)
        cout << u << " - " << v << "\\n";
    // 3-4 dan 0-3

    // Graf untuk SCC
    int m = 5;
    vector<vector<int>> dag(m);
    dag[1].push_back(0); dag[0].push_back(2);
    dag[2].push_back(1); dag[0].push_back(3);
    dag[3].push_back(4);

    auto comp = kosaraju(dag, m);
    cout << "SCC IDs: ";
    for (int c : comp) cout << c << " ";
    cout << "\\n";

    return 0;
}`,
      },
    ],
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithm',
    subtitle: 'Pilihan lokal optimal untuk solusi global optimal',
    difficulty: 'osn-k',
    category: 'Algoritma',
    icon: '💰',
    color: 'from-lime-500 to-green-600',
    estimatedHours: 5,
    prerequisites: ['sorting-searching'],
    description: 'Greedy adalah pendekatan "ambil yang terbaik sekarang". Tidak selalu benar, tapi saat bisa dibuktikan optimal, greedy memberikan solusi O(n log n) yang sangat efisien.',
    whatYouLearn: [
      'Kapan greedy bisa dipakai (exchange argument)',
      'Activity Selection Problem',
      'Interval Scheduling & Scheduling Jobs',
      'Fractional Knapsack',
      'Huffman Coding dasar',
    ],
    lessons: [
      {
        id: 'greedy-intro',
        title: 'Greedy — Kapan Boleh, Kapan Tidak?',
        duration: 40,
        type: 'concept',
        content: `**Greedy Algorithm** selalu memilih pilihan yang terlihat terbaik saat ini, tanpa mempertimbangkan konsekuensi jangka panjang.\n\n**Greedy benar** jika bisa dibuktikan dengan **Exchange Argument**: "Jika kita swap pilihan greedy dengan pilihan lain, hasilnya tidak lebih baik."\n\n**Contoh klasik: Activity Selection Problem**\nDiberikan N aktivitas dengan waktu mulai dan selesai. Pilih aktivitas sebanyak mungkin tanpa overlap.\n\nGreedy: **selalu pilih aktivitas yang selesai paling awal** ✓\n\n**Contoh di mana greedy GAGAL:**\nKoin problem: pecahan 6, 4, 1. Target 8.\n- Greedy: 6+1+1 = 3 koin ✗ (bukan optimal)\n- Optimal: 4+4 = 2 koin ✓`,
        keyPoints: [
          'Greedy bukan DP — tidak menyimpan semua state',
          'Greedy tepat: Activity selection, Kruskal MST, Dijkstra, Huffman',
          'Greedy salah: Coin change (denominasi sembarang), Knapsack 0/1',
          'Cara buktikan: Exchange argument atau contrapositive',
          'Sort dulu sering jadi kunci greedy yang benar',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// Activity Selection - Greedy: pilih yang selesai paling awal
int maxActivities(vector<pair<int,int>>& acts) {
    // Sort by end time
    sort(acts.begin(), acts.end(), [](const auto& a, const auto& b) {
        return a.second < b.second;
    });

    int count = 1, lastEnd = acts[0].second;
    for (int i = 1; i < (int)acts.size(); i++) {
        if (acts[i].first >= lastEnd) {  // Tidak overlap
            count++;
            lastEnd = acts[i].second;
        }
    }
    return count;
}

// Job Scheduling dengan deadline - Greedy
// Maksimalkan jumlah job yang selesai sebelum deadline
// Setiap job butuh 1 slot waktu
int maxJobs(vector<pair<int,int>>& jobs, int T) {  // T = max deadline
    // Sort by profit descending
    sort(jobs.begin(), jobs.end(), [](const auto& a, const auto& b) {
        return a.second > b.second;  // {deadline, profit}
    });

    vector<bool> slots(T + 1, false);
    int totalProfit = 0, count = 0;

    for (auto& [deadline, profit] : jobs) {
        // Cari slot kosong sebelum deadline (dari akhir)
        for (int t = min(deadline, T); t >= 1; t--) {
            if (!slots[t]) {
                slots[t] = true;
                totalProfit += profit;
                count++;
                break;
            }
        }
    }
    return totalProfit;
}

// Fractional Knapsack - Greedy by value/weight ratio
double fractionalKnapsack(vector<pair<int,int>>& items, int W) {
    // Sort by value/weight ratio (descending)
    sort(items.begin(), items.end(), [](const auto& a, const auto& b) {
        return (double)a.second/a.first > (double)b.second/b.first;  // {weight, value}
    });

    double total = 0;
    for (auto& [w, v] : items) {
        if (W >= w) {
            total += v;
            W -= w;
        } else {
            total += (double)v * W / w;
            break;
        }
    }
    return total;
}

int main() {
    // Activity selection
    vector<pair<int,int>> acts = {{1,4},{3,5},{0,6},{5,7},{3,8},{5,9},{6,10},{8,11},{8,12},{2,13},{12,14}};
    cout << maxActivities(acts) << "\\n";  // 4

    // Fractional knapsack
    vector<pair<int,int>> items = {{10,60},{20,100},{30,120}};  // {weight, value}
    cout << fractionalKnapsack(items, 50) << "\\n";  // 240.0

    return 0;
}`,
        codeExplanation: 'Activity Selection O(n log n): sort by end time, greedy pick. Fractional Knapsack O(n log n): sort by ratio, ambil sebanyak mungkin.',
      },
    ],
  },
  {
    id: 'tree-algorithms',
    title: 'Tree & Binary Tree',
    subtitle: 'Struktur hierarki dan algoritma di pohon',
    difficulty: 'osn-p',
    category: 'Graf & Tree',
    icon: '🌲',
    color: 'from-green-500 to-teal-600',
    estimatedHours: 9,
    prerequisites: ['graph-basics', 'recursion'],
    description: 'Tree adalah graf tanpa cycle dan terhubung. Banyak soal OSN melibatkan tree traversal, LCA, diameter, dan DP on tree. Kuasai topik ini untuk bonus poin di OSN.',
    whatYouLearn: [
      'Properti Tree: N node, N-1 edge, unik path',
      'Tree traversal: DFS preorder, inorder, postorder',
      'Diameter pohon dengan 2x BFS',
      'LCA (Lowest Common Ancestor) dengan Binary Lifting',
      'DP on Tree: subtree DP, rerooting technique',
    ],
    lessons: [
      {
        id: 'tree-basics',
        title: 'Properti Tree & Traversal',
        duration: 45,
        type: 'concept',
        content: `**Tree** adalah graf terhubung tanpa cycle. Properti penting:\n- N node → N-1 edge\n- Antara 2 node, ada tepat 1 path\n- Menghapus 1 edge → tidak terhubung\n- Menambah 1 edge → ada cycle\n\n**Rooted Tree vs Unrooted Tree:**\n- Rooted: ada node khusus sebagai "akar", ada konsep parent/child\n- Unrooted: tidak ada hirarki, semua node setara\n\n**Diameter Tree:** Jarak terpanjang antara 2 node.\nAlgoritma cepat O(n): BFS dari sembarang node → BFS dari node terjauh → jarak = diameter.`,
        keyPoints: [
          'Diameter dengan 2x BFS: O(n), lebih mudah dari DP',
          'DP on Tree: define state di setiap subtree, bottom-up',
          'Euler tour: DFS pre/post order untuk convert tree ke array',
          'LCA dengan binary lifting: precompute O(n log n), query O(log n)',
          'Centroid: node yang jika dihapus, semua komponen ≤ n/2',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// Diameter Tree dengan 2x BFS
pair<int,int> bfs(vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<int> dist(n, -1);
    queue<int> q;
    dist[start] = 0; q.push(start);
    int farthest = start;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
                if (dist[v] > dist[farthest]) farthest = v;
            }
        }
    }
    return {farthest, dist[farthest]};
}

int diameter(vector<vector<int>>& adj) {
    auto [node1, _] = bfs(adj, 0);        // BFS dari sembarang
    auto [node2, diam] = bfs(adj, node1); // BFS dari terjauh
    return diam;
}

// DP on Tree - Subtree Size
vector<int> subtreeSize;
void dfsSize(vector<vector<int>>& adj, int u, int parent) {
    subtreeSize[u] = 1;
    for (int v : adj[u]) {
        if (v != parent) {
            dfsSize(adj, v, u);
            subtreeSize[u] += subtreeSize[v];
        }
    }
}

// DP on Tree - Maximum path sum dari root ke daun
vector<int> maxPath;
void dfsPath(vector<vector<int>>& adj, vector<int>& val, int u, int parent, int curSum) {
    curSum += val[u];
    maxPath[u] = curSum;
    bool isLeaf = true;
    for (int v : adj[u]) {
        if (v != parent) {
            isLeaf = false;
            dfsPath(adj, val, v, u, curSum);
        }
    }
}

// LCA dengan Binary Lifting
const int LOG = 18;
int depth_arr[100005];
int up[100005][LOG];  // up[u][k] = ancestor 2^k dari u

void dfsLCA(vector<vector<int>>& adj, int u, int parent, int d) {
    depth_arr[u] = d;
    up[u][0] = parent;
    for (int k = 1; k < LOG; k++)
        up[u][k] = up[up[u][k-1]][k-1];
    for (int v : adj[u])
        if (v != parent) dfsLCA(adj, v, u, d + 1);
}

int lca(int u, int v) {
    if (depth_arr[u] < depth_arr[v]) swap(u, v);
    int diff = depth_arr[u] - depth_arr[v];
    for (int k = 0; k < LOG; k++)
        if ((diff >> k) & 1) u = up[u][k];
    if (u == v) return u;
    for (int k = LOG - 1; k >= 0; k--)
        if (up[u][k] != up[v][k]) { u = up[u][k]; v = up[v][k]; }
    return up[u][0];
}

int main() {
    int n = 7;
    vector<vector<int>> adj(n);
    auto addEdge = [&](int u, int v) { adj[u].push_back(v); adj[v].push_back(u); };
    addEdge(0,1); addEdge(0,2); addEdge(1,3); addEdge(1,4); addEdge(2,5); addEdge(2,6);

    cout << "Diameter: " << diameter(adj) << "\\n";  // 4

    subtreeSize.resize(n);
    dfsSize(adj, 0, -1);
    for (int i = 0; i < n; i++) cout << subtreeSize[i] << " ";
    cout << "\\n";  // 7 3 3 1 1 1 1

    return 0;
}`,
        codeExplanation: '2x BFS untuk diameter O(n). DP on Tree dengan DFS bottom-up. LCA Binary Lifting O(n log n) preprocessing, O(log n) per query.',
      },
    ],
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers & Sliding Window',
    subtitle: 'Teknik O(n) untuk soal subarray/substring',
    difficulty: 'osn-k',
    category: 'Algoritma',
    icon: '👆',
    color: 'from-sky-500 to-blue-600',
    estimatedHours: 4,
    prerequisites: ['cpp-basics', 'sorting-searching'],
    description: 'Two Pointers dan Sliding Window adalah teknik O(n) yang elegan untuk menyelesaikan soal subarray, substring, atau pair yang memenuhi kondisi tertentu.',
    whatYouLearn: [
      'Two Pointers untuk pair sum problem',
      'Sliding Window untuk subarray sum ≥ K',
      'Longest substring tanpa karakter duplikat',
      'Fixed-size sliding window (max/min)',
      'Kombinasi dengan binary search',
    ],
    lessons: [
      {
        id: 'two-pointers-basic',
        title: 'Two Pointers & Sliding Window',
        duration: 40,
        type: 'code',
        content: `**Two Pointers:** Gunakan dua pointer (indeks) yang bergerak ke arah tertentu untuk mengeliminasi kemungkinan secara efisien.\n\n**Sliding Window:** Window dengan ukuran dinamis atau tetap yang "geser" sepanjang array.\n\nKedua teknik ini mengubah solusi O(n²) naive menjadi O(n)!`,
        keyPoints: [
          'Two pointers biasanya pada array terurut atau circular',
          'Sliding window: expand kanan, shrink kiri jika kondisi violated',
          'Fixed window: geser satu langkah, update dengan add/remove elemen',
          'Untuk subarray sum = K: gunakan prefix sum + hashmap O(n)',
          'Sering dikombinasikan dengan sort terlebih dahulu',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// Two Pointers - Pair dengan sum = target (array terurut)
vector<pair<int,int>> twoSum(vector<int>& arr, int target) {
    vector<pair<int,int>> result;
    int lo = 0, hi = arr.size() - 1;
    while (lo < hi) {
        int sum = arr[lo] + arr[hi];
        if (sum == target) {
            result.push_back({arr[lo], arr[hi]});
            lo++; hi--;
        } else if (sum < target) lo++;
        else hi--;
    }
    return result;
}

// Sliding Window - Panjang subarray minimum dengan sum >= S
int minSubarrayLen(vector<int>& arr, int S) {
    int n = arr.size(), minLen = INT_MAX;
    int left = 0, sum = 0;
    for (int right = 0; right < n; right++) {
        sum += arr[right];
        while (sum >= S) {
            minLen = min(minLen, right - left + 1);
            sum -= arr[left++];
        }
    }
    return minLen == INT_MAX ? 0 : minLen;
}

// Sliding Window - Longest substring tanpa karakter berulang
int longestUniqueSubstr(const string& s) {
    unordered_map<char, int> last;  // karakter -> indeks terakhir
    int maxLen = 0, left = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        if (last.count(s[right]) && last[s[right]] >= left) {
            left = last[s[right]] + 1;
        }
        last[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

// Fixed Window - Maximum sum subarray of size k
int maxSumWindow(vector<int>& arr, int k) {
    int sum = 0;
    for (int i = 0; i < k; i++) sum += arr[i];
    int maxSum = sum;
    for (int i = k; i < (int)arr.size(); i++) {
        sum += arr[i] - arr[i - k];
        maxSum = max(maxSum, sum);
    }
    return maxSum;
}

int main() {
    vector<int> sorted = {1, 2, 3, 4, 6};
    auto pairs = twoSum(sorted, 6);
    for (auto [a,b] : pairs) cout << a << "+" << b << " ";
    cout << "\\n";  // 2+4

    vector<int> arr = {2, 3, 1, 2, 4, 3};
    cout << minSubarrayLen(arr, 7) << "\\n";  // 2 ([4,3])

    cout << longestUniqueSubstr("abcabcbb") << "\\n";  // 3 ("abc")

    vector<int> a2 = {1, 4, 2, 10, 23, 3, 1, 0, 20};
    cout << maxSumWindow(a2, 4) << "\\n";  // 39 (10+23+3+?)... 39

    return 0;
}`,
        codeExplanation: 'Semua algoritma di atas O(n). Kuncinya: pointer/window tidak pernah mundur ke belakang, sehingga total langkah ≤ 2n.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Bit Manipulation
  // ═══════════════════════════════════════════
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    subtitle: 'Operasi bitwise untuk trik cepat di kompetisi',
    difficulty: 'osn-k',
    category: 'Matematika',
    icon: '🔢',
    color: 'from-cyan-500 to-sky-600',
    estimatedHours: 4,
    prerequisites: ['cpp-basics'],
    description: 'Bit Manipulation adalah teknik menggunakan operasi bitwise langsung pada representasi biner bilangan. Sangat berguna untuk optimasi, Bitmask DP, dan berbagai trik kompetisi.',
    whatYouLearn: [
      'Operator bitwise: AND, OR, XOR, NOT, shift',
      'Trik populer: swap, cek genap/ganjil, power of 2',
      'Subset dengan bitmask',
      'Counting bits dan popcount',
      'Bitmask untuk representasi himpunan',
    ],
    lessons: [
      {
        id: 'bit-ops',
        title: 'Operasi Bitwise & Trik Kompetisi',
        duration: 40,
        type: 'concept',
        content: `**Bit Manipulation** bekerja langsung pada bit-bit dalam representasi biner bilangan. Di kompetisi, ini sering lebih cepat dari operasi aritmetika biasa.

**Operator Dasar:**
- \`&\` (AND): Kedua bit harus 1 → hasilnya 1
- \`|\` (OR): Salah satu bit 1 → hasilnya 1
- \`^\` (XOR): Berbeda → 1, Sama → 0
- \`~\` (NOT): Balik semua bit
- \`<<\` (Left Shift): \`x << k\` = x × 2^k
- \`>>\` (Right Shift): \`x >> k\` = x ÷ 2^k

**Mengapa penting di OSN?**
1. Bitmask DP (state = subset dari himpunan)
2. Operasi O(1) untuk hal yang biasanya O(n)
3. Optimasi memory dengan bit array`,
        keyPoints: [
          'x & 1 == 0 → x genap; x & 1 == 1 → x ganjil',
          'x & (x-1) == 0 → x adalah pangkat dua',
          'x ^ x == 0; x ^ 0 == x (XOR self = 0)',
          '__builtin_popcount(x) = jumlah bit 1 dalam x (O(1))',
          '(mask >> i) & 1 = bit ke-i dari mask',
          'mask | (1 << i) = set bit ke-i',
          'mask & ~(1 << i) = clear bit ke-i',
          'mask ^ (1 << i) = toggle bit ke-i',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // ── Cek genap/ganjil ──
    int x = 13;  // 1101 dalam biner
    cout << (x & 1 ? "ganjil" : "genap") << "\\n";  // ganjil

    // ── Cek power of 2 ──
    auto isPow2 = [](int n){ return n > 0 && (n & (n-1)) == 0; };
    cout << isPow2(8) << " " << isPow2(6) << "\\n";  // 1 0

    // ── Swap tanpa variabel temp ──
    int a = 5, b = 7;
    a ^= b; b ^= a; a ^= b;
    cout << a << " " << b << "\\n";  // 7 5

    // ── Bit ke-i ──
    int mask = 0b1011;  // bit 0,1,3 aktif
    for (int i = 3; i >= 0; i--)
        cout << ((mask >> i) & 1);  // 1011
    cout << "\\n";

    // ── Set / Clear / Toggle bit ──
    int m = 0b1010;
    m |= (1 << 0);   // set bit 0   → 1011
    m &= ~(1 << 1);  // clear bit 1 → 1001
    m ^= (1 << 3);   // toggle bit 3→ 0001
    cout << m << "\\n";  // 1

    // ── Popcount (hitung bit 1) ──
    cout << __builtin_popcount(0b10110101) << "\\n";  // 5

    // ── Iterasi semua subset dari mask ──
    int full = 0b111;  // 3 elemen: {0,1,2}
    cout << "Semua subset: ";
    for (int sub = full; sub > 0; sub = (sub-1) & full) {
        cout << sub << " ";
    }
    cout << "0\\n";  // 7 6 5 4 3 2 1 0

    // ── Low bit trick: bit aktif paling kanan ──
    int n = 0b10110;
    cout << (n & -n) << "\\n";  // 2 (bit ke-1)

    return 0;
}`,
        codeExplanation: 'Semua operasi bit adalah O(1). Iterasi subset dengan (sub-1) & full sangat berguna untuk subset DP O(3^n).',
        practice: {
          question: 'Diketahui N bilangan. Temukan satu-satunya bilangan yang muncul ganjil kali (yang lain muncul genap kali). Gunakan XOR!',
          hint: 'XOR semua bilangan. Angka yang muncul genap kali akan ter-cancel (a^a=0). Yang tersisa adalah yang muncul ganjil kali.',
          answer: `int findOdd(vector<int>& arr) {
    int result = 0;
    for (int x : arr) result ^= x;
    return result;
}`,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Prefix Sum & Difference Array
  // ═══════════════════════════════════════════
  {
    id: 'prefix-sum',
    title: 'Prefix Sum & Difference Array',
    subtitle: 'Query range sum O(1) dan range update O(1)',
    difficulty: 'osn-k',
    category: 'Struktur Data',
    icon: '➕',
    color: 'from-teal-500 to-emerald-600',
    estimatedHours: 3,
    prerequisites: ['cpp-basics'],
    description: 'Prefix Sum adalah teknik preprocessing O(n) yang memungkinkan range sum query O(1). Difference Array memungkinkan range update O(1). Keduanya sangat sering muncul di soal OSN.',
    whatYouLearn: [
      'Prefix Sum 1D dan 2D',
      'Range sum query O(1) setelah preprocessing',
      'Difference Array untuk range update',
      'Prefix Sum untuk hitung frekuensi',
      'Kombinasi dengan problem lain',
    ],
    lessons: [
      {
        id: 'prefix-sum-basic',
        title: 'Prefix Sum 1D, 2D & Difference Array',
        duration: 35,
        type: 'concept',
        content: `**Prefix Sum** adalah teknik sederhana tapi sangat powerful. Ide: precompute jumlah kumulatif sehingga query range sum bisa dijawab O(1).

**Prefix Sum 1D:**
\`pre[i] = A[0] + A[1] + ... + A[i]\`
Query sum [l,r] = \`pre[r] - pre[l-1]\`

**2D Prefix Sum:**
Sangat berguna untuk soal grid. Sum submatriks dalam O(1).

**Difference Array:**
Kebalikan dari prefix sum. Berguna saat kita perlu update range [l,r] +val berkali-kali, dan query nilai akhir di semua posisi.`,
        keyPoints: [
          'Prefix sum: pre[i] = pre[i-1] + A[i-1] (1-indexed)',
          'Range sum [l,r] (1-indexed): pre[r] - pre[l-1]',
          '2D prefix sum: sum(r1,c1,r2,c2) dengan inklusi-eksklusi',
          'Difference array D: D[l] += val, D[r+1] -= val',
          'Setelah semua update, prefix sum D = array hasil',
          'Kombinasikan dengan binary search untuk soal advanced',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// ── 1D Prefix Sum ──
struct PrefixSum1D {
    vector<long long> pre;
    PrefixSum1D(vector<int>& a) {
        int n = a.size();
        pre.resize(n + 1, 0);
        for (int i = 1; i <= n; i++)
            pre[i] = pre[i-1] + a[i-1];
    }
    // Sum [l, r] (1-indexed)
    long long query(int l, int r) { return pre[r] - pre[l-1]; }
};

// ── 2D Prefix Sum ──
struct PrefixSum2D {
    vector<vector<long long>> pre;
    PrefixSum2D(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        pre.assign(n+1, vector<long long>(m+1, 0));
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++)
                pre[i][j] = grid[i-1][j-1]
                           + pre[i-1][j] + pre[i][j-1]
                           - pre[i-1][j-1];
    }
    // Sum submatriks (r1,c1) ke (r2,c2), 1-indexed
    long long query(int r1, int c1, int r2, int c2) {
        return pre[r2][c2] - pre[r1-1][c2]
                           - pre[r2][c1-1]
                           + pre[r1-1][c1-1];
    }
};

// ── Difference Array ──
// Banyak update range [l,r] += val, lalu query semua posisi
struct DiffArray {
    vector<long long> diff;
    int n;
    DiffArray(int n) : n(n), diff(n+2, 0) {}
    // Tambahkan val ke semua posisi dalam [l, r] (1-indexed)
    void update(int l, int r, long long val) {
        diff[l] += val;
        diff[r+1] -= val;
    }
    // Bangun array hasil
    vector<long long> build() {
        vector<long long> result(n+1);
        long long cur = 0;
        for (int i = 1; i <= n; i++) {
            cur += diff[i];
            result[i] = cur;
        }
        return result;
    }
};

int main() {
    // 1D Prefix Sum
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    PrefixSum1D ps(a);
    cout << ps.query(2, 5) << "\\n";  // 1+4+1+5 = 11
    cout << ps.query(1, 8) << "\\n";  // 31

    // 2D Prefix Sum
    vector<vector<int>> grid = {{1,2,3},{4,5,6},{7,8,9}};
    PrefixSum2D ps2(grid);
    cout << ps2.query(1,1,2,2) << "\\n";  // 1+2+4+5 = 12
    cout << ps2.query(2,2,3,3) << "\\n";  // 5+6+8+9 = 28

    // Difference Array
    DiffArray da(5);
    da.update(1, 3, 10);  // pos 1,2,3 += 10
    da.update(2, 5, 5);   // pos 2,3,4,5 += 5
    da.update(3, 4, -3);  // pos 3,4 -= 3
    auto res = da.build();
    for (int i = 1; i <= 5; i++) cout << res[i] << " ";
    cout << "\\n";  // 10 15 12 2 5

    return 0;
}`,
        codeExplanation: 'Prefix Sum O(n) preprocessing → O(1) query. 2D Prefix Sum sama tapi untuk grid. Difference Array: O(1) per update, O(n) build di akhir.',
        practice: {
          question: 'Diberikan array panjang N dan Q query. Setiap query: tambahkan V ke semua elemen dari indeks L ke R. Setelah semua query, cetak array akhir.',
          hint: 'Gunakan Difference Array! Setiap update O(1), build akhir O(n).',
          answer: `DiffArray da(n);
for (int q = 0; q < Q; q++) {
    int l, r, v; cin >> l >> r >> v;
    da.update(l, r, v);
}
auto result = da.build();
for (int i = 1; i <= n; i++) cout << result[i] << " ";`,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Divide and Conquer
  // ═══════════════════════════════════════════
  {
    id: 'divide-conquer',
    title: 'Divide & Conquer',
    subtitle: 'Pecah masalah besar jadi submasalah kecil',
    difficulty: 'osn-p',
    category: 'Algoritma',
    icon: '⚔️',
    color: 'from-red-500 to-orange-600',
    estimatedHours: 6,
    prerequisites: ['recursion', 'sorting-searching'],
    description: 'Divide & Conquer adalah paradigma algoritmik: pecah masalah jadi bagian lebih kecil, selesaikan rekursif, gabungkan hasilnya. Dasar dari Merge Sort, Binary Search, dan banyak algoritma O(n log n) lainnya.',
    whatYouLearn: [
      'Paradigma: Divide, Conquer, Combine',
      'Merge Sort dan analisis kompleksitas',
      'Quick Sort dan pemilihan pivot',
      'Closest Pair of Points O(n log n)',
      'Karatsuba multiplication (intro)',
    ],
    lessons: [
      {
        id: 'dnc-intro',
        title: 'Divide & Conquer — Pola Dasar & Aplikasi',
        duration: 50,
        type: 'concept',
        content: `**Divide & Conquer** terdiri dari tiga langkah:
1. **Divide** — Pecah masalah ukuran n menjadi submasalah lebih kecil
2. **Conquer** — Selesaikan submasalah secara rekursif
3. **Combine** — Gabungkan solusi submasalah menjadi solusi utama

**Master Theorem** untuk analisis kompleksitas:
\`T(n) = a·T(n/b) + f(n)\`
- a = jumlah submasalah, b = faktor pembagian, f(n) = biaya combine

**Contoh paling penting:**
- Merge Sort: a=2, b=2, f(n)=O(n) → **O(n log n)**
- Binary Search: a=1, b=2, f(n)=O(1) → **O(log n)**

**Trik D&C di Kompetisi:**
Bagi array di tengah, proses kiri+kanan secara rekursif, lalu hitung kontribusi pasangan cross (kiri-kanan).`,
        keyPoints: [
          'Master Theorem: T(n)=2T(n/2)+O(n) → O(n log n)',
          'Merge Sort stable, Quick Sort in-place tapi worst O(n²)',
          'D&C untuk inversion count: modifikasi Merge Sort',
          'Closest pair: O(n log n) dengan D&C + strip check O(n)',
          'D&C DP: untuk DP dengan monotone queue optimization',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// ── Merge Sort + Inversion Count ──
long long merge_count(vector<int>& arr, int l, int r) {
    if (r - l <= 1) return 0;
    int mid = (l + r) / 2;
    long long cnt = merge_count(arr, l, mid)
                  + merge_count(arr, mid, r);
    vector<int> tmp;
    int i = l, j = mid;
    while (i < mid && j < r) {
        if (arr[i] <= arr[j]) {
            tmp.push_back(arr[i++]);
        } else {
            cnt += mid - i;  // semua arr[i..mid-1] > arr[j]
            tmp.push_back(arr[j++]);
        }
    }
    while (i < mid) tmp.push_back(arr[i++]);
    while (j < r)   tmp.push_back(arr[j++]);
    for (int k = l; k < r; k++) arr[k] = tmp[k - l];
    return cnt;
}

// ── Quick Select: Elemen ke-K terkecil O(n) rata-rata ──
int quickSelect(vector<int>& arr, int l, int r, int k) {
    if (l == r) return arr[l];
    int pivot = arr[l + (r - l) / 2];
    int i = l, j = r;
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) { swap(arr[i], arr[j]); i++; j--; }
    }
    if (k <= j) return quickSelect(arr, l, j, k);
    if (k >= i) return quickSelect(arr, i, r, k);
    return arr[k];
}

// ── Maximum Subarray D&C ──
// Temukan subarray dengan sum terbesar O(n log n)
int maxCrossSum(vector<int>& a, int l, int mid, int r) {
    int leftSum = INT_MIN, rightSum = INT_MIN;
    int sum = 0;
    for (int i = mid; i >= l; i--) { sum += a[i]; leftSum = max(leftSum, sum); }
    sum = 0;
    for (int i = mid+1; i <= r; i++) { sum += a[i]; rightSum = max(rightSum, sum); }
    return leftSum + rightSum;
}

int maxSubarray(vector<int>& a, int l, int r) {
    if (l == r) return a[l];
    int mid = (l + r) / 2;
    return max({maxSubarray(a, l, mid),
                maxSubarray(a, mid+1, r),
                maxCrossSum(a, l, mid, r)});
}

int main() {
    vector<int> arr = {3, 1, 8, 2, 5};
    cout << merge_count(arr, 0, arr.size()) << "\\n";  // 2

    vector<int> a2 = {7, 10, 4, 3, 20, 15};
    cout << quickSelect(a2, 0, a2.size()-1, 2) << "\\n";  // 7 (ke-3 terkecil)

    vector<int> a3 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << maxSubarray(a3, 0, a3.size()-1) << "\\n";  // 6 [4,-1,2,1]

    return 0;
}`,
        codeExplanation: 'Merge Sort + Inversion Count O(n log n): saat merge, elemen arr[j] yang dipilih lebih kecil dari arr[i..mid-1], artinya ada (mid-i) inversi.',
        practice: {
          question: 'Hitung jumlah pasangan (i,j) dengan i<j dimana A[i] > A[j] (inversion count) untuk array [5,3,1,4,2].',
          hint: 'Gunakan modifikasi Merge Sort. Saat elemen dari sisi kanan dipilih lebih kecil dari elemen sisi kiri, semua elemen sisi kiri yang tersisa membentuk inversi.',
          answer: 'vector<int> a={5,3,1,4,2}; cout << merge_count(a,0,a.size()); // Output: 7',
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Hashing & Counting
  // ═══════════════════════════════════════════
  {
    id: 'hashing-counting',
    title: 'Hashing & Teknik Counting',
    subtitle: 'Frekuensi, koordinat compression, offline query',
    difficulty: 'osn-p',
    category: 'Algoritma',
    icon: '🗂️',
    color: 'from-violet-500 to-purple-600',
    estimatedHours: 5,
    prerequisites: ['cpp-basics', 'sorting-searching'],
    description: 'Hashing dan Counting adalah teknik penting untuk menjawab query frekuensi, koordinat compression, dan offline processing. unordered_map, counting sort, dan coordinate compression sering jadi kunci soal OSN.',
    whatYouLearn: [
      'unordered_map vs map: kapan pakai masing-masing',
      'Coordinate compression untuk data range besar',
      'Counting dengan prefix sum',
      'Offline query ordering',
      'Mo\'s Algorithm untuk range query offline',
    ],
    lessons: [
      {
        id: 'hashing-basic',
        title: 'Hashing, Coordinate Compression & Mo\'s Algorithm',
        duration: 55,
        type: 'code',
        content: `**Hashing** dengan unordered_map memberi O(1) amortized untuk insert/lookup, jauh lebih cepat dari map yang O(log n).

**Coordinate Compression:** Saat nilai A[i] bisa hingga 10^9 tapi hanya ada N≤10^5 nilai berbeda, kita bisa "compress" nilai ke range [0, N-1]. Ini memungkinkan penggunaan array biasa atau BIT/Segment Tree.

**Mo's Algorithm:** Teknik offline untuk range query O((N+Q)√N). Urutkan query berdasarkan blok √N, lalu geser pointer L dan R secara amortized.`,
        keyPoints: [
          'unordered_map average O(1), worst O(n) — gunakan custom hash jika perlu',
          'Coordinate compression: sort + unique + lower_bound',
          'Mo\'s Algorithm: sort query by (L/block, R), geser L&R secara greedy',
          'Mo\'s cocok untuk: count distinct, XOR range, sum queries offline',
          'Blok size optimal √N untuk Mo\'s Algorithm',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// ── Coordinate Compression ──
vector<int> compress(vector<int>& a) {
    vector<int> sorted_a = a;
    sort(sorted_a.begin(), sorted_a.end());
    sorted_a.erase(unique(sorted_a.begin(), sorted_a.end()), sorted_a.end());
    vector<int> compressed(a.size());
    for (int i = 0; i < (int)a.size(); i++) {
        compressed[i] = lower_bound(sorted_a.begin(), sorted_a.end(), a[i])
                        - sorted_a.begin();  // 0-indexed
    }
    return compressed;
}

// ── Mo's Algorithm ── (Count distinct dalam range)
int block;
struct Query { int l, r, idx; };

int cnt[1000005], distinct = 0;
void add(vector<int>& a, int pos) {
    if (++cnt[a[pos]] == 1) distinct++;
}
void rem(vector<int>& a, int pos) {
    if (--cnt[a[pos]] == 0) distinct--;
}

vector<int> mo_distinct(vector<int>& a, vector<pair<int,int>>& queries) {
    int n = a.size(), q = queries.size();
    block = max(1, (int)sqrt(n));

    vector<Query> qs(q);
    for (int i = 0; i < q; i++) qs[i] = {queries[i].first, queries[i].second, i};

    // Sort: blok L, lalu R (alternating direction)
    sort(qs.begin(), qs.end(), [](const Query& a, const Query& b) {
        int ba = a.l / block, bb = b.l / block;
        if (ba != bb) return ba < bb;
        return ba & 1 ? a.r > b.r : a.r < b.r;  // Hilbert trick
    });

    vector<int> ans(q);
    int curL = 0, curR = -1;
    for (auto& [l, r, idx] : qs) {
        while (curR < r) add(a, ++curR);
        while (curL > l) add(a, --curL);
        while (curR > r) rem(a, curR--);
        while (curL < l) rem(a, curL++);
        ans[idx] = distinct;
    }
    return ans;
}

// ── Custom Hash untuk unordered_map ──
// Hindari worst-case O(n) dengan custom hash
struct PairHash {
    size_t operator()(pair<int,int> p) const {
        return hash<long long>()(((long long)p.first << 32) | (unsigned)p.second);
    }
};

int main() {
    // Coordinate compression
    vector<int> a = {1000000, 500, 1, 1000000, 500, 999};
    auto comp = compress(a);
    for (int x : comp) cout << x << " ";
    cout << "\\n";  // 3 1 0 3 1 2

    // Mo's Algorithm
    vector<int> arr = {1, 2, 1, 3, 2, 4};
    vector<pair<int,int>> queries = {{0,3}, {1,4}, {0,5}};
    auto results = mo_distinct(arr, queries);
    for (int r : results) cout << r << " ";
    cout << "\\n";  // 3 3 4

    // unordered_map dengan pair key
    unordered_map<pair<int,int>, int, PairHash> freq;
    freq[{1, 2}]++;
    freq[{3, 4}]++;
    cout << freq[{1, 2}] << "\\n";  // 1

    return 0;
}`,
        codeExplanation: 'Mo\'s Algorithm O((N+Q)√N): sortir query berdasarkan blok, geser pointer L/R secara greedy. Alternating sort direction (Hilbert) mengurangi konstanta.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Sparse Table & RMQ
  // ═══════════════════════════════════════════
  {
    id: 'sparse-table',
    title: 'Sparse Table & RMQ',
    subtitle: 'Range Minimum/Maximum Query dalam O(1)',
    difficulty: 'osn-nasional',
    category: 'Struktur Data',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-600',
    estimatedHours: 5,
    prerequisites: ['segment-tree', 'math-discrete'],
    description: 'Sparse Table adalah struktur data untuk Range Minimum/Maximum Query (RMQ) dalam O(1) setelah preprocessing O(n log n). Jauh lebih cepat dari Segment Tree untuk query-only (tanpa update).',
    whatYouLearn: [
      'Konsep Sparse Table — Binary Lifting untuk range',
      'Preprocessing O(n log n)',
      'Query RMQ O(1)',
      'Idempotent property (min/max/gcd, bukan sum)',
      'Aplikasi: LCA, Closest Common Ancestor',
    ],
    lessons: [
      {
        id: 'sparse-table-rmq',
        title: 'Sparse Table — RMQ O(1) Query',
        duration: 45,
        type: 'code',
        content: `**Sparse Table** memanfaatkan fakta bahwa kita bisa precompute jawaban untuk semua range yang panjangnya pangkat dua.

**Ide:** Untuk query [l, r]:
- Cari k terbesar dimana 2^k ≤ (r-l+1)
- Jawaban = min(ST[l][k], ST[r-2^k+1][k])

**Kenapa bisa overlap?** Karena operasinya **idempotent**: min(a, a) = a. Ini yang membedakan Sparse Table dari Segment Tree — tidak bisa untuk sum (sum(a,a) = 2a ≠ a).

**Kapan pakai Sparse Table vs Segment Tree?**
- Sparse Table: hanya query, tidak ada update → O(1) query
- Segment Tree: ada update → O(log n) query & update`,
        keyPoints: [
          'Sparse Table: O(n log n) build, O(1) query untuk idempotent functions',
          'Idempotent: min, max, gcd, bitwise AND/OR — BUKAN sum, count',
          'ST[i][j] = min/max dari range [i, i + 2^j - 1]',
          'Query [l,r]: k = log2(r-l+1), min(ST[l][k], ST[r-2^k+1][k])',
          'Untuk sum RMQ, pakai Segment Tree atau BIT',
          'Sparse Table berguna untuk LCA: RMQ pada Euler Tour',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

struct SparseTable {
    vector<vector<int>> st;
    vector<int> log2_;
    int n;

    SparseTable(vector<int>& a) {
        n = a.size();
        int LOG = __lg(n) + 1;
        st.assign(LOG, vector<int>(n));
        log2_.resize(n + 1);

        // Precompute log2
        log2_[1] = 0;
        for (int i = 2; i <= n; i++)
            log2_[i] = log2_[i/2] + 1;

        // Base case: panjang 1
        st[0] = a;

        // Fill untuk panjang 2^j
        for (int j = 1; j < LOG; j++) {
            for (int i = 0; i + (1 << j) <= n; i++) {
                st[j][i] = min(st[j-1][i],
                               st[j-1][i + (1 << (j-1))]);
            }
        }
    }

    // Range Minimum Query [l, r] dalam O(1)
    int query(int l, int r) {
        int k = log2_[r - l + 1];
        return min(st[k][l], st[k][r - (1 << k) + 1]);
    }
};

// ── Sparse Table untuk GCD (juga idempotent) ──
struct SparseTableGCD {
    vector<vector<int>> st;
    vector<int> log2_;
    SparseTableGCD(vector<int>& a) {
        int n = a.size(), LOG = __lg(n) + 2;
        st.assign(LOG, vector<int>(n));
        log2_.resize(n + 1);
        log2_[1] = 0;
        for (int i = 2; i <= n; i++) log2_[i] = log2_[i/2] + 1;
        st[0] = a;
        for (int j = 1; j < LOG; j++)
            for (int i = 0; i + (1<<j) <= n; i++)
                st[j][i] = __gcd(st[j-1][i], st[j-1][i+(1<<(j-1))]);
    }
    int query(int l, int r) {
        int k = log2_[r - l + 1];
        return __gcd(st[k][l], st[k][r - (1<<k) + 1]);
    }
};

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    SparseTable rmq(a);

    cout << rmq.query(0, 9) << "\\n";   // min = 1
    cout << rmq.query(2, 7) << "\\n";   // min(4,1,5,9,2,6) = 1
    cout << rmq.query(5, 9) << "\\n";   // min(9,2,6,5,3) = 2

    // Jawab 100000 query RMQ dengan O(1) per query!
    vector<int> b = {6, 3, 8, 2, 7, 4, 1, 9, 5};
    SparseTableGCD gcdST(b);
    cout << gcdST.query(0, 3) << "\\n";  // gcd(6,3,8,2) = 1
    cout << gcdST.query(1, 2) << "\\n";  // gcd(3,8) = 1

    return 0;
}`,
        codeExplanation: 'Sparse Table O(n log n) build, O(1) query. Kunci: overlap tidak masalah karena min(x,x)=x (idempotent). Precompute log2 agar O(1) per query.',
        practice: {
          question: 'Diberikan array dan Q query. Setiap query tanya: berapa nilai minimum di range [l,r]? Q bisa sangat besar (10^6 queries).',
          hint: 'Segment Tree O(log n) per query bisa TLE jika Q=10^6. Sparse Table O(1) per query adalah solusi tepat.',
          answer: `SparseTable rmq(array);
for (auto [l, r] : queries)
    cout << rmq.query(l, r) << "\\n";`,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Trie
  // ═══════════════════════════════════════════
  {
    id: 'trie',
    title: 'Trie (Prefix Tree)',
    subtitle: 'Struktur data untuk string prefix matching',
    difficulty: 'osn-nasional',
    category: 'String',
    icon: '🌳',
    color: 'from-emerald-500 to-teal-600',
    estimatedHours: 6,
    prerequisites: ['string-algorithms', 'recursion'],
    description: 'Trie adalah pohon untuk menyimpan dan mencari string berdasarkan prefix. Berguna untuk autocomplete, spell check, XOR maximum, dan berbagai soal string di OSN Nasional.',
    whatYouLearn: [
      'Struktur dan implementasi Trie',
      'Insert dan Search O(L) dimana L = panjang string',
      'Count prefix matches',
      'Trie untuk XOR maximum (Bitwise Trie)',
      'Compressed Trie (Patricia Tree) — intro',
    ],
    lessons: [
      {
        id: 'trie-basic',
        title: 'Trie — Insert, Search & XOR Maximum',
        duration: 50,
        type: 'code',
        content: `**Trie** (dibaca "try") adalah pohon di mana setiap path dari root ke leaf merepresentasikan sebuah string. Setiap node menyimpan karakter, dan anak-anaknya adalah karakter berikutnya.

**Operasi O(L)** (L = panjang string):
- Insert: traversal dari root, buat node baru jika belum ada
- Search: traversal dari root, return false jika node tidak ada

**Bitwise Trie** — untuk soal XOR:
Simpan bilangan sebagai 30-bit biner dalam Trie (bit paling signifikan dulu). Untuk mencari XOR maximum dengan x, di setiap bit coba pergi ke sisi berlawanan dari bit x.`,
        keyPoints: [
          'Trie node memiliki array children[26] atau map<char,Node*>',
          'Tandai end_of_word untuk mengetahui string selesai di node ini',
          'Prefix count: tambah counter di setiap node saat insert',
          'Bitwise Trie: simpan 30 bit per bilangan untuk XOR maksimum',
          'XOR maximum: di setiap level, pilih sisi berlawanan dari bit query',
          'Trie bisa diimplementasikan dengan array (lebih cepat dari pointer)',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// ── Trie dengan Array (lebih cepat dari pointer) ──
const int MAXN = 300005;
int ch[MAXN][26];  // children
int cnt[MAXN];     // count string yang lewat node ini
bool isEnd[MAXN];
int tot = 1;       // current node count (root = 0)

void trieInit() { fill(ch[0], ch[0]+26, 0); cnt[0] = 0; isEnd[0] = false; }

void trieInsert(const string& s) {
    int u = 0;
    for (char c : s) {
        int v = c - 'a';
        if (!ch[u][v]) {
            ch[tot][0] = 0;
            fill(ch[tot], ch[tot]+26, 0);
            cnt[tot] = 0; isEnd[tot] = false;
            ch[u][v] = tot++;
        }
        u = ch[u][v];
        cnt[u]++;
    }
    isEnd[u] = true;
}

bool trieSearch(const string& s) {
    int u = 0;
    for (char c : s) {
        int v = c - 'a';
        if (!ch[u][v]) return false;
        u = ch[u][v];
    }
    return isEnd[u];
}

int trieCountPrefix(const string& prefix) {
    int u = 0;
    for (char c : prefix) {
        int v = c - 'a';
        if (!ch[u][v]) return 0;
        u = ch[u][v];
    }
    return cnt[u];
}

// ── Bitwise Trie untuk XOR Maximum ──
int bitCh[MAXN * 30][2];
int bitTot = 1;

void bitInsert(int x) {
    int u = 0;
    for (int i = 29; i >= 0; i--) {
        int bit = (x >> i) & 1;
        if (!bitCh[u][bit]) {
            fill(bitCh[bitTot], bitCh[bitTot]+2, 0);
            bitCh[u][bit] = bitTot++;
        }
        u = bitCh[u][bit];
    }
}

int bitMaxXOR(int x) {
    int u = 0, result = 0;
    for (int i = 29; i >= 0; i--) {
        int bit = (x >> i) & 1;
        int want = 1 - bit;  // Ingin bit berlawanan untuk XOR=1
        if (bitCh[u][want]) {
            result |= (1 << i);
            u = bitCh[u][want];
        } else {
            u = bitCh[u][bit];
        }
    }
    return result;
}

int main() {
    trieInit();
    vector<string> words = {"apple", "app", "apt", "banana", "band"};
    for (auto& w : words) trieInsert(w);

    cout << trieSearch("app") << "\\n";         // 1 (ada)
    cout << trieSearch("application") << "\\n"; // 0 (tidak ada)
    cout << trieCountPrefix("ap") << "\\n";     // 3 (apple, app, apt)
    cout << trieCountPrefix("ban") << "\\n";    // 2 (banana, band)

    // XOR Maximum
    memset(bitCh, 0, sizeof(bitCh)); bitTot = 1;
    vector<int> nums = {3, 10, 5, 25, 2, 8};
    for (int x : nums) bitInsert(x);
    cout << bitMaxXOR(5) << "\\n";   // XOR 5 dengan array → max 28 (5^25)

    return 0;
}`,
        codeExplanation: 'Trie array-based lebih cepat dari pointer karena cache-friendly. Bitwise Trie O(30) per operasi untuk XOR maximum — sangat berguna di soal yang melibatkan XOR.',
        practice: {
          question: 'Diberikan N string, dan M query. Setiap query tanya: berapa banyak string dalam array yang diawali prefix P?',
          hint: 'Insert semua string ke Trie. Query prefix: traversal ke node akhir prefix, return cnt[node].',
          answer: `for (auto& s : words) trieInsert(s);
for (auto& p : queries)
    cout << trieCountPrefix(p) << "\\n";`,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Advanced Number Theory
  // ═══════════════════════════════════════════
  {
    id: 'number-theory-advanced',
    title: 'Number Theory Lanjutan',
    subtitle: 'CRT, Euler Phi, Primitive Root, Lucas Theorem',
    difficulty: 'osn-nasional',
    category: 'Matematika',
    icon: '🔭',
    color: 'from-indigo-500 to-blue-600',
    estimatedHours: 8,
    prerequisites: ['math-discrete', 'dynamic-programming'],
    description: 'Number Theory lanjutan mencakup Chinese Remainder Theorem, Euler\'s Totient Function, Miller-Rabin primality test, dan Lucas Theorem. Topik ini sering muncul di soal OSN Nasional.',
    whatYouLearn: [
      'Euler\'s Totient Function φ(n)',
      'Extended Euclidean & Linear Congruence',
      'Chinese Remainder Theorem (CRT)',
      'Lucas Theorem untuk nCr mod p besar',
      'Miller-Rabin primality test O(k log²n)',
    ],
    lessons: [
      {
        id: 'number-theory-crt',
        title: 'CRT, Euler Phi & Lucas Theorem',
        duration: 65,
        type: 'concept',
        content: `**Euler's Totient Function φ(n):** Jumlah bilangan 1..n yang relatif prima dengan n.
- φ(p) = p-1 untuk prima p
- φ(p^k) = p^k - p^(k-1)
- φ(mn) = φ(m)φ(n) jika gcd(m,n)=1 (multiplicative)
- **Euler's Theorem:** a^φ(n) ≡ 1 (mod n) jika gcd(a,n)=1

**Chinese Remainder Theorem (CRT):**
Jika ada sistem kongruensi x ≡ r₁ (mod m₁), x ≡ r₂ (mod m₂), ..., dan semua mᵢ saling prima, maka ada solusi unik modulo M = m₁×m₂×...×mₖ.

**Lucas Theorem:**
C(n,r) mod p = C(n mod p, r mod p) × C(n/p, r/p) mod p
Berguna saat n,r sangat besar tapi p kecil (prima).`,
        keyPoints: [
          'φ(n) = n × Π(1 - 1/p) untuk semua prima p yang membagi n',
          'a^(p-1) ≡ 1 (mod p) — Fermat\'s Little Theorem (p prima)',
          'Modular inverse: a^(-1) ≡ a^(φ(n)-1) (mod n) jika gcd(a,n)=1',
          'Extended Euclidean: cari x,y dimana ax + by = gcd(a,b)',
          'CRT solusi: x = Σ rᵢ × Mᵢ × (Mᵢ⁻¹ mod mᵢ) mod M',
          'Lucas: C(n,k) mod p → C(n%p, k%p) × C(n/p, k/p) mod p',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<ll,ll> pll;

// ── Extended Euclidean ──
// Kembalikan gcd(a,b), dan x,y dimana ax+by=gcd
ll extGcd(ll a, ll b, ll& x, ll& y) {
    if (b == 0) { x = 1; y = 0; return a; }
    ll x1, y1;
    ll g = extGcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

// ── Modular Inverse (umum, gcd harus 1) ──
ll modInv(ll a, ll m) {
    ll x, y;
    ll g = extGcd(a, m, x, y);
    if (g != 1) return -1;  // Tidak ada inverse
    return (x % m + m) % m;
}

// ── Euler's Totient Function ──
ll eulerPhi(ll n) {
    ll result = n;
    for (ll p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

// ── Chinese Remainder Theorem ──
// Sistem: x ≡ r[i] (mod m[i]), semua m[i] saling prima
// Return {x, M} dimana x adalah solusi, M = Πm[i]
pll crt(vector<ll>& r, vector<ll>& m) {
    ll M = 1;
    for (ll mi : m) M *= mi;
    ll x = 0;
    for (int i = 0; i < (int)r.size(); i++) {
        ll Mi = M / m[i];
        ll inv = modInv(Mi % m[i], m[i]);
        x = (x + r[i] % M * Mi % M * inv) % M;
    }
    return {x, M};
}

// ── Lucas Theorem: C(n,k) mod p (p prima) ──
ll lucas(ll n, ll k, ll p) {
    if (k == 0) return 1;
    ll ni = n % p, ki = k % p;
    if (ki > ni) return 0;  // Dari Lucas
    // C(ni, ki) langsung
    ll num = 1, den = 1;
    for (ll i = 0; i < ki; i++) {
        num = num * (ni - i) % p;
        den = den * (i + 1) % p;
    }
    ll small = num * modInv(den, p) % p;
    return small * lucas(n/p, k/p, p) % p;
}

// ── Miller-Rabin Primality Test ──
ll mulmod(ll a, ll b, ll m) {
    return (__int128)a * b % m;
}
ll powmod(ll a, ll b, ll m) {
    ll res = 1; a %= m;
    for (; b > 0; b >>= 1) {
        if (b & 1) res = mulmod(res, a, m);
        a = mulmod(a, a, m);
    }
    return res;
}
bool millerRabin(ll n, ll a) {
    if (n % a == 0) return n == a;
    ll d = n - 1; int r = 0;
    while (d % 2 == 0) { d /= 2; r++; }
    ll x = powmod(a, d, n);
    if (x == 1 || x == n-1) return true;
    for (int i = 0; i < r-1; i++) {
        x = mulmod(x, x, n);
        if (x == n-1) return true;
    }
    return false;
}
bool isPrime(ll n) {
    if (n < 2) return false;
    for (ll a : {2LL,3LL,5LL,7LL,11LL,13LL,17LL,19LL,23LL,29LL,31LL,37LL})
        if (!millerRabin(n, a)) return false;
    return true;
}

int main() {
    // Extended Euclidean
    ll x, y;
    ll g = extGcd(35, 15, x, y);
    cout << g << " " << x << " " << y << "\\n";  // 5 1 -2: 35×1+15×(-2)=5

    // Euler Phi
    cout << eulerPhi(12) << "\\n";  // 4 (1,5,7,11)
    cout << eulerPhi(7) << "\\n";   // 6 (semua 1..6)

    // CRT: x≡2(mod3), x≡3(mod5), x≡2(mod7)
    vector<ll> r = {2,3,2}, m = {3,5,7};
    auto [sol, M] = crt(r, m);
    cout << sol << " mod " << M << "\\n";  // 23 mod 105

    // Lucas: C(10^18, 10^9) mod 7
    cout << lucas(1000000000000000000LL, 1000000000LL, 7) << "\\n";

    // Miller-Rabin
    cout << isPrime(999999999999999989LL) << "\\n";  // 1 (prima!)
    cout << isPrime(1000000007LL) << "\\n";          // 1 (prima)

    return 0;
}`,
        codeExplanation: 'Extended Euclidean O(log n), CRT O(k log n), Lucas O(log_p(n) × p), Miller-Rabin O(k log²n). Semua topik ini sering muncul di soal matematika OSN Nasional.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Mo's Algorithm & Sqrt Decomp
  // ═══════════════════════════════════════════
  {
    id: 'sqrt-decomposition',
    title: 'Sqrt Decomposition & Mo\'s',
    subtitle: 'Teknik O(√n) yang powerful untuk offline query',
    difficulty: 'osn-nasional',
    category: 'Algoritma',
    icon: '🔷',
    color: 'from-sky-500 to-cyan-600',
    estimatedHours: 7,
    prerequisites: ['segment-tree', 'sorting-searching'],
    description: 'Sqrt Decomposition membagi array menjadi blok-blok ukuran √n untuk query/update O(√n). Mo\'s Algorithm menggunakan ide ini untuk offline range query O((N+Q)√N).',
    whatYouLearn: [
      'Sqrt Decomposition untuk range sum O(√n)',
      'Block decomposition update & query',
      'Mo\'s Algorithm untuk offline range query',
      'Mo\'s with updates (modifikasi)',
      'Heavy-path intuition dari sqrt decomp',
    ],
    lessons: [
      {
        id: 'sqrt-basic',
        title: 'Sqrt Decomposition — Blok O(√n)',
        duration: 55,
        type: 'code',
        content: `**Sqrt Decomposition** membagi array panjang N menjadi blok-blok ukuran B ≈ √N. Setiap operasi menggunakan properti blok untuk efisiensi.

**Ide utama:**
- Operasi yang mempengaruhi satu elemen: O(1)
- Operasi yang mempengaruhi satu blok penuh: O(1)
- Operasi range: paling banyak 2 blok parsial + O(√N) blok penuh = O(√N)

**Kapan pakai Sqrt Decomp vs Segment Tree?**
- Segment Tree: update O(log n), query O(log n)
- Sqrt Decomp: update O(√n), query O(√n) — lebih sederhana untuk lazy operations
- Mo's Algorithm: offline query O((N+Q)√N), lebih cepat dari per-query O(√N)`,
        keyPoints: [
          'Block size optimal: B = √N ≈ 316 untuk N=10^5',
          'Perbaiki: 2 blok parsial O(B) + O(N/B) blok full',
          'Optimal saat B = √N: total O(√N) per operasi',
          'Lazy mark per blok untuk range update O(1) per blok',
          'Mo\'s: sort query → amortized O(1) geser pointer per step',
          'Mo\'s untuk count distinct, sum, XOR — apapun yang bisa add/remove O(1)',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// ── Sqrt Decomposition untuk Range Sum + Point Update ──
struct SqrtDecomp {
    int n, B;
    vector<int> a, block;

    SqrtDecomp(vector<int>& arr) {
        n = arr.size();
        B = max(1, (int)sqrt(n));
        a = arr;
        block.assign((n + B - 1) / B, 0);
        for (int i = 0; i < n; i++)
            block[i / B] += a[i];
    }

    void update(int i, int val) {
        block[i / B] += val - a[i];
        a[i] = val;
    }

    long long query(int l, int r) {  // [l, r] inclusive
        long long sum = 0;
        int bl = l / B, br = r / B;
        if (bl == br) {
            for (int i = l; i <= r; i++) sum += a[i];
        } else {
            for (int i = l; i < (bl + 1) * B; i++) sum += a[i];
            for (int b = bl + 1; b < br; b++) sum += block[b];
            for (int i = br * B; i <= r; i++) sum += a[i];
        }
        return sum;
    }
};

// ── Sqrt Decomp untuk Range Assign + Range Sum ──
// (lebih powerful: lazy per blok)
struct SqrtLazy {
    int n, B;
    vector<long long> a, block, lazy;

    SqrtLazy(vector<int>& arr) {
        n = arr.size(); B = max(1,(int)sqrt(n));
        a.assign(n, 0); block.assign((n+B-1)/B, 0); lazy.assign((n+B-1)/B, -1);
        for (int i = 0; i < n; i++) { a[i] = arr[i]; block[i/B] += arr[i]; }
    }

    void pushDown(int b) {
        if (lazy[b] != -1) {
            for (int i = b*B; i < min(n, (b+1)*B); i++) a[i] = lazy[b];
            lazy[b] = -1;
        }
    }

    void assign(int l, int r, long long val) {
        int bl = l/B, br = r/B;
        if (bl == br) {
            pushDown(bl);
            for (int i = l; i <= r; i++) a[i] = val;
            block[bl] = 0;
            for (int i = bl*B; i < min(n,(bl+1)*B); i++) block[bl] += a[i];
        } else {
            pushDown(bl);
            for (int i = l; i < (bl+1)*B; i++) a[i] = val;
            block[bl] = 0;
            for (int i = bl*B; i < (bl+1)*B; i++) block[bl] += a[i];
            for (int b = bl+1; b < br; b++) {
                lazy[b] = val;
                block[b] = val * B;
            }
            pushDown(br);
            for (int i = br*B; i <= r; i++) a[i] = val;
            block[br] = 0;
            for (int i = br*B; i < min(n,(br+1)*B); i++) block[br] += a[i];
        }
    }

    long long query(int l, int r) {
        long long sum = 0; int bl=l/B, br=r/B;
        if (bl == br) {
            pushDown(bl);
            for (int i = l; i <= r; i++) sum += a[i];
        } else {
            pushDown(bl);
            for (int i = l; i < (bl+1)*B; i++) sum += a[i];
            for (int b = bl+1; b < br; b++) sum += block[b];
            pushDown(br);
            for (int i = br*B; i <= r; i++) sum += a[i];
        }
        return sum;
    }
};

int main() {
    vector<int> a = {1,3,5,7,9,11,13,15,17,19};
    SqrtDecomp sd(a);
    cout << sd.query(2, 7) << "\\n";  // 5+7+9+11+13+15 = 60
    sd.update(3, 100);                // a[3] = 100
    cout << sd.query(2, 7) << "\\n";  // 5+100+9+11+13+15 = 153

    SqrtLazy sl(a);
    sl.assign(1, 5, 10);
    cout << sl.query(0, 9) << "\\n";  // 1+10+10+10+10+10+13+15+17+19 = 115

    return 0;
}`,
        codeExplanation: 'Sqrt Decomp lebih sederhana dari Segment Tree untuk operasi lazy yang kompleks. Block size √N membalancekan dua jenis operasi. Lazy per blok O(√N) untuk range operations.',
        practice: {
          question: 'Diberikan array N elemen dan Q operasi: (1) Update a[i] = v, (2) Query sum dari a[l] sampai a[r]. Implementasikan dengan Sqrt Decomposition.',
          hint: 'Gunakan blok ukuran √N. Update: ubah block[i/B] += val - a[i], lalu a[i] = val. Query: jumlahkan blok parsial + blok penuh.',
          answer: `SqrtDecomp sd(array);
for (auto& op : operations) {
    if (op.type == 1) sd.update(op.i, op.val);
    else cout << sd.query(op.l, op.r) << "\\n";
}`,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Game Theory
  // ═══════════════════════════════════════════
  {
    id: 'game-theory',
    title: 'Game Theory & Sprague-Grundy',
    subtitle: 'Nim, Grundy Values, dan Combinatorial Games',
    difficulty: 'osn-nasional',
    category: 'Matematika',
    icon: '🎮',
    color: 'from-rose-500 to-pink-600',
    estimatedHours: 6,
    prerequisites: ['math-discrete', 'dynamic-programming'],
    description: 'Game Theory untuk competitive programming berfokus pada analisis permainan dua pemain optimal. Sprague-Grundy Theorem memungkinkan analisis game kompleks dengan menguranginya ke game Nim sederhana.',
    whatYouLearn: [
      'Konsep P-position dan N-position',
      'Game Nim dan strategi optimal',
      'Sprague-Grundy Theorem',
      'Grundy Values (Nimbers) dengan DP',
      'Kombinasi beberapa game independen',
    ],
    lessons: [
      {
        id: 'game-nim',
        title: 'Nim & Sprague-Grundy Theorem',
        duration: 60,
        type: 'concept',
        content: `**Konsep Dasar Game Theory (Competitive Programming):**
- Game dua pemain, bergantian, informasi sempurna, zero-sum
- **P-position (Previous player wins):** Pemain sebelumnya (yang baru saja bergerak) menang. Artinya pemain saat ini akan kalah jika lawan bermain optimal.
- **N-position (Next player wins):** Pemain yang akan bergerak sekarang menang jika bermain optimal.

**Aturan P/N:**
- Terminal position (tidak ada gerakan) = P-position (pemain saat ini kalah)
- Position yang semua gerakan menuju N-position = P-position
- Position yang ada gerakan menuju P-position = N-position

**Game Nim:**
Beberapa tumpukan batu, setiap giliran ambil ≥1 batu dari satu tumpukan. Yang tidak bisa ambil = kalah.
**Strategi:** XOR semua tumpukan. Jika XOR=0 → P-position (kalah), XOR≠0 → N-position (menang).

**Sprague-Grundy Theorem:**
Setiap game equivalen dengan satu tumpukan Nim dengan nilai Grundy = mex(Grundy(state yang dapat dicapai)). mex = minimum excludant (bilangan non-negatif terkecil yang tidak ada dalam himpunan).`,
        keyPoints: [
          'Nim: XOR semua pile = 0 → P-position (current player loses)',
          'mex({}) = 0, mex({0}) = 1, mex({0,1}) = 2, mex({0,2}) = 1',
          'Grundy(game) = mex dari Grundy semua state yang bisa dicapai',
          'Game gabungan: Grundy = XOR semua Grundy game komponen',
          'Staircase Nim: hanya pile pada posisi ganjil yang diperhitungkan',
          'Misère Nim: XOR 0 kecuali semua pile ≤ 1 → aturan terbalik',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;

// ── Game Nim ──
bool nimWin(vector<int>& piles) {
    int xorSum = 0;
    for (int p : piles) xorSum ^= p;
    return xorSum != 0;  // true = pemain saat ini menang
}

// ── Sprague-Grundy untuk game sederhana ──
// Game: mulai dari n, bisa dikurangi 1, 2, atau 3
// Siapa yang mencapai 0 = menang
vector<int> grundy(100, -1);

int G(int n) {
    if (n == 0) return 0;
    if (grundy[n] != -1) return grundy[n];
    set<int> reachable;
    for (int move : {1, 2, 3}) {
        if (n - move >= 0) reachable.insert(G(n - move));
    }
    // mex = minimum excludant
    int mex = 0;
    while (reachable.count(mex)) mex++;
    return grundy[n] = mex;
}

// ── Grundy untuk Subtraction Game ──
// Boleh kurangi elemen dari set S
int grundySubtraction(int n, vector<int>& S) {
    vector<int> g(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        set<int> reach;
        for (int s : S) if (i - s >= 0) reach.insert(g[i - s]);
        int mex = 0;
        while (reach.count(mex)) mex++;
        g[i] = mex;
    }
    return g[n];
}

// ── Staircase Nim ──
// Tumpukan di tangga, bisa pindah dari tangga k ke k-1
// Strategy: XOR semua pile pada posisi GANJIL
bool staircaseNim(vector<int>& stairs) {
    int xorOdd = 0;
    for (int i = 1; i < (int)stairs.size(); i += 2)
        xorOdd ^= stairs[i];
    return xorOdd != 0;
}

// ── Game dengan board state (DP Grundy) ──
// Contoh: Chess-like piece movement
int grundyMemo[505][505];
// Piece di (r,c), bisa gerak ke (r-1,c), (r,c-1), (r-1,c-1)
// Yang tidak bisa gerak = kalah
int chessPieceGrundy(int r, int c) {
    if (grundyMemo[r][c] != -1) return grundyMemo[r][c];
    if (r == 0 && c == 0) return 0;
    set<int> reach;
    if (r > 0) reach.insert(chessPieceGrundy(r-1, c));
    if (c > 0) reach.insert(chessPieceGrundy(r, c-1));
    if (r > 0 && c > 0) reach.insert(chessPieceGrundy(r-1, c-1));
    int mex = 0;
    while (reach.count(mex)) mex++;
    return grundyMemo[r][c] = mex;
}

int main() {
    // Nim: pile {3,4,5}
    vector<int> piles = {3, 4, 5};
    cout << (nimWin(piles) ? "Menang" : "Kalah") << "\\n";
    // 3^4^5 = 2 ≠ 0 → Menang!

    // Grundy game: kurangi 1,2,3
    for (int i = 0; i <= 10; i++)
        cout << G(i) << " ";  // 0 1 2 3 0 1 2 3 0 1 2 (periode 4)
    cout << "\\n";

    // Subtraction game: boleh kurangi 1 atau 3
    vector<int> S = {1, 3};
    for (int i = 0; i <= 8; i++)
        cout << grundySubtraction(i, S) << " ";  // 0 1 0 1 2 3 2 3 0
    cout << "\\n";

    // Staircase Nim: tangga {0,3,1,4,2}
    vector<int> stairs = {0, 3, 1, 4, 2};
    cout << (staircaseNim(stairs) ? "Menang" : "Kalah") << "\\n";
    // Posisi ganjil: stairs[1]=3, stairs[3]=4 → XOR=7≠0 → Menang

    // Chess piece Grundy
    memset(grundyMemo, -1, sizeof(grundyMemo));
    cout << chessPieceGrundy(3, 3) << "\\n";  // XOR dari koordinat? = 3^3=0
    // Piece di (r,c): Grundy = r XOR c (bisa dibuktikan)

    return 0;
}`,
        codeExplanation: 'Nim → XOR. Sprague-Grundy: setiap game = Nim dengan nilai Grundy. Game gabungan = XOR semua Grundy. Periode Grundy sering berulang → cari pola!',
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  TOPIK BARU — Computational Geometry
  // ═══════════════════════════════════════════
  {
    id: 'geometry',
    title: 'Computational Geometry',
    subtitle: 'Convex Hull, titik dalam polygon, dan perpotongan',
    difficulty: 'ioi',
    category: 'Lanjutan',
    icon: '📐',
    color: 'from-amber-500 to-yellow-600',
    estimatedHours: 8,
    prerequisites: ['sorting-searching', 'divide-conquer'],
    description: 'Computational Geometry mencakup algoritma untuk objek geometri: titik, garis, polygon, circle. Topik ini muncul di IOI dan kadang OSN Nasional. Perlu ketelitian tinggi dalam implementasi.',
    whatYouLearn: [
      'Cross product dan dot product',
      'Orientasi tiga titik (CCW, CW, Collinear)',
      'Konveks Hull dengan Andrew\'s Monotone Chain O(n log n)',
      'Titik dalam polygon (Ray Casting)',
      'Perpotongan segmen garis',
    ],
    lessons: [
      {
        id: 'geometry-basics',
        title: 'Cross Product, Orientation & Convex Hull',
        duration: 70,
        type: 'code',
        content: `**Cross Product** adalah operasi fundamental dalam computational geometry:
- **cross(A,B,C)** = (B-A) × (C-A) = (Bx-Ax)(Cy-Ay) - (By-Ay)(Cx-Ax)
- Positif → C di kiri garis AB (CCW / counter-clockwise)
- Negatif → C di kanan garis AB (CW / clockwise)
- Nol → A, B, C collinear (segaris)

**Convex Hull** adalah polygon konveks terkecil yang melingkupi semua titik. Andrew's Monotone Chain: sort berdasarkan x (lalu y), bangun lower hull dan upper hull masing-masing.

**Kenapa pakai long long?** Cross product melibatkan perkalian koordinat → bisa overflow jika koordinat besar. Selalu gunakan \`long long\` atau \`double\` (tapi double bisa precision error).`,
        keyPoints: [
          'cross(O,A,B) > 0: B berada di kiri OA (CCW)',
          'cross(O,A,B) < 0: B berada di kanan OA (CW)',
          'cross(O,A,B) = 0: O,A,B collinear',
          'Convex Hull Andrew\'s: O(n log n) sort + O(n) scan',
          'Ray casting: hitung berapa kali ray dari titik memotong sisi polygon',
          'Titik dalam segitiga: cek semua cross product searah (semua + atau semua -)',
        ],
        code: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<ll,ll> Point;

#define x first
#define y second

ll cross(Point O, Point A, Point B) {
    return (A.x-O.x)*(B.y-O.y) - (A.y-O.y)*(B.x-O.x);
}

ll dist2(Point A, Point B) {
    return (A.x-B.x)*(A.x-B.x) + (A.y-B.y)*(A.y-B.y);
}

// ── Convex Hull (Andrew's Monotone Chain) ──
vector<Point> convexHull(vector<Point> pts) {
    int n = pts.size();
    if (n < 3) return pts;
    sort(pts.begin(), pts.end());
    vector<Point> hull;

    // Lower hull
    for (auto& p : pts) {
        while (hull.size() >= 2 &&
               cross(hull[hull.size()-2], hull[hull.size()-1], p) <= 0)
            hull.pop_back();
        hull.push_back(p);
    }

    // Upper hull
    int lower_size = hull.size();
    for (int i = n-2; i >= 0; i--) {
        while ((int)hull.size() > lower_size &&
               cross(hull[hull.size()-2], hull[hull.size()-1], pts[i]) <= 0)
            hull.pop_back();
        hull.push_back(pts[i]);
    }
    hull.pop_back();  // Remove last point (= first)
    return hull;
}

// ── Titik dalam Polygon (Ray Casting) ──
// Return: 1 = dalam, 0 = luar, -1 = di tepi
int pointInPolygon(Point pt, vector<Point>& poly) {
    int n = poly.size(), cnt = 0;
    for (int i = 0; i < n; i++) {
        Point a = poly[i], b = poly[(i+1)%n];
        if (cross(a, b, pt) == 0 &&
            min(a.x,b.x) <= pt.x && pt.x <= max(a.x,b.x) &&
            min(a.y,b.y) <= pt.y && pt.y <= max(a.y,b.y))
            return -1;  // Di tepi
        if (((a.y <= pt.y && pt.y < b.y) || (b.y <= pt.y && pt.y < a.y)) &&
            cross(a, b, pt) > 0)
            cnt++;
    }
    return cnt % 2;  // 1 = dalam, 0 = luar
}

// ── Apakah dua segmen berpotongan? ──
bool onSegment(Point p, Point a, Point b) {
    return min(a.x,b.x) <= p.x && p.x <= max(a.x,b.x) &&
           min(a.y,b.y) <= p.y && p.y <= max(a.y,b.y);
}

bool segmentsIntersect(Point a, Point b, Point c, Point d) {
    ll d1 = cross(c,d,a), d2 = cross(c,d,b);
    ll d3 = cross(a,b,c), d4 = cross(a,b,d);
    if (((d1>0&&d2<0)||(d1<0&&d2>0)) &&
        ((d3>0&&d4<0)||(d3<0&&d4>0))) return true;
    if (d1==0 && onSegment(a,c,d)) return true;
    if (d2==0 && onSegment(b,c,d)) return true;
    if (d3==0 && onSegment(c,a,b)) return true;
    if (d4==0 && onSegment(d,a,b)) return true;
    return false;
}

// ── Luas Polygon (Shoelace Formula) ──
double polygonArea(vector<Point>& poly) {
    ll area = 0;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        int j = (i+1) % n;
        area += poly[i].x * poly[j].y;
        area -= poly[j].x * poly[i].y;
    }
    return abs(area) / 2.0;
}

int main() {
    // Convex Hull
    vector<Point> pts = {{0,0},{1,1},{2,2},{0,2},{2,0},{1,0}};
    auto hull = convexHull(pts);
    cout << "Convex hull size: " << hull.size() << "\\n";  // 4

    // Point in polygon
    vector<Point> square = {{0,0},{4,0},{4,4},{0,4}};
    cout << pointInPolygon({2,2}, square) << "\\n";  // 1 (dalam)
    cout << pointInPolygon({5,5}, square) << "\\n";  // 0 (luar)
    cout << pointInPolygon({0,0}, square) << "\\n";  // -1 (di tepi)

    // Segment intersection
    cout << segmentsIntersect({0,0},{2,2},{0,2},{2,0}) << "\\n";  // 1 (berpotongan)
    cout << segmentsIntersect({0,0},{1,0},{2,0},{3,0}) << "\\n";  // 0

    // Polygon area
    cout << polygonArea(square) << "\\n";  // 16

    return 0;
}`,
        codeExplanation: 'Cross product adalah fondasi semua geometri. Convex Hull O(n log n): sort + scan lineair. Shoelace formula O(n) untuk luas. Selalu hati-hati overflow dengan long long!',
      },
    ],
  },
]

export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id)
}

export function getTopicsByDifficulty(diff: Difficulty): Topic[] {
  return topics.filter(t => t.difficulty === diff)
}

export function getTopicsByCategory(cat: string): Topic[] {
  return topics.filter(t => t.category === cat)
}
