import { connect } from 'mongoose';
import { connectToDB } from './dal/database';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes';
import attackRoutes from './routes/attackRoutes';
import cors from 'cors';
dotenv.config();



const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
}));

// Converts all data to json format
app.use(express.json());
// Connects to Mongo
connectToDB();

// Routes
app.use('/users', userRoutes);
app.use('/attack', attackRoutes);



app.listen(PORT, () => {
  try {
    console.log('Server listening to port ' + PORT);
  } catch (error) {
    console.log('Failed to listen to port ' + PORT);
  }
});
