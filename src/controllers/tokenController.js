import { getToken } from '../models/tokenModel.js'

export const getAccessToken = async (req, res) => {
	try {
		const result = await getToken(req.cookies.refreshToken)

		if (result.success === true) {
			const expiryDate = new Date()
			expiryDate.setMinutes(expiryDate.getMinutes() + 15)

			res.cookie('accessToken', result.access, {
				httpOnly: false,
				secure: false,
				sameSite: 'Strict',
				expires: expiryDate,
			})

			const { access, ...resultMsg } = result
			res.status(200).json(resultMsg)
		} else {
			res.status(401).json(result)
		}
	} catch (error) {
		res.json({
			error,
		})
	}
}
