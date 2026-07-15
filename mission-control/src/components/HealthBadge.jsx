import { healthLabel, healthStyles } from '../lib/format'

export default function HealthBadge({ health, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-mono font-medium ${healthStyles(
        health
      )} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {healthLabel(health)}
    </span>
  )
}
