import '../App.css'
import React, { useEffect, useState } from 'react';
import { getCar } from '../services/CarsAPI';
import { useParams,Link } from 'react-router-dom';

const CarDetails = ({ title }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCar(id);
        setCar(carData);
      } catch (err) {
        setError('Failed to fetch car details.');
      }
    };
    fetchCar();
  }, [id]);
  const handleDelete = async (id) => {
    await deleteCar(id);
    setCars(cars.filter((car) => car.id !== id));
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!car) {
    return <p>Loading...</p>;
  }

  // Safely rendering nested objects such as car.options
  const { name, total_price, features } = car;

  return (
    <div>
      <h1>{title}</h1>
      <p>Name: {name}</p>
      <p>Price: ${total_price}</p>
      <h3>Features:</h3>
      {features && (
        <ul>
          <li>Color: {features.color}</li>
          <li>Engine: {features.engine}</li>
          <li>Wheels: {features.wheels}</li>
        </ul>
      )}
      <Link to={`/edit/${id}`}>
        <button>Edit Car</button>
      </Link>
      <button onClick={() => handleDelete(car.id)} className="delete-btn">Delete</button>
    </div>
  );
};

export default CarDetails;