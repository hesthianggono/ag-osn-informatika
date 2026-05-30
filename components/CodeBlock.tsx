'use client'

import { useState, useEffect, useRef } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  explanation?: string
  collapsible?: boolean
}

export default function CodeBlock({ code, language = 'cpp', title, explanation, collapsible = false }: CodeBlockProps) {
  const [open, setOpen] = useState(!collapsible)
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)
  const [highlighted, setHighlighted] = useState('')

  useEffect(() => {
    if (!open) return
    import('highlight.js/lib/core').then(async ({ default: hljs }) => {
      const cpp = (await import('highlight.js/lib/languages/cpp')).default
      hljs.registerLanguage('cpp', cpp)
      try {
        const result = hljs.highlight(code, { language: 'cpp' })
        setHighlighted(result.value)
      } catch {
        setHighlighted(code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'))
      }
    })
  }, [code, open])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50" style={{ background: '#0d1117' }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          {/* Mac-style dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          {collapsible ? (
            <button
              onClick={() => setOpen(!open)}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 ml-1"
            >
              <span>{open ? '▼' : '▶'}</span>
              <span>{title || 'Contoh Kode C++'}</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 ml-1">{title || language.toUpperCase()}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-400 hover:text-slate-100 hover:bg-slate-600/60 transition-all select-none"
        >
          {copied ? '✓ Disalin!' : 'Salin'}
        </button>
      </div>

      {/* Code content */}
      {open && (
        <>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" />
          <div className="overflow-x-auto">
            {highlighted ? (
              <pre className="p-4 text-sm leading-relaxed m-0 rounded-none border-none" style={{ background: '#0d1117' }}>
                <code
                  ref={codeRef}
                  className="language-cpp hljs"
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                  style={{ background: 'transparent', padding: 0, fontFamily: 'var(--font-geist-mono), "JetBrains Mono", "Fira Code", monospace' }}
                />
              </pre>
            ) : (
              <pre className="p-4 text-sm leading-relaxed m-0 rounded-none border-none text-slate-300" style={{ background: '#0d1117' }}>
                <code style={{ fontFamily: 'var(--font-geist-mono), "JetBrains Mono", "Fira Code", monospace' }}>
                  {code}
                </code>
              </pre>
            )}
          </div>

          {/* Explanation */}
          {explanation && (
            <div className="px-4 py-3 bg-amber-950/40 border-t border-amber-700/30 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-400">📝 Penjelasan: </span>
              {explanation}
            </div>
          )}
        </>
      )}
    </div>
  )
}
