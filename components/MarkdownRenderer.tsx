interface Props { content: string; className?: string }

export default function MarkdownRenderer({ content, className = '' }: Props) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  // Inline formatting: **bold**, `code`, _italic_
  function renderInline(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = []
    let remaining = text
    let key = 0

    while (remaining.length > 0) {
      // Bold **text**
      const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*(.*)$/)
      if (boldMatch) {
        if (boldMatch[1]) parts.push(<span key={key++}>{boldMatch[1]}</span>)
        parts.push(<strong key={key++} className="text-white font-semibold">{boldMatch[2]}</strong>)
        remaining = boldMatch[3]
        continue
      }
      // Inline code `code`
      const codeMatch = remaining.match(/^(.*?)`([^`]+)`(.*)$/)
      if (codeMatch) {
        if (codeMatch[1]) parts.push(<span key={key++}>{codeMatch[1]}</span>)
        parts.push(
          <code key={key++} className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-700/50">
            {codeMatch[2]}
          </code>
        )
        remaining = codeMatch[3]
        continue
      }
      parts.push(<span key={key++}>{remaining}</span>)
      break
    }
    return parts
  }

  while (i < lines.length) {
    const line = lines[i]

    // Empty line
    if (line.trim() === '') { elements.push(<div key={i} className="h-2" />); i++; continue }

    // Table (starts with |)
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]); i++
      }
      const rows = tableLines
        .filter(l => !l.match(/^\|[-| ]+\|$/))
        .map(l => l.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1))
      if (rows.length > 0) {
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {rows[0].map((cell, ci) => (
                    <th key={ci} className="px-3 py-2 text-left text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} className="hover:bg-slate-800/50 transition-colors">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-xs text-slate-300 border border-slate-700/50">
                        {renderInline(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    // Numbered list (1. 2. 3.)
    const numMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (numMatch) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        listItems.push(lines[i].replace(/^\d+\.\s+/, '')); i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-1.5 my-3 pl-1">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600/40 text-indigo-300 text-xs font-bold flex items-center justify-center mt-0.5">
                {li + 1}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Bullet list (- item)
    if (line.match(/^[-*]\s+/)) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        listItems.push(lines[i].replace(/^[-*]\s+/, '')); i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-3">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
              <span className="text-indigo-400 mt-1 flex-shrink-0 text-xs">▸</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Heading ##
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-white mt-5 mb-2">
          {renderInline(line.slice(3))}
        </h3>
      )
      i++; continue
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h2 key={i} className="text-lg font-bold text-white mt-5 mb-2">
          {renderInline(line.slice(2))}
        </h2>
      )
      i++; continue
    }

    // Normal paragraph
    elements.push(
      <p key={i} className="text-sm text-slate-300 leading-relaxed">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return <div className={`space-y-1 ${className}`}>{elements}</div>
}
