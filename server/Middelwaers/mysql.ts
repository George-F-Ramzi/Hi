import mysql from "mysql2";
import { Pool } from "mysql2/typings/mysql";

let pool: Pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

export default pool;
