import pg from "pg";
import dotenv from "dotenv";
import path from "path"
dotenv.config();
const { Pool } = pg;

const envFile =
process.env.NODE_ENV === 'production' ? '.env.production' : 'env'
dotenv.config({path: path.resolve(process.cwd(), envFile)})

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl:
  process.env.NODE_ENV === "production" ? {rejectUnauthorized: false} : false
});

pool
  .connect()
  .then(() => {
    console.log("Connected to the database on port 5432")
   
  })
  .catch((err) => console.error(err));

export default pool;