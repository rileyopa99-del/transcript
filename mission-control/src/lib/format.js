const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/

function parseDate(value) {
  if (DATE_ONLY.test(value)) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
  return new Date(value)
}

export function formatDate(value) {
  if (!value) return null
  const d = parseDate(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatDateTime(value) {
  if (!value) return null
  const d = parseDate(value)
  if (Number.isNaN(d.getTime())) return value
  if (DATE_ONLY.test(value)) {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function healthLabel(health) {
  if (!health) return 'Unknown'
  const key = String(health).toLowerCase().replace(/[\s_-]+/g, '_')
  const map = {
    on_track: 'On Track',
    at_risk: 'At Risk',
    blocked: 'Blocked',
  }
  return map[key] || health
}

export function healthStyles(health) {
  if (!health) return 'bg-surface-hi text-slate-300 border-slate-600'
  const key = String(health).toLowerCase().replace(/[\s_-]+/g, '_')
  const map = {
    on_track: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40',
    at_risk: 'bg-amber-500/10 text-amber-400 border-amber-500/40',
    blocked: 'bg-red-500/10 text-red-400 border-red-500/40',
  }
  return map[key] || 'bg-surface-hi text-slate-300 border-slate-600'
}
