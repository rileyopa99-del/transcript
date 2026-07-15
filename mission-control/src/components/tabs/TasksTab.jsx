import EmptyState from '../EmptyState'

const COLUMNS = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Done' },
]

export default function TasksTab({ state }) {
  const tasks = state.tasks || {}

  return (
    <div className="grid grid-cols-4 gap-4">
      {COLUMNS.map((col) => {
        const items = Array.isArray(tasks[col.key]) ? tasks[col.key] : []
        const isInProgress = col.key === 'in_progress'

        return (
          <div key={col.key} className="flex flex-col rounded border border-white/10 bg-surface">
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                {col.label}
              </span>
              <span className="rounded bg-base px-1.5 py-0.5 font-mono text-xs text-slate-400">
                {items.length}
              </span>
            </div>

            <div className="flex-1 space-y-2 p-2">
              {items.length ? (
                items.map((task, i) => (
                  <div
                    key={i}
                    className={`rounded border border-white/10 bg-base px-3 py-2 text-sm text-slate-200 ${
                      isInProgress ? 'border-l-2 border-l-accent' : ''
                    }`}
                  >
                    {task}
                  </div>
                ))
              ) : (
                <EmptyState message="Empty" />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
