import React, { useState } from 'react';
import { createCustomCar } from '../services/CustomCarAPI';  // Correct API call
import '../App.css';

const CreateCar = () => {
    const [name, setName] = useState('');
    const [features, setFeatures] = useState({});
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCar = { name, features, total_price: price };
        await createCustomCar(newCar);
        // Redirect or display a success message
    };

    return (
        <div className="create-car">
            <h2>Create New Car</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Car Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                />
                {/* Add fields for selecting features */}
                <button type="submit">Create Car</button>
            </form>
        </div>
    );
};

export default CreateCar;