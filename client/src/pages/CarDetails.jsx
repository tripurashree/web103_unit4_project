import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // For getting the car ID from the URL
import { getCustomCar } from '../services/CustomCarAPI';  // API call to get car details
import '../App.css';

const CarDetails = () => {
    const { id } = useParams();  // Get car ID from the route
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCustomCar(id);
            setCar(data);
        };
        fetchCar();
    }, [id]);

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className="car-details">
            <h2>{car.name}</h2>
            <p>Features: {JSON.stringify(car.features)}</p>
            <p>Price: {car.total_price}</p>
        </div>
    );
};

export default CarDetails;