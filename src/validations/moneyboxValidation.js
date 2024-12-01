import { body } from 'express-validator'

export const moneyboxValidation = [
	body('name', 'Нету названия копилки').notEmpty(),
	body('reach', 'Не указана цель копилки').notEmpty(),
]
