import { getToken } from '../models/tokenModel.js'

export const getAccessToken = async (req, res) => {
	try {
		const result = await getToken(req.headers.authorization)

		if (result.success === true) {
			res.status(200).json(result)
		} else {
			res.status(401).json(result)
		}
	} catch (error) {
		res.json({
			error,
		})
	}
}
