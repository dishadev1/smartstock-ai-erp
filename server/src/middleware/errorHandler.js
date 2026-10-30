// Last middleware in the chain. Express treats a function with four
// arguments as an error handler, so all four must stay in the signature.
export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err)

  const status = err.status || err.statusCode || 500

  // Never leak internal error details (stack traces, SQL, etc.) to clients.
  if (status >= 500) {
    console.error(err)
    return res.status(500).json({ error: { message: 'Internal server error' } })
  }

  res.status(status).json({ error: { message: err.message } })
}
