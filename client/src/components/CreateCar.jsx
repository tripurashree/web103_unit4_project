import React, { useState } from 'react';
import { createCustomCar } from '../services/CustomCarAPI';

const CreateCar = () => {
    const [name, setName] = useState('');
    const [features, setFeatures] = useState({});
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCar = { name, features, total_price: price };
        await createCustomCar(newCar);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Car Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            {/* Inputs for selecting features */}
            <input 
                type="number" 
                placeholder="Price" 
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                required 
            />
            <button type="submit">Create Car</button>
        </form>
    );
};

export default CreateCar;
