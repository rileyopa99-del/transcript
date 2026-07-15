import { useEffect, useState } from 'react'

export function useProjectState() {
  const [state, setState] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch('/project_state.json', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load project_state.json (${res.status})`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setState(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { state, error, loading }
}
