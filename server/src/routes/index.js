import { Router } from 'express'
import healthRoutes from '../modules/health/health.routes.js'

// Every module's routes are mounted here, under the /api prefix set in app.js.
const router = Router()

router.use('/health', healthRoutes)

export default router
