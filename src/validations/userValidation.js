import { body } from 'express-validator'

export const registerValidation = [
	body('name', 'Не было отправлено имя').notEmpty(),
	body(
		'login',
		'Неправильно указан логин. Минимальное значение: 3. Максимальное: 20'
	)
		.isLength({ min: 3, max: 20 }),
	body(
		'password',
		'Неправильно указан пароль. Минимальное значение: 6. Максимальное: 20'
	)
		.isLength({ min: 6, max: 20 }),
]

export const loginValidation = [
	body(
		'login',
		'Неправильно указан логин. Минимальное значение: 3. Максимальное: 20'
	)
		.isLength({ min: 3, max: 20 }),
	body(
		'password',
		'Неправильно указан пароль. Минимальное значение: 6. Максимальное: 20'
	)
		.isLength({ min: 6, max: 20 }),
]
