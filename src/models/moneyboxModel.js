import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
import { checkOneObject } from './checkObject.js'
import { jwtDecode } from 'jwt-decode'

dotenv.config()

const client = new MongoClient(process.env.URL)

export const addMoneybox = async (body, token) => {
	try {
		const resultCheck = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(jwtDecode(token)._id),
		})

		if (resultCheck.success !== true) {
			return resultCheck
		}

		const box = await client
			.db()
			.collection('moneybox')
			.find({ user: resultCheck.data._id })
			.toArray()

		const moneybox = box.find(b => b.name === body.name)
		if (moneybox) {
			return {
				success: false,
				message: 'Такая копилка уже существует',
				statusCode: 404,
			}
		}

		body.user = resultCheck.data._id.toString()
		body.deletedAt = null
		body.currentReach = 0
		await client.db().collection('moneybox').insertOne(body)
		return { success: true, message: 'Копилка успешно создана' }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось создать копилку',
			statusCode: 500,
		}
	}
}

export const getMoneybox = async token => {
	try {
		const decode = jwtDecode(token)
		const resultCheck = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(jwtDecode(token)._id),
		})

		if (resultCheck.success !== true) {
			return resultCheck
		}
		const box = await client
			.db()
			.collection('moneybox')
			.find({ user: decode._id })
			.toArray()

		const boxData = box.filter(b => b.deletedAt === null)
		const cleanBoxData = boxData.map(({ deletedAt, user, ...rest }) => rest)

		return { success: true, data: cleanBoxData }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось найти копилку',
			statusCode: 500,
		}
	}
}

export const getCurrentMoneybox = async (id, token) => {
	try {
		const decode = jwtDecode(token)
		const resultCheckUser = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(decode._id),
		})
		if (resultCheckUser.success !== true) {
			return resultCheckUser
		}

		const resultCheckBox = await checkOneObject('moneybox', {
			user: decode._id,
			_id: ObjectId.createFromHexString(id),
		})
		if (resultCheckBox.success !== true) {
			return resultCheckBox
		}

		const { deletedAt, user, ...dataBox } = resultCheckBox.data

		return { success: true, data: dataBox }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось найти копилку',
			statusCode: 500,
		}
	}
}

export const deleteMoneybox = async (id, token) => {
	try {
		const moneybox = client.db().collection('moneybox')
		const decode = jwtDecode(token)
		const resultCheckUser = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(decode._id),
		})
		if (resultCheckUser.success !== true) {
			return resultCheckUser
		}

		const resultCheckBox = await checkOneObject('moneybox', {
			user: decode._id,
			_id: ObjectId.createFromHexString(id),
		})
		if (resultCheckBox.success !== true) {
			return resultCheckBox
		}

		await moneybox.updateOne(resultCheckBox.data, {
			$set: { deletedAt: new Date() },
		})
		return { success: true, message: 'Копилка успешно удалена' }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось удалить копилку',
			statusCode: 500,
		}
	}
}

export const updateMoneybox = async (body, id, token) => {
	try {
		const moneybox = client.db().collection('moneybox')
		const decode = jwtDecode(token)

		const resultCheckUser = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(decode._id),
		})
		if (resultCheckUser.success !== true) {
			return resultCheckUser
		}

		const resultCheckBox = await checkOneObject('moneybox', {
			user: decode._id,
			_id: ObjectId.createFromHexString(id),
		})
		if (resultCheckBox.success !== true) {
			return resultCheckBox
		}
		await moneybox.updateOne(resultCheckBox.data, { $set: body })

		return { success: true, message: 'Обновление копилки прошло успешно' }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось обновить копилку',
			statusCode: 500,
		}
	}
}
