import React, { useEffect, useState } from 'react';
import { getAllCustomCars, deleteCustomCar } from '../services/CustomCarAPI';  
import { Link } from 'react-router-dom';  // For linking to car details and editing
import '../App.css';

const ViewCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getAllCustomCars();
            setCars(data);
        };
        fetchCars();
    }, []);

    const handleDelete = async (id) => {
        await deleteCustomCar(id);
        setCars(cars.filter(car => car.id !== id));
    };

    return (
        <div className="view-cars">
            <h2>All Cars</h2>
            {cars.length === 0 ? (
                <p>No cars found</p>
            ) : (
                <ul>
                    {cars.map(car => (
                        <li key={car.id}>
                            <Link to={`/car/${car.id}`}>
                                {car.name} - ${car.total_price}
                            </Link>
                            <button onClick={() => handleDelete(car.id)}>Delete</button>
                            <Link to={`/edit-car/${car.id}`}>Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewCars;