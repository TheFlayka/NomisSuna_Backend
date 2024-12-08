import jwt from 'jsonwebtoken'

export const verifyRefreshToken = (req, res, next) => {
	try {
		jwt.verify(req.cookies.refreshToken, process.env.JWT_SECRET_REFRESH, (err, decode) => {
			if (err) {
				return res.status(401).json({ message: 'Токен недействителен' })
			}
		})
		next()
	} catch (error) {
		res.status(500).json({
			message: 'Ошибка',
			error,
		})
	}
}
