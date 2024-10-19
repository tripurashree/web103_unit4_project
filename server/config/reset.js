import { pool } from './database.js'
import './dotenv.js'
import { Cars } from '../data/Cars.js'

const createCarTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS custom_items CASCADE;
        DROP TABLE IF EXISTS custom_cars CASCADE;

        CREATE TABLE IF NOT EXISTS custom_cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            features JSONB,
            total_price DECIMAL
        );
    `

    try {
        await pool.query(createTableQuery);
        console.log('🎉 Cars table created successfully');
    } catch (err) {
        console.error('⚠️ error creating Cars table', err);
    }
}

const seedCarTable = async () => {
    await createCarTable();

    for (const car of Cars) {
        const insertQuery = {
            text: 'INSERT INTO custom_cars (name, features, total_price) VALUES ($1, $2, $3)',
            values: [car.name, car.features, car.total_price],
        };

        try {
            await pool.query(insertQuery);
            console.log(`✅ ${car.name} added successfully`);
        } catch (err) {
            console.error(`⚠️ error inserting car: ${car.name}`, err);
        }
    }
}

seedCarTable();