import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';
export const getPosts = async (req, res) => {
	const { page } = req.query;
	try {
		const LIMIT = 4;
		const startIndex = (Number(page) - 1) * LIMIT; //get Startindex of every page
		const total = await PostMessage.countDocuments({});
		const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
		res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
//Query posts/search?page=1 search
//params posts/:ID getsomething specefic
export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;
	try {
		const title = new RegExp(searchQuery, 'i'); //ignore case Test test TEST

		const posts = await PostMessage.find({ $or: [ { title: title }, { tags: { $in: tags.split(',') } } ] });

		res.json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const createPost = (req, res) => {
	const post = req.body;
	PostMessage.create({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
		.then((newPost) => res.status(201).json(newPost))
		.catch((error) => res.status(409).json({ message: error.message }));
};
export const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await PostMessage.findById(id);
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: 'POST NOT FOUND' });
	}
};
export const updatePost = (req, res) => {
	const { id: _id } = req.params;
	//if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);
	PostMessage.findByIdAndUpdate(_id, req.body, { new: true })
		.then((post) => {
			res.json(post);
		})
		.catch((error) => res.status(500).json({ message: error.message }));
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
export const commentPost = async (req, res) => {
	try {
		const { id } = req.params;
		const { val } = req.body;

		const post = await PostMessage.findById(id);

		await post.comments.push(val);

		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
		res.json(updatedPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const deletePost = async (req, res) => {
	try {
		const { id } = req.params;
		const post = await PostMessage.findById(id);
		if (post.creator !== req.userId) throw Error({ message: 'User not authorized' });
		PostMessage.findByIdAndRemove(id)
			.then(() => res.json({ message: 'Post deleted successfully.' }))
			.catch((err) => res.status(404).send(`No post with id: ${id}`));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const fetchPostsByUser = async (req, res) => {
	try {
		const { id } = req.params;
		const posts = await PostMessage.find({ creator: id });
		// console.log('here');
		res.json({ posts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
