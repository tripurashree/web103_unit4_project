import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  console.log('.env file found');
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('.env file loaded successfully');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
  }
} else {
  console.error('.env file not found at', envPath);
}

export default dotenv;