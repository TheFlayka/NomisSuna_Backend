import { Router } from 'express'
import { checkBodyMiddleware, checkTokenMiddleWare } from '../middleware/checkData.js'
import { transactionValidation } from '../validations/transactionValidation.js'
import {
	addTransactionController,
	getTransactionController,
	getTransactionsController,
	updateTransactionController,
} from '../controllers/transactionController.js'
import { registerMiddleware } from '../middleware/registerMiddleware.js'
const router = Router()

router.use(checkTokenMiddleWare)

router.post(
	'/api/transactions/',
	transactionValidation,
	registerMiddleware,
	checkBodyMiddleware,
	addTransactionController
)
router.get('/api/transactions/box/:id', getTransactionsController)
router.get('/api/transactions/:id', getTransactionController)
router.put('/api/transactions/:id', checkBodyMiddleware, updateTransactionController)

export default router
