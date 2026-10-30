import { useEffect, useState } from 'react'
import { Activity, CheckCircle2, Loader2, RefreshCw, XCircle } from 'lucide-react'
import { apiGet } from '../api/client.js'

const BADGES = {
  checking: {
    label: 'Checking…',
    icon: Loader2,
    className: 'bg-slate-100 text-slate-700 ring-slate-200',
    iconClassName: 'animate-spin',
  },
  online: {
    label: 'Operational',
    icon: CheckCircle2,
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  offline: {
    label: 'Unreachable',
    icon: XCircle,
    className: 'bg-red-50 text-red-700 ring-red-200',
  },
}

function StatusBadge({ state }) {
  const badge = BADGES[state]
  const Icon = badge.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${badge.className}`}
    >
      <Icon className={`size-3.5 ${badge.iconClassName ?? ''}`} aria-hidden="true" />
      {badge.label}
    </span>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-slate-900">{value}</dd>
    </div>
  )
}

function formatUptime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

export default function HealthStatus() {
  const [check, setCheck] = useState({ state: 'checking' })
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    // Ignore a response that arrives after a newer check started (or after unmount).
    let ignore = false

    apiGet('/health')
      .then((data) => {
        if (!ignore) setCheck({ state: 'online', data, checkedAt: new Date() })
      })
      .catch((error) => {
        if (!ignore) setCheck({ state: 'offline', error: error.message, checkedAt: new Date() })
      })

    return () => {
      ignore = true
    }
  }, [refreshCount])

  function handleRefresh() {
    setCheck((previous) => ({ ...previous, state: 'checking' }))
    setRefreshCount((count) => count + 1)
  }

  const isChecking = check.state === 'checking'

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <Activity className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">System status</h2>
            <p className="text-sm text-slate-500">Live check of the SmartStock API</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge state={check.state} />
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isChecking}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`size-4 ${isChecking ? 'animate-spin' : ''}`} aria-hidden="true" />
            Refresh
          </button>
        </div>
      </header>

      <div className="px-5 py-5">
        {check.data && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <Detail label="Endpoint" value="GET /api/health" />
            <Detail label="Environment" value={check.data.environment} />
            <Detail label="Uptime" value={formatUptime(check.data.uptimeSeconds)} />
            <Detail label="Last checked" value={check.checkedAt.toLocaleTimeString()} />
          </dl>
        )}

        {check.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p className="font-medium">The API could not be reached ({check.error}).</p>
            <p className="mt-1 text-red-700">
              Start the backend with <code className="font-mono">npm run dev</code> in the{' '}
              <code className="font-mono">server</code> folder, then press Refresh.
            </p>
          </div>
        )}

        {!check.data && !check.error && (
          <p className="text-sm text-slate-500">Contacting the API…</p>
        )}
      </div>
    </section>
  )
}
