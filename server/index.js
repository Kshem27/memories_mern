import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './DB/Connection.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '30mb', extended: 'true' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: 'true' }));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => {
	res.send('Welcome to memories api');
});
//MONGODB

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
