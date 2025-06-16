import { validationResult } from 'express-validator'

export const registerMiddleware = (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			 const response = {
					success: false,
					type: 'validation',
					message: 'Ошибка в некоторых полях',
					error: errors.array().map(err => ({
						path: err.path,
						msg: err.msg,
						location: err.location,
					})),
				}
			return res.status(400).json(response)
		}
		next()
	} catch (error) {
		res.status(500).json({
			message: 'Ошибка',
			error
		})
	}
}

export const loginMiddleware = (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const response = {
				success: false,
				type: 'validation',
				message: 'Ошибка в некоторых полях',
				error: errors.array().map(err => ({
					path: err.path,
					msg: err.msg,
					location: err.location,
				})),
			}
			return res.status(400).json(response)
		}
		next()
	} catch (error) {
		res.status(500).json({
			message: 'Ошибка',
			error,
		})
	}
}