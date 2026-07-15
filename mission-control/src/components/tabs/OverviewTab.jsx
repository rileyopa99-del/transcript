import HealthBadge from '../HealthBadge'
import EmptyState from '../EmptyState'
import { formatDate } from '../../lib/format'

export default function OverviewTab({ state }) {
  const {
    vision,
    health,
    current_priorities: priorities = [],
    architecture_decisions: decisions = [],
    open_questions: questions = [],
    blockers = [],
  } = state

  const recentDecisions = [...decisions]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 5)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {vision && (
        <blockquote className="rounded border-l-4 border-accent bg-surface px-5 py-4 text-lg italic leading-relaxed text-slate-200">
          “{vision}”
        </blockquote>
      )}

      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
          Health
        </span>
        <HealthBadge health={health} />
      </div>

      <section>
        <SectionHeading>Today's Priorities</SectionHeading>
        {priorities.length ? (
          <ol className="space-y-2">
            {priorities.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded border border-white/10 bg-surface px-4 py-3"
              >
                <span className="font-mono text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-slate-200">{item}</span>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState message="No priorities set — add via project_state.json" />
        )}
      </section>

      <section>
        <SectionHeading>Recent Architecture Decisions</SectionHeading>
        {recentDecisions.length ? (
          <ul className="space-y-2">
            {recentDecisions.map((d, i) => (
              <li key={i} className="rounded border border-white/10 bg-surface px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-200">{d.decision}</span>
                  {d.date && (
                    <span className="shrink-0 font-mono text-xs text-slate-500">
                      {formatDate(d.date)}
                    </span>
                  )}
                </div>
                {d.rationale && (
                  <p className="mt-1 text-sm text-slate-400">{d.rationale}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState message="No architecture decisions logged yet" />
        )}
      </section>

      <section>
        <SectionHeading>Open Questions</SectionHeading>
        {questions.length ? (
          <ul className="space-y-2">
            {questions.map((q, i) => (
              <li
                key={i}
                className="rounded border border-accent2/30 bg-accent2/10 px-4 py-3 text-sm text-slate-200"
              >
                {q}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState message="No open questions" />
        )}
      </section>

      {blockers.length > 0 && (
        <section>
          <SectionHeading className="text-red-400">Blockers</SectionHeading>
          <ul className="space-y-2">
            {blockers.map((b, i) => (
              <li
                key={i}
                className="rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
              >
                {b}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function SectionHeading({ children, className = '' }) {
  return (
    <h3
      className={`mb-3 font-mono text-xs uppercase tracking-widest text-slate-500 ${className}`}
    >
      {children}
    </h3>
  )
}
