import { Router } from 'express'
import { checkTokenMiddleWare } from '../middleware/checkData.js'
import { getAccessToken } from '../controllers/tokenController.js'
const router = Router()

// Routes

router.get('/api/token', checkTokenMiddleWare, getAccessToken)

export default router