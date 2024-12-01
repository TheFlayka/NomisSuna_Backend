import { body } from 'express-validator'

export const authValidation = [
	body('name', 'Неправильно указано имя').isLength({ max: 20 }).notEmpty(),
	body('surname', 'Неправильно указано фамилия').isLength({ max: 20 }),
	body('login', 'Неправильно указан логин').isLength({ min: 3, max: 20 }).notEmpty(),
	body('password', 'Неправильно указан пароль').isLength({ min: 6, max: 20 }).notEmpty(),
]