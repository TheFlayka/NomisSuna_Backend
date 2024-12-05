import { body } from 'express-validator'

export const authValidation = [
	body('name', 'Не было отправлено имя').notEmpty(),
	body(
		'login',
		'Неправильно указан логин. Минимальное значение: 3. Максимальное: 20'
	)
		.isLength({ min: 3, max: 20 })
		.notEmpty(),
	body(
		'password',
		'Неправильно указан пароль. Минимальное значение: 6. Максимальное: 20'
	)
		.isLength({ min: 6, max: 20 })
		.notEmpty(),
]
