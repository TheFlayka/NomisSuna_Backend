export const checkTokenMiddleWare = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			res.status(401).json({
				message: 'Токен не был отправлен',
				success: false,
			})
		}
		next()
	} catch (error) {
		res.status(500).json({
			message: "Ошибка",
			error,
		})
	}
}

export const checkBodyMiddleware = (req, res, next) => {
	try {
		if (!req.body || Object.keys(req.body).length === 0) {
			res.status(400).json({
				message: "Не были получены какие-либо данные. Попробуйте еще раз",
				success: false
			})
		}
		next()
	} catch (error) {
		res.status(500).json({
			message: "Ошибка",
			error
		})
	}
}