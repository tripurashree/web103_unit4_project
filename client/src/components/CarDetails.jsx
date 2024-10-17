import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCustomCar, deleteCustomCar } from '../services/CustomCarAPI';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCustomCar(id);
            setCar(data);
        };
        fetchCar();
    }, [id]);

    if (!car) return <div>Loading...</div>;

    const handleDelete = async () => {
        await deleteCustomCar(id);
        // Redirect or show success message
    };

    return (
        <div>
            <h2>{car.name}</h2>
            <p>Features: {JSON.stringify(car.features)}</p>
            <p>Price: {car.total_price}</p>
            <Link to={`/edit-car/${car.id}`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default CarDetails;
