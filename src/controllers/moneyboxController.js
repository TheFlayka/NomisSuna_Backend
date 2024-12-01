import {
	addMoneybox,
	deleteMoneybox,
	getCurrentMoneybox,
	getMoneybox,
	updateMoneybox,
} from '../models/moneyboxModel.js'

export const addMoneyboxController = async (req, res) => {
	try {
		const result = await addMoneybox(req.body, req.headers.authorization)
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

export const getMoneyboxController = async (req, res) => {
	try {
		const result = await getMoneybox(req.headers.authorization)
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

export const getCurrentMoneyboxController = async (req, res) => {
	try {
		const result = await getCurrentMoneybox(
			req.params.id,
			req.headers.authorization
		)
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

export const deleteMoneyboxController = async (req, res) => {
	try {
		const result = await deleteMoneybox(
			req.params.id,
			req.headers.authorization
		)
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

export const updateMoneyboxController = async (req, res) => {
	try {
		const result = await updateMoneybox(
			req.body,
			req.params.id,
			req.headers.authorization
		)
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
