import { Router } from 'express'
import { getAccessToken } from '../controllers/tokenController.js'
import { verifyRefreshToken } from '../middleware/tokenMiddleware.js'
const router = Router()

// Routes

router.get('/api/token', verifyRefreshToken, getAccessToken)

export default router