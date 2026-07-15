import HealthBadge from './HealthBadge'
import { TABS } from '../lib/tabs'

export default function Sidebar({ projectName, tagline, health, phase, activeTab, onSelectTab }) {
  return (
    <aside className="fixed inset-y-0 left-0 flex w-60 flex-col border-r border-white/10 bg-surface">
      <div className="border-b border-white/10 px-4 py-5">
        <div className="font-mono text-[11px] uppercase tracking-widest text-accent2">
          Mission Control
        </div>
        <h1 className="mt-1 truncate text-lg font-semibold text-white" title={projectName}>
          {projectName || 'Untitled Project'}
        </h1>
        {tagline && <p className="mt-1 text-xs leading-snug text-slate-400">{tagline}</p>}
        <div className="mt-3 flex flex-col items-start gap-2">
          <HealthBadge health={health} />
          {phase && (
            <span className="inline-flex items-center rounded border border-white/10 bg-base px-2 py-0.5 font-mono text-xs text-slate-300">
              {phase}
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  className={`w-full rounded px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent/15 text-accent border border-accent/40'
                      : 'border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-4 py-3 font-mono text-[11px] text-slate-500">
        project_state.json
      </div>
    </aside>
  )
}
