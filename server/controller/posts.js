import PostMessage from '../models/postMessage.js';

export const getPosts = (req, res) => {
	PostMessage.find({}).then((foundPosts) => res.json(foundPosts)).catch((error) => res.json(error));
};
export const createPost = (req, res) => {
	const post = req.body;
	PostMessage.create({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
		.then((newPost) => res.status(201).json(newPost))
		.catch((error) => res.status(409).json({ message: error.message }));
};
export const showPost = (req, res) => {
	PostMessage.findById(req.params.id, (err, foundPost) => {
		if (err) return console.log(err);
		res.json(foundPost);
	});
};
export const updatePost = (req, res) => {
	const { id: _id } = req.params;
	//if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);
	PostMessage.findByIdAndUpdate(_id, req.body, { new: true })
		.then((post) => {
			res.json(post);
		})
		.catch((error) => res.json(error));
};
export const likePost = async (req, res) => {
	const { id } = req.params;
	if (!req.userId) return res.json({ message: 'on authenticated' });
	const post = await PostMessage.findById(id);
	const index = post.likes.findIndex((id) => id === String(req.userId));
	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes = post.likes.filter((id) => id !== String(req.userId));
	}
	PostMessage.findByIdAndUpdate(id, post, { new: true })
		.then((updatedPost) => res.json(updatedPost))
		.catch((error) => console.log(error));
};
export const deletePost = (req, res) => {
	const { id } = req.params;

	PostMessage.findByIdAndRemove(id)
		.then(() => res.json({ message: 'Post deleted successfully.' }))
		.catch((err) => res.status(404).send(`No post with id: ${id}`));
};
