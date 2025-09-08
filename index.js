import express from 'express'
import dotenv from 'dotenv'
import eventRouter from './routes/eventRoute.js'
import cors from 'cors'

dotenv.config({
    quiet: true
})

const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())

app.use("/api/events", eventRouter)

app.listen(PORT || 3000, () => {
    console.log("Server is running on PORT", PORT)
})    