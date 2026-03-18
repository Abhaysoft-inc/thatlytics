import dotenv from 'dotenv'

dotenv.config()

export const environment = process.env.NODE_ENV
export const port = process.env.PORT

export const logDirectory = process.env.LOG_DIR

