import { getToken } from '../models/tokenModel.js'

export const getAccessToken = async (req, res) => {
	try {
		const result = await getToken(req.cookies.refreshToken)

		if (result.success === true) {
			res.cookie('accessToken', result.access, {
				httpOnly: false,
				secure: true,
				sameSite: 'Strict',
				maxAge: 15 * 60 * 1000,
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
