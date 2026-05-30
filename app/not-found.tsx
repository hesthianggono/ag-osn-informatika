import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-white mb-3">404</h1>
        <h2 className="text-xl font-semibold text-slate-300 mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-slate-400 mb-8">
          Seperti mencari node yang tidak ada di graph — halaman ini tidak exist!
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 transition-colors font-medium"
          >
            ← Dashboard
          </Link>
          <Link
            href="/materi"
            className="px-5 py-2.5 rounded-xl bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700 transition-colors font-medium"
          >
            Lihat Materi
          </Link>
        </div>
      </div>
    </div>
  )
}
