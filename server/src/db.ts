import mysql2, { RowDataPacket } from 'mysql2'
import { DATABASE } from '../config/config'
import { SQL } from './constants'
import { QueryType } from './types'

const pool = mysql2.createPool({
    host: DATABASE.HOST,
    user: DATABASE.USER,
    password: DATABASE.PASSWORD,
    database: DATABASE.NAME,
    port: DATABASE.PORT
}).promise()

const format = (out: any, queryType: QueryType) => {
    if (queryType === SQL.SELECT) {
        return { success: true, data: out }
    }
    return { success: out.affectedRows > 0, data: out }
}

const queryType = (query: string): QueryType => query.trim().split(' ')[0].toUpperCase() as QueryType

const db = {
    testConnection: async () => {
        try {
            const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 + 1 as result')
            return rows[0].result === 2 ? 'Database Connection OK' : 'Database Connection Failed'
        } catch (error) {
            throw error
        }
    },
    query: async (query: string, values: any[] = []) => {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(query, values)
            return format(rows, queryType(query))
        } catch (error) {
            throw error
        }
    }
}

export default db