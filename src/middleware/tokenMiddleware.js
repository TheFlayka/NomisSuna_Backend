import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyRefreshToken = (req, res, next) => {
	try {
		if (!req.cookies.refreshToken) {
			return res.status(401).json({ message: 'Токен не найден' })
		}
		
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
