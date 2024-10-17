import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // For getting the car ID from the URL 
import { getCustomCar, updateCustomCar } from '../services/CustomCarAPI';  // Correct API call

import '../App.css';

const EditCar = () => {
    const { id } = useParams();  // Get car ID from the route
    const [car, setCar] = useState({ name: '', features: {}, total_price: 0 });

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCustomCar(id);
            setCar(data);
        };
        fetchCar();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateCustomCar(id, car);  // Update car details using API
        // Redirect or display a success message
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="edit-car">
            <h2>Edit Car</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Car Name"
                    value={car.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="total_price"
                    placeholder="Price"
                    value={car.total_price}
                    onChange={handleChange}
                    required
                />
                {/* Add fields for editing features */}
                <button type="submit">Update Car</button>
            </form>
        </div>
    );
};

export default EditCar;