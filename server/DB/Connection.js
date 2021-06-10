import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = () => {
	mongoose
		.connect(process.env.CONNECTION_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false
		})
		.then(() => {
			console.log(`Connected to Server`);
		})
		.catch((err) => {
			console.log(err.message);
		});
};
export default connectDB;
