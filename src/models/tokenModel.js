import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { checkOneObject } from './checkObject.js'
import { jwtDecode } from 'jwt-decode'
dotenv.config()

export const getToken = async token => {
	try {
		const resultCheck = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(jwtDecode(token)._id),
		})

		if (resultCheck.success !== true) {
			return resultCheck
		}

		const accessToken = jwt.sign(
			{
				_id: resultCheck.data._id.toString(),
			},
			process.env.JWT_SECRET_ACCESS,
			{ expiresIn: '15m' }
		)

		return { access: accessToken, success: true }
	} catch (error) {
		return { success: false, error, message: 'Не удалось создать access токен' }
	}
}
