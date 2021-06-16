import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const isCustomAuth = token.length < 500; //if less than 500 then it is from our app's authentication

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.secret);
			//prettier-ignore
			req.userId = decodedData && decodedData.id;
		} else {
			decodedData = jwt.decode(token);
			req.userId = decodedData && decodedData.sub; //google's name for an id that differentiates between user
		}
		next();
	} catch (error) {
		console.log(error);
	}
};
export default auth;
