import {
	deleteUser,
	getUserInfo,
	loginUser,
	registerUser,
} from '../models/userModel.js'

export const registerUserController = async (req, res) => {
	try {
		const result = await registerUser(req.body)
		if (result.success === true) {
			res.status(200).json(result)
		} else {
			const { statusCode, ...errorResult } = result
			res.status(result.statusCode).json(errorResult)
		}
	} catch (error) {
		res.json({
			error,
		})
	}
}

export const loginUserController = async (req, res) => {
	try {
		const result = await loginUser(req.body)
		if (result.success === true) {
			res.cookie('accessToken', result.access, {
				httpOnly: false,
				secure: false,
				sameSite: 'Strict',
				maxAge: 15 * 60 * 1000,
			})
			res.cookie('refreshToken', result.refresh, {
				httpOnly: true,
				secure: false,
				sameSite: 'Strict',
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			const { access, refresh, ...resultMsg } = result
			res.status(200).json(resultMsg)
		} else {
			const { statusCode, ...errorResult } = result
			res.status(result.statusCode).json(errorResult)
		}
	} catch (error) {
		res.json({
			error,
		})
	}
}

export const deleteUserController = async (req, res) => {
	try {
		const result = await deleteUser(req.headers.authorization)
		if (result.success === true) {
			res.status(200).json(result)
		} else {
			const { statusCode, ...errorResult } = result
			res.status(result.statusCode).json(errorResult)
		}
	} catch (error) {
		res.json({
			error,
		})
	}
}

export const getUserInfoController = async (req, res) => {
	try {
		const result = await getUserInfo(req.headers.authorization)
		if (result.success === true) {
			res.status(200).json(result)
		} else {
			const { statusCode, ...errorResult } = result
			res.status(result.statusCode).json(errorResult)
		}
	} catch (error) {
		res.json({
			error,
		})
	}
}
