import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This is usually required for cloud-hosted databases.
  },
});

pool
  .connect()
  .then(() => {
    console.log("Connected to the remote database");
  })
  .catch((err) => console.error("Error connecting to the database:", err));

export default pool;
