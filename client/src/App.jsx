import { Boxes } from 'lucide-react'
import HealthStatus from './components/HealthStatus.jsx'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Boxes className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">SmartStock AI</p>
            <p className="text-xs text-slate-500">Inventory, Procurement &amp; Supply Chain ERP</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to SmartStock AI</h1>
        <p className="mt-1 text-sm text-slate-600">
          Development foundation (milestone 1). Live API status is shown below.
        </p>

        <div className="mt-6">
          <HealthStatus />
        </div>
      </main>
    </div>
  )
}

export default App
