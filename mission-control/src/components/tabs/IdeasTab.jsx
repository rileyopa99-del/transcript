import EmptyState from '../EmptyState'
import { formatDateTime } from '../../lib/format'

export default function IdeasTab({ state }) {
  const ideas = Array.isArray(state.ideas_log) ? state.ideas_log : []

  if (!ideas.length) {
    return (
      <div className="mx-auto max-w-3xl">
        <EmptyState message="Log ideas in project_state.json ideas_log array" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {ideas.map((entry, i) => {
        const text = typeof entry === 'string' ? entry : entry.idea
        const timestamp = typeof entry === 'object' ? entry.timestamp : null

        return (
          <div key={i} className="rounded border border-white/10 bg-surface px-4 py-3">
            <p className="text-sm text-slate-200">{text}</p>
            {timestamp && (
              <div className="mt-2 font-mono text-xs text-slate-500">
                {formatDateTime(timestamp)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
