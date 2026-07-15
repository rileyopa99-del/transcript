import EmptyState from '../EmptyState'

const SECTIONS = [
  { key: 'grants', label: 'Grants', empty: 'No entries yet — add via project_state.json' },
  { key: 'contacts', label: 'Contacts', empty: 'No entries yet — add via project_state.json' },
  {
    key: 'pitch_competitions',
    label: 'Pitch Competitions',
    empty: 'No entries yet — add via project_state.json',
  },
]

function formatHeader(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function websiteStyles(status) {
  const key = String(status || '').toLowerCase()
  if (key.includes('not live') || key.includes('down') || key.includes('offline'))
    return 'bg-surface-hi text-slate-300 border-white/10'
  if (key.includes('live')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
  if (key.includes('progress') || key.includes('build'))
    return 'bg-amber-500/10 text-amber-400 border-amber-500/40'
  return 'bg-surface-hi text-slate-300 border-white/10'
}

export default function OutreachTab({ state }) {
  const outreach = state.outreach || {}
  const websiteStatus = outreach.website_status

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
          Website Status
        </span>
        <span
          className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs font-medium ${websiteStyles(
            websiteStatus
          )}`}
        >
          {websiteStatus || 'Unknown'}
        </span>
      </div>

      {SECTIONS.map((section) => {
        const rows = Array.isArray(outreach[section.key]) ? outreach[section.key] : []
        const columns =
          rows.length && typeof rows[0] === 'object'
            ? Object.keys(rows[0])
            : rows.length
              ? ['value']
              : []

        return (
          <section key={section.key}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-500">
              {section.label}
            </h3>
            {rows.length ? (
              <div className="overflow-x-auto rounded border border-white/10 bg-surface">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      {columns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-slate-500"
                        >
                          {formatHeader(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        {columns.map((col) => (
                          <td key={col} className="px-4 py-2.5 text-slate-200">
                            {typeof row === 'object' ? String(row[col] ?? '—') : String(row)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState message={section.empty} />
            )}
          </section>
        )
      })}
    </div>
  )
}
