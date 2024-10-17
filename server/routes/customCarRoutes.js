import express from 'express';
import { getCustomCars, createCustomCar, updateCustomCar, deleteCustomCar } from '../controllers/customCarController.js';

const router = express.Router();

router.get('/customcars', (req, res) => getCustomCars(req, res));
  
router.post('/', createCustomCar);
router.put('/:id', updateCustomCar);
router.delete('/:id', deleteCustomCar);

export default router;
