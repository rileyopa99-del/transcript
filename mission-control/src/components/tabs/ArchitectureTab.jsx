import EmptyState from '../EmptyState'
import { formatDate } from '../../lib/format'

export default function ArchitectureTab({ state }) {
  const techStack = state.tech_stack || {}
  const decisions = state.architecture_decisions || []
  const questions = state.open_questions || []

  const categories = Object.entries(techStack)

  const timeline = [...decisions].sort(
    (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
  )

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section>
        <SectionHeading>Tech Stack</SectionHeading>
        {categories.length ? (
          <div className="space-y-4">
            {categories.map(([category, items]) => (
              <div key={category}>
                <div className="mb-2 font-mono text-xs uppercase tracking-wider text-accent2">
                  {category.replace(/_/g, ' ')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(items) ? items : [items]).map((item, i) => (
                    <span
                      key={i}
                      className="rounded border border-white/10 bg-surface px-2.5 py-1 font-mono text-xs text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No tech stack recorded" />
        )}
      </section>

      <section>
        <SectionHeading>Architecture Timeline</SectionHeading>
        {timeline.length ? (
          <ol className="relative space-y-6 border-l border-white/10 pl-6">
            {timeline.map((d, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full border-2 border-accent bg-base" />
                {d.date && (
                  <div className="font-mono text-xs text-slate-500">{formatDate(d.date)}</div>
                )}
                <div className="mt-0.5 text-sm font-medium text-slate-200">{d.decision}</div>
                {d.reason && (
                  <div className="mt-1 text-sm text-slate-400">{d.reason}</div>
                )}
              </li>
            ))}
          </ol>
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
                className="flex items-center gap-3 rounded border border-white/10 bg-surface px-4 py-3 text-sm text-slate-200"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-slate-500" />
                {q}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState message="No open questions" />
        )}
      </section>
    </div>
  )
}

function SectionHeading({ children }) {
  return (
    <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-500">
      {children}
    </h3>
  )
}
