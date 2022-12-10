import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const DBURI = process.env.DBURI
export const DBUSER = process.env.DBUSER
export const DBPASS = process.env.DBPASS
export const JWT_SECRET = process.env.JWT_SECRET
