import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import customCarRoutes from './routes/customCarRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', customCarRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});