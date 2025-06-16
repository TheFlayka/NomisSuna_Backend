import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { checkOneObject } from './checkObject.js'
import { jwtDecode } from 'jwt-decode'
dotenv.config()
const client = new MongoClient(process.env.URL)

export const registerUser = async body => {
	try {
		const usersCollection = client.db().collection('users')
		const users = await usersCollection.find().toArray()
		const user = users.find(user => user.login === body.login)
		if (user) {
			return {
				success: false,
				message: 'Такой пользователь есть, введите другой логин',
				statusCode: 409,
			}
		}

		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(body.password, salt)

		const { password, ...bodyInfo } = body
		bodyInfo.passwordHash = passwordHash
		bodyInfo.deletedAt = null

		await usersCollection.insertOne(bodyInfo)
		return { success: true, message: 'Пользователь успешно создан' }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось создать пользователя',
			statusCode: 500,
		}
	}
}

export const loginUser = async body => {
	try {
		const resultCheck = await checkOneObject('users', {
			login: body.login,
		})

		if (resultCheck.success !== true) {
			return {
				success: false,
				message: 'Не удалось найти такого пользователя',
				statusCode: 404,
			}
		}

		const validPassword = await bcrypt.compare(
			body.password,
			resultCheck.data.passwordHash
		)

		if (!validPassword) {
			return {
				success: false,
				message: 'Неверный логин или пароль',
				statusCode: 404,
			}
		}

		const accessToken = jwt.sign(
			{
				_id: resultCheck.data._id.toString(),
			},
			process.env.JWT_SECRET_ACCESS,
			{ expiresIn: '15m' }
		)

		const refreshToken = jwt.sign(
			{
				_id: resultCheck.data._id.toString(),
			},
			process.env.JWT_SECRET_REFRESH,
			{ expiresIn: '30d' }
		)

		return {
			access: accessToken,
			refresh: refreshToken,
			success: true,
			message: 'Логин прошел успешно',
		}
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось залогиниться',
			statusCode: 400,
		}
	}
}

export const deleteUser = async token => {
	try {
		const resultCheck = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(jwtDecode(token)._id),
		})
		if (resultCheck.success !== true) {
			return resultCheck
		}
		await client
			.db()
			.collection('users')
			.updateOne(resultCheck.data, { $set: { deletedAt: new Date() } })
		return { success: true, message: 'Пользователь успешно удален' }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось удалить пользователя',
			statusCode: 500,
		}
	}
}

export const getUserInfo = async token => {
	try {
		const resultCheck = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(jwtDecode(token)._id),
		})
		if (resultCheck.success !== true) {
			return resultCheck
		}

		const { passwordHash, deletedAt, _id, ...userInfo } = resultCheck.data
		return { data: userInfo, success: true }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось найти пользователя',
			statusCode: 401,
		}
	}
}
