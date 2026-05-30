'use client'

import { useEffect, useState } from 'react'

// Foto close-up AIESHA dengan bingkai bulat & ring elemen Anemo+Pyro
export default function AieshaPortrait({ size = 160 }: { size?: number }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch('/aiesha.png', { method: 'HEAD' }).then(r => setReady(r.ok)).catch(() => setReady(false))
  }, [])

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Rotating dual-element ring */}
      <div className="absolute inset-0 rounded-full animate-glow" style={{
        background: 'conic-gradient(from 0deg, #26a69a, #00e5d1, #ff8a65, #ef5350, #26a69a)',
        padding: '3px',
      }}>
        <div className="w-full h-full rounded-full" style={{ background: 'var(--bg)' }} />
      </div>

      {/* Photo (circular crop) */}
      <div className="absolute rounded-full overflow-hidden"
        style={{ inset: '4px', background: 'linear-gradient(160deg, rgba(38,166,154,0.12), rgba(239,83,80,0.10))' }}>
        {ready ? (
          <img src="/aiesha.png" alt="AIESHA"
            className="w-full h-full object-cover animate-floatSlow"
            style={{ objectPosition: 'center 22%', filter: 'drop-shadow(0 2px 10px rgba(38,166,154,0.4))' }} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-2">
            <div className="text-3xl mb-1 animate-floatSlow">📷</div>
            <div className="text-[0.6rem]" style={{ color: 'var(--anemo-main)' }}>Foto AIESHA</div>
            <div className="text-[0.55rem]" style={{ color: 'var(--fg-dim)' }}>simpan aiesha.png</div>
          </div>
        )}
      </div>

      {/* Element badges */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs animate-floatSlow"
          title="Anemo"
          style={{ background: 'radial-gradient(circle, rgba(38,166,154,0.95), rgba(38,166,154,0.5))', boxShadow: '0 0 10px rgba(38,166,154,0.6)', border: '1px solid rgba(128,203,196,0.7)' }}>
          🌀
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs animate-floatSlow"
          title="Pyro"
          style={{ background: 'radial-gradient(circle, rgba(239,83,80,0.95), rgba(239,83,80,0.5))', boxShadow: '0 0 10px rgba(239,83,80,0.6)', border: '1px solid rgba(255,138,101,0.7)', animationDelay: '0.5s' }}>
          🔥
        </div>
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {['✦','◈','✧','⟡'].map((s, i) => (
          <span key={i} className="absolute text-xs animate-sparkle"
            style={{
              color: i % 2 === 0 ? 'var(--anemo-main)' : '#ff8a65',
              top: ['8%','15%','75%','82%'][i],
              left: ['-4%','96%','-2%','92%'][i],
              animationDelay: `${i * 0.4}s`,
            }}>{s}</span>
        ))}
      </div>
    </div>
  )
}
