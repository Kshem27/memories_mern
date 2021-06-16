import bcrypt from 'bcryptjs'; //use to hash the password
import jwt from 'jsonwebtoken'; //store user in browser for some time
import User from '../models/user.js';

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) return res.status(404).json({ message: "User does'nt exist" });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials' });

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.secret, {
			expiresIn: '1h'
		}); //test is secret key that only developer know
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const signup = async (req, res) => {
	const { firstName, email, password, lastName, confirmPassword } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(404).json({ message: 'User with same email already exist' });

		if (password !== confirmPassword) return res.status(404).json({ message: "passwords don't match" });

		const hashedPassword = await bcrypt.hash(password, 12); //12 is salt that determines the level of difficulty
		const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

		const token = jwt.sign({ email: result.email, id: result._id }, process.env.secret, { expiresIn: '1h' }); //test is secret key that only developer know

		res.status(201).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong!' });
		console.log(error);
	}
};
