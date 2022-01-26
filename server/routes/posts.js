import express from 'express';
import {
	getPostsBySearch,
	getPosts,
	createPost,
	getPost,
	updatePost,
	deletePost,
	likePost,
	commentPost,
	fetchPostsByUser
} from '../controller/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/users/:id', auth, fetchPostsByUser);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', getPost);
router.post('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
export default router;
