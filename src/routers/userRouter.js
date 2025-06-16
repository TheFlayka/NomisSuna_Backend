import { Router } from 'express'
import {
	registerValidation,
	loginValidation,
} from '../validations/userValidation.js'
import {
	deleteUserController,
	getUserInfoController,
	loginUserController,
	registerUserController,
} from '../controllers/userController.js'
import {
	registerMiddleware,
	loginMiddleware,
} from '../middleware/authMiddleware.js'
import {
	checkBodyMiddleware,
	checkTokenMiddleWare,
} from '../middleware/checkData.js'
const router = Router()

// Routes
router.post(
	'/api/users/register',
	registerValidation,
	registerMiddleware,
	checkBodyMiddleware,
	registerUserController
)
router.post(
	'/api/users/login',
	loginValidation,
	loginMiddleware,
	checkBodyMiddleware,
	loginUserController
)
router.delete('/api/users/delete', checkTokenMiddleWare, deleteUserController)
router.get('/api/users/info', checkTokenMiddleWare, getUserInfoController)

export default router
