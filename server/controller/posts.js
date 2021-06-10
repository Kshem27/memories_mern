import PostMessage from '../models/postMessage.js';

export const getPosts = (req, res) => {
	PostMessage.find({}).then((foundPosts) => res.json(foundPosts)).catch((error) => res.json(error));
};
export const createPost = (req, res) => {
	const { title, message, selectedFile, creator, tags } = req.body;
	const newPost = { title, message, selectedFile, creator, tags };
	console.log(newPost);
	PostMessage.create(newPost)
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
	const post = await PostMessage.findById(id);
	PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
		.then((updatedPost) => res.json(updatedPost))
		.catch((error) => console.log(error));
};
export const deletePost = (req, res) => {
	const { id } = req.params;
	PostMessage.findByIdAndRemove(id)
		.then(() => res.json({ message: 'Post deleted successfully.' }))
		.catch((err) => res.status(404).send(`No post with id: ${id}`));
};
