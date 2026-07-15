export default function EmptyState({ message }) {
  return (
    <div className="rounded border border-dashed border-white/10 bg-surface/50 px-4 py-6 text-center font-mono text-sm text-slate-500">
      {message}
    </div>
  )
}
