'use client'

import { useEffect, useState } from 'react'

// Pure CSS particles — tidak ada infinite JS loop
// Dirender hanya client-side, tidak blocking screenshot

export default function WindParticles() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Delay mount agar tidak blocking first paint
    const t = setTimeout(() => setMounted(true), 500)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  // Particle configs — deterministic (tidak pakai Math.random)
  const particles = [
    { size: 3, top: 15, delay: 0,  dur: 20, opacity: 0.3 },
    { size: 5, top: 35, delay: 4,  dur: 25, opacity: 0.25 },
    { size: 2, top: 55, delay: 8,  dur: 18, opacity: 0.35 },
    { size: 4, top: 70, delay: 12, dur: 22, opacity: 0.2 },
    { size: 3, top: 85, delay: 16, dur: 28, opacity: 0.25 },
    { size: 6, top: 25, delay: 3,  dur: 24, opacity: 0.15 },
    { size: 2, top: 50, delay: 9,  dur: 19, opacity: 0.3 },
    { size: 4, top: 75, delay: 14, dur: 26, opacity: 0.2 },
  ]

  const colors = [
    'rgba(38,166,154,0.4)',
    'rgba(79,195,247,0.3)',
    'rgba(102,187,106,0.25)',
    'rgba(0,229,209,0.35)',
    'rgba(38,166,154,0.3)',
    'rgba(79,195,247,0.25)',
    'rgba(0,229,209,0.3)',
    'rgba(102,187,106,0.2)',
  ]

  const notes = ['♪', '♫', '𝄞', '♩', '♬']

  return (
    <div
      className="wind-particles"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: '-20px',
            borderRadius: '50%',
            background: colors[i],
            opacity: p.opacity,
            animation: `windDrift ${p.dur}s ${p.delay}s linear infinite`,
          }}
        />
      ))}

      {/* Musical notes — static, no animation */}
      {notes.map((note, i) => (
        <div
          key={`note-${i}`}
          style={{
            position: 'absolute',
            top: `${18 + i * 16}%`,
            left: `${8 + i * 18}%`,
            fontSize: '11px',
            color: i % 2 === 0 ? 'rgba(38,166,154,0.12)' : 'rgba(79,195,247,0.1)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {note}
        </div>
      ))}
    </div>
  )
}
