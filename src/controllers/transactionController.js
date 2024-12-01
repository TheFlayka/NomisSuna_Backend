import {
	addTransaction,
	getTransaction,
	getTransactions,
	updateTransaction,
} from '../models/transactionModel.js'

export const addTransactionController = async (req, res) => {
	try {
		const result = await addTransaction(req.body, req.headers.authorization)
		if (result.success === true) {
			res.status(200).json(result)
		} else {
			const { statusCode, ...errorResult } = result
			res.status(result.statusCode).json(errorResult)
		}
	} catch (error) {
		res.status({
			error,
		})
	}
}

export const getTransactionsController = async (req, res) => {
	try {
		const result = await getTransactions(
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
		res.status({
			error,
		})
	}
}

export const getTransactionController = async (req, res) => {
	try {
		const result = await getTransaction(
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
		res.status({
			error,
		})
	}
}

export const updateTransactionController = async (req, res) => {
	try {
		const result = await updateTransaction(
			req.params.id,
			req.body,
			req.headers.authorization
		)
		if (result.success === true) {
			res.status(200).json(result)
		} else {
			const { statusCode, ...errorResult } = result
			res.status(result.statusCode).json(errorResult)
		}
	} catch (error) {
		res.status({
			error,
		})
	}
}
