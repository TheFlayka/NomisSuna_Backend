import { body } from 'express-validator'

export const transactionValidation = [
	body('name', 'Укажите название транзакций').notEmpty(),
]
