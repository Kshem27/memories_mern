import express from 'express';
import { getPosts, createPost, showPost, updatePost, deletePost, likePost } from '../controller/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', showPost);
router.post('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
export default router;
