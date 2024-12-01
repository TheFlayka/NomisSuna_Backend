import { Router } from 'express'
import { moneyboxValidation } from '../validations/moneyboxValidation.js'
import { checkBodyMiddleware, checkTokenMiddleWare } from '../middleware/checkData.js'
import {
	addMoneyboxController,
	deleteMoneyboxController,
	getCurrentMoneyboxController,
	getMoneyboxController,
	updateMoneyboxController,
} from '../controllers/moneyboxController.js'
import { registerMiddleware } from '../middleware/registerMiddleware.js'
const router = Router()

router.use(checkTokenMiddleWare)

router.post(
	'/api/moneybox/add',
	moneyboxValidation,
	checkBodyMiddleware,
	registerMiddleware,
	addMoneyboxController
)
router.get('/api/moneybox/', getMoneyboxController)
router.get('/api/moneybox/:id', getCurrentMoneyboxController)
router.delete('/api/moneybox/:id', deleteMoneyboxController)
router.put('/api/moneybox/:id', checkBodyMiddleware, updateMoneyboxController)

export default router
