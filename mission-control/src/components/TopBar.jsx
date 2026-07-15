import { TABS } from '../lib/tabs'
import { formatDateTime } from '../lib/format'

export default function TopBar({ activeTab, phase, lastUpdated }) {
  const label = TABS.find((tab) => tab.id === activeTab)?.label || ''

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-base/95 px-6 py-3 backdrop-blur">
      <div className="flex items-baseline gap-3">
        <h2 className="text-base font-semibold text-white">{label}</h2>
        {phase && <span className="font-mono text-xs text-slate-500">{phase}</span>}
      </div>
      <div className="font-mono text-xs text-slate-500">
        last updated <span className="text-slate-300">{formatDateTime(lastUpdated) || '—'}</span>
      </div>
    </header>
  )
}
