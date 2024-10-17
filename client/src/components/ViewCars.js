import React, { useEffect, useState } from 'react';
import { getAllCustomCars, deleteCustomCar } from '../services/CustomCarAPI';
import { Link } from 'react-router-dom';

const ViewCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getAllCustomCars();  // Correct function name
            setCars(data);
        };
        fetchCars();
    }, []);

    const handleDelete = async (id) => {
        await deleteCustomCar(id);
        setCars(cars.filter(car => car.id !== id));
    };

    return (
        <div>
            {cars.map(car => (
                <div key={car.id}>
                    <h3>{car.name}</h3>
                    <p>{car.total_price}</p>
                    <Link to={`/car/${car.id}`}>View Details</Link>
                    <Link to={`/edit-car/${car.id}`}>Edit</Link>
                    <button onClick={() => handleDelete(car.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ViewCars;
