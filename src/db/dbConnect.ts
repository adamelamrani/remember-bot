import "dotenv/config";
import { Pool, PoolConfig } from 'pg'

const clientInfo: PoolConfig = {
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
}

const pool = new Pool(clientInfo)

export const query = (text: string, params?: any) => pool.query(text, params);