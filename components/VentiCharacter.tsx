'use client'

import { useEffect, useState } from 'react'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showQuote?: boolean
  className?: string
}

const VENTI_QUOTES = [
  "Semangat belajar membawa angin perubahan! 🎵",
  "Seperti angin, pikiran harus bebas dan terus bergerak.",
  "Mondstadt percaya pada kebebasan — termasuk bebas belajar!",
  "Petualangan sejati dimulai dari rasa ingin tahu.",
  "Bahkan Archon belajar dari pengalamannya. Teruslah berlatih!",
  "Setiap soal yang terpecahkan adalah lagu kemenangan baru. ♪",
  "Angin selalu menemukan jalan — begitu pula solusi algoritma.",
  "Di Mondstadt, kami percaya: usaha tidak pernah mengkhianati hasil! 🌿",
]

const SIZES = {
  sm:  { img: 100, container: 'w-24' },
  md:  { img: 160, container: 'w-40' },
  lg:  { img: 220, container: 'w-56' },
  xl:  { img: 320, container: 'w-80' },
}

export default function VentiCharacter({ size = 'md', showQuote = false, className = '' }: Props) {
  const [quote, setQuote] = useState(VENTI_QUOTES[0])
  const [imgReady, setImgReady] = useState(false)   // start false → check first
  const [imgError, setImgError] = useState(false)
  const s = SIZES[size]

  useEffect(() => {
    // Check apakah venti.png ada sebelum render <img>
    fetch('/venti.png', { method: 'HEAD' })
      .then(r => { if (r.ok) setImgReady(true); else setImgError(true) })
      .catch(() => setImgError(true))
    setQuote(VENTI_QUOTES[Math.floor(Math.random() * VENTI_QUOTES.length)])
    const iv = setInterval(() => {
      setQuote(VENTI_QUOTES[Math.floor(Math.random() * VENTI_QUOTES.length)])
    }, 6000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className={`venti-widget ${s.container} ${className}`}>
      {/* Halo glow */}
      <div className="venti-halo" />

      {/* Character image or fallback */}
      {imgReady && !imgError ? (
        <img
          src="/venti.png"
          alt="Venti — Bard of Mondstadt"
          width={s.img}
          height={s.img}
          className="animate-float relative z-10 object-contain"
          style={{ maxWidth: '100%', height: 'auto' }}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback jika gambar belum ada */
        <div className="relative z-10 flex flex-col items-center justify-center animate-float"
          style={{ width: s.img, height: s.img }}>
          <div className="text-center">
            <div style={{
              fontSize: size === 'xl' ? '5rem' : size === 'lg' ? '4rem' : size === 'md' ? '3rem' : '2rem',
              filter: 'drop-shadow(0 0 12px rgba(38,166,154,0.6))',
            }}>🎵</div>
            <div className="text-xs mt-1" style={{ color: 'var(--anemo-main)' }}>Venti</div>
            <div className="text-xs" style={{ color: 'var(--fg-dim)', fontSize: '0.6rem' }}>
              Simpan venti.png<br/>ke folder public/
            </div>
          </div>
        </div>
      )}

      {/* Wind sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i}
            className="absolute text-xs animate-sparkle"
            style={{
              color: i % 2 === 0 ? 'var(--anemo-main)' : 'var(--venti-sky)',
              top: `${10 + i * 15}%`,
              left: i % 2 === 0 ? '5%' : '88%',
              animationDelay: `${i * 0.4}s`,
              fontSize: i % 3 === 0 ? '10px' : '7px',
            }}>
            {['✦', '◈', '⟡', '✧', '◇', '✦'][i]}
          </div>
        ))}
      </div>

      {/* Quote bubble */}
      {showQuote && (
        <div className="mt-2 px-3 py-2 rounded-xl text-center max-w-[200px] relative z-10"
          style={{
            background: 'rgba(8,20,32,0.85)',
            border: '1px solid rgba(38,166,154,0.3)',
            fontSize: '0.65rem',
            color: 'var(--anemo-pale)',
            lineHeight: 1.5,
            boxShadow: '0 4px 16px rgba(38,166,154,0.15)',
          }}>
          <div style={{ color: 'var(--anemo-main)', fontSize: '0.55rem', fontWeight: 700, marginBottom: '2px' }}>
            ♪ VENTI
          </div>
          {quote}
        </div>
      )}
    </div>
  )
}
