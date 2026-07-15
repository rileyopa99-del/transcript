import { useState } from 'react'

const AGENT_ROLES = [
  'Senior Full-Stack Engineer',
  'Code Auditor',
  'Production Debugger',
  'Performance Engineer',
  'Security Engineer',
  'Marketing & Outreach',
]

export default function AgentChatTab() {
  const [role, setRole] = useState(AGENT_ROLES[0])

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <label htmlFor="agent-role" className="font-mono text-xs uppercase tracking-widest text-slate-500">
          Agent Role
        </label>
        <select
          id="agent-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded border border-white/10 bg-surface px-3 py-1.5 font-mono text-sm text-slate-200 focus:border-accent focus:outline-none"
        >
          {AGENT_ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded border border-white/10 bg-black/40 font-mono text-sm">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 text-xs text-slate-500">agent://{role.toLowerCase().replace(/[^a-z]+/g, '-')}</span>
        </div>

        <div className="min-h-[320px] space-y-3 p-4">
          <div>
            <div className="text-xs text-accent2">[{role}]</div>
            <p className="mt-1 whitespace-pre-wrap text-slate-300">
              Select an agent and describe your task. The agent will have full project context
              loaded automatically.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2 rounded border border-white/10 bg-base px-3 py-2 text-slate-500">
            <span className="text-accent">$</span>
            <span>Describe your task…</span>
          </div>
        </div>
      </div>
    </div>
  )
}
