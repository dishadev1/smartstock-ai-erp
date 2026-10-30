// Small wrapper around fetch for calling the SmartStock API.
// Paths are relative ('/api/...'): in development Vite proxies them to Express
// (see vite.config.js), so no server address or secret lives in frontend code.
export async function apiGet(path) {
  const response = await fetch(`/api${path}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}
