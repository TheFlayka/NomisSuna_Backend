import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
dotenv.config()

const client = new MongoClient(process.env.URL)

export const checkOneObject = async (collection, query) => {
	const object = await client.db().collection(collection).findOne({ ...query, deletedAt: null })

	if (!object) {
		return {
			success: 0,
			message: `Не удалось найти объект`,
			statusCode: 404,
		}
	}
	return { success: true, data: object }
}