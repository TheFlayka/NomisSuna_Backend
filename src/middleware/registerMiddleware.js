import { validationResult } from 'express-validator'

export const registerMiddleware = (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}
		next()
	} catch (error) {
		res.status(500).json({
			message: 'Ошибка',
			error
		})
	}
}
