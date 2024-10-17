import { pool } from './database.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create table query
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS custom_cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        features JSONB NOT NULL,
        total_price DECIMAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Function to insert cars into the database
const insertCars = async (cars) => {
    const insertQuery = `
        INSERT INTO custom_cars (name, features, total_price)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    for (const car of cars) {
        try {
            // Ensure features is a JSON string
            const featuresJson = JSON.stringify(car.features);
            await pool.query(insertQuery, [car.name, featuresJson, car.total_price]);
            console.log(`Inserted car: ${car.name}`);
        } catch (error) {
            console.error("Error inserting car", car.name, error);
        }
    }
};

// Load and insert data
const resetDatabase = async () => {
    try {
        const data = await fs.readFile(path.resolve(__dirname, '../data/Cars.json'), 'utf8');
        const cars = JSON.parse(data);
        
        await pool.query(createTableQuery);
        console.log("Table created");
        
        await insertCars(cars);
        console.log("All cars inserted");
    } catch (err) {
        console.error("Error creating table or inserting cars", err);
    } finally {
        await pool.end();
    }
};

resetDatabase();