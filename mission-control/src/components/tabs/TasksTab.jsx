import EmptyState from '../EmptyState'
import { formatDate } from '../../lib/format'

const COLUMNS = [
  { key: 'todo', label: 'Todo' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'blocked', label: 'Blocked' },
  { key: 'done', label: 'Done' },
]

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

const PRIORITY_STYLES = {
  high: 'text-accent',
  medium: 'text-accent2',
  low: 'text-slate-500',
}

const PROJECT_PALETTE = [
  'text-accent border-accent/40 bg-accent/10',
  'text-accent2 border-accent2/40 bg-accent2/10',
  'text-violet-400 border-violet-500/40 bg-violet-500/10',
  'text-sky-400 border-sky-500/40 bg-sky-500/10',
  'text-amber-400 border-amber-500/40 bg-amber-500/10',
  'text-rose-400 border-rose-500/40 bg-rose-500/10',
]

function projectStyles(name) {
  const str = String(name || '')
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  return PROJECT_PALETTE[hash % PROJECT_PALETTE.length]
}

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const priorityDiff = (PRIORITY_ORDER[a.priority] ?? 99) - (PRIORITY_ORDER[b.priority] ?? 99)
    if (priorityDiff !== 0) return priorityDiff
    if (!a.due && !b.due) return 0
    if (!a.due) return 1
    if (!b.due) return -1
    return new Date(a.due) - new Date(b.due)
  })
}

export default function TasksTab({ state }) {
  const tasks = Array.isArray(state.tasks) ? state.tasks : []

  return (
    <div className="grid grid-cols-4 gap-4">
      {COLUMNS.map((col) => {
        const items = sortTasks(tasks.filter((t) => t.status === col.key))

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
                items.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <EmptyState message={`No tasks in ${col.label.toLowerCase()}`} />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TaskCard({ task }) {
  const isBlocked = task.status === 'blocked'
  const due = formatDate(task.due)

  return (
    <div
      className={`rounded border border-white/10 bg-base px-3 py-2.5 ${
        isBlocked ? 'border-l-2 border-l-red-500/70' : ''
      }`}
    >
      <div className="text-sm text-slate-200">{task.title}</div>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        {task.project && (
          <span
            className={`rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${projectStyles(
              task.project
            )}`}
          >
            {task.project}
          </span>
        )}

        {task.priority && (
          <span
            className={`inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wide ${
              PRIORITY_STYLES[task.priority] || 'text-slate-500'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {task.priority}
          </span>
        )}

        {due && <span className="font-mono text-[10px] text-slate-500">{due}</span>}
      </div>

      {task.notes && <p className="mt-1.5 text-xs text-slate-500">{task.notes}</p>}
    </div>
  )
}
