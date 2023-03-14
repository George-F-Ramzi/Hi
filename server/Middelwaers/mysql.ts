import mysql, { PoolOptions } from "mysql2";
import { Pool } from "mysql2/typings/mysql";

let config: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "Hi",
  ssl: {
    rejectUnauthorized: true,
  },
};

let pool: Pool = mysql.createPool(config);

export default pool;
