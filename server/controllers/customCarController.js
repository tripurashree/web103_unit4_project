import { pool } from '../config/database.js';

// Get all cars
export const getCustomCars = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM custom_cars');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching custom cars:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new car
export const createCustomCar = async (req, res) => {
    const { name, features, total_price } = req.body;
    const result = await pool.query(
        'INSERT INTO custom_cars (name, features, total_price) VALUES ($1, $2, $3) RETURNING *',
        [name, features, total_price]
    );
    res.json(result.rows[0]);
};

// Update an existing car
export const updateCustomCar = async (req, res) => {
    const { id } = req.params;
    const { name, features, total_price } = req.body;
    const result = await pool.query(
        'UPDATE custom_cars SET name = $1, features = $2, total_price = $3 WHERE id = $4 RETURNING *',
        [name, features, total_price, id]
    );
    res.json(result.rows[0]);
};

// Delete a car
export const deleteCustomCar = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM custom_cars WHERE id = $1', [id]);
    res.json({ message: 'Custom car deleted' });
};
