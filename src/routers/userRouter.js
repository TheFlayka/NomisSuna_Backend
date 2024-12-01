import { Router } from 'express'
import { authValidation } from '../validations/userValidation.js'
import {
	deleteUserController,
	getUserInfoController,
	loginUserController,
	registerUserController,
} from '../controllers/userController.js'
import { registerMiddleware } from '../middleware/registerMiddleware.js'
import {
	checkBodyMiddleware,
	checkTokenMiddleWare,
} from '../middleware/checkData.js'
const router = Router()

// Routes
router.post(
	'/api/users/register',
	authValidation,
	registerMiddleware,
	checkBodyMiddleware,
	registerUserController
)
router.post('/api/users/login', checkBodyMiddleware, loginUserController)
router.delete('/api/users/delete', checkTokenMiddleWare, deleteUserController)
router.get('/api/users/info', checkTokenMiddleWare, getUserInfoController)

export default router
