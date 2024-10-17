import dotenv from './dotenv.js';
import pkg from 'pg';
const { Pool } = pkg;

console.log('DATABASE_URL:', process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export { pool };