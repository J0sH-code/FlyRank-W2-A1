import { Pool } from 'pg'
import 'dotenv/config'

const dbClient = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

dbClient.connect()

dbClient.query("");

export default dbClient
