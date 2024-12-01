import { MongoClient, ObjectId } from 'mongodb'
import { jwtDecode } from 'jwt-decode'
import { checkOneObject } from './checkObject.js'
import dotenv from 'dotenv'
dotenv.config()
const client = new MongoClient(process.env.URL)

export const addTransaction = async (body, token) => {
	try {
		const decode = jwtDecode(token)

		const resultCheckUser = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(decode._id),
		})
		if (resultCheckUser.success !== true) {
			return resultCheckUser
		}

		for (let box of body.box) {
			const resultCheckBox = await checkOneObject('moneybox', {
				_id: ObjectId.createFromHexString(box.id),
				user: decode._id,
			})

			if (resultCheckBox.success !== true) {
				return resultCheckBox
			}

			if (box.increase === 0 && box.decrease === 0) {
				return {
					success: false,
					message:
						'Транзакция имеет ошибочные поля. Increase и Decrease не могут одновременно быть равны нулю',
					statusCode: 422,
				}
			}

			if (box.increase !== 0 && box.decrease !== 0) {
				return {
					success: false,
					message:
						'Транзакция имеет ошибочные поля. Increase и Decrease не могут иметь ненулевые значения одновременно',
					statusCode: 422,
				}
			}
		}

		await body.box.forEach(async box => {
			const { data } = await checkOneObject('moneybox', {
				_id: ObjectId.createFromHexString(box.id),
				user: decode._id,
			})
			if (box.increase !== 0) {
				await client
					.db()
					.collection('moneybox')
					.updateOne(data, {
						$set: { currentReach: data.currentReach + box.increase },
					})
			} else {
				await client
					.db()
					.collection('moneybox')
					.updateOne(data, {
						$set: { currentReach: data.currentReach - box.decrease },
					})
			}
		})
		body.data = new Date()
		await client.db().collection('transaction').insertOne(body)

		return { success: true, message: 'Транзакция успешно создана' }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось создать транзакцию',
			statusCode: 500,
		}
	}
}

export const getTransactions = async (id, token) => {
	try {
		const decode = jwtDecode(token)

		const resultCheckUser = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(decode._id),
		})
		if (resultCheckUser.success !== true) {
			return resultCheckUser
		}

		const resultCheckBox = await checkOneObject('moneybox', {
			_id: ObjectId.createFromHexString(id),
			user: decode._id,
		})

		if (resultCheckBox.success !== true) {
			return resultCheckBox
		}

		const transactions = await client
			.db()
			.collection('transaction')
			.find({
				box: { $elemMatch: { id: id } },
			})
			.toArray()

		return { success: true, data: transactions, length: transactions.length }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось найти транзакций',
			statusCode: 500,
		}
	}
}

export const getTransaction = async (id, token) => {
	try {
		const decode = jwtDecode(token)

		const resultCheckUser = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(decode._id),
		})
		if (resultCheckUser.success !== true) {
			return resultCheckUser
		}

		const transaction = await client
			.db()
			.collection('transaction')
			.findOne({ _id: ObjectId.createFromHexString(id) })

		if (!transaction) {
			return {
				success: 0,
				statusCode: 404,
				message: 'Не удалось найти транзакцию',
			}
		}

		return { success: true, data: transaction }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось найти транзакций',
			statusCode: 500,
		}
	}
}

export const updateTransaction = async (id, body, token) => {
	try {
		const decode = jwtDecode(token)

		const resultCheckUser = await checkOneObject('users', {
			_id: ObjectId.createFromHexString(decode._id),
		})
		if (resultCheckUser.success !== true) {
			return resultCheckUser
		}

		const resultCheckTransaction = await checkOneObject('transaction', {
			_id: ObjectId.createFromHexString(id),
		})
		if (resultCheckTransaction.success !== true) {
			return resultCheckTransaction
		}

		await client
			.db()
			.collection('transaction')
			.updateOne(resultCheckTransaction.data, { $set: { name: body.name } })
		return { success: true, message: 'Обновление транзакций прошло' }
	} catch (error) {
		return {
			success: false,
			error,
			message: 'Не удалось обновить транзакцию',
			statusCode: 500,
		}
	}
}
