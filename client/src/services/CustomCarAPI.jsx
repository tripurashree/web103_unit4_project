const API_URL = '/api/custom-cars';

// Fetch all cars
export const getAllCustomCars = async () => {
    try {
      const response = await fetch('/api/customcars');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  };
  

// Fetch a single car by ID
export const getCustomCar = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

// Create a new car
export const createCustomCar = async (car) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
    });
    return response.json();
};

// Update a car
export const updateCustomCar = async (id, car) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
    });
    return response.json();
};

// Delete a car
export const deleteCustomCar = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};
