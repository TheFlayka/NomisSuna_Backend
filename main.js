import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './src/routers/userRouter.js'
import tokenRoutes from './src/routers/tokenRouter.js'
import moneyboxRoutes from './src/routers/moneyboxRouter.js'
import transactionRoutes from './src/routers/transactionRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const port = process.env.PORT || 3405
const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true, 
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(userRoutes)
app.use(tokenRoutes)
app.use(moneyboxRoutes)
app.use(transactionRoutes)

app.listen(port, () => console.log(`Server was start on port ${port}`))

// MongoDB
import { MongoClient } from 'mongodb'
const client = new MongoClient(process.env.URL)

async function start() {
	try {
		await client.connect()
		console.log('MongoDB connected')
	} catch (e) {
		console.log(e)
	}
}

start()
